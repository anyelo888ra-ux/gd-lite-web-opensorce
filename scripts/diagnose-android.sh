#!/bin/sh
set -u

echo "=== GDLite Android diagnostics ==="
echo "date: $(date)"
echo "user: $(id 2>/dev/null || true)"
echo

echo "--- environment ---"
printf 'PORT=%s\n' "${PORT:-}"
printf 'EMULATOR_DEVICE=%s\n' "${EMULATOR_DEVICE:-}"
printf 'KVM=%s\n' "${KVM:-}"
printf 'WEB_VNC=%s\n' "${WEB_VNC:-}"
printf 'ANDROID_PACKAGE=%s\n' "${ANDROID_PACKAGE:-}"
echo

echo "--- virtualization ---"
if [ -e /dev/kvm ]; then
  echo "/dev/kvm: present"
  ls -l /dev/kvm 2>/dev/null || true
else
  echo "/dev/kvm: not present (software emulation may be required)"
fi

echo
echo "--- processes ---"
ps aux 2>/dev/null | grep -E 'entrypoint|web-server|emulator|qemu|novnc' | grep -v grep || true

echo
echo "--- adb devices ---"
if command -v adb >/dev/null 2>&1; then
  adb devices -l || true
else
  echo "adb: command not found"
fi

echo
echo "--- listening ports ---"
if command -v ss >/dev/null 2>&1; then
  ss -lntp 2>/dev/null || true
elif command -v netstat >/dev/null 2>&1; then
  netstat -lntp 2>/dev/null || true
else
  echo "ss/netstat not available"
fi

echo
echo "--- web-server ---"
if command -v web-server >/dev/null 2>&1; then
  echo "web-server: available"
else
  echo "web-server: NOT FOUND"
fi

echo
echo "=== end diagnostics ==="
