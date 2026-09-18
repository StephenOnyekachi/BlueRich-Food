
import { Bell, Menu, UserCircle } from "lucide-react";

function AdminNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={23} />
      </button>

      {/* Mobile logo */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
          B
        </div>

        <span className="text-sm font-bold text-slate-900">
          BLUERICH
        </span>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {/* Notification */}
        <button className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
        </button>

        {/* Admin */}
        <button className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-slate-100">
          <UserCircle size={28} className="text-slate-500" />

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              Restaurant Admin
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;
