import React, { useState } from 'react';
import { Mail, Lock, Loader2, LogIn, AlertCircle, HeartPulse } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setSuccess(true);
    } catch (err) { }
  };

  return (
    <div className="login-wrapper">
      <style>{`
                .login-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    padding: 20px;
                }

                .login-box {
                    background: #ffffff;
                    width: 100%;
                    max-width: 450px;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
                    border: 1px solid #e2e8f0;
                }

                .login-header {
                    background: #007bff;
                    padding: 40px 20px;
                    text-align: center;
                    color: white;
                }

                .icon-circle {
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                }

                .login-header h1 {
                    font-size: 1.8rem;
                    font-weight: 700;
                    margin: 0;
                }

                .login-header p {
                    font-size: 0.9rem;
                    opacity: 0.9;
                    margin-top: 5px;
                }

                .login-body {
                    padding: 40px;
                }

                .form-group {
                    margin-bottom: 25px;
                }

                .form-group label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 8px;
                }

                .input-container {
                    position: relative;
                }

                .input-container input {
                    width: 100%;
                    padding: 12px 15px 12px 45px;
                    border: 1px solid #cbd5e1;
                    border-radius: 10px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .input-container input:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }

                .input-icon {
                    position: absolute;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #94a3b8;
                }

                .btn-submit {
                    width: 100%;
                    padding: 14px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .btn-submit:hover {
                    background: #0056b3;
                }

                .btn-submit:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .error-box {
                    background: #fef2f2;
                    color: #dc2626;
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    font-size: 0.85rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: 1px solid #fee2e2;
                }

                .login-footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 0.85rem;
                    color: #64748b;
                }

                .login-footer a {
                    color: #007bff;
                    font-weight: 600;
                    text-decoration: none;
                }
            `}</style>

      <div className="login-box">
        <div className="login-header">
          <div className="icon-circle">
            <HeartPulse size={30} />
          </div>
          <h1>Inicia Sesión</h1>
          <p>Acceso al Sistema Tesis Clínica</p>
        </div>

        <div className="login-body">
          {error && (
            <div className="error-box">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <div className="input-container">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-container">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="btn-submit" type="submit" disabled={loading || success}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : <LogIn size={20} />}
              {loading ? 'Entrando...' : success ? 'Accediendo...' : 'Ingresar'}
            </button>
          </form>

          <div className="login-footer">
            ¿Olvidaste tu contraseña? <a href="#"> Recuperar cuenta</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
