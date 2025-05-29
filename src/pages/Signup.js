import React, { useState, useEffect } from 'react';
import './Login.css'; // reusing the same styles for consistency
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Assets/Logo.png'; // adjust path if needed

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


      useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
          navigate("/dashboard", { replace: true });
        }
      }, [navigate]);
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1337/api/auth/local/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('jwt', res.data.jwt);
      navigate('/dashboard');
    } catch (err) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="authx-wrapper">
      <div className="authx-center-card">
        <form className="authx-form" onSubmit={handleSignup}>
          <img src={Logo} alt="Unify Logo" className="authx-logo" />
          <h2 className="authx-title">Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Create Account</button>
          <p className="authx-switch-text">
            Already have an account? <span onClick={() => navigate('/login')}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
