import { getPosition, shuffle } from "./helpers";
import { fruits } from "./types";

test("array is shuffled", () => {
	const array = [1, 2, 3, 4];
	const copyArray = [...array];
	expect(shuffle(array)).not.toEqual(copyArray);
});

test("fruit position is correct", () => {
	expect(getPosition(fruits, "apple")).toBe("0px 0px");
	expect(getPosition(fruits, "apricot")).toBe("0px -500px");
	expect(getPosition(fruits, "banana")).toBe("0px -100px");
	expect(getPosition(fruits, "green-apple")).toBe("0px -800px");
});
