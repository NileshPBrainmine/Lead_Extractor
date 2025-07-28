import React, { useState } from 'react';

const PasswordToggleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const validCredentials = [
        { email: 'sales@brainmine.ai', pass: '1234' },
        { email: 'admin@brainmine.ai', pass: 'admin@4321#' }
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        const isValid = validCredentials.some(cred => cred.email === email && cred.pass === password);
        if (isValid) {
            onLoginSuccess();
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
            <img src="https://i.imgur.com/O9M4D4z.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Brainmine.AI</h1>
            <p className="text-gray-500 mb-8">Please enter your credentials to log in.</p>
            
            <form onSubmit={handleSubmit} className="text-left">
                <div className="mb-6">
                    <label htmlFor="email" className="block font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
                        required 
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                        <input 
                            type={isPasswordVisible ? "text" : "password"}
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-500"
                            required 
                        />
                        <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                            <PasswordToggleIcon />
                        </span>
                    </div>
                </div>
                <p className="text-red-600 text-sm font-medium h-5 mb-4">{error}</p>
                <button type="submit" className="w-full py-3.5 rounded-lg text-white font-semibold transform transition hover:-translate-y-0.5 hover:shadow-lg bg-gradient-to-r from-green-400 to-teal-500">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;