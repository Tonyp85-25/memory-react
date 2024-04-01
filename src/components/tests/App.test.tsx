import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("should render board according to difficulty level", () => {
  test("should render home page correctly", async () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });
  test("should render easy game when easy link is clicked", async () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/Easy/, { selector: "a" }));
    expect(screen.getByText(/Difficulty: easy/i)).toBeInTheDocument();
  });

  test("should render hard game when hard link is clicked", async () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByText(/Hard/, { selector: "a" }));
    expect(screen.getByText(/Difficulty: hard/i)).toBeInTheDocument();
  });
});
