import { fireEvent, render, screen } from "@testing-library/react";
import Board from "../Board";
import { numberOfCards } from "../GameContext";

describe("should render board according to difficulty level", () => {
  test("should render with 28 cards in easy level", () => {
    render(<Board difficulty={"easy"} />);
    const cards = screen.getAllByRole("button");
    expect(cards).toHaveLength(numberOfCards["easy"]);
  });
  test("should render with 36 cards in hard level", () => {
    render(<Board difficulty={"hard"} />);
    const cards = screen.getAllByRole("button");
    expect(cards).toHaveLength(numberOfCards["hard"]);
  });
});

describe("testing actions according to time", () => {
  test("should be unplayable when time is up", () => {
    render(<Board difficulty={"easy"} />);
    const cards = screen.getAllByRole("button");
    fireEvent.click(cards[0]);
    expect(cards[0]).not.toHaveClass("image");
  });

  test("should be playable during game time", () => {
    render(<Board difficulty={"hard"} />);
    const cards = screen.getAllByRole("button");

    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveClass("card image");
  });
});
