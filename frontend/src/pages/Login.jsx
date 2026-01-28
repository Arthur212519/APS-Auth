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
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/protected");

    } catch {
      alert("Erro ao conectar com o servidor");
    }
  };

  const handleRegister = () => {
    logout();
    navigate("/cadastro");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Bem-vindo de volta
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Faça login para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Usuário
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 
                         border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 
                         border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition 
                       text-white py-3 rounded-lg font-semibold shadow-lg"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm mb-2">
            Não tem uma conta?
          </p>
          <button
            onClick={handleRegister}
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
          >
            Criar conta
          </button>
        </div>

      </div>
    </div>
  );
}
