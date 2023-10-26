import React from "react";
import { render, screen } from "@testing-library/react";
import Timer, { GAME_DURATION } from "./timer";

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});
describe("progress bar gets filled according to difficulty level duration", () => {
  test("progress bar gets filled in one minute in easy level", async () => {
    render(<Timer difficulty={"easy"} />);
    jest.advanceTimersByTime(GAME_DURATION["easy"]);
    const progressBar = screen.getByRole("progressbar");

    expect(progressBar.getAttribute("value")).toBe("100");
  });
  test("progress bar gets filled in one minute and half in hard level", () => {
    render(<Timer difficulty={"hard"} />);
    jest.advanceTimersByTime(GAME_DURATION["hard"]);
    const progressBar = screen.getByRole("progressbar");

    expect(progressBar.getAttribute("value")).toBe("100");
  });
});
