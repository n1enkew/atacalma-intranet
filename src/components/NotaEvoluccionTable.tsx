'use client';

import { NotaEvolucion, Paciente, Psicologo } from '@/types';

interface NotaEvoluccionTableProps {
  notas: NotaEvolucion[];
  pacientes: Paciente[];
  psicologos: Psicologo[];
  onEdit: (nota: NotaEvolucion) => void;
  onDelete: (id: string) => void;
  onView: (nota: NotaEvolucion) => void;
}

export default function NotaEvoluccionTable({
  notas,
  pacientes,
  psicologos,
  onEdit,
  onDelete,
  onView,
}: NotaEvoluccionTableProps) {
  const getPacienteName = (id: string) =>
    pacientes.find(p => p.id === id)?.nombre || 'Desconocido';
  const getPsicologoName = (id: string) =>
    psicologos.find(p => p.id === id)?.nombre || 'Desconocido';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (notas.length === 0) {
    return (
      <div className="bg-atacalma-green-light rounded-lg p-8 text-center">
        <p className="text-atacalma-green-dark text-lg font-medium">
          No hay notas de evolución registradas
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notas.map(nota => (
        <div
          key={nota.id}
          className="bg-white rounded-lg shadow-md p-6 border-l-4 border-atacalma-green hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {getPacienteName(nota.pacienteId)}
                </h3>
                <span className="text-sm text-gray-500">
                  {formatDate(nota.fecha)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Psicólogo:</span>{' '}
                {getPsicologoName(nota.psicologoId)}
              </p>
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Notas de la Sesión:
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {nota.notas}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Diagnóstico:
                </p>
                <p className="text-sm text-atacalma-brown font-medium line-clamp-2">
                  {nota.diagnostico}
                </p>
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => onView(nota)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
              >
                👁️ Ver
              </button>
              <button
                onClick={() => onEdit(nota)}
                className="px-3 py-1 bg-atacalma-brown text-white rounded hover:bg-atacalma-brown-light text-sm font-medium"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() =>
                  confirm('¿Eliminar nota?') && onDelete(nota.id)
                }
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
