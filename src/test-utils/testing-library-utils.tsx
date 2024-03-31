import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { GameProvider } from "../contexts/GameContext";
import type { Difficulty } from "../types";
import { SnackbarProvider } from "notistack";

const testFn = (cards: unknown[]) => cards;

const EasyGameProvider = ({ children }: { children: ReactElement }) => {
  return (
    <SnackbarProvider>
      <GameProvider options={{ difficulty: "easy", shuffle: testFn }}>
        {children}
      </GameProvider>
    </SnackbarProvider>
  );
};

const HardGameProvider = ({ children }: { children: ReactElement }) => {
  return (
    <SnackbarProvider>
      <GameProvider options={{ difficulty: "hard", shuffle: testFn }}>
        {children}
      </GameProvider>
    </SnackbarProvider>
  );
};
const renderWithContext = (
  ui: ReactElement,
  difficulty: Difficulty,
  options?: RenderOptions
) => {
  if (difficulty === "easy") {
    return render(ui, { wrapper: EasyGameProvider, ...options });
  }
  return render(ui, { wrapper: HardGameProvider, ...options });
};

export * from "@testing-library/react";
export { renderWithContext as render };
