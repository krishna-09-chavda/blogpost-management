import React from "react";
import Navbar from "../Components/Navbar";
import { MdDeleteSweep, MdOpenInNew } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import "./Favorites.css";
const Favorites = () => {
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
                <span className="count-badge">3</span>
              </h2>
              <button className="clear-all-btn">
                <MdDeleteSweep size={20} />
                Clear List
              </button>
            </div>
            {/* empty state UI */}
            <div className="fav-empty-state">
              <div className="empty-icon-wrapper">
                <FaRegStar className="empty-incon" />
              </div>
              <h3>Your List is empty</h3>
              <p>Discover interesting posts and save them to read later</p>
              <button className="browse-btn">Explore Stories</button>
            </div>
            {/* sample card UI */}
            <div className="favorites-grid">
              {/* card1 */}
              <div className="fav-card">
                <div className="fav-card-image">
                  <img src="" alt="Post" />
                  <div className="fav-card-overlay">
                    <button className="read-btn">
                      <MdOpenInNew />
                      Read Article
                    </button>
                  </div>
                </div>
                <div className="fav-card-body">
                  <div className="fav-meta">
                    <span className="fav-author">Auther Name</span>
                    <span className="fav-date">Recent</span>
                  </div>
                  <h3 className="fav-title">sample Post Title</h3>
                  <p className="fav-excerpt">
                    Learn the core concept of React including componenets,props
                    and state management...
                  </p>
                  <button className="remove-fav-btn">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Favorites;
