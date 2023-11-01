import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { GameProvider } from "../contexts/GameContext";
import { Difficulty } from "../types";

const EasyGameProvider = ({ children }: { children: ReactElement }) => (
  <GameProvider difficulty={"easy"}>{children}</GameProvider>
);

const HardGameProvider = ({ children }: { children: ReactElement }) => (
  <GameProvider difficulty={"hard"}>{children}</GameProvider>
);
const renderWithContext = (
  ui: ReactElement,
  difficulty: Difficulty,
  options?: RenderOptions,
) => {
  if (difficulty === "easy") {
    return render(ui, { wrapper: EasyGameProvider, ...options });
  } else {
    return render(ui, { wrapper: HardGameProvider, ...options });
  }
};

export * from "@testing-library/react";
export { renderWithContext as render };
