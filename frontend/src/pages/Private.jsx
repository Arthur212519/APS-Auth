import { useEffect, useState } from 'react';
import { logout } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Private() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ message, setMessage] = useState("");

  useEffect(() => {
    const validadeAccess = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        logout();
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/private",{
          headers: {
            Authorization:`Bearer ${token}`,
          },
        });

        if (!response.ok) {
          logout();
          navigate("/");
          return;
        }

        const data = await response.json();
        setMessage(data.message);

      } catch (err) {
        logout();
        navigate("/")

      } finally {

        setLoading(false);      
      }
    };

    validadeAccess();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Área Privada</h1>
      <p className="mb-6">{message || "Usuário autenticado"}</p>

      <button
        onClick={handleLogout}
        className="bg-red-600 px-6 py-3 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
