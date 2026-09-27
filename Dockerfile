FROM redroid/redroid:11.0.0-latest

# Instalar netcat / curl para mantener el proceso web activo si es necesario
USER root

# Puertos expuestos para ADB, Scrcpy Web y Web Service de Render
EXPOSE 5555 8000 10000

# Variables de entorno por defecto
ENV REDROID_FPS=60
ENV PORT=8000

# Desactivar explícitamente el requisito de KVM para entornos cloud
ENV KVM=false

# Comando de inicio corregido
CMD ["sh", "-c", "redroid androidboot.hardware=redroid redroid.width=1280 redroid.height=720 redroid.fps=60 & tail -f /dev/null"]
