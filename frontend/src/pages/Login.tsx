import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import requestApi from '../utils/requestApi';
import '../style/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccesfull, setLoginSuccesfull] = useState(true);
  const [rememberMe, setRememberMe] = useLocalStorage('rememberMe', false);
  const navigate = useNavigate();

  useEffect(() => {
    if (rememberMe) {
      const storedUsername = localStorage.getItem('username') || '';
      const storedPassword = localStorage.getItem('password') || '';
      setUsername(storedUsername);
      setPassword(storedPassword);
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
    const storedUsername = localStorage.getItem('username') || '';
    const storedPassword = localStorage.getItem('password') || '';
    const { status, data } = await requestApi('POST', 'login', rememberMe ? { username: storedUsername, password: storedPassword } : { username, password });
    if (status === 200) {
      localStorage.setItem('token', JSON.stringify(data.token));
      navigate('/randomUsers');
    } else {
      setLoginSuccesfull(false);
    }
  }

  return (
    <div className="bg-cream w-screen h-screen main font-plexSans">
      <div className="h-screen xl:w-1/3 lg:w-1/2 md:rounded-none md:w-screen lg:rounded-r-[2em] bg-gradient-to-b from-green to-dgreen shadow-2xl shadow-dgreen">
        <div className="flex flex-col items-center justify-center h-full w-2/3 m-auto">
          <div className="flex flex-col items-start w-full mb-14">
            <h1 className="text-5xl font-semibold text-cream mb-9">Bem-Vindo</h1>
            <span className="text-lg text-gray-200">Desafio Sharenergy</span>
            <span className="text-lg text-gray-200">Luiz Felipe Pereira</span>
          </div>
          <input
            className="w-full rounded-[1em] p-4 mb-6 focus:outline-none shadow-xl"
            type="text"
            value={ username }
            onChange={ handleUsernameChange }
            placeholder="Username"
          />
          <input
            className="w-full rounded-[1em] p-4 mb-4 focus:outline-none shadow-xl"
            type="password"
            value={ password }
            onChange={ handlePasswordChange }
            placeholder="Password"
          />
          <div className="flex items-center justify-center mb-4">
            <input
              className="mr-2 text-lg accent-golden"
              id="rememberMe"
              type="checkbox"
              checked={ rememberMe }
              onChange={ handleRememberMeChange }
            />
            <label
              htmlFor="rememberMe"
              className="text-white"
            >
              Remember Me
            </label>
          </div>
          <button
            className="w-full bg-golden rounded-[2em] p-3 font-bold cursor-pointer shadow-xl mb-10 disabled:bg-gray-400 transition duration-300"
            type="button"
            onClick={ login }
            disabled={ username.length === 0 || password.length === 0 }
          >
            Entrar
          </button>
          <span
            className={loginSuccesfull ? "invisible" : "text-red-400"}
          >
            Usuario ou Senha Inválidos
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login;