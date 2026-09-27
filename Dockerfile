FROM redroid/redroid:11.0.0-latest

# Puertos expuestos para ADB y Scrcpy Web
EXPOSE 5555 8000

# Variables de entorno por defecto
ENV REDROID_FPS=60

# Comando de inicio de Android Kiosko
CMD ["androidboot.hardware=redroid", "redroid.width=1280", "redroid.height=720", "redroid.fps=60"]
