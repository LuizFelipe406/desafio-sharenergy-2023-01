import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import requestApi from '../utils/requestApi';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useLocalStorage('rememberMe', false);
  const navigate = useNavigate();

  useEffect(() => {
    if (rememberMe) {
      setUsername(localStorage.getItem('username') || '');
      setPassword(localStorage.getItem('password') || '');
      login();
    }
  }, [])

  const handleUsernameChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setUsername(value);
    if (rememberMe) {
      localStorage.setItem('username', value);
    }
  };

  const handlePasswordChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setPassword(value);
    if (rememberMe) {
      localStorage.setItem('password', value);
    }
  };

  const handleRememberMeChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target;
    setRememberMe(checked);
    if (checked === true) {
      localStorage.setItem('password', password);
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('password');
      localStorage.removeItem('username');
    }
  };

  const login = async () => {
    const { status, data } = await requestApi('POST', '/login', { username, password });
    if (status === 200) {
      localStorage.setItem('token', data);
      navigate('/clientList');
    }
  }

  return (
    <div>
      <input
        type="text"
        value={ username }
        onChange={ handleUsernameChange }
      />
      <input
        type="password"
        value={ password }
        onChange={ handlePasswordChange }
      />
      <button
        type="button"
        onClick={ login }
        disabled={ username.length === 0 || password.length === 0 }
      >
        Entrar
      </button>
      <input
        id="rememberMe"
        type="checkbox"
        checked={ rememberMe }
        onChange={ handleRememberMeChange }
      />
      <label htmlFor="rememberMe">Remember Me</label>
    </div>
  )
}

export default Login;