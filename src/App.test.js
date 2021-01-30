import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./useD3Zoom", () => ({
  __esModule: true,
  default: (_) => ({ x: 0, y: 0, k: 1 }),
}));

it("renders the initial form", () => {
  render(<App />);
  expect(screen.getByText("Add")).toBeInTheDocument();
});
