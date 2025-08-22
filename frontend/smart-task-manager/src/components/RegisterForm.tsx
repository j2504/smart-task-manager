import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

/**
 * Register component - allows new users to register
 */
function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success("✅ Registration successful! Redirecting to login...");
                setFormData({ firstName: '', lastName: '', userName: '', email: '', password: '' });

                setTimeout(() => navigate("/login"), 2000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "❌ Registration failed");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("⚠️ An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h2 className="mb-4 fw-bold text-center">👉 Sign Up</h2>

            <div className="mb-3">
                <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="userName" className="form-label fw-semibold">Username</label>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    className="form-control"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                />
            </div>

            <button type="submit" className="btn btn-success w-100 fw-bold">Register</button>
        </form>
    );
}

export default RegisterForm;
