import Async from "./Async";
import { render, screen } from "@testing-library/react";

describe("Async component", () => {
  // Testing sideeffects after elements are rendered
  test("renders posts if request succeeds", async () => {
    // Mocking outgoing requests by overwriting the default fetch function with our custom mock function
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First product" }],
    });

    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem", {}, {});
    expect(listItemElements).not.toHaveLength(0);
  });
});
