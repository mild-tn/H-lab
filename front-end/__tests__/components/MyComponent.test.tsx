import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MyComponent } from "../../src/components/MyComponent";
import { onValue } from "firebase/database";

// Mock Firebase functions
jest.mock("firebase/database", () => ({
  getDatabase: jest.fn(),
  onValue: jest.fn((dbRef, callback) => {
    callback({ val: () => "Hello, World!" });
  }),
  ref: jest.fn(),
}));

describe("MyComponent", () => {
  it("should display loading text", () => {
    (onValue as jest.Mock).mockImplementationOnce((dbRef, callback) => {
      callback({ val: () => null });
    });
    render(<MyComponent />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display data from the database", async () => {
    render(<MyComponent />);

    await waitFor(() => {
      expect(screen.getByText("Hello, World!")).toBeInTheDocument();
    });
  });
});
