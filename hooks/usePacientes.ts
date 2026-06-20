'use client'

import { useState, useEffect } from 'react'
import { Paciente, PacienteFormData } from '@/types/paciente'

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar pacientes del localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pacientes')
      if (stored) {
        setPacientes(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error al cargar pacientes:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar pacientes en localStorage
  const guardarPacientes = (datos: Paciente[]) => {
    setPacientes(datos)
    localStorage.setItem('pacientes', JSON.stringify(datos))
  }

  // Crear paciente
  const crearPaciente = (datos: PacienteFormData) => {
    const nuevoPaciente: Paciente = {
      id: Date.now().toString(),
      ...datos,
      fechaCreacion: new Date().toISOString(),
    }
    guardarPacientes([...pacientes, nuevoPaciente])
    return nuevoPaciente
  }

  // Actualizar paciente
  const actualizarPaciente = (id: string, datos: PacienteFormData) => {
    const pacientesActualizados = pacientes.map((p) =>
      p.id === id ? { ...p, ...datos } : p
    )
    guardarPacientes(pacientesActualizados)
  }

  // Eliminar paciente
  const eliminarPaciente = (id: string) => {
    const pacientesActualizados = pacientes.filter((p) => p.id !== id)
    guardarPacientes(pacientesActualizados)
  }

  // Buscar paciente por ID
  const obtenerPaciente = (id: string) => {
    return pacientes.find((p) => p.id === id)
  }

  return {
    pacientes,
    isLoading,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,
    obtenerPaciente,
  }
}
