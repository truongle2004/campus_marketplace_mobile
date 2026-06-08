import { useEffect, useState } from "react";

import { runStartupVerification } from "@/lib/startup/verify";

export function useAppStartup() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        await runStartupVerification();
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  return { isReady };
}
