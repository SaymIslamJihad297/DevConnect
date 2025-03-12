import { Outlet } from "react-router-dom";
import NavBar from "./components/includes/NavBar";
import Footer from "./components/includes/Footer";

function App() {

  return (
    <div>
      {/* <NavBar /> */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
