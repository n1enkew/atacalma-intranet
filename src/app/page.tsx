'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import PacienteModal from '@/components/PacienteModal';
import PacienteTable from '@/components/PacienteTable';
import { Paciente } from '@/types';
import { PACIENTES_INICIALES } from '@/data/initialData';

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPaciente, setEditingPaciente] = useState<Paciente | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('pacientes');
    if (saved) {
      setPacientes(JSON.parse(saved));
    } else {
      setPacientes(PACIENTES_INICIALES);
      localStorage.setItem('pacientes', JSON.stringify(PACIENTES_INICIALES));
    }
  }, []);

  const handleSavePaciente = (paciente: Paciente) => {
    if (editingPaciente) {
      const updated = pacientes.map(p => (p.id === paciente.id ? paciente : p));
      setPacientes(updated);
      localStorage.setItem('pacientes', JSON.stringify(updated));
    } else {
      const newPaciente = { ...paciente, createdAt: new Date().toISOString() };
      const updated = [...pacientes, newPaciente];
      setPacientes(updated);
      localStorage.setItem('pacientes', JSON.stringify(updated));
    }
    setEditingPaciente(undefined);
    setIsModalOpen(false);
  };

  const handleDeletePaciente = (id: string) => {
    const updated = pacientes.filter(p => p.id !== id);
    setPacientes(updated);
    localStorage.setItem('pacientes', JSON.stringify(updated));
  };

  const handleEditPaciente = (paciente: Paciente) => {
    setEditingPaciente(paciente);
    setIsModalOpen(true);
  };

  const handleNewPaciente = () => {
    setEditingPaciente(undefined);
    setIsModalOpen(true);
  };

  const filteredPacientes = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.rut.includes(searchTerm) ||
    p.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-atacalma-gray-light">
      <Navbar currentPage="pacientes" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-atacalma-green mb-2">
            Gestión de Pacientes
          </h1>
          <p className="text-gray-600">
            Administra la información de los pacientes de Atacalma
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Buscar por nombre, RUT o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atacalma-green"
              />
            </div>
            <button
              onClick={handleNewPaciente}
              className="w-full md:w-auto px-6 py-2 bg-atacalma-green text-white rounded-lg hover:bg-atacalma-green-dark font-medium transition-all"
            >
              ➕ Nuevo Paciente
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-atacalma-green rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Total Pacientes</p>
            <p className="text-3xl font-bold">{pacientes.length}</p>
          </div>
          <div className="bg-atacalma-brown rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Activos Este Mes</p>
            <p className="text-3xl font-bold">{filteredPacientes.length}</p>
          </div>
          <div className="bg-atacalma-gray-dark rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Resultados</p>
            <p className="text-3xl font-bold">{filteredPacientes.length}</p>
          </div>
        </div>

        {/* Table */}
        <PacienteTable
          pacientes={filteredPacientes}
          onEdit={handleEditPaciente}
          onDelete={handleDeletePaciente}
        />
      </div>

      {/* Modal */}
      <PacienteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPaciente(undefined);
        }}
        onSave={handleSavePaciente}
        paciente={editingPaciente}
      />
    </div>
  );
}
