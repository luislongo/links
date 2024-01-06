import { v4 as uuidv4 } from "uuid";
import { getObjectFromItem, setObjectToItem } from "./StorageMutations";

export class SharedStore {
  session: Session | undefined = undefined;
  sessions: Session[] = [];
  callback: (() => void) | undefined = undefined;
  tick: number = 0;

  public registerSession = () => {
    const sessionHash = uuidv4();
    this.session = new Session(sessionHash);

    const currentSessions = getObjectFromItem<string[]>("sessions") || [];
    setObjectToItem("sessions", [...currentSessions, sessionHash]);

    if (currentSessions.length === 0) {
      setObjectToItem("masterSession", sessionHash);
    }

    this.sessions =
      getObjectFromItem<string[]>("sessions")?.map((s) => new Session(s)) || [];

    return this.session;
  };

  public unregisterSession = () => {
    console.log("unregistering session", this.session);
    if (this.session) {
      console.log("unregistering session");
      const sessionHash = this.session.sessionHash;
      const currentSessions = getObjectFromItem<string[]>("sessions") || [];
      setObjectToItem(
        "sessions",
        currentSessions.filter((s) => s !== sessionHash)
      );

      const masterSession = getObjectFromItem<string>("masterSession");
      if (masterSession === sessionHash) {
        setObjectToItem(
          "masterSession",
          currentSessions.filter((s) => s !== sessionHash)[0]
        );
      }

      localStorage.removeItem(`session-${this.session?.sessionHash}-height`);
      localStorage.removeItem(`session-${this.session?.sessionHash}-width`);
      localStorage.removeItem(`session-${this.session?.sessionHash}-x`);
      localStorage.removeItem(`session-${this.session?.sessionHash}-y`);
    }

    this.session = undefined;
    this.sessions =
      getObjectFromItem<string[]>("sessions")?.map((s) => new Session(s)) || [];
  };

  public addOnChangeCallback = (callback: () => void) => {
    this.callback = callback;

    window.addEventListener("storage", () => {
      this.updateValues();
    });
  };

  public updateValues = () => {
    this.sessions = (getObjectFromItem<string[]>("sessions") || []).map(
      (s) => new Session(s)
    );
    this.tick = getObjectFromItem<number>("tick") || 0;
    this.callback?.();
  };

  public incrementTick = () => {
    const tick = getObjectFromItem<number>("tick") || 0;
    setObjectToItem("tick", tick + 1);
    this.tick = tick + 1;
  };
}

export class Session {
  sessionHash: string | undefined = undefined;

  constructor(sessionHash: string) {
    this.sessionHash = sessionHash;
  }

  public set height(height: number) {
    setObjectToItem(`session-${this.sessionHash}-height`, height);
  }

  public get height() {
    return getObjectFromItem<number>(`session-${this.sessionHash}-height`) || 0;
  }

  public set width(width: number) {
    setObjectToItem(`session-${this.sessionHash}-width`, width);
  }

  public get width() {
    return getObjectFromItem<number>(`session-${this.sessionHash}-width`) || 0;
  }

  public set x(x: number) {
    setObjectToItem(`session-${this.sessionHash}-x`, x);
  }

  public get x() {
    return getObjectFromItem<number>(`session-${this.sessionHash}-x`) || 0;
  }

  public set y(y: number) {
    setObjectToItem(`session-${this.sessionHash}-y`, y);
  }

  public get y() {
    return getObjectFromItem<number>(`session-${this.sessionHash}-y`) || 0;
  }

  public get isMasterSession() {
    const masterSession = getObjectFromItem<string>("masterSession");
    return masterSession === this.sessionHash;
  }
}

export const sharedStore = new SharedStore();
