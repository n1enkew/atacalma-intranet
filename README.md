# 🏥 Intranet Médica

Sistema de gestión médica completo con Next.js, React, TypeScript y Tailwind CSS.

## 📋 Características Implementadas

### ✅ CRUD de Pacientes
- Crear nuevos pacientes
- Ver lista de pacientes
- Editar información de pacientes
- Eliminar pacientes
- Validación de formularios
- Almacenamiento en localStorage
- Cálculo automático de edad
- Formateo de fechas

## 🎨 Diseño

- Colores **verde** como color principal (medical-green, medical-dark-green)
- Colores **blancos** para fondos y tarjetas
- Detalles en **marrón** (medical-brown) para acentos
- Interfaz limpia y moderna
- Responsive y mobile-friendly

## 📦 Stack Tecnológico

- **Next.js 14** - Framework React con SSR
- **React 18** - Librería para interfaces
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utilitario
- **PostCSS + Autoprefixer** - Procesamiento de CSS

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+ instalado

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
```bash
cd intranet-medica
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en navegador**
```
http://localhost:3000
```

### Compilar para producción
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
intranet-medica/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/
│   ├── PacienteForm.tsx    # Formulario de pacientes
│   └── PacienteLista.tsx   # Lista de pacientes
├── hooks/
│   └── usePacientes.ts     # Hook para gestionar pacientes
├── types/
│   └── paciente.ts         # Interfaces TypeScript
├── tailwind.config.js      # Configuración Tailwind
├── tsconfig.json           # Configuración TypeScript
├── next.config.js          # Configuración Next.js
└── package.json            # Dependencias
```

## 🗄️ Almacenamiento de Datos

Actualmente, los datos se almacenan en **localStorage** del navegador. Para pasar a una base de datos real (como MongoDB, PostgreSQL, etc.), necesitarías:

1. Crear API routes en `app/api/`
2. Conectar una base de datos
3. Cambiar los hooks para usar fetch en lugar de localStorage

## 📝 Campos de Paciente

- **Nombre**: Completo del paciente
- **Fecha de Nacimiento**: Para calcular la edad
- **Teléfono**: Contacto del paciente
- **Correo**: Email del paciente
- **RUT**: Documento de identidad

## 🔄 Próximas Funcionalidades

- [ ] CRUD de Citas Médicas
- [ ] CRUD de Notas de Evaluación
- [ ] Búsqueda y filtrado de pacientes
- [ ] Exportar datos a PDF/Excel
- [ ] Sistema de autenticación
- [ ] Base de datos persistente
- [ ] Notificaciones por email
- [ ] Calendario de citas

## 🎨 Colores Personalizados

En `tailwind.config.js` están definidos:
- `medical-green`: #10b981 (color principal)
- `medical-dark-green`: #059669 (color oscuro)
- `medical-light-green`: #d1fae5 (color claro)
- `medical-brown`: #92400e (detalles)
- `medical-light-brown`: #fcd34d (acentos)

## 🤝 Contribuciones

Este es un proyecto base que puedes personalizar y expandir según tus necesidades.

## 📄 Licencia

Proyecto de demostración - Libre para uso personal y educativo.
