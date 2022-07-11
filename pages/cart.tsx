import { useCartState } from "../components/Cart/CartContext";

const CartContent = () => {
  const cartState = useCartState();

  return (
    <ul className="divide-y divide-gray-200">
      {cartState.items.map((item, index) => (
        // samego index nie powinno sie stosowac, wiec zrobilismy unikalny key
        <li key={`${item.title}_${index}`} className="flex justify-between p-3">
          <div>
            {item.count} x {item.title}
          </div>
          <div className="flex ">
            <div className="my-auto font-bold"> {item.price}$</div>
            <div className="pl-3 my-auto text-red-500">
              <button
                onClick={() => {
                  cartState.removeItemFromCart(item.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const CartSummary = () => {
  const cartState = useCartState();
  return <div> Summary: {cartState.items.length}</div>;
};

const CartPage = () => {
  const cartState = useCartState();

  return (
    <>
      <div className="container p-3 mx-auto">
        <div className="flex flex-wrap mb-8 -mx-2">
          <div className="w-full px-2 mb-4 md:w-1/3 md:max-w-md">
            <div className="grid items-center p-3 text-sm border min-h-12 text-grey-dark">
              <CartSummary />
            </div>
          </div>
          <div className="w-full px-2 mb-4 md:w-2/3">
            <div className="p-3 text-sm border min-h-12 text-grey-dark">
              <CartContent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
