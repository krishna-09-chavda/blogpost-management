import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "./CreatePost.css";
import {
  FaCloudUploadAlt,
  FaHeading,
  FaLink,
  FaRegPaperPlane,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const CreatePost = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const authorName = JSON.parse(localStorage.getItem("authData"));
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    author: authorName.name || "",
    imageUrl: "",
    imageType: "url",
  });
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchPostToEdit = async () => {
        try {
          const response = await fetch(`http://localhost:3001/posts/${id}`);
          if (response.ok) {
            const post = await response.json();
            setData({
              title: post.title,
              description: post.description || post.content || "",
              author: post.author,
              imageUrl:
                post.imageUrl && post.imageUrl.startsWith("http")
                  ? post.imageUrl
                  : "",
              imageType:
                post.imageUrl && post.imageUrl.startsWith("http")
                  ? "url"
                  : "file",
            });
            setImagePreview(post.imageUrl);
          }
        } catch (error) {
          console.error("Error fetching post for edit:", error);
        }
      };
      fetchPostToEdit();
    }
  }, [id]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newPost = {
      ...data,
      imageUrl: imagePreview,
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      if (id) {
        // UPDATE Post
        await fetch(`http://localhost:3001/posts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });
      } else {
        // CREATE Post
        await fetch("http://localhost:3001/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileTypeChange = (type) => {
    setData((prev) => ({ ...prev, imageType: type }));
    if (type === "url") {
      setImagePreview(data.imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    if (data.imageType === "url") {
      setData((prev) => ({ ...prev, imageUrl: "" }));
    }
  };

  const validate = () => {
    const newError = {};
    if (!data.title.trim()) {
      newError.title = "Title Is Required.";
    }
    if (!data.author.trim()) {
      newError.author = "Auther is  Required.";
    }
    if (!data.description.trim()) {
      newError.description = "Description Is Required.";
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  return (
    <>
      <div className="create-post-page">
        <Navbar />
        <div className="create-post-container">
          <header className="form-header">
            <h1>{id ? "Edit Post" : "Create Post"}</h1>
            <p>Share your thoughts and stories with the world.</p>
          </header>

          <div className="post-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Post Title</label>
                <div className="input-wrapper">
                  <FaHeading className="input-icon" />
                  <input
                    type="text"
                    name="title"
                    value={data.title}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter a catchy title..."
                  />
                  {errors.title && (
                    <span className="error">{errors.title}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Author Name</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="author"
                    value={data.author}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder={authorName.name}
                  />
                  {errors.author && <span>{errors.author}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="What's on your mind? Write your story here"
                ></textarea>
                {errors.description && <span>{errors.description}</span>}
              </div>

              <div className="form-group">
                <label>Cover Image</label>
                {!imagePreview ? (
                  <>
                    <div className="image-source-tabs">
                      <button
                        type="button"
                        className={`tab-btn ${data.imageType === "url" ? "active" : ""}`}
                        onClick={() => handleFileTypeChange("url")}
                      >
                        Image URL
                      </button>
                      <button
                        type="button"
                        className={`tab-btn ${data.imageType === "file" ? "active" : ""}`}
                        onClick={() => handleFileTypeChange("file")}
                      >
                        Upload File
                      </button>
                    </div>

                    {data.imageType === "url" ? (
                      <div className="input-wrapper">
                        <FaLink className="input-icon" />
                        <input
                          type="url"
                          name="imageUrl"
                          className="form-control"
                          placeholder="Paste image URL here"
                          value={data.imageUrl}
                          onChange={handleInputChange}
                        />
                      </div>
                    ) : (
                      <div
                        className="image-upload-area"
                        onClick={triggerFileSelect}
                      >
                        <FaCloudUploadAlt className="upload-icon" />
                        <p>Click to upload image from your device</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className="image-preview-container"
                    onClick={removeImage}
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button type="button" className="remove-image-btn">
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>

              <div className="form-actions-row">
                <button type="submit" className="submit-btn">
                  <FaRegPaperPlane />
                  Publish Post
                </button>
                <button type="button" className="cancel-btn">
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
