import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
const Root = () => {
  return (
    <div className="container mx-auto py-3">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
