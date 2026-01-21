import { useState } from "react";

export default function Cadastro() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setMessage("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Erro ao cadastrar");
        return;
      }

      setMessage("Cadastro realizado com sucesso!");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        {message && (
          <p className="mb-4 text-center text-sm text-red-600">{message}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
