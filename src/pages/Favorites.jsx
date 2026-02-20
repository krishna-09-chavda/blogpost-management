import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { MdDeleteSweep, MdOpenInNew } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import "./Favorites.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Favorites = () => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    setFavorites(savedFavorites);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts");
      const data = await response.json();
      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const removeFavorite = (postId) => {
    const currentFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    const newFavorites = currentFavorites.filter((id) => id !== postId);

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    toast.info("Removed from collection");
  };

  const clearAllFavorites = () => {
    if (window.confirm("Clear all your saved posts?")) {
      localStorage.setItem("favorites", "[]");
      setFavorites([]);
      toast.info("Collection cleared");
    }
  };
  const favoritePosts = posts.filter((post) => favorites.includes(post.id));
  return (
    <>
      <div className="favorites-page-container">
        <Navbar />
        <main className="favorites-main">
          <div className="favorites-hero">
            <div className="hero-shape"></div>
            <div className="hero-content">
              <h1>Your Reading List</h1>
              <p>Enjoy the collection of stories you've curated.</p>
            </div>
          </div>

          <div className="favorites-content">
            <div className="favorites-header">
              <h2>
                Curated Collection
                <span className="count-badge">{favoritePosts.length}</span>
              </h2>
              {favoritePosts.length > 0 && (
                <button className="clear-all-btn" onClick={clearAllFavorites}>
                  <MdDeleteSweep size={20} />
                  Clear List
                </button>
              )}
            </div>
            {/* empty state UI */}
            {favoritePosts.length === 0 ? (
              <div className="fav-empty-state">
                <div className="empty-icon-wrapper">
                  <FaRegStar className="empty-incon" />
                </div>
                <h3>Your List is empty</h3>
                <p>Discover interesting posts and save them to read later</p>
                <button
                  className="browse-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  Explore Stories
                </button>
              </div>
            ) : (
              /* sample card UI */
              <div className="favorites-grid">
                {favoritePosts.map((post) => (
                  /* card1 */
                  <div className="fav-card">
                    <div className="fav-card-image">
                      <img src={post.imageurl} alt="Post" />
                      <div className="fav-card-overlay">
                        <button
                          className="read-btn"
                          onClick={() =>
                            navigate(`/postdetails/${post.id}`, {
                              state: { from: "/favorites" },
                            })
                          }
                        >
                          <MdOpenInNew />
                          Read Article
                        </button>
                      </div>
                    </div>
                    <div className="fav-card-body">
                      <div className="fav-meta">
                        <span className="fav-author">
                          {post.auther || "Admin"}
                        </span>
                        <span className="fav-date">
                          {post.createdAt || "Recent"}
                        </span>
                      </div>
                      <h3 className="fav-title">{post.title}</h3>
                      <p className="fav-excerpt">{post.description}</p>
                      <button
                        className="remove-fav-btn"
                        onClick={() => removeFavorite(post.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Favorites;
