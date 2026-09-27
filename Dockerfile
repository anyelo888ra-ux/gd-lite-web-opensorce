FROM budtmo/docker-android:emulator_11.0

# Interfaz web/noVNC y ADB
EXPOSE 6080 5555

ENV PORT=6080
ENV KVM=false
ENV DEVICE="Samsung Galaxy S6"

# El APK se proporciona externamente en /scripts/gd-lite.apk.
# No se incluye el APK propietario en el repositorio.
CMD ["/bin/bash", "-c", "web-server & entrypoint.sh"]
