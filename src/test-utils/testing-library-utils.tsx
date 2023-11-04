import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { GameProvider } from "../contexts/GameContext";
import { Difficulty } from "../types";
import { SnackbarProvider } from "notistack";

const EasyGameProvider = ({ children }: { children: ReactElement }) => (
  <SnackbarProvider>
    <GameProvider difficulty={"easy"}>{children}</GameProvider>
  </SnackbarProvider>
);

const HardGameProvider = ({ children }: { children: ReactElement }) => (
  <SnackbarProvider>
    <GameProvider difficulty={"hard"}>{children}</GameProvider>
  </SnackbarProvider>
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
