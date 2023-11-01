import {
  act,
  fireEvent,
  render,
  screen,
} from "../../test-utils/testing-library-utils";
import Board from "../Board";
import { numberOfCards } from "../../contexts/GameContext";
import { GAME_DURATION } from "../Timer";

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("should render board according to difficulty level", () => {
  test("should render with 28 cards in easy level", () => {
    render(<Board difficulty={"easy"} />, "easy");
    const cards = screen.getAllByRole("button");
    expect(cards).toHaveLength(numberOfCards["easy"]);
  });
  test("should render with 36 cards in hard level", () => {
    render(<Board difficulty={"hard"} />, "hard");
    const cards = screen.getAllByRole("button");
    expect(cards).toHaveLength(numberOfCards["hard"]);
  });
});

describe("testing actions according to time", () => {
  test("should be unplayable when time is up", async () => {
    render(<Board difficulty={"easy"} />, "easy");
    act(() => jest.advanceTimersByTime(GAME_DURATION["easy"]));
    const cards = await screen.findAllByRole("button");
    fireEvent.click(cards[0]);
    expect(cards[0]).not.toHaveClass("image");
  });

  test("should be playable during game time", async () => {
    render(<Board difficulty={"hard"} />, "hard");
    act(() => jest.advanceTimersByTime(GAME_DURATION["easy"] / 2));
    const cards = await screen.findAllByRole("button");
    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveClass("card image");
  });
});
