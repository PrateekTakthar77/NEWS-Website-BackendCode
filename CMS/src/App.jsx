import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [active, setActive] = useState("");

  const handleInputChange = (e, field) => {
    if (field === "title") setTitle(e.target.value);
    if (field === "description") setDescription(e.target.value);
    if (field === "category") setCategory(e.target.value);
    if (field === "status") setActive(e.target.value);
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
      clearForm();
    } catch (error) {
      console.error("Error uploading blog:", error);
    }
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPhoto(null);
  };

  const uploadImage = async () => {
    if (!photo) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", photo);
    formData.append("upload_preset", "ml_default"); // Replace with your actual upload preset name

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmlflkbrx/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded:", response.data);
      const secureUrl = response.data.secure_url;
      uploadBlogData({
        title,
        description,
        category,
        photo: secureUrl,
        status: active,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log("Response data:", error.response.data);
    }
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    uploadBlogData({
      title,
      description,
      category,
    });
  };

  return (
    <div className="form-container">
      <h2>Upload a Article</h2>
      <form>
        <input
          type="text"
          placeholder="Blog Title"
          className="input-field"
          value={title}
          onChange={(e) => handleInputChange(e, "title")}
        />
        <textarea
          placeholder="Blog Description"
          className="input-field"
          value={description}
          onChange={(e) => handleInputChange(e, "description")}
        />
        <input
          type="text"
          placeholder="Blog Category"
          className="input-field"
          value={category}
          onChange={(e) => handleInputChange(e, "category")}
        />
        <input
          type="text"
          placeholder="Blog Status"
          className="input-field"
          value={active}
          onChange={(e) => handleInputChange(e, "status")}
        />
        {/* <button type="submit" className="button">
          Upload Blog
        </button> */}
      </form>

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
