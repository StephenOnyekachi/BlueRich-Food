
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AdminHeader from "./AdminHeader";
import StatCard from "./StatCard";
import SideMenu from "./SideMenu";

import menuData from "../MyData/menuData";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "Meals",
  image: "",
  available: true,
  quantity: 0,
};

function AddItem() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing menu items
    const savedMenu =
      JSON.parse(localStorage.getItem("menuData")) || menuData;

    // Create new menu item
    const newItem = {
      id:
        savedMenu.length > 0
          ? Math.max(...savedMenu.map((item) => item.id)) + 1
          : 1,

      name: formData.name.trim(),

      description: formData.description.trim(),

      price: Number(formData.price),

      category: formData.category,

      image: formData.image.trim(),

      available: formData.available,

      quantity: Number(formData.quantity),
    };

    // Add new item to existing menu
    const updatedMenu = [...savedMenu, newItem];

    // Save updated menu
    localStorage.setItem(
      "menuData",
      JSON.stringify(updatedMenu)
    );

    alert("Menu item added successfully!");

    // Reset form
    setFormData(initialForm);

    // Go back to dashboard
    navigate("/dashboard");
  };

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
          {/* Page Header */}
          <AdminHeader
            title="Add New Item"
            description="Add a new menu item to your restaurant."
          />

          {/* Form Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-4 sm:p-6"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Menu Item Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jollof Rice & Chicken"
                  required
                  className="
                    w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition 
                    focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                "
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the menu item..."
                  required
                  className="
                    w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none 
                    transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                "
                />
              </div>

              {/* Price + Quantity + Category */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Price (₦)
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="5500"
                    min="0"
                    required
                    className="
                        w-full rounded-xl border border-slate-200 px-4 py-3 outline-none 
                        transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                    "
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Quantity
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="50"
                    min="0"
                    required
                    className="
                        w-full rounded-xl border border-slate-200 px-4 py-3 outline-none 
                        transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                    "
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="
                        w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none 
                        transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                    "
                  >
                    <option value="Meals">Meals</option>
                    <option value="Pastries">Pastries</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Specials">Specials</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/food.jpg"
                  required
                  className="
                    w-full rounded-xl border border-slate-200 px-4 py-3 outline-none 
                    transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                  "
                />

                {/* Image Preview */}
                {formData.image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img
                      src={formData.image}
                      alt={formData.name || "Menu item preview"}
                      className="h-48 w-full object-contain sm:h-64"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <p className="mt-2 text-xs text-slate-500">
                  Enter the URL of the food image you want to use.
                </p>
              </div>

              {/* Availability */}
              <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Available
                  </p>

                  <p className="text-xs text-slate-500">
                    Customers can currently order this item.
                  </p>
                </div>
              </label>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <Link
                  to="/dashboard"
                  className="
                    w-full rounded-xl border border-slate-200 px-5 py-3 text-center text-sm 
                    font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto
                "
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="
                    w-full rounded-xl bg-slate-950 px-5 py-3 text-sm 
                    font-semibold text-white transition hover:bg-slate-800 sm:w-auto
                  "
                >
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddItem;
