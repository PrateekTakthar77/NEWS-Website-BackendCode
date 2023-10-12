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

    const uploadBlogData = async (blogData) => {
        try {
            const response = await axios.post(
                "http://localhost:3040/api/article",
                blogData
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

    // const uploadImage = async () => {
    //   if (!photo) {
    //     alert("Please select an image to upload.");
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("file", photo); // Use the field name your API expects
    //   formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset name

    //   try {
    //     const response = await axios.post(
    //       `https://api.cloudinary.com/v1_1/dmlflkbrx/upload`,
    //       formData
    //     );
    //     console.log("Image uploaded:", response.data);
    //     // Extract the secure URL from the Cloudinary response
    //     const secureUrl = response.data.secure_url;
    //   } catch (error) {
    //     console.error("Error uploading image:", error);
    //     console.log("Response data:", error.response.data);
    //   }
    // };

    const uploadImage = async () => {
        if (!photo) {
            alert("Please select an image to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", photo); // Use the field name your API expects
        formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset name

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dmlflkbrx/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Image uploaded:", response.data);

            // Extract the secure URL from the Cloudinary response
            const secureUrl = response.data.secure_url;

            // Now, include the secure URL in your blog data
            const blogData = {
                title,
                description,
                category,
                photo: secureUrl, // Add this field to your blog data
            };

            // Call the function to upload the blog data
            uploadBlogData(blogData);
        } catch (error) {
            console.error("Error uploading image:", error);
            console.log("Response data:", error.response.data);
        }
    };

    const handleBlogSubmit = () => {
        const blogData = {
            title,
            description,
            category,
            photo: secureUrl,
        };
        uploadBlogData(blogData);
    };

    return (
        <div className="form-container">
            <h2>Upload a Blog</h2>
            <form onSubmit={handleBlogSubmit}>
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
                <button type="submit" className="button">
                    Upload Blog
                </button>
            </form>

            {/* Separate image upload button and state */}
            <h2>Upload an Image</h2>
            <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={handlePhotoChange}
            />
            <button onClick={uploadImage} className="button">
                Upload Image
            </button>
        </div>
    );
}

export default App;
