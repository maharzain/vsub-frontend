import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ footer }) => {
  const location = useLocation();
  
  // Check if the current path is the editor page
  const isEditorPage = location.pathname.includes("/editor");

  return (
    <div>
      {!isEditorPage && <Navbar />} {/* Conditionally render Navbar */}
      <main className={`${!footer ? "bg-darkPurple border-t border-solid border-gray-700" : "bg-primary"}`}>
        <Outlet />
      </main>
      {footer && <Footer />}
    </div>
  );
};

export default Layout;
