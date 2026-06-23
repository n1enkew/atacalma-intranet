'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

interface NavbarProps {
  currentPage: 'pacientes' | 'citas' | 'notas';
}

export default function Navbar({ currentPage }: NavbarProps) {
  // useAuth entrega el estado global de autenticación y los handlers.
  const { isAuthenticated, loggedUser, openLogin, openRegister, logout } = useAuth();

  return (
    <nav className="bg-atacalma-green shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              🏥 Atacalma
            </h1>
            <span className="ml-4 text-sm text-atacalma-green-light">
              Clínica Psiquiátrica
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                currentPage === 'pacientes'
                  ? 'bg-atacalma-brown text-white'
                  : 'text-white hover:bg-atacalma-green-dark'
              }`}
            >
              Pacientes
            </Link>
            <Link
              href="/citas"
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                currentPage === 'citas'
                  ? 'bg-atacalma-brown text-white'
                  : 'text-white hover:bg-atacalma-green-dark'
              }`}
            >
              Citas
            </Link>
            <Link
              href="/notas"
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                currentPage === 'notas'
                  ? 'bg-atacalma-brown text-white'
                  : 'text-white hover:bg-atacalma-green-dark'
              }`}
            >
              Notas de Evolución
            </Link>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-white">{loggedUser}</span>
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-md border border-white/40 px-3 py-2 text-sm text-white hover:bg-white/10"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  {/* El registro y login se muestran en la barra de navegación */}
                  <button
                    type="button"
                    onClick={openRegister}
                    className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
                  >
                    Registrarse
                  </button>
                  <button
                    type="button"
                    onClick={openLogin}
                    className="rounded-md bg-white px-3 py-2 text-sm font-medium text-atacalma-green hover:bg-gray-100"
                  >
                    Iniciar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
