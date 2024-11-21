import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="container mx-auto py-3">
      <Outlet />
    </div>
  );
}

export default App;
