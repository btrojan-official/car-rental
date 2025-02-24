import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Zmieniamy useHistory na useNavigate
import { authenticateUser } from '../services/api';  // Funkcja do logowania

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Zmieniamy useHistory na useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authenticateUser({ email, password });
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));  // Zapisujemy użytkownika w localStorage
        navigate('/');  // Przekierowanie na stronę główną po zalogowaniu
      } else {
        setErrorMessage('Invalid credentials!');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Login</button>
      </form>
      
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
