#!/bin/sh

# Esperar a que el servicio ADB esté listo
echo "Esperando conexión con el emulador Android..."
while ! adb connect android:5555; do
  sleep 2
done

echo "Conectado exitosamente a Android."

# Instalar APK de Geometry Dash Lite si no está instalado
# Reemplaza la ruta si descargas el APK localmente
echo "Verificando instalación de Geometry Dash Lite..."
# adb install -r /scripts/gd-lite.apk

# Lanzar Geometry Dash Lite automáticamente (Modo Kiosko)
# com.robtopx.geometrydashlite/com.robtopx.geometrydashlite.GeometryDashLite
adb shell am start -n com.robtopx.geometrydashlite/com.robtopx.geometrydashlite.GeometryDashLite

echo "Geometry Dash Lite iniciado en modo Kiosko."
