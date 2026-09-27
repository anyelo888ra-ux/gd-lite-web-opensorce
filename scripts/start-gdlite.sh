#!/bin/sh
set -eu

APK_PATH="${APK_PATH:-/scripts/gd-lite.apk}"
ANDROID_PACKAGE="${ANDROID_PACKAGE:-com.robtopx.geometryjumplite}"
ANDROID_HOST="${ANDROID_HOST:-127.0.0.1}"
ANDROID_PORT="${ANDROID_PORT:-5555}"

echo "[GDLite] Starting Android web server..."
web-server &

echo "[GDLite] Starting Android runtime..."
entrypoint.sh &

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
  echo "[GDLite] Keeping the web server alive for diagnostics."
  wait
fi

if [ -f "${APK_PATH}" ]; then
  echo "[GDLite] Installing supplied APK: ${APK_PATH}"
  adb install -r "${APK_PATH}"

  echo "[GDLite] Launching ${ANDROID_PACKAGE}"
  adb shell am force-stop "${ANDROID_PACKAGE}" || true
  adb shell monkey -p "${ANDROID_PACKAGE}" 1 >/dev/null || {
    echo "[GDLite] APK installed, but Android could not launch ${ANDROID_PACKAGE}."
    echo "[GDLite] Set ANDROID_PACKAGE to the package name contained in your APK."
  }
else
  echo "[GDLite] No APK found at ${APK_PATH}."
  echo "[GDLite] Android is running, but GDLite was not installed."
  echo "[GDLite] Provide an authorized APK at ${APK_PATH} for beta testing."
fi

echo "[GDLite] Backend ready. Web UI is exposed on port ${PORT:-6080}."
wait
