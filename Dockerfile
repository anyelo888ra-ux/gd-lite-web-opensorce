FROM budtmo/docker-android:emulator_11.0

# Web/noVNC and ADB
EXPOSE 6080 5555

# docker-android uses EMULATOR_DEVICE for the device profile and WEB_VNC
# to expose the browser-based VNC interface.
ENV PORT=6080
ENV EMULATOR_DEVICE="Samsung Galaxy S6"
ENV WEB_VNC=true
ENV KVM=false

# Keep the upstream startup sequence intact:
# web-server runs in the background and entrypoint.sh remains the
# foreground process that keeps the Android container alive.
CMD ["/bin/bash", "-c", "web-server & exec entrypoint.sh"]
