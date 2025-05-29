import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../components/Assets/Logo.png'; // adjust the path to your logo

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (token) {
        navigate("/", { replace: true });
      }
    }, [navigate]);
    

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier,
        password,
      });
      localStorage.setItem('jwt', res.data.jwt);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="authx-wrapper">
      <div className="authx-center-card">
        <form className="authx-form" onSubmit={handleLogin}>
          <img src={Logo} alt="Unify Logo" className="authx-logo" />
          <h2 className="authx-title">Login</h2>
          <input
            type="text"
            placeholder="Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Get started</button>
          <p className="authx-switch-text">
            Don’t have an account? <span onClick={() => navigate('/signup')}>Sign up</span>
          </p>
        </form>
      </div>
      </div>

  );
};

export default Login;
