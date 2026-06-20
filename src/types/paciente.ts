export interface Paciente {
  id: string
  nombre: string
  fechaNacimiento: string
  telefono: string
  correo: string
  rut: string
  fechaCreacion: string
}

export interface PacienteFormData {
  nombre: string
  fechaNacimiento: string
  telefono: string
  correo: string
  rut: string
}
