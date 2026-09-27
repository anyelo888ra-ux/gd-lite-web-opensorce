FROM budtmo/docker-android:emulator_11.0

# Puertos para la interfaz web noVNC y ADB
EXPOSE 6080 5555

# Variable de entorno por defecto
ENV PORT=6080
ENV KVM=false

# Iniciar la interfaz web y el emulador en primer plano
CMD ["/bin/bash", "-c", "/src/entrypoint.sh"]
