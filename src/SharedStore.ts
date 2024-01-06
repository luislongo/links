import { v4 as uuidv4 } from "uuid";
import { getObjectFromItem, setObjectToItem } from "./StorageMutations";

export class SharedStore {
  session: Session | undefined = undefined;
  sessions: Session[] = [];
  callback: (() => void) | undefined = undefined;

  public registerSession = () => {
    const sessionHash = uuidv4();
    this.session = new Session(sessionHash);

    const currentSessions = getObjectFromItem<string[]>("sessions") || [];
    setObjectToItem("sessions", [...currentSessions, sessionHash]);

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
    this.callback?.();
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
}

export const sharedStore = new SharedStore();
