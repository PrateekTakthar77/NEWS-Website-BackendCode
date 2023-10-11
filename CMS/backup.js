import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = {
            title: title, // The value captured from the form
            description: description, // The value captured from the form
            category: category,
        };

        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("description", blogData.description);
        formData.append("category", blogData.category);
        // Add other fields to formData as needed

        try {
            const response = await axios.post(
                "http://localhost:3040/api/article",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Blog uploaded:", response.data);

            // Clear the form inputs
            setTitle("");
            setDescription("");
            setCategory("");
            setPhoto(null);
        } catch (error) {
            console.error("Error uploading blog:", error);
        }
    };

    return (
        <div className="form-container">
            <h2>Upload a Blog</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Blog Title"
                    className="input-field"
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea
                    placeholder="Blog Description"
                    className="input-field"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <input
                    type="text"
                    placeholder="Blog Category"
                    className="input-field"
                    value={category}
                    onChange={handleCategoryChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    className="file-input"
                    onChange={handlePhotoChange}
                />
                <button type="submit" className="button">
                    Upload Blog
                </button>
            </form>
        </div>
    );
}

export default App;
