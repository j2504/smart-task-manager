import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

interface LoginFormProps {
    onLoginSuccess: (token: string) => void;
}

/**
* LoginForm component - * allow users to log in * with username and 
* password 
*/
function LoginForm({ onLoginSuccess }: LoginFormProps) {
    //State for form fields
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    /**
     * Handles form submission - sends login request to backend
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                userName,
                password
            });

            const token = response.data.token;
            onLoginSuccess(token); // Store token in state/localStorage
            toast.success("Login successful!");
            navigate("/");//Redirect to homepage/tasks
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Invalid credentials. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <h3 className="mb-3 fw-bold">Login</h3>

            {/** UserName Field */}
            <div className="mb-3">
                <label htmlFor="userName" className="form-label fw-semibold">
                    Username
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>

            {/** Password Field */}
            <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {/** Submit Button */}
            <button type="submit" className="btn btn-primary me-2">🔐Login</button>

            <NavLink to="/register" className="btn btn-success">👉SignUp</NavLink>
        </form>
    );
}

export default LoginForm;