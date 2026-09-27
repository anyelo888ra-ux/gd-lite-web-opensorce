FROM budtmo/docker-android:emulator_11.0

# Puertos expuestos para la interfaz web y servicios
EXPOSE 6080 5555

# Variables de entorno por defecto
ENV PORT=6080
ENV KVM=false

# Comando para iniciar la interfaz web del emulador
CMD ["/bin/bash", "-c", "web-server & ./entrypoint.sh"]
