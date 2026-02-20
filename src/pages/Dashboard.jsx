import React, { useEffect, useState } from "react";

import { FaPlus, FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    setFavorites(savedFavorites);
  }, []);

  const toggleFavorite = (e, postId) => {
    let newFavorites;
    if (favorites.includes(postId)) {
      newFavorites = favorites.filter((id) => id !== postId);
      toast.info("Removed from favorites");
    } else {
      newFavorites = [...favorites, postId];
      toast.success("Added to favorites!");
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleReadMore = (id) => {
    navigate(`/postdetails/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3001/posts/${id}`, {
        method: "DELETE",
      });

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const createPostNavigate = () => {
    navigate("/createpost");
  };

  return (
    <>
      <div className="dashboard-page">
        <Navbar />
        <main className="dashboard-main">
          <div className="dashboard-welcome">
            <div className="welcome-text">
              <h1>Welcome to your Dashboard</h1>
              <p>
                Manage your posts, track engagement, and connect with your
                audience.
              </p>
            </div>
          </div>

          <div className="dashboard-stats-overview">
            <div className="dash-card">
              <h3>Total Post</h3>
              <span className="dash-number">{posts.length}</span>
            </div>
            <div className="dash-card">
              <h3>Your Stories</h3>
              <span className="dash-number">5</span>
            </div>
            <div className="dash-card">
              <h3>Community Posts</h3>
              <span className="dash-number">10</span>
            </div>
          </div>

          <section className="posts-section">
            <div className="section-header">
              <h2 className="section-title">React Feed</h2>
              <button
                className="create-shortcut-btn"
                onClick={createPostNavigate}
              >
                <FaPlus />
                New Post
              </button>
            </div>

            <div className="post-grid">
              {posts.map((post) => (
                <div className="post-card" key={post.id}>
                  <div className="post-image-container">
                    <img
                      src={post.imageurl}
                      alt="post"
                      className="post-card-image"
                    />
                    <button
                      className={`favorite-btn ${favorites.includes(post.id) ? "active" : ""}`}
                      onClick={(e) => toggleFavorite(e, post.id)}
                    >
                      <FaStar size={22} color="#ffffff" />
                    </button>
                    <div className="post-actions">
                      <button
                        className="action-btn edit-btn"
                        title="Edit Post"
                        onClick={() => handleEdit(post.id)}
                      >
                        <MdEdit size={22} color="#ffffff" />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        title="Delete Post"
                        onClick={() => handleDelete(post.id)}
                      >
                        <MdDelete size={22} color="#ffffff" />
                      </button>
                    </div>
                  </div>

                  <div className="post-card-content">
                    <div className="post-meta">
                      <span className="post-author">{post.auther}</span>
                      <span className="post-date">{post.createdAt}</span>
                    </div>
                    <h3 className="post-card-title">{post.title}</h3>
                    <p className="post-card-description">{post.description}</p>
                    <button
                      className="read-more-btn"
                      onClick={() =>
                        navigate(`/postdetails/${post.id}`, {
                          state: { from: "/dashboard" },
                        })
                      }
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
