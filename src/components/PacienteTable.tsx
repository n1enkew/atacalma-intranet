'use client';

import { Paciente } from '@/types';

interface PacienteTableProps {
  pacientes: Paciente[];
  onEdit: (paciente: Paciente) => void;
  onDelete: (id: string) => void;
}

export default function PacienteTable({
  pacientes,
  onEdit,
  onDelete,
}: PacienteTableProps) {
  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  if (pacientes.length === 0) {
    return (
      <div className="bg-atacalma-green-light rounded-lg p-8 text-center">
        <p className="text-atacalma-green-dark text-lg font-medium">
          No hay pacientes registrados
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full">
        <thead className="bg-atacalma-green text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Nombre</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Edad</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">RUT</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Teléfono</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Correo</th>
            <th className="px-6 py-3 text-center text-sm font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pacientes.map((paciente) => (
            <tr
              key={paciente.id}
              className="hover:bg-atacalma-green-light transition-colors"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {paciente.nombre}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {calcularEdad(paciente.fechaNacimiento)} años
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {paciente.rut}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {paciente.telefono}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {paciente.correo}
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                  onClick={() => onEdit(paciente)}
                  className="inline-px-3 py-1 bg-atacalma-brown text-white rounded hover:bg-atacalma-brown-light text-sm font-medium"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() =>
                    confirm('¿Eliminar paciente?') && onDelete(paciente.id)
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
