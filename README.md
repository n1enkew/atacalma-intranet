# 🏥 Atacalma - Sistema de Gestión Clínica

Una intranet completa para gestión de pacientes, citas médicas y notas de evolución en una clínica psiquiátrica.

## ✨ Características

### 👥 Gestión de Pacientes
- Crear, editar y eliminar pacientes
- Registrar: nombre, fecha de nacimiento, teléfono, correo, RUT
- Búsqueda y filtrado rápido
- Cálculo automático de edad

### 📅 Gestión de Citas
- Agendar citas médicas
- Asignar paciente y psicólogo
- Modalidad: Presencial u Online
- Estados: Confirmada, Cancelada, Asistida
- Filtrado por estado
- Estadísticas en tiempo real

### 📝 Notas de Evolución
- Registrar sesiones de terapia
- Documentar notas de la sesión
- Diagnóstico y observaciones
- Búsqueda por paciente o diagnóstico
- Visualización completa de notas

## 🎨 Diseño

- **Colores principales**: Verde (principal), Blanco, Café (detalles)
- **Interfaz moderna y limpia**
- **Responsive para móvil y desktop**
- **Totalmente accesible**

## 🚀 Instalación

### Requisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Instala dependencias:**
```bash
npm install
```

2. **Inicia el servidor de desarrollo:**
```bash
npm run dev
```

3. **Abre en tu navegador:**
```
http://localhost:3000
```

## 📦 Stack Tecnológico

- **Next.js 14** - Framework React
- **React 18** - Librería UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **LocalStorage** - Persistencia de datos

## 📁 Estructura del Proyecto

```
atacalma-intranet/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── globals.css         # Estilos globales
│   │   ├── page.tsx            # Página de pacientes
│   │   ├── citas/
│   │   │   └── page.tsx        # Página de citas
│   │   └── notas/
│   │       └── page.tsx        # Página de notas
│   ├── components/
│   │   ├── Navbar.tsx          # Barra de navegación
│   │   ├── PacienteModal.tsx   # Modal de pacientes
│   │   ├── PacienteTable.tsx   # Tabla de pacientes
│   │   ├── CitaModal.tsx       # Modal de citas
│   │   ├── CitaTable.tsx       # Tabla de citas
│   │   ├── NotaEvoluccionModal.tsx   # Modal de notas
│   │   ├── NotaEvoluccionTable.tsx   # Tabla de notas
│   │   └── NotaViewModal.tsx   # Vista detallada de nota
│   ├── types/
│   │   └── index.ts            # Tipos TypeScript
│   └── data/
│       └── initialData.ts      # Datos iniciales
├── tailwind.config.js          # Configuración Tailwind
├── tsconfig.json               # Configuración TypeScript
└── next.config.js              # Configuración Next.js
```

## 💾 Almacenamiento de Datos

Los datos se guardan en **localStorage** del navegador. Son persistentes mientras no limpies la caché.

**Claves utilizadas:**
- `pacientes` - Lista de pacientes
- `citas` - Lista de citas médicas
- `notas` - Lista de notas de evolución

## 🔧 Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Lint del código
npm run lint
```

## 🎯 Próximas Mejoras

- [ ] Integración con base de datos (MongoDB, PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Exportar reportes (PDF/Excel)
- [ ] Calendario visual de citas
- [ ] Notificaciones por email
- [ ] Historial médico completo
- [ ] Análisis y gráficos
- [ ] Facturación integrada

## 📝 Licencia

Este proyecto está disponible para uso académico y profesional.

## 👨‍💻 Soporte

Para problemas o sugerencias, contacta al equipo de desarrollo.

---

**Hecho con ❤️ para Atacalma**
