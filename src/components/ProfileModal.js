import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileModal.css";

const ProfileModal = ({ onClose, onLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {user ? (
          <>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </>
        ) : (
          <p>Loading user info...</p>
        )}
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileModal;
