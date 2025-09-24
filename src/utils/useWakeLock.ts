import { useEffect, useRef } from "react";

export default function useWakeLock() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wakeLockRef = useRef<any>(null);

    useEffect(() => {
        const isSupported = "wakeLock" in navigator;

        if (!isSupported) {
            console.warn("Wake Lock API non supportée sur ce navigateur.");
            return;
        }

        const requestWakeLock = async () => {
            try {
                // Demande le Wake Lock
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                wakeLockRef.current = await (navigator as any).wakeLock.request(
                    "screen",
                );
                console.log("✅ Wake Lock activé");

                // Si la lock est relâchée (par ex. onglet passé en arrière-plan)
                wakeLockRef.current.addEventListener("release", () => {
                    console.log("⚠️ Wake Lock relâché");
                });
            } catch (err) {
                console.error("Erreur en demandant le Wake Lock:", err);
            }
        };

        requestWakeLock();

        // Nettoyage : relâcher la wake lock quand le composant est démonté
        return () => {
            if (wakeLockRef.current) {
                wakeLockRef.current.release();
                wakeLockRef.current = null;
                console.log("🛑 Wake Lock désactivé");
            }
        };
    }, []);
}
