FROM budtmo/docker-android:emulator_11.0

# Web/noVNC and ADB
EXPOSE 6080 5555

ENV PORT=6080
ENV KVM=false
ENV DEVICE="Samsung Galaxy S6"
ENV APK_PATH="/scripts/gd-lite.apk"
ENV ANDROID_PACKAGE="com.robtopx.geometryjumplite"

# The APK is supplied separately and is not distributed by this repository.
COPY scripts/start-gdlite.sh /scripts/start-gdlite.sh
RUN chmod +x /scripts/start-gdlite.sh

# Start Android, expose noVNC, then install/launch the supplied APK when present.
CMD ["/scripts/start-gdlite.sh"]
