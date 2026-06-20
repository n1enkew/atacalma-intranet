'use client'

import { Paciente } from '@/types/paciente'

interface PacienteListaProps {
  pacientes: Paciente[]
  onEdit: (paciente: Paciente) => void
  onDelete: (id: string) => void
}

export function PacienteLista({ pacientes, onEdit, onDelete }: PacienteListaProps) {
  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CL')
  }

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date()
    const nacimiento = new Date(fechaNacimiento)
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--
    }
    return edad
  }

  if (pacientes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center border-t-4 border-medical-green">
        <p className="text-gray-500 text-lg">No hay pacientes registrados</p>
        <p className="text-gray-400 text-sm mt-2">Comienza creando el primer paciente</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {pacientes.map((paciente) => (
        <div
          key={paciente.id}
          className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-medical-green hover:shadow-lg transition"
        >
          <div className="p-6">
            {/* Header del Paciente */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{paciente.nombre}</h3>
                <p className="text-sm text-medical-brown font-semibold mt-1">
                  RUT: {paciente.rut}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-medical-light-green text-medical-dark-green px-3 py-1 rounded-full text-sm font-semibold">
                  {calcularEdad(paciente.fechaNacimiento)} años
                </span>
              </div>
            </div>

            {/* Información del Paciente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                <p className="font-semibold text-gray-800">
                  {formatearFecha(paciente.fechaNacimiento)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-semibold text-gray-800">{paciente.telefono}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Correo Electrónico</p>
                <p className="font-semibold text-gray-800 break-all">{paciente.correo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Registrado el</p>
                <p className="font-semibold text-gray-800">
                  {formatearFecha(paciente.fechaCreacion)}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => onEdit(paciente)}
                className="flex-1 bg-medical-green hover:bg-medical-dark-green text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                ✎ Editar
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`¿Deseas eliminar a ${paciente.nombre}?`)) {
                    onDelete(paciente.id)
                  }
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
