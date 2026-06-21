'use client';

import { Cita, Paciente, Psicologo } from '@/types';
import { useState, useEffect } from 'react';

interface CitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cita: Cita) => void;
  cita?: Cita;
  pacientes: Paciente[];
  psicologos: Psicologo[];
}

export default function CitaModal({
  isOpen,
  onClose,
  onSave,
  cita,
  pacientes,
  psicologos,
}: CitaModalProps) {
  const [formData, setFormData] = useState<Cita>({
    id: '',
    pacienteId: '',
    psicologoId: '',
    fechaHora: '',
    estado: 'confirmada',
    modalidad: 'presencial',
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (cita) {
      setFormData(cita);
    } else {
      setFormData({
        id: Date.now().toString(),
        pacienteId: '',
        psicologoId: '',
        fechaHora: '',
        estado: 'confirmada',
        modalidad: 'presencial',
        createdAt: new Date().toISOString(),
      });
    }
  }, [cita, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="bg-atacalma-green px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {cita ? 'Editar Cita' : 'Nueva Cita'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paciente
            </label>
            <select
              name="pacienteId"
              value={formData.pacienteId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            >
              <option value="">Selecciona un paciente</option>
              {pacientes.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Psicólogo
            </label>
            <select
              name="psicologoId"
              value={formData.psicologoId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            >
              <option value="">Selecciona un psicólogo</option>
              {psicologos.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha y Hora
            </label>
            <input
              type="datetime-local"
              name="fechaHora"
              value={formData.fechaHora}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modalidad
            </label>
            <select
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            >
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            >
              <option value="confirmada">Confirmada</option>
              <option value="cancelada">Cancelada</option>
              <option value="asistida">Asistida</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-atacalma-green text-white rounded-md hover:bg-atacalma-green-dark font-medium"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
