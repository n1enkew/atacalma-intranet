'use client'

import { useState } from 'react'
import { Paciente, PacienteFormData } from '@/types/paciente'

interface PacienteFormProps {
  paciente?: Paciente
  onSubmit: (datos: PacienteFormData) => void
  onCancel: () => void
}

export function PacienteForm({ paciente, onSubmit, onCancel }: PacienteFormProps) {
  const [formData, setFormData] = useState<PacienteFormData>(
    paciente || {
      nombre: '',
      fechaNacimiento: '',
      telefono: '',
      correo: '',
      rut: '',
    }
  )

  const [errores, setErrores] = useState<Partial<PacienteFormData>>({})

  const validar = (): boolean => {
    const nuevosErrores: Partial<PacienteFormData> = {}

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es requerido'
    }
    if (!formData.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = 'La fecha de nacimiento es requerida'
    }
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es requerido'
    }
    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      nuevosErrores.correo = 'El correo no es válido'
    }
    if (!formData.rut.trim()) {
      nuevosErrores.rut = 'El RUT es requerido'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Limpiar error del campo cuando empieza a escribir
    if (errores[name as keyof PacienteFormData]) {
      setErrores((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validar()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border-l-4 border-medical-green">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre Completo
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent outline-none transition"
        />
        {errores.nombre && (
          <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent outline-none transition"
        />
        {errores.fechaNacimiento && (
          <p className="text-red-500 text-sm mt-1">{errores.fechaNacimiento}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono
        </label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Ej: +56912345678"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent outline-none transition"
        />
        {errores.telefono && (
          <p className="text-red-500 text-sm mt-1">{errores.telefono}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo Electrónico
        </label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Ej: juan@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent outline-none transition"
        />
        {errores.correo && (
          <p className="text-red-500 text-sm mt-1">{errores.correo}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          RUT
        </label>
        <input
          type="text"
          name="rut"
          value={formData.rut}
          onChange={handleChange}
          placeholder="Ej: 12345678-9"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-green focus:border-transparent outline-none transition"
        />
        {errores.rut && (
          <p className="text-red-500 text-sm mt-1">{errores.rut}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-medical-green hover:bg-medical-dark-green text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {paciente ? 'Actualizar' : 'Crear'} Paciente
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
