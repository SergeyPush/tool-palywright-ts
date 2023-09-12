export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      validateJson(a: any): R;
    }
  }
}
