import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Private from './pages/Private';
import Cadastro from './pages/Register';
import Protected from './pages/Protected';
import { isAuthenticated } from './services/auth'

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/private"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />

        <Route
          path="/protected"
          element={
            <PrivateRoute>
              <Protected />
            </PrivateRoute>
          }
        />
        <Route
        path='/cadastro'
        element={<Cadastro/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
