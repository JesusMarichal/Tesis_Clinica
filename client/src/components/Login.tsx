import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, Loader2, LogIn, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const apiUrl = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';
            const response = await axios.post(`${apiUrl}/auth/login`, {
                email,
                password,
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setSuccess(true);
            // Simulating redirect
            setTimeout(() => {
                alert('Login exitoso! Bienvenido ' + response.data.user.name);
                setLoading(false);
            }, 1000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al conectar con el servidor');
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="login-card w-full max-w-[420px]">
                <style>{`
          .login-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 28px;
            padding: 48px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .input-group {
            position: relative;
            margin-bottom: 24px;
          }

          .input-group label {
            display: block;
            font-size: 0.85rem;
            font-weight: 500;
            color: #94a3b8;
            margin-bottom: 8px;
            margin-left: 4px;
          }

          .input-wrapper {
            position: relative;
          }

          .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #64748b;
            transition: color 0.3s;
          }

          input {
            width: 100%;
            padding: 14px 16px 14px 48px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          input:focus {
            outline: none;
            border-color: #ff6b00;
            background: rgba(255, 107, 0, 0.03);
            box-shadow: 0 0 0 4px rgba(255, 107, 0, 0.1);
          }

          input:focus + .input-icon {
            color: #ff6b00;
          }

          .submit-btn {
            width: 100%;
            padding: 16px;
            background: #ff6b00;
            color: #000;
            border: none;
            border-radius: 16px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 12px;
          }

          .submit-btn:hover {
            background: #e66000;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(255, 107, 0, 0.4);
          }

          .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          .error-container {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            color: #ef4444;
            padding: 12px;
            border-radius: 12px;
            font-size: 0.85rem;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .brand-name {
            font-size: 2.25rem;
            font-weight: 800;
            text-align: center;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #ff6b00 0%, #ff9d00 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -1px;
          }

          .subtitle {
            color: #64748b;
            text-align: center;
            font-size: 0.95rem;
            margin-bottom: 40px;
          }
        `}</style>

                <h1 className="brand-name">Tesis Clínica</h1>
                <p className="subtitle">Gestión clínica inteligente</p>

                {error && (
                    <div className="error-container">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email institucional</label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                placeholder="admin@test.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Mail className="input-icon" size={20} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Lock className="input-icon" size={20} />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading || success}>
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Verificando...</span>
                            </>
                        ) : success ? (
                            <span>Acceso Concedido</span>
                        ) : (
                            <>
                                <LogIn size={20} />
                                <span>Iniciar Sesión</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-[#64748b]">
                    ¿Dificultades para ingresar? <a href="#" className="text-[#ff6b00] hover:underline">Soporte técnico</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
