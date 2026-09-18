
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ChefHat,
  Eye,
  Package,
  Utensils,
  Trash2,
  Edit3,
  MoreVertical,
} from "lucide-react";

import AdminNavbar from "./AdminNavbar";
import AdminHeader from "./AdminHeader";
import StatCard from "./StatCard";
import SideMenu from "./SideMenu";

import menuData from "../MyData/menuData";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ONE items state
  const [items, setItems] = useState(menuData);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter items based on search and filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      item.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && item.available === true) ||
      (statusFilter === "Sold Out" && item.available === false);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ONE useEffect
  useEffect(() => {
    const savedMenu = localStorage.getItem("menuData");

    if (savedMenu) {
      setItems(JSON.parse(savedMenu));
    }
  }, []);

  // Stats use items
  const activeItems = items.filter(
    (item) => item.available !== false
  ).length;

  // Stats use items
  const unavailableItems = items.filter(
    (item) => item.available === false
  ).length;

  // Stats data
  const stats = [
    {
      title: "Total Menu Items",
      value: items.length,
      description: "All items in your menu",
      icon: Utensils,
    },
    {
      title: "Active Items",
      value: activeItems,
      description: "Currently visible to customers",
      icon: ChefHat,
    },
    {
      title: "Sold Out",
      value: unavailableItems,
      description: "Currently unavailable",
      icon: Package,
    },
    {
      title: "Menu Views",
      value: "1,248",
      description: "This month's menu views",
      icon: Eye,
    },
  ];

  // Delete item function
  const onDelete = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    const updatedItems = items.filter(
      (menuItem) => menuItem.id !== item.id
    );

    setItems(updatedItems);

    localStorage.setItem(
      "menuData",
      JSON.stringify(updatedItems)
    );

    alert("Menu item deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SideMenu
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <AdminHeader
            title="Dashboard"
            description="Here's an overview of your restaurant menu."
          />

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Welcome */}
          <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-sm font-medium text-blue-400">
              BLUERICH ADMIN
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Manage your restaurant with ease.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Add new meals, update prices, change availability and keep your
              digital menu up to date from one place.
            </p>
          </div>

          {/* Recent items */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-950">
                  Recent Menu Items
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest menu items.
                </p>
              </div>

              <NavLink
                to="/adminmenu"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Manage Menu
              </NavLink>
            </div>


            {/* Search & Filters */}
            <div className="mt-5 py-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

              {/* Search */}
              <div className="w-full lg:max-w-md">
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="All">All Categories</option>
                  <option value="Meals">Meals</option>
                  <option value="Pastries">Pastries</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Specials">Specials</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Sold Out">Sold Out</option>
                </select>

              </div>
            </div>
            
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
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
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-10 text-center text-sm text-slate-500"
                        >
                          No menu items found.
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item) => (
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
                            ₦{item.price.toLocaleString()}
                          </td>

                          {/* Quantity */}
                          <td className="px-6 py-4">
                            <span
                              className={`font-semibold ${
                                item.quantity === 0
                                  ? "text-red-600"
                                  : item.quantity <= 10
                                  ? "text-orange-600"
                                  : "text-slate-900"
                              }`}
                            >
                              {item.quantity}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                item.available
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-700"
                              }`}
                            >
                              {item.available ? "Active" : "Sold Out"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                to={`/edititem/${item.id}`}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                                title="Edit"
                              >
                                <Edit3 size={17} />
                              </Link>

                              <button
                                onClick={() => onDelete(item)}
                                className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                title="Delete"
                              >
                                <Trash2 size={17} />
                              </button>

                              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                                <MoreVertical size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile menu cards */}
              <div className="space-y-4 p-4 md:hidden">
                {filteredItems.length === 0 ? (
                  <div className="py-10 text-center text-sm text-slate-500">
                    No menu items found.
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      {/* Item information */}
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

                      {/* Price + Quantity + Status */}
                      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">

                        <div>
                          <p className="text-xs text-slate-400">
                            Price
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-900">
                            ₦{item.price.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Quantity
                          </p>

                          <p
                            className={`mt-1 text-sm font-bold ${
                              item.quantity === 0
                                ? "text-red-600"
                                : item.quantity <= 10
                                ? "text-orange-600"
                                : "text-slate-900"
                            }`}
                          >
                            {item.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">
                            Status
                          </p>

                          <span
                            className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                              item.available
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {item.available ? "Active" : "Sold Out"}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">

                        <Link
                          to={`/edititem/${item.id}`}
                          className="
                            flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 
                            px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800
                          "
                        >
                          <Edit3 size={16} />
                          Edit
                        </Link>

                        <button
                          onClick={() => onDelete(item)}
                          className="
                            flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 
                            text-sm font-semibold text-red-600 transition hover:bg-red-100
                          "
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>

                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
