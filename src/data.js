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
];

export const getPosition = (pArray, value) => {
  let index = pArray.indexOf(value);
  return "0px " + index * 100 + "px";
};

export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
