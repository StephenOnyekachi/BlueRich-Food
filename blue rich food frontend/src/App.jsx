
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import AIChat from "./Components/AIChat";
import PageNotFound from "./Components/PageNotFound";

// For Manamement Components
import Login from "./ManagementComponents/Login";
import Dashboard from "./ManagementComponents/Dashboard";
import EditItem from "./ManagementComponents/EditItem";
import AddItem from "./ManagementComponents/AddItem";
import LowStock from "./ManagementComponents/LowStock";
import SalesOverview from "./ManagementComponents/SalesOverview";
import QrCode from "./ManagementComponents/QrCode";

function App() {

  const location = useLocation();

  // hide nave on all admin page
  const hideNavbarPages = ["/adminmenu","/admin"];
  // const hideNavbarPages = location.pathname.startsWith["/adminmenu","/admin"];
  const hideNavbar = hideNavbarPages.includes(location.pathname);

  return (
    <div>
      {/* {!hideNavbar && <Navbar />}sssss */}
      <Routes>
        {/* Customer */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/aichat" element={<AIChat />} />

        {/* Management Routers */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edititem/:id" element={<EditItem />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/lowstock" element={<LowStock />} />
        <Route path="/salesoverview" element={<SalesOverview />} />
        <Route path="/qrcode" element={<QrCode />} />

        {/* 404 ROUTE — KEEP THIS LAST */}
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
