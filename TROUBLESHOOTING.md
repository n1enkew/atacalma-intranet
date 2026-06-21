# 🔧 Guía de Solución de Problemas

## Error: "Module not found: Can't resolve '@/components/...'"

Si recibes este error después de descargar el proyecto:

### Solución Rápida:

1. **Limpia las carpetas de caché y construcción:**
   ```bash
   rm -rf node_modules .next
   rm package-lock.json
   ```

2. **Reinstala las dependencias:**
   ```bash
   npm install
   ```

3. **Verifica que `tsconfig.json` tenga esta configuración:**
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```

4. **Inicia el servidor nuevamente:**
   ```bash
   npm run dev
   ```

## Otros Problemas Comunes:

### "Error: Cannot find module 'next'"
```bash
npm install
npm run dev
```

### El navegador no carga la página
- Asegúrate de estar en `http://localhost:3000`
- Espera a que se compile (puede tardar 30-60 segundos la primera vez)
- Abre la consola (F12) y busca errores

### Los datos no se guardan
- Los datos se guardan en LocalStorage del navegador
- Si cambias de navegador o limpias datos, se pierden
- Esto es normal en desarrollo (se puede cambiar a base de datos después)

### Port 3000 ya está en uso
```bash
# Usa otro puerto
npm run dev -- -p 3001
```

## ✅ Verificación

Para confirmar que todo está bien:

1. ✅ Puedes ver la página de Pacientes en `http://localhost:3000`
2. ✅ El navbar verde está visible
3. ✅ Puedes hacer clic en "Nuevo Paciente"
4. ✅ Se abre un modal para agregar pacientes
5. ✅ Puedes agregar, editar y eliminar pacientes
6. ✅ Los mismos pasos funcionan en Citas y Notas

¡Si todo esto funciona, el proyecto está correctamente instalado! 🎉
