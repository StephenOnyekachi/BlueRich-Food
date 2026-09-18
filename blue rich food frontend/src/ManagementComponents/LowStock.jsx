
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Package,
  Edit3,
  ArrowLeft,
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminHeader from "./AdminHeader";
import StatCard from "./StatCard";
import SideMenu from "./SideMenu";

import menuData from "../MyData/menuData";

function LowStock() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Low stock limit
  const LOW_STOCK_LIMIT = 10;

  useEffect(() => {
    const savedMenu =
      JSON.parse(localStorage.getItem("menuData")) || menuData;

    setItems(savedMenu);
  }, []);

  // Find low-stock items
  const lowStockItems = items.filter(
    (item) =>
      Number(item.quantity) <= LOW_STOCK_LIMIT &&
      Number(item.quantity) > 0
  );

  // Find completely sold-out items
  const soldOutItems = items.filter(
    (item) =>
      Number(item.quantity) === 0 ||
      item.available === false
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <SideMenu
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Admin Navbar */}
        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <AdminHeader
            title="Low Stock"
            description="Monitor menu items that are running low on stock."
          />

          {/* Summary Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Low Stock */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <AlertTriangle size={24} />
                </div>

                <div>
                  <p className="text-sm font-medium text-orange-700">
                    Low Stock Items
                  </p>

                  <p className="mt-1 text-2xl font-bold text-orange-900">
                    {lowStockItems.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Sold Out */}
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Package size={24} />
                </div>

                <div>
                  <p className="text-sm font-medium text-red-700">
                    Sold Out
                  </p>

                  <p className="mt-1 text-2xl font-bold text-red-900">
                    {soldOutItems.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Low Stock Section */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-bold text-slate-950">
                  Items Running Low
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Items with 10 or fewer units remaining.
                </p>
              </div>

              <Link
                to="/dashboard"
                className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>
            </div>

            {/* Desktop Table */}
            <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-slate-200 md:block">
              <table className="w-full text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Item
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Price
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Quantity
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {lowStockItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                            <Package size={26} />
                          </div>

                          <p className="mt-4 font-semibold text-slate-900">
                            Stock levels look good
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            No items are currently running low.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    lowStockItems.map((item) => (
                      <tr
                        key={item.id}
                        className="transition hover:bg-slate-50"
                      >
                        {/* Item */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-12 rounded-xl object-cover"
                            />

                            <div>
                              <p className="font-semibold text-slate-900">
                                {item.name}
                              </p>

                              <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {item.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 font-semibold text-slate-900">
                          ₦{Number(item.price).toLocaleString()}
                        </td>

                        {/* Quantity */}
                        <td className="px-6 py-4">
                          <span
                            className={`font-bold ${
                              item.quantity <= 3
                                ? "text-red-600"
                                : "text-orange-600"
                            }`}
                          >
                            {item.quantity}
                          </span>

                          <span className="ml-1 text-xs text-slate-400">
                            left
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                            Low Stock
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">
                          <div className="flex justify-end">
                            <Link
                              to={`/edititem/${item.id}`}
                              className="flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                            >
                              <Edit3 size={15} />
                              Update Stock
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="mt-5 space-y-4 md:hidden">
              {lowStockItems.length === 0 ? (
                <div className="rounded-2xl border border-green-100 bg-green-50 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-green-600">
                    <Package size={26} />
                  </div>

                  <p className="mt-4 font-semibold text-slate-900">
                    Stock levels look good
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    No items are currently running low.
                  </p>
                </div>
              ) : (
                lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    {/* Item */}
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-slate-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Information */}
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-xs text-slate-400">
                          Price
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          ₦{Number(item.price).toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Quantity Left
                        </p>

                        <p
                          className={`mt-1 text-sm font-bold ${
                            item.quantity <= 3
                              ? "text-red-600"
                              : "text-orange-600"
                          }`}
                        >
                          {item.quantity} left
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mt-3">
                      <span className="inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                        Low Stock
                      </span>
                    </div>

                    {/* Update Button */}
                    <Link
                      to={`/edititem/${item.id}`}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <Edit3 size={16} />
                      Update Stock
                    </Link>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default LowStock;
