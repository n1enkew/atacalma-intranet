'use client';

import { useEffect, useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  mode: 'login' | 'register';
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
  onSwitchMode: () => void;
  errorMessage?: string;
}

export default function LoginModal({
  isOpen,
  mode,
  onClose,
  onLogin,
  onRegister,
  onSwitchMode,
  errorMessage,
}: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');

  // El modal se usa tanto para login como para registro.
  // mode controla qué acción se muestra y qué botón ejecuta.
  // En modo registro, pedimos confirmación de contraseña antes de enviar.

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setConfirmError('');
    }
  }, [isOpen]);

  // Limpiamos los campos cuando el modal se abre.

  if (!isOpen) {
    return null;
  }

  const actionLabel = mode === 'register' ? 'Crear cuenta' : 'Iniciar sesión';
  const subtitle =
    mode === 'register'
      ? 'Crea una cuenta para acceder y administrar tus acciones.'
      : 'Inicia sesión para acceder a las funciones protegidas del sistema.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{actionLabel}</h2>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <button
            type="button"
            aria-label="Cerrar modal"
            className="text-gray-500 hover:text-gray-900"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {errorMessage ? (
          <div className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Usuario</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atacalma-green"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atacalma-green"
          />
        </label>

        {mode === 'register' ? (
          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">Confirmar contraseña</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
          </label>
        ) : null}

        {confirmError ? (
          <div className="mb-4 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">
            {confirmError}
          </div>
        ) : null}

        <div className="mt-4 text-sm text-center text-gray-600">
          {mode === 'login' ? (
            <>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={onSwitchMode}
                className="font-semibold text-atacalma-green hover:underline"
              >
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={onSwitchMode}
                className="font-semibold text-atacalma-green hover:underline"
              >
                Inicia sesión
              </button>
            </>
          )}
        </div>

        {/* El botón cambia su acción según el modo actual del modal. */}

        <div className="flex justify-end gap-3 mt-4">
              <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              if (mode === 'register') {
                // Validamos que ambas contraseñas coincidan antes de registrar.
                if (password !== confirmPassword) {
                  setConfirmError('Las contraseñas no coinciden');
                  return;
                }
                setConfirmError('');
                onRegister(username.trim(), password);
              } else {
                onLogin(username.trim(), password);
              }
            }}
            className="rounded-lg bg-atacalma-green px-4 py-2 text-white hover:bg-atacalma-green-dark"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
