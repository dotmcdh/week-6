import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCartItemsFromStorage, setCartItemsInStorage } from "./CartModels";

interface CartItem {
  readonly id: number;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: {
    item: readonly CartItem[];
  };
  // add to cart
  readonly addItemToCart: (item: CartItem) => void;
  // clear cart
  readonly removeItemFromCart: (id: CartItem["id"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // "ZAISTE_SHOPPING_CART"
  // 1. Odczytac z localstorage
  // -> jesli cos tam jest to ustawic `cartItems`
  // 2. Gdy sie cos zmieni to zapisac do localstorage

  // useEffect wywoluje sie tylko po stronie przegladarki
  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []); // tylko raz na poczatku

  useEffect(() => {
    setCartItemsInStorage(cartItems);
  }, [cartItems]); // gdy zmieni sie cart items

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart: (item) => {
          setCartItems((prevState) => {
            const existingItem = prevState.find(
              (existingIte) => existingIte.id === item.id
            );
            if (!existingItem) {
              return [...prevState, item];
            }

            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }
              return existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState) => {
            const existingItem = prevState.find(
              (existingIte) => existingIte.id === id
            );

            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((existingItem) => existingItem.id !== id);
            }

            return prevState.map((existingItem) => {
              if (existingItem.id === id) {
                return {
                  ...existingItem,
                  count: existingItem.count - 1,
                };
              }
              return existingItem;
            });
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error("You forgot CartStateContextProvider");
  }
  return cartState;
};
