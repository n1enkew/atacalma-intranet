'use client';

import { NotaEvolucion, Paciente, Psicologo } from '@/types';

interface NotaViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  nota?: NotaEvolucion;
  pacientes: Paciente[];
  psicologos: Psicologo[];
}

export default function NotaViewModal({
  isOpen,
  onClose,
  nota,
  pacientes,
  psicologos,
}: NotaViewModalProps) {
  if (!isOpen || !nota) return null;

  const paciente = pacientes.find(p => p.id === nota.pacienteId);
  const psicologo = psicologos.find(p => p.id === nota.psicologoId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 my-8">
        <div className="bg-atacalma-green px-6 py-4">
          <h2 className="text-2xl font-bold text-white">
            Nota de Evolución - {paciente?.nombre}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-600">Paciente</p>
              <p className="text-lg font-bold text-gray-900">
                {paciente?.nombre}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Psicólogo</p>
              <p className="text-lg font-bold text-gray-900">
                {psicologo?.nombre}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Fecha</p>
              <p className="text-lg font-bold text-gray-900">
                {formatDate(nota.fecha)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">RUT</p>
              <p className="text-lg font-bold text-gray-900">
                {paciente?.rut}
              </p>
            </div>
          </div>

          {/* Notas de la Sesión */}
          <div>
            <h3 className="text-lg font-bold text-atacalma-green mb-3">
              📝 Notas de la Sesión
            </h3>
            <div className="bg-atacalma-green-light rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {nota.notas}
              </p>
            </div>
          </div>

          {/* Diagnóstico */}
          <div>
            <h3 className="text-lg font-bold text-atacalma-brown mb-3">
              🔍 Diagnóstico
            </h3>
            <div className="bg-yellow-50 rounded-lg p-4 border border-atacalma-brown">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {nota.diagnostico}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-4 text-xs text-gray-500">
            <p>
              Creado el:{' '}
              {new Date(nota.createdAt).toLocaleDateString('es-CL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
