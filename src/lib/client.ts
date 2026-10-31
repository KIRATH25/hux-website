import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

/**
 * A value that only exists in the browser (user agent, page address, "has the page loaded").
 * The server render and the first client render use `serverValue`, so there is no hydration mismatch;
 * React then switches to the browser value.
 */
export function useBrowserValue<T>(read: () => T, serverValue: T): T {
  return useSyncExternalStore(noSubscribe, read, () => serverValue);
}
