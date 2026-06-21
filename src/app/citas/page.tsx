'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CitaModal from '@/components/CitaModal';
import CitaTable from '@/components/CitaTable';
import { Cita, Paciente, Psicologo } from '@/types';
import { CITAS_INICIALES, PACIENTES_INICIALES, PSICOLOGOS } from '@/data/initialData';

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCita, setEditingCita] = useState<Cita | undefined>();
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'confirmada' | 'cancelada' | 'asistida'>('todas');

  useEffect(() => {
    const savedCitas = localStorage.getItem('citas');
    const savedPacientes = localStorage.getItem('pacientes');
    
    if (savedCitas) {
      setCitas(JSON.parse(savedCitas));
    } else {
      setCitas(CITAS_INICIALES);
      localStorage.setItem('citas', JSON.stringify(CITAS_INICIALES));
    }

    if (savedPacientes) {
      setPacientes(JSON.parse(savedPacientes));
    } else {
      setPacientes(PACIENTES_INICIALES);
    }
  }, []);

  const handleSaveCita = (cita: Cita) => {
    if (editingCita) {
      const updated = citas.map(c => (c.id === cita.id ? cita : c));
      setCitas(updated);
      localStorage.setItem('citas', JSON.stringify(updated));
    } else {
      const newCita = { ...cita, createdAt: new Date().toISOString() };
      const updated = [...citas, newCita];
      setCitas(updated);
      localStorage.setItem('citas', JSON.stringify(updated));
    }
    setEditingCita(undefined);
    setIsModalOpen(false);
  };

  const handleDeleteCita = (id: string) => {
    const updated = citas.filter(c => c.id !== id);
    setCitas(updated);
    localStorage.setItem('citas', JSON.stringify(updated));
  };

  const handleEditCita = (cita: Cita) => {
    setEditingCita(cita);
    setIsModalOpen(true);
  };

  const handleNewCita = () => {
    setEditingCita(undefined);
    setIsModalOpen(true);
  };

  const filteredCitas = citas.filter(c =>
    filtroEstado === 'todas' ? true : c.estado === filtroEstado
  );

  const estadosCounts = {
    confirmada: citas.filter(c => c.estado === 'confirmada').length,
    asistida: citas.filter(c => c.estado === 'asistida').length,
    cancelada: citas.filter(c => c.estado === 'cancelada').length,
  };

  return (
    <div className="min-h-screen bg-atacalma-gray-light">
      <Navbar currentPage="citas" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-atacalma-green mb-2">
            Gestión de Citas Médicas
          </h1>
          <p className="text-gray-600">
            Administra las citas y sesiones de los pacientes
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3 flex gap-2">
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value as any)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atacalma-green"
              >
                <option value="todas">Todas las citas</option>
                <option value="confirmada">Confirmadas</option>
                <option value="asistida">Asistidas</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>
            <button
              onClick={handleNewCita}
              className="w-full md:w-auto px-6 py-2 bg-atacalma-green text-white rounded-lg hover:bg-atacalma-green-dark font-medium transition-all"
            >
              ➕ Nueva Cita
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-atacalma-green rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Total Citas</p>
            <p className="text-3xl font-bold">{citas.length}</p>
          </div>
          <div className="bg-green-500 rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Confirmadas</p>
            <p className="text-3xl font-bold">{estadosCounts.confirmada}</p>
          </div>
          <div className="bg-blue-500 rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Asistidas</p>
            <p className="text-3xl font-bold">{estadosCounts.asistida}</p>
          </div>
          <div className="bg-red-500 rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Canceladas</p>
            <p className="text-3xl font-bold">{estadosCounts.cancelada}</p>
          </div>
        </div>

        {/* Table */}
        <CitaTable
          citas={filteredCitas}
          pacientes={pacientes}
          psicologos={PSICOLOGOS}
          onEdit={handleEditCita}
          onDelete={handleDeleteCita}
        />
      </div>

      {/* Modal */}
      <CitaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCita(undefined);
        }}
        onSave={handleSaveCita}
        cita={editingCita}
        pacientes={pacientes}
        psicologos={PSICOLOGOS}
      />
    </div>
  );
}
