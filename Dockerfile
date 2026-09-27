FROM budtmo/docker-android:emulator_11.0

# Puerto de interfaz web asignado por Render
ENV PORT=6080
EXPOSE 6080

# Desactivar requerimiento de KVM para entorno Render
ENV KVM=false

# Comando para iniciar el emulador y el servidor web integrado
CMD ["/src/entrypoint.sh"]
