import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

// Creating a test suite
describe("Greeting Component", () => {
  // Writing our test
  // A - Arrange (Setup test data, test conditions and env)
  // A - Act (Run logic that should be tested)
  // A - Assert (Compare execution results with expected results)
  test("renders Hello World as a text", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ... nothing

    // Assert
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("button not clicked yet, It's good to see you on screen", () => {
    render(<Greeting></Greeting>);
    const text = screen.getByText("It is good to see you", { exact: false });
    expect(text).toBeInTheDocument();
  });

  test("button clicked. Changed on screen", () => {
    render(<Greeting></Greeting>);

    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const text = screen.getByText("Changed");
    expect(text).toBeInTheDocument();
  });

  test("button clicked, It is good to see you text removed from screen", () => {
    render(<Greeting />);

    const buttonElement = screen.getByText("Change text");
    userEvent.click(buttonElement);

    // !getByText() throws error if element is not found, hence using queryByText
    const text = screen.queryByText("It is good to see you");
    expect(text).toBeNull();
  });
});
