export interface Paciente {
  id: string;
  nombre: string;
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  rut: string;
  createdAt: string;
}

export interface Cita {
  id: string;
  pacienteId: string;
  psicologoId: string;
  fechaHora: string;
  estado: 'confirmada' | 'cancelada' | 'asistida';
  modalidad: 'presencial' | 'online';
  createdAt: string;
}

export interface NotaEvolucion {
  id: string;
  pacienteId: string;
  psicologoId: string;
  fecha: string;
  notas: string;
  diagnostico: string;
  createdAt: string;
}

export interface Psicologo {
  id: string;
  nombre: string;
  especialidad?: string;
}
