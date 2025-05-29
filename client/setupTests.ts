import "@testing-library/jest-dom";
import "whatwg-fetch";
import { TextEncoder, TextDecoder } from "util";
import { TransformStream } from "web-streams-polyfill";

// Polyfill for TextEncoder
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof window.TextEncoder === "undefined") {
  window.TextEncoder = global.TextEncoder;
}

// Polyfill for TextDecoder
if (typeof global.TextDecoder === "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  global.TextDecoder = TextDecoder;
}
if (typeof window.TextDecoder === "undefined") {
  window.TextDecoder = global.TextDecoder;
}
if (typeof global.TransformStream === "undefined") {
  global.TransformStream = TransformStream;
}

import { server } from "./testServer";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
