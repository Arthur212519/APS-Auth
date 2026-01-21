import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Protected() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/private');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        Área Protegida (Admin)
      </h1>
    </div>
  );
}
