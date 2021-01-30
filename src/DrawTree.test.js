import { render, screen, fireEvent } from "@testing-library/react";
import DrawTree from "./DrawTree";

jest.mock("./useD3Zoom", () => ({
  __esModule: true,
  default: (_) => ({ x: 0, y: 0, k: 1 }),
}));

describe("the DrawTree component", () => {
  it("renders", () => {
    render(<DrawTree />);
    const d3Tree = screen.getByTestId("d3-tree-svg");
    expect(d3Tree).toBeInTheDocument();
  });

  it("adds nodes", () => {
    render(<DrawTree />);
    expect(screen.getAllByText("Add").length).toEqual(1);
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getAllByText("Add").length).toEqual(2);
  });

  it("edits the root node", () => {
    render(<DrawTree />);
    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByLabelText(/name/i, { selector: "input" }), {
      target: { value: "Testing my node" },
    });
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("Testing my node")).toBeInTheDocument();
  });

  it("deletes leaf nodes", () => {
    render(<DrawTree />);
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getAllByText("Add").length).toEqual(2);
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getAllByText("Add").length).toEqual(1);
  });

  it("deletes subtrees", () => {
    render(<DrawTree />);
    fireEvent.click(screen.getByText("Add"));
    const secondAddBtn = screen.getByTestId("add-btn-1");
    fireEvent.click(secondAddBtn);
    fireEvent.click(secondAddBtn);
    fireEvent.click(secondAddBtn);
    expect(screen.getAllByText("Add").length).toEqual(5);
    fireEvent.click(screen.getByTestId("delete-btn-1"));
    expect(screen.getAllByText("Add").length).toEqual(1);
  });
});
