import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../services/auth'


export default function Protected() {
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        logout();
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/protected/protected',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('token inválido');
        }
      
      } catch (err) {
        logout();
        navigate("/");
      } 

    };

    validateUser();
  }, [navigate]);

  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        Área Protegida (usuário autenticado)
      </h1>

      <button
        onClick={() => navigate('/private')}
        className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
      >
        Ir para área privada (admin)
      </button>
      
    </div>
  );
    
}
