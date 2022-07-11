import { CartBar } from "./Cart/CartBar";

export const Header = () => {
  return (
    <div className="navbar flex justify-between bg-blue-100">
      <div>
        <a className="btn btn-ghost normal-case text-xl">[zP]</a>
      </div>
      <CartBar />
    </div>
  );
};
