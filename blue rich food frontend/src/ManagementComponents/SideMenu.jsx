
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Utensils,
  Plus,
  LogOut,
  AlertTriangle,
  X,
  Home,
  QrCode
} from "lucide-react";

function SideMenu({ isOpen, onClose }) {
  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Item",
      path: "/additem",
      icon: Plus,
    },
    {
      name: "Low-stock indicator",
      path: "/lowstock",
      icon: AlertTriangle,
    },
    {
      name: "Sales Overview",
      path: "/salesoverview",
      icon: Utensils,
    },
    {
      name: "QR Code",
      path: "/qrcode",
      icon: QrCode,
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
            fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-slate-950 
            text-white transition-transform duration-300 lg:translate-x-0 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-bold text-slate-950">
              B
            </div>

            <div>
              <p className="font-bold leading-none">
                BLUERICH
              </p>

              <span className="text-[10px] text-slate-400">
                ADMIN PANEL
              </span>
            </div>
          </div>

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3 py-6">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
          </p>

          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-3">
          <NavLink
            to="/"
            className="
              flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium 
              text-slate-400 transition hover:bg-white/10 hover:text-white
            "
          >
            <Home size={19} />
            View Website
          </NavLink>

          {/* <button
            className="
              mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm 
              font-medium text-red-400 transition hover:bg-red-500/10
            "
          >
            <LogOut size={19} />
            Logout
          </button> */}
          
          <NavLink
            to="/login"
            className="
              mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium 
              text-red-400 transition hover:bg-red-500/10
            "
          >
            <LogOut size={19} />
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default SideMenu;
