import { NavLink } from "react-router-dom";

export const NoMatch = () => {
  return (
    <div>
      <h1>Page not found!</h1>
      <NavLink to="/home">Home</NavLink>
    </div>
  );
};
