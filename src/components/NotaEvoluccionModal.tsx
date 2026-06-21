'use client';

import { NotaEvolucion, Paciente, Psicologo } from '@/types';
import { useState, useEffect } from 'react';

interface NotaEvoluccionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (nota: NotaEvolucion) => void;
  nota?: NotaEvolucion;
  pacientes: Paciente[];
  psicologos: Psicologo[];
}

export default function NotaEvoluccionModal({
  isOpen,
  onClose,
  onSave,
  nota,
  pacientes,
  psicologos,
}: NotaEvoluccionModalProps) {
  const [formData, setFormData] = useState<NotaEvolucion>({
    id: '',
    pacienteId: '',
    psicologoId: '',
    fecha: '',
    notas: '',
    diagnostico: '',
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    if (nota) {
      setFormData(nota);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        id: Date.now().toString(),
        pacienteId: '',
        psicologoId: '',
        fecha: today,
        notas: '',
        diagnostico: '',
        createdAt: new Date().toISOString(),
      });
    }
  }, [nota, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8">
        <div className="bg-atacalma-green px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {nota ? 'Editar Nota de Evolución' : 'Nueva Nota de Evolución'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas de la Sesión
            </label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Describe lo que se habló en la sesión..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-atacalma-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnóstico
            </label>
            <textarea
              name="diagnostico"
              value={formData.diagnostico}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Diagnóstico o impresión clínica..."
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
