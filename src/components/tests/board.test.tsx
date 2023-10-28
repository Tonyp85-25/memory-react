import { render, screen } from "@testing-library/react";
import Board, { numberOfCards } from "../Board";

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
