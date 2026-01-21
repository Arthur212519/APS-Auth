import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json()

      if (!response.ok) {
        alert(data.message);
        return
      }

      localStorage.setItem("token", data.token);
      navigate("/private");

    } catch (err) {
      alert("Erro ao conectar com o server");
    }

  };
  const handleRegister = () => {
    logout();
    navigate("/cadastro")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h1>

        <input
          className="w-full p-3 mb-4 rounded bg-gray-700 text-white outline-none"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 rounded bg-gray-700 text-white outline-none"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold">
          Entrar
        </button>
      </form>
      <button 
      onClick={handleRegister}
      >Cadastrar</button>
    </div>
  );
}
