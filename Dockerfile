FROM budtmo/docker-android:emulator_11.0

# Web/noVNC and ADB
EXPOSE 6080 5555

ENV PORT=6080
ENV KVM=false
ENV DEVICE="Samsung Galaxy S6"
ENV APK_PATH="/scripts/gd-lite.apk"
ENV ANDROID_PACKAGE="com.robtopx.geometryjumplite"

# The APK is supplied separately and is not distributed by this repository.
# Run it explicitly with bash because the base image does not allow chmod here.
COPY scripts/start-gdlite.sh /scripts/start-gdlite.sh

# Start Android, expose noVNC, then install/launch the supplied APK when present.
CMD ["/bin/bash", "/scripts/start-gdlite.sh"]
