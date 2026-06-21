'use client';

import { Cita, Paciente, Psicologo } from '@/types';

interface CitaTableProps {
  citas: Cita[];
  pacientes: Paciente[];
  psicologos: Psicologo[];
  onEdit: (cita: Cita) => void;
  onDelete: (id: string) => void;
}

export default function CitaTable({
  citas,
  pacientes,
  psicologos,
  onEdit,
  onDelete,
}: CitaTableProps) {
  const getPacienteName = (id: string) =>
    pacientes.find(p => p.id === id)?.nombre || 'Desconocido';
  const getPsicologoName = (id: string) =>
    psicologos.find(p => p.id === id)?.nombre || 'Desconocido';

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'asistida':
        return 'bg-blue-100 text-blue-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getModalityColor = (modalidad: string) => {
    return modalidad === 'presencial'
      ? 'bg-purple-100 text-purple-800'
      : 'bg-orange-100 text-orange-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (citas.length === 0) {
    return (
      <div className="bg-atacalma-green-light rounded-lg p-8 text-center">
        <p className="text-atacalma-green-dark text-lg font-medium">
          No hay citas registradas
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full">
        <thead className="bg-atacalma-green text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Paciente</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Psicólogo</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Fecha y Hora
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Modalidad
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
            <th className="px-6 py-3 text-center text-sm font-semibold">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {citas.map(cita => (
            <tr
              key={cita.id}
              className="hover:bg-atacalma-green-light transition-colors"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {getPacienteName(cita.pacienteId)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {getPsicologoName(cita.psicologoId)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(cita.fechaHora)}
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getModalityColor(cita.modalidad)}`}>
                  {cita.modalidad === 'presencial' ? '🏥 Presencial' : '💻 Online'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cita.estado)}`}>
                  {cita.estado === 'confirmada' && '✅ Confirmada'}
                  {cita.estado === 'asistida' && '✔️ Asistida'}
                  {cita.estado === 'cancelada' && '❌ Cancelada'}
                </span>
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                  onClick={() => onEdit(cita)}
                  className="inline-px-3 py-1 bg-atacalma-brown text-white rounded hover:bg-atacalma-brown-light text-sm font-medium"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() =>
                    confirm('¿Eliminar cita?') && onDelete(cita.id)
                  }
                  className="inline-px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium"
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
