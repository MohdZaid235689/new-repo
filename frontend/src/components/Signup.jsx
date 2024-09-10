import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const SignUpPage = () => {
    const navigate = useNavigate();

    // State for form inputs
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        adminCode: '',
        role: ''
    });

    // Handle account navigation
    const handleAccount = () => {
        navigate('/login');
    };

    // Handle form submission
    

    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Log the inputs to ensure they're being captured correctly
        console.log("Submitting form with data:", inputs);
    
        try {
            // Send POST request with form data
            const response = await axios.post('http://localhost:9000/signup', inputs);
            console.log("Response:", response.data);
            
    
            // Success notification
            alert("User signed up successfully!");
            if(response.status === 201)
            {
                navigate('/login')
            }
    
            // Optionally, youcd     can navigate to another page or reset the form here
            // navigate('/some-other-page'); // Uncomment if you need navigation after success
    
        } catch (error) {
            // Handle errors
            if (error.response) {
                // Server responded with a status other than 2xx
                alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
            } else if (error.request) {
                // Request was made but no response received
                alert("Error: No response received from server. Please try again.");
            } else {
                // Error occurred in setting up the request
                alert(`Error: ${error.message}`);
            }
        }
    };
    
    
    


    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }));
    };

    // Render fields based on role
    const renderFields = () => {
        if (inputs.role === 'admin') {
            return (
                <>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
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
                        <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700">Admin Code:</label>
                        <input
                            type="text"
                            id="adminCode"
                            name="adminCode"
                            value={inputs.adminCode}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                </>
            );
        } else if (inputs.role === 'user') {
            return (
                <>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
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
        <div className="flex items-center justify-center h-screen bg-slate-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'quicksand' }}>Welcome to the signup page...</h1>
                <div className="flex mb-6">
                    <button onClick={() => setInputs(prev => ({ ...prev, role: 'admin' }))} className="flex-1 py-2 mx-1 text-blue-500 font-medium border border-blue-500 hover:text-white rounded-lg hover:bg-blue-600">Admin</button>
                    <button onClick={() => setInputs(prev => ({ ...prev, role: 'user' }))} className="flex-1 py-2 mx-1 text-green-500 font-medium hover:text-white border border-green-500 rounded-lg hover:bg-green-600">User</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        {renderFields()}
                    </div>
                    <div className="flex justify-center items-center gap-8">
                        <button type="submit" className="w-[30%] py-2 text-white bg-blue-500 border border-blue-500 hover:text-white rounded-lg hover:bg-blue-600">Sign Up</button>
                    </div>
                    <div className="text-blue-900 text-lg cursor-pointer font-medium text-end mt-4" onClick={handleAccount}>Already have an account?</div>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
