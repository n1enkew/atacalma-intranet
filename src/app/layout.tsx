import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
