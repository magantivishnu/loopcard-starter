import '@testing-library/jest-dom/vitest'

class LocalStorageMock {
  private store: Record<string, string> = {}
  clear() { this.store = {} }
  getItem(key: string) { return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null }
  setItem(key: string, value: string) { this.store[key] = String(value) }
  removeItem(key: string) { delete this.store[key] }
}

if (!('localStorage' in globalThis)) {
  // @ts-expect-error runtime attach
  globalThis.localStorage = new LocalStorageMock()
}
