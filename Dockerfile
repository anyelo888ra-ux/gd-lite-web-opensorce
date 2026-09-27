FROM budtmo/docker-android:emulator_11.0

# Puertos para la interfaz web noVNC y ADB
EXPOSE 6080 5555

# Variables de entorno por defecto
ENV PORT=6080
ENV KVM=false
ENV DEVICE="Samsung Galaxy S6"

# Usar el comando de inicio nativo de la imagen
CMD ["/bin/bash", "-c", "web-server & entrypoint.sh"]
