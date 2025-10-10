import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import WowNews from "../pages/wow-news";

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        items: [
          {
            id: "1",
            title: "T1",
            summary: "S1",
            date: new Date().toISOString(),
            url: "#",
          },
        ],
      }),
  }),
);

describe("WowNews UI", () => {
  test("renders title and fetched item", async () => {
    render(<WowNews />);
    expect(screen.getByText(/WoW News/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("T1")).toBeInTheDocument());
  });
});
