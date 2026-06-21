'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import NotaEvoluccionModal from '@/components/NotaEvoluccionModal';
import NotaViewModal from '@/components/NotaViewModal';
import NotaEvoluccionTable from '@/components/NotaEvoluccionTable';
import { NotaEvolucion, Paciente } from '@/types';
import { NOTAS_INICIALES, PACIENTES_INICIALES, PSICOLOGOS } from '@/data/initialData';

export default function NotasPage() {
  const [notas, setNotas] = useState<NotaEvolucion[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingNota, setEditingNota] = useState<NotaEvolucion | undefined>();
  const [viewingNota, setViewingNota] = useState<NotaEvolucion | undefined>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedNotas = localStorage.getItem('notas');
    const savedPacientes = localStorage.getItem('pacientes');

    if (savedNotas) {
      setNotas(JSON.parse(savedNotas));
    } else {
      setNotas(NOTAS_INICIALES);
      localStorage.setItem('notas', JSON.stringify(NOTAS_INICIALES));
    }

    if (savedPacientes) {
      setPacientes(JSON.parse(savedPacientes));
    } else {
      setPacientes(PACIENTES_INICIALES);
    }
  }, []);

  const handleSaveNota = (nota: NotaEvolucion) => {
    if (editingNota) {
      const updated = notas.map(n => (n.id === nota.id ? nota : n));
      setNotas(updated);
      localStorage.setItem('notas', JSON.stringify(updated));
    } else {
      const newNota = { ...nota, createdAt: new Date().toISOString() };
      const updated = [...notas, newNota];
      setNotas(updated);
      localStorage.setItem('notas', JSON.stringify(updated));
    }
    setEditingNota(undefined);
    setIsModalOpen(false);
  };

  const handleDeleteNota = (id: string) => {
    const updated = notas.filter(n => n.id !== id);
    setNotas(updated);
    localStorage.setItem('notas', JSON.stringify(updated));
  };

  const handleEditNota = (nota: NotaEvolucion) => {
    setEditingNota(nota);
    setIsModalOpen(true);
  };

  const handleViewNota = (nota: NotaEvolucion) => {
    setViewingNota(nota);
    setIsViewModalOpen(true);
  };

  const handleNewNota = () => {
    setEditingNota(undefined);
    setIsModalOpen(true);
  };

  const filteredNotas = notas.filter(n => {
    const paciente = pacientes.find(p => p.id === n.pacienteId);
    const searchLower = searchTerm.toLowerCase();
    return (
      paciente?.nombre.toLowerCase().includes(searchLower) ||
      paciente?.rut.includes(searchTerm) ||
      n.diagnostico.toLowerCase().includes(searchLower) ||
      n.notas.toLowerCase().includes(searchLower)
    );
  });

  // Agrupar por paciente
  const notasPorPaciente = pacientes.map(paciente => ({
    paciente,
    notas: filteredNotas.filter(n => n.pacienteId === paciente.id),
  })).filter(group => group.notas.length > 0);

  return (
    <div className="min-h-screen bg-atacalma-gray-light">
      <Navbar currentPage="notas" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-atacalma-green mb-2">
            Notas de Evolución
          </h1>
          <p className="text-gray-600">
            Registra y consulta las notas de las sesiones de cada paciente
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Buscar por paciente, diagnóstico o notas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-atacalma-green"
              />
            </div>
            <button
              onClick={handleNewNota}
              className="w-full md:w-auto px-6 py-2 bg-atacalma-green text-white rounded-lg hover:bg-atacalma-green-dark font-medium transition-all"
            >
              ➕ Nueva Nota
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-atacalma-green rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Total Notas</p>
            <p className="text-3xl font-bold">{notas.length}</p>
          </div>
          <div className="bg-atacalma-brown rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Pacientes con Notas</p>
            <p className="text-3xl font-bold">{notasPorPaciente.length}</p>
          </div>
          <div className="bg-atacalma-gray-dark rounded-lg text-white p-4">
            <p className="text-sm font-medium opacity-90">Resultados</p>
            <p className="text-3xl font-bold">{filteredNotas.length}</p>
          </div>
        </div>

        {/* Table */}
        <NotaEvoluccionTable
          notas={filteredNotas}
          pacientes={pacientes}
          psicologos={PSICOLOGOS}
          onEdit={handleEditNota}
          onDelete={handleDeleteNota}
          onView={handleViewNota}
        />
      </div>

      {/* Modals */}
      <NotaEvoluccionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNota(undefined);
        }}
        onSave={handleSaveNota}
        nota={editingNota}
        pacientes={pacientes}
        psicologos={PSICOLOGOS}
      />

      <NotaViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setViewingNota(undefined);
        }}
        nota={viewingNota}
        pacientes={pacientes}
        psicologos={PSICOLOGOS}
      />
    </div>
  );
}
