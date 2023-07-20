import { initStore } from "./store";

const configureStore = () => {
  // List all the actions we will perform on the current state
  const actions = {
    // Action gets the existing state from useStore() and is supposed work on that state, modify it and return the modified state {}
    TOGGLE_FAV: (currState, prodId) => {
      const prodIndex = currState.products.findIndex((p) => p.id === prodId);
      const newFavStatus = !currState.products[prodIndex].isFavorite;
      const updatedProducts = [...currState.products];
      updatedProducts[prodIndex] = {
        ...currState.products[prodIndex],
        isFavorite: newFavStatus,
      };
      return {
        ...currState,
        products: updatedProducts,
      };
    },
  };

  const initialState = {
    products: [
      {
        id: "p1",
        title: "Red Scarf",
        description: "A pretty red scarf.",
        isFavorite: false,
      },
      {
        id: "p2",
        title: "Blue T-Shirt",
        description: "A pretty blue t-shirt.",
        isFavorite: false,
      },
      {
        id: "p3",
        title: "Green Trousers",
        description: "A pair of lightly green trousers.",
        isFavorite: false,
      },
      {
        id: "p4",
        title: "Orange Hat",
        description: "Street style! An orange hat.",
        isFavorite: false,
      },
    ],
  };

  // Initialise the product store with these configs
  initStore(actions, initialState);
};

export default configureStore;
