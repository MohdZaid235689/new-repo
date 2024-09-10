import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        adminCode: '' // adminCode will be used only if the role is 'admin'
    });

    const handleAccount = () => {
        navigate('/signup');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", inputs);
    
        try {
            // Send POST request to login endpoint
            const response = await axios.post('http://localhost:9000/login', inputs);
            alert("Login successful!");
            if(response.status === 200)
            {
                navigate('/dashboard')
            }
            
            // Optionally, handle success (e.g., navigate to another page or update state)
            // navigate('/dashboard'); // Uncomment if you need navigation after successful login
    
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
            } else if (error.request) {
                // Request was made but no response received
                alert('Error: No response received from server. Please try again.');
            } else {
                // Error occurred in setting up the request
                alert(`Error: ${error.message}`);
            }
        }
    };
    

    const renderFields = () => {
        if (role === 'admin') {
            return (
                <>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="admin-code" className="block text-sm font-medium text-gray-700">Admin Code:</label>
                        <input
                            type="text"
                            id="admin-code"
                            name="adminCode"
                            value={inputs.adminCode}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                </>
            );
        } else if (role === 'user') {
            return (
                <>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={inputs.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={inputs.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'quicksand' }}>Welcome to the Login Page...</h1>
                <div className="flex mb-6">
                    <button
                        onClick={() => setRole('admin')}
                        className="flex-1 py-2 mx-1 text-blue-500 font-medium border border-blue-500 hover:text-white rounded-lg hover:bg-blue-600"
                    >
                        Admin
                    </button>
                    <button
                        onClick={() => setRole('user')}
                        className="flex-1 py-2 mx-1 text-green-500 font-medium hover:text-white border border-green-500 rounded-lg hover:bg-green-600"
                    >
                        User
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {renderFields()}
                    </div>
                    <div className="flex justify-center items-center gap-8">
                        <button
                            type="submit"
                            className="w-[30%] py-2 text-white bg-blue-500 border border-blue-500 hover:text-white rounded-lg hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                    <div
                        className="text-blue-900 text-lg cursor-pointer font-medium text-end mt-4"
                        onClick={handleAccount}
                    >
                        Don't have an account? Sign Up
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
