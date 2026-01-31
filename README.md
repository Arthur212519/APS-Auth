# 🔐 Auth JWT – React + Express

Projeto simples de autenticação e autorização utilizando **JWT** e validação no servidor.

## 🧠 Objetivo do projeto

- Autenticação com JWT
- Autorização baseada em roles (RBAC)
- Proteção de rotas no backend
- Integração frontend (React) + backend (Express)
- Boas práticas básicas de segurança

---

## 🧱 Tecnologias utilizadas

### Backend
- Node.js
- Express
- JWT (jsonwebtoken)
- bcrypt
- PostgreSQL (Neon)
- helmet
- cors

### Frontend
- React
- Vite
- React Router
- Fetch API
- TailwindCSS

---

## 🔐 Funcionalidades

- Registro de usuário
- Login com geração de JWT
- Proteção de rotas com middleware
- Autorização por role (`user` e `admin`)
- Logout
- Validação de token no backend
- Rate limit no login

---

## 🛡️ Regras de acesso

| Rota | Acesso |
|----|------|
| `/auth/register` | Público |
| `/auth/login` | Público |
| `/protected/protected` | Usuário autenticado |
| `/protected/private` | Apenas admin |

---

## Projeto ainda esta em desenvolvimento  
