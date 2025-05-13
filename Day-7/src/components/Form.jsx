import React, { useState } from "react";

const Form = () => {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("on submit", formData);
        alert("Form Submitted");
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-400">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 bg-white rounded-xl shadow-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center text-gray-700">Form Learn</h2>

                <div className="flex flex-col">
                    <label htmlFor="userName" className="mb-1 text-sm font-medium text-gray-600">Username</label>
                    <input
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        type="text"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your username"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-600">Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-600">Password</label>
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="image" className="mb-1 text-sm font-medium text-gray-600">Choose Image</label>
                    <input
                        name="image"
                        type="file"
                        onChange={handleChange}
                        className="text-sm text-gray-500"
                    />
                    {formData.image && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Preview"
                            className="mt-3 w-24 h-24 object-cover rounded-full border"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;