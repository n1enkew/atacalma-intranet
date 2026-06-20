'use client'

import { useState } from 'react'
import { usePacientes } from '@/hooks/usePacientes'
import { PacienteForm } from '@/components/PacienteForm'
import { PacienteLista } from '@/components/PacienteLista'
import { Paciente, PacienteFormData } from '@/types/paciente'

export default function Home() {
  const { pacientes, isLoading, crearPaciente, actualizarPaciente, eliminarPaciente } = usePacientes()
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [pacienteEditando, setPacienteEditando] = useState<Paciente | undefined>()

  const handleSubmit = (datos: PacienteFormData) => {
    if (pacienteEditando) {
      actualizarPaciente(pacienteEditando.id, datos)
      setPacienteEditando(undefined)
    } else {
      crearPaciente(datos)
    }
    setMostrarFormulario(false)
  }

  const handleEdit = (paciente: Paciente) => {
    setPacienteEditando(paciente)
    setMostrarFormulario(true)
  }

  const handleCancel = () => {
    setMostrarFormulario(false)
    setPacienteEditando(undefined)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-medical-light-green to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-green mx-auto mb-4"></div>
          <p className="text-medical-green font-semibold">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-light-green via-white to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-medical-dark-green to-medical-green text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">🏥 Intranet Médica</h1>
          <p className="text-medical-light-green opacity-90">
            Sistema de Gestión de Pacientes, Citas y Evaluaciones
          </p>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Sección de Pacientes */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                👥 Gestión de Pacientes
              </h2>
              <p className="text-gray-600 mt-2">
                Total de pacientes: <span className="font-bold text-medical-green">{pacientes.length}</span>
              </p>
            </div>
            {!mostrarFormulario && (
              <button
                onClick={() => setMostrarFormulario(true)}
                className="bg-medical-green hover:bg-medical-dark-green text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                ➕ Nuevo Paciente
              </button>
            )}
          </div>

          {/* Formulario */}
          {mostrarFormulario && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {pacienteEditando ? '✏️ Editar Paciente' : '📝 Crear Nuevo Paciente'}
              </h3>
              <PacienteForm
                paciente={pacienteEditando}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}

          {/* Lista de Pacientes */}
          <div className="mt-8">
            <PacienteLista
              pacientes={pacientes}
              onEdit={handleEdit}
              onDelete={eliminarPaciente}
            />
          </div>
        </div>

        {/* Próximamente */}
        <div className="grid md:grid-cols-2 gap-6 pt-8 border-t-2 border-medical-green">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-medical-brown opacity-60">
            <h3 className="text-lg font-bold text-gray-800 mb-2">📅 Gestión de Citas Médicas</h3>
            <p className="text-gray-600">Próximamente...</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-medical-brown opacity-60">
            <h3 className="text-lg font-bold text-gray-800 mb-2">📋 Notas de Evaluación</h3>
            <p className="text-gray-600">Próximamente...</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-600">
          <p>© 2024 Intranet Médica. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
