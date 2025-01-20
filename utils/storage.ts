export type StorageType = {
  length: number;
  getItem: (name: string) => void;
  setItem: (name: string, value: any) => void;
  removeItem: (name: string) => void;
  clear: () => void;
};

const storageMock: StorageType = {
  length: 0,
  getItem() {},
  setItem() {},
  removeItem() {},
  clear() {},
};

class NamespacedLocalStorage {
  private localStorage: StorageType;
  private key: string;

  constructor(localStorage: any, key: string) {
    this.localStorage = localStorage;
    this.key = key;
  }
  _makeKey(key: string) {
    return `${this.key}__${key}`;
  }

  getItem(name: string) {
    return this.localStorage.getItem(this._makeKey(name));
  }

  setItem(name: string, value: any) {
    return this.localStorage.setItem(this._makeKey(name), value);
  }

  removeItem(name: string) {
    return this.localStorage.removeItem(this._makeKey(name));
  }

  clear() {
    return this.localStorage.clear();
  }
}

class BrowserPersistence {
  private KEY: string = "BROWSER_PERSISTENCE";
  private storage: any = null;

  constructor(localStorage = window.localStorage || storageMock) {
    this.storage = new NamespacedLocalStorage(localStorage, this.KEY);
  }
  getRawItem(name: string) {
    return this.storage.getItem(name);
  }
  getItem(name: string) {
    const now = Date.now();
    const item = this.storage.getItem(name);
    if (!item) {
      return undefined;
    }
    const { value, ttl, timeStored } = JSON.parse(item);

    if (ttl && now - timeStored > ttl * 1000) {
      this.storage.removeItem(name);
      return undefined;
    }

    return JSON.parse(value);
  }

  setItem(name: string, value: any, ttl: number) {
    const timeStored = Date.now();
    this.storage.setItem(
      name,
      JSON.stringify({
        value: JSON.stringify(value),
        timeStored,
        ttl,
      })
    );
  }
  removeItem(name: string) {
    this.storage.removeItem(name);
  }

  clear() {
    this.storage.clear();
  }
}

export const storage = new BrowserPersistence();
