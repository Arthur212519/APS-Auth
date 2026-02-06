import { loginService, registerService } from '../services/auth.service.js';

export const login = async (req, res) => {
 
  try {
    const token = await loginService(req.body);

    if (!token) {
      return res.status(401).json({ message: 'usuário ou senha inválido' });
    }

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'erro interno do servidor' });
  }

};

export const register = async (req, res) => {
  

  try {
    await registerService(req.body);
    return res.status(201).json({ message: 'usuário cadastrado' });
  } catch (err) {
    if (err.message === 'USER_EXISTS') {
      return res.status(409).json({ message: 'usuário já cadastrado' });
    }
    return res.status(500).json({ message: 'erro interno do servidor' });
  }
};



