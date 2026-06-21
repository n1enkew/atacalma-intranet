import { Paciente, Cita, NotaEvolucion, Psicologo } from '@/types';

export const PSICOLOGOS: Psicologo[] = [
  { id: '1', nombre: 'Dra. María García', especialidad: 'Terapia Cognitivo-Conductual' },
  { id: '2', nombre: 'Dr. Carlos López', especialidad: 'Psicología Clínica' },
  { id: '3', nombre: 'Lic. Ana Rodríguez', especialidad: 'Terapia de Pareja' },
];

export const PACIENTES_INICIALES: Paciente[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    fechaNacimiento: '1990-05-15',
    telefono: '+56912345678',
    correo: 'juan@example.com',
    rut: '12345678-9',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    nombre: 'María Rodríguez',
    fechaNacimiento: '1985-03-22',
    telefono: '+56987654321',
    correo: 'maria@example.com',
    rut: '98765432-1',
    createdAt: new Date().toISOString(),
  },
];

export const CITAS_INICIALES: Cita[] = [
  {
    id: '1',
    pacienteId: '1',
    psicologoId: '1',
    fechaHora: '2024-01-20T10:00:00',
    estado: 'confirmada',
    modalidad: 'presencial',
    createdAt: new Date().toISOString(),
  },
];

export const NOTAS_INICIALES: NotaEvolucion[] = [
  {
    id: '1',
    pacienteId: '1',
    psicologoId: '1',
    fecha: '2024-01-15',
    notas: 'Paciente presenta síntomas de ansiedad leve. Se trabajó en técnicas de respiración y relajación.',
    diagnostico: 'Trastorno de Ansiedad Generalizada',
    createdAt: new Date().toISOString(),
  },
];
