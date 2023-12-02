import { NavLink } from "react-router-dom";

export const Logo = () => {
  return (
    <div className="logo">
      <NavLink className="logo-link" to="/">
        Home
      </NavLink>
    </div>
  );
};
