'use client';

import Link from 'next/link';

interface NavbarProps {
  currentPage: 'pacientes' | 'citas' | 'notas';
}

export default function Navbar({ currentPage }: NavbarProps) {
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
          <div className="flex space-x-4">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
