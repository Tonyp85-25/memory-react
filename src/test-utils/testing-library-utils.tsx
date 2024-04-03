import { type RenderOptions, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import type { ReactElement, ReactNode } from "react";
import { GameProvider } from "../contexts/GameContext";
import type { Difficulty } from "../types";

export const testFn = (cards: unknown[]) => cards;

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
	ui: ReactNode,
	difficulty: Difficulty,
	options?: RenderOptions,
) => {
	if (difficulty === "easy") {
		return render(ui, { wrapper: EasyGameProvider, ...options });
	}
	return render(ui, { wrapper: HardGameProvider, ...options });
};

export * from "@testing-library/react";
export { renderWithContext as render };
