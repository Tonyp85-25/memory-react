export const fruits = [
  "apple",
  "banana",
  "orange",
  "lime",
  "fig",
  "apricot",
  "lemon",
  "strawberry",
  "green-apple",
  "peach",
  "grape",
  "watermellon",
  "plum",
  "pear",
] as const;

export type FruitName = (typeof fruits)[number];
export const getPosition = (pArray: typeof fruits, value: FruitName) => {
  const index = pArray.indexOf(value);
  return "0px " + index * 100 + "px";
};

export const shuffle = (a: Array<any>) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
