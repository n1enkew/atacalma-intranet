'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import LoginModal from './LoginModal';
import { ensureAdminAccount, getLoggedInUser, loginUser, logoutUser, registerUser } from '@/lib/auth';

interface AuthContextValue {
  loggedUser: string | null;
  isAuthenticated: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeLogin: () => void;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado local de autenticación compartido con toda la app.
  // El proveedor envuelve la aplicación y ofrece login/logout/registro.
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  useEffect(() => {
    // Asegura que siempre exista una cuenta de administrador almacenada.
    // Carga el usuario actualmente conectado desde localStorage.
    ensureAdminAccount();
    setLoggedUser(getLoggedInUser());
  }, []);

  const openLogin = () => {
    setLoginError('');
    setIsRegisterMode(false);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setLoginError('');
    setIsRegisterMode(true);
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const login = (username: string, password: string) => {
    // Intenta autenticar usando cuentas guardadas en localStorage.
    const success = loginUser(username, password);
    if (success) {
      setLoggedUser(username);
      setIsLoginOpen(false);
      setLoginError('');
      return;
    }
    setLoginError('Usuario o contraseña incorrectos');
  };

  const register = (username: string, password: string) => {
    // Registra un usuario nuevo y lo loguea automáticamente.
    // El registro se guarda en localStorage para persistencia.
    const result = registerUser(username, password);
    if (result.success) {
      setLoggedUser(username.trim().toLowerCase());
      setIsLoginOpen(false);
      setLoginError('');
      return;
    }
    setLoginError(result.message);
  };

  const logout = () => {
    // Cierra sesión y borra el usuario actual del estado local.
    logoutUser();
    setLoggedUser(null);
  };

  const value = useMemo(
    () => ({
      loggedUser,
      isAuthenticated: !!loggedUser,
      openLogin,
      openRegister,
      closeLogin,
      login,
      register,
      logout,
    }),
    [loggedUser],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginModal
        isOpen={isLoginOpen}
        mode={isRegisterMode ? 'register' : 'login'}
        onClose={closeLogin}
        onLogin={login}
        onRegister={register}
        onSwitchMode={() => setIsRegisterMode((current) => !current)}
        errorMessage={loginError}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
