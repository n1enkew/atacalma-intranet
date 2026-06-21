'use client';

import { Paciente } from '@/types';
import { useState, useEffect } from 'react';

interface PacienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (paciente: Paciente) => void;
  paciente?: Paciente;
}

export default function PacienteModal({
  isOpen,
  onClose,
  onSave,
  paciente,
}: PacienteModalProps) {
  const [formData, setFormData] = useState<Paciente>({
    id: '',
    nombre: '',
    fechaNacimiento: '',
    telefono: '',
    correo: '',
    rut: '',
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (paciente) {
      setFormData(paciente);
    } else {
      setFormData({
        id: Date.now().toString(),
        nombre: '',
        fechaNacimiento: '',
        telefono: '',
        correo: '',
        rut: '',
        createdAt: new Date().toISOString(),
      });
    }
  }, [paciente, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            {paciente ? 'Editar Paciente' : 'Nuevo Paciente'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
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
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
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
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
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
              required
              placeholder="12345678-9"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
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
