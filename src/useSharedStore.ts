import { useState, useEffect } from "react";
import { Session, sharedStore } from "./SharedStore";

export const useSharedStore = () => {
  const [session, setSession] = useState<Session | undefined>();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    sharedStore.addOnChangeCallback(() => {
      setSession(sharedStore.session);
      setSessions(sharedStore.sessions);
      setTick(sharedStore.tick);
    });

    const session = sharedStore.registerSession();
    setSession(sharedStore.session);
    setSessions(sharedStore.sessions);

    session.height = window.innerHeight;
    session.width = window.innerWidth;
    session.x = window.screenX;
    session.y = window.screenY;

    window.addEventListener("resize", () => {
      console.log("resize");

      sharedStore.updateValues();
    });

    setInterval(() => {
      if (session.isMasterSession) {
        sharedStore.incrementTick();
      }

      session.height = window.innerHeight;
      session.width = window.innerWidth;
      session.x = window.screenX;
      session.y = window.screenY;
      sharedStore.updateValues();
    }, 1000 / 60);

    return () => {
      sharedStore.unregisterSession();
    };
  }, []);

  window.onbeforeunload = () => {
    sharedStore.unregisterSession();
  };

  return { session, sessions, tick };
};
