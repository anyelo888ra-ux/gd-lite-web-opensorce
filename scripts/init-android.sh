#!/bin/sh
set -eu

ANDROID_HOST="${ANDROID_HOST:-android}"
ANDROID_PORT="${ANDROID_PORT:-5555}"
APK_PATH="${APK_PATH:-/scripts/gd-lite.apk}"
PACKAGE_NAME="com.robtopx.geometryjumplite"
ACTIVITY_NAME="com.robtopx.geometryjumplite.GeometryDashLite"

echo "Esperando conexión con Android en ${ANDROID_HOST}:${ANDROID_PORT}..."

while ! adb connect "${ANDROID_HOST}:${ANDROID_PORT}" >/dev/null 2>&1; do
  sleep 2
done

echo "Conectado exitosamente con Android."

if [ ! -f "${APK_PATH}" ]; then
  echo "ERROR: No se encontró el APK en ${APK_PATH}."
  echo "Coloca un APK de Geometry Dash Lite que tengas derecho a usar en esa ruta."
  exit 1
fi

echo "Instalando Geometry Dash Lite desde ${APK_PATH}..."
adb install -r "${APK_PATH}"

echo "Iniciando Geometry Dash Lite..."
adb shell am force-stop "${PACKAGE_NAME}" || true
adb shell monkey -p "${PACKAGE_NAME}" 1 >/dev/null

echo "Geometry Dash Lite iniciado."
