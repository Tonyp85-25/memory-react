import { VALIDATION_TIME } from "../../actions";
import { NUMBER_OF_CARDS } from "../../contexts/GameContext";
import {
	act,
	fireEvent,
	render,
	screen,
} from "../../test-utils/testing-library-utils";
import Board from "../Board";
import { GAME_DURATION } from "../Timer";

beforeEach(() => {
	vi.useFakeTimers();
});
afterEach(() => {
	vi.runOnlyPendingTimers();
	vi.useRealTimers();
});

describe("should render board according to difficulty level", () => {
	test("should render with 28 cards in easy level", () => {
		render(<Board difficulty={"easy"} />, "easy");
		const cards = screen.getAllByRole("button");
		expect(cards).toHaveLength(NUMBER_OF_CARDS.easy);
	});
	test("should render with 36 cards in hard level", () => {
		render(<Board difficulty={"hard"} />, "hard");
		const cards = screen.getAllByRole("button");
		expect(cards).toHaveLength(NUMBER_OF_CARDS.hard);
	});
});

describe("testing actions according to time", () => {
	test("should be unplayable when time is up", async () => {
		render(<Board difficulty={"easy"} />, "easy");
		vi.advanceTimersByTime(GAME_DURATION.easy);
		const cards = await screen.findAllByRole("button");
		fireEvent.click(cards[0]);
		expect(cards[0]).not.toHaveClass("image");
	});

	test("should be playable during game time", async () => {
		render(<Board difficulty={"hard"} />, "hard");
		vi.advanceTimersByTime(GAME_DURATION.easy / 2);
		const cards = await screen.findAllByRole("button");
		fireEvent.click(cards[0]);
		expect(cards[0]).toHaveClass("card image");
	});
});

describe("test validation rules", () => {
	test("should turn back cards when fruits are different", async () => {
		render(<Board difficulty={"easy"} />, "easy");
		const cards = await screen.findAllByRole("button");
		fireEvent.click(cards[0]);
		act(() => {
			fireEvent.click(cards[1]);
		});
		vi.advanceTimersByTime(VALIDATION_TIME);
		expect(cards[0]).toHaveClass("card");
		expect(cards[1]).toHaveClass("card");
	});

	test("should not turn back cards when fruits are same", async () => {
		render(<Board difficulty={"easy"} />, "easy");
		const cards = await screen.findAllByRole("button");
		const sameFruitCardIndex = NUMBER_OF_CARDS.easy / 2;
		fireEvent.click(cards[0]);
		act(() => {
			fireEvent.click(cards[sameFruitCardIndex]);
		});
		vi.advanceTimersByTime(VALIDATION_TIME);
		expect(cards[0]).toHaveClass("card image");
		expect(cards[sameFruitCardIndex]).toHaveClass("card image");
	});

	test("should not play more than 2 cards at a time", async () => {
		render(<Board difficulty={"easy"} />, "easy");
		const cards = await screen.findAllByRole("button");
		fireEvent.click(cards[0]);
		fireEvent.click(cards[1]);
		fireEvent.click(cards[2]);

		expect(cards[0]).toHaveClass("card image");
		expect(cards[1]).toHaveClass("card image");
		expect(cards[2]).toHaveClass("card");
	});
});
