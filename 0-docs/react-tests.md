# Testing React apps
1. Unit Tests
2. Integration Test
3. End-to-End test

## Runing tests
We will use jest to run tests
It is installed automatically with create-react-app configs

To run tests, use the following command
> npm test

## Writing a test
We will use the AAA principle
1. A - Arrange (Setup test data, test conditions and env)
2. A - Act (Run logic that should be tested)
3. A - Assert (Compare execution results with expected results)
> In the component folder, create **Component.test.js**
```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

// Creating a test suite
describe("Greeting Component", () => {
  // Writing our test - 1
  test("renders Hello World as a text", () => {
    // 1. Arrange
    render(<Greeting />);

    // 2. Act
    // ... nothing

    // 3. Assert
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

// Writing our test - 2
  test("button not clicked yet, It's good to see you on screen", () => {
    // Arrange
    render(<Greeting></Greeting>);
    // Assert
    const text = screen.getByText("It is good to see you", { exact: false });
    expect(text).toBeInTheDocument();
  });

// Writing our test - 3
  test("button clicked. Changed on screen", () => {
    // Arrange
    render(<Greeting></Greeting>);

    //Act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    // Assert
    const text = screen.getByText("Changed");
    expect(text).toBeInTheDocument();
  });

// Writing our test - 4
  test("button clicked, It is good to see you text removed from screen", () => {
    // Arrange
    render(<Greeting />);

    // Act
    const buttonElement = screen.getByText("Change text");
    userEvent.click(buttonElement);

    // Assert
    // !getByText() throws error if element is not found, hence using queryByText
    const text = screen.queryByText("It is good to see you");
    expect(text).toBeNull();
  });
});
```

## Testing asynchronous components
```jsx
import Async from "./Async";
import { render, screen } from "@testing-library/react";

describe("Async component", () => {
  // Testing sideeffects after elements are rendered
  test("renders posts if request succeeds", async () => {
    // Arrange
    render(<Async />);
    // Assert
    // await the finding of listitems till they are rendered
    const listItemElements = await screen.findAllByRole("listitem", {}, {});
    expect(listItemElements).not.toHaveLength(0);
  });
});

```

## Mocking fetch
We should not interact with the actual back end while testing, as this can create unwanted API calls to the backend, hence we can mock the backend server
```jsx
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
```