interface CartItem {
  readonly id: number;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

export const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem("zaiste");
  if (!itemsFromLocalStorage) {
    return [];
  }
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    // zakladamy !!! ze items jest poprawne
    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("zaiste", JSON.stringify(cartItems));
};
