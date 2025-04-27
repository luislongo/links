import { v4 as uuidv4 } from "uuid";

export class LocalStorageEvents {
  uuid: string;
  windowRegister: string[] = [];
  windowsSize: Record<string, { width: number; height: number }> = {};
  windowPosition: Record<string, { x: number; y: number }> = {};

  constructor(onUpdate: (windowRegister: string[]) => void) {
    this.uuid = uuidv4();
    this.registerWindow();

    window.addEventListener("beforeunload", () => {
      this.unRegisterWindow();
    });

    window.addEventListener("resize", () => {
      localStorage.setItem(
        `windowSize_${this.uuid}`,
        JSON.stringify({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );

      localStorage.setItem(
        `windowPosition_${this.uuid}`,
        JSON.stringify({
          x: window.screenX,
          y: window.screenY,
        })
      );
    });

    setInterval(() => {
      localStorage.setItem(
        `windowPosition_${this.uuid}`,
        JSON.stringify({
          x: window.screenX,
          y: window.screenY,
        })
      );

      this.update();
      onUpdate(this.windowRegister);
    }, 1000 / 60);
  }

  registerWindow() {
    const existentWindowRegister = localStorage.getItem("windowRegister");

    if (!existentWindowRegister) {
      localStorage.setItem("windowRegister", JSON.stringify([this.uuid]));
      return;
    }

    const existentWindowRegisterParsed = JSON.parse(existentWindowRegister);
    existentWindowRegisterParsed.push(this.uuid);
    localStorage.setItem(
      "windowRegister",
      JSON.stringify(existentWindowRegisterParsed)
    );

    localStorage.setItem(
      `windowSize_${this.uuid}`,
      JSON.stringify({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );

    localStorage.setItem(
      `windowPosition_${this.uuid}`,
      JSON.stringify({
        x: window.screenX,
        y: window.screenY,
      })
    );
  }

  unRegisterWindow() {
    const existentWindowRegister = localStorage.getItem("windowRegister");

    if (!existentWindowRegister) {
      return;
    }

    const existentWindowRegisterParsed = JSON.parse(existentWindowRegister);
    const newWindowRegister = existentWindowRegisterParsed.filter(
      (uuid: string) => uuid !== this.uuid
    );
    localStorage.setItem("windowRegister", JSON.stringify(newWindowRegister));
  }

  update() {
    const existentWindowRegister = localStorage.getItem("windowRegister");

    if (!existentWindowRegister) {
      this.windowRegister = [];
      return;
    }

    const existentWindowRegisterParsed = JSON.parse(existentWindowRegister);
    this.windowRegister = existentWindowRegisterParsed;

    existentWindowRegisterParsed.forEach((uuid: string) => {
      const windowSize = localStorage.getItem(`windowSize_${uuid}`);
      if (windowSize) {
        this.windowsSize[uuid] = JSON.parse(windowSize);
      }
    });

    existentWindowRegisterParsed.forEach((uuid: string) => {
      const windowPosition = localStorage.getItem(`windowPosition_${uuid}`);
      if (windowPosition) {
        this.windowPosition[uuid] = JSON.parse(windowPosition);
      }
    });
  }
}
