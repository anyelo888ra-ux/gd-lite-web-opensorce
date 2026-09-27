#!/bin/sh
set -eu

APK_PATH="${APK_PATH:-/scripts/gd-lite.apk}"
ANDROID_PACKAGE="${ANDROID_PACKAGE:-com.robtopx.geometryjumplite}"
ANDROID_HOST="${ANDROID_HOST:-127.0.0.1}"
ANDROID_PORT="${ANDROID_PORT:-5555}"

echo "[GDLite] Starting Android runtime..."

# The base image's entrypoint is responsible for bringing up the Android
# emulator and its services. Keep it in the foreground so the container
# remains alive and Render can track the main process.
entrypoint.sh &
ANDROID_PID=$!

echo "[GDLite] Starting Android web server..."
web-server &
WEB_PID=$!

cleanup() {
  echo "[GDLite] Shutting down..."
  kill "$WEB_PID" "$ANDROID_PID" 2>/dev/null || true
  wait "$WEB_PID" 2>/dev/null || true
  wait "$ANDROID_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT

echo "[GDLite] Waiting for ADB at ${ANDROID_HOST}:${ANDROID_PORT}..."

connected=0
for i in $(seq 1 120); do
  if adb connect "${ANDROID_HOST}:${ANDROID_PORT}" >/dev/null 2>&1; then
    connected=1
    break
  fi

  sleep 2
done

if [ "${connected}" -ne 1 ]; then
  echo "[GDLite] Android did not become available within the startup window."
  echo "[GDLite] Keeping services alive for diagnostics."
  wait "$ANDROID_PID" "$WEB_PID"
  exit 0
fi

echo "[GDLite] Android ADB connection established."

if [ -f "${APK_PATH}" ]; then
  echo "[GDLite] Installing supplied APK: ${APK_PATH}"
  adb install -r "${APK_PATH}"

  echo "[GDLite] Launching ${ANDROID_PACKAGE}"
  adb shell am force-stop "${ANDROID_PACKAGE}" || true

  if ! adb shell monkey -p "${ANDROID_PACKAGE}" 1 >/dev/null 2>&1; then
    echo "[GDLite] APK installed, but Android could not launch ${ANDROID_PACKAGE}."
    echo "[GDLite] Set ANDROID_PACKAGE to the package name contained in your APK."
  fi
else
  echo "[GDLite] No APK found at ${APK_PATH}."
  echo "[GDLite] Android is running without GDLite installed."
fi

echo "[GDLite] Backend startup complete. Web UI port: ${PORT:-6080}."

# Keep the container alive while either service is running.
wait "$ANDROID_PID" "$WEB_PID"
