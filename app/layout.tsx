import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Intranet Médica',
  description: 'Sistema de gestión médica',
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
