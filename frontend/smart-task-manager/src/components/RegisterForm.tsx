import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

/**
* Register component - allows new users to register */
function RegisterForm() {

    //Local state for user input fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate(); // for redirecting after successful registration

    /**
     * Handle form input changes
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Handles form submission to register a new user 
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            //Replace this with your actual API call
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                //Registration successful, redirect user to login
                toast.success('Registration successfull Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000); // redirect after 2s
            } else {
                //handle registration error
                const errorData = await response.json();
                alert(errorData.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occured. Please try again.');
        }
    };

    return (

        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <h2 className="mb-4 fw-bold">Register</h2>
            {/** First Name Input */}
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label fw-semibold" >First Name</label>
                <input
                    id='firstName'
                    name="firstName"
                    type="text"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            {/** Last Name Input */}
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label fw-semibold" >Last Name</label>
                <input
                    id='lastName'
                    name="lastName"
                    type="text"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            {/** Username Input */}
            <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold" >Username</label>
                <input
                    id='username'
                    name="username"
                    type="text"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            {/** Email Input */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold" >Email</label>
                <input
                    id='email'
                    name="email"
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/** Password Input */}
            <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold" >Password</label>
                <input
                    id='password'
                    name="password"
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                />
            </div>

            {/** Submit Button */}
            <button type="submit" className="btn btn-primary w-100 fw-bold"> Register </button>
        </form>
    );
}

export default RegisterForm;