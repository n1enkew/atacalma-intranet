import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'Atacalma - Sistema de Gestión Clínica',
  description: 'Intranet para la gestión de pacientes, citas y notas de evolución',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {/*
          AuthProvider envuelve toda la aplicación.
          Esto permite compartir el estado de sesión entre las páginas
          y mostrar el modal de login/registro desde la barra.
        */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
