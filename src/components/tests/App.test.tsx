import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { GAME_DURATION } from "../Timer";

describe("should render board according to difficulty level", () => {
  test("should render home page correctly", async () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
  test("should render easy game when easy link is clicked", async () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/Easy/, { selector: "a" }));
    expect(screen.getByText(/Difficulty: easy/i)).toBeInTheDocument();
  });

  test("should render hard game when hard link is clicked", async () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/Hard/, { selector: "a" }));
    expect(screen.getByText(/Difficulty: hard/i)).toBeInTheDocument();
  });
});

describe("testing actions according to time", () => {
  beforeEach(() => {
    vi.useFakeTimers({ advanceTimeDelta: 100, shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });
  test("should be unplayable when time is up", async () => {
    const { container } = render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/Easy/, { selector: "a" }));
    act(() => {
      vi.advanceTimersByTime(GAME_DURATION.easy);
    });

    const cards = container.querySelectorAll(".card");
    await user.click(cards[0]);
    expect(cards[0]).not.toHaveClass("image");
  });

  test("should be playable during game time", async () => {
    const { container } = render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/Hard/, { selector: "a" }));
    act(() => {
      vi.advanceTimersByTime(GAME_DURATION.easy / 2);
    });

    const cards = container.querySelectorAll(".card");
    await act(async () => {
      await user.click(cards[0]);
    });
    expect(cards[0]).toHaveClass("card image");
  });
});
