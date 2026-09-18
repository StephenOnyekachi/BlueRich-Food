
import { useEffect, useState } from "react";

import AdminNavbar from "./AdminNavbar";
import AdminHeader from "./AdminHeader";
import StatCard from "./StatCard";
import SideMenu from "./SideMenu";

import {
  Banknote,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Search,
  Plus,
  X,
} from "lucide-react";

import ordersData from "../MyData/ordersData";
import menuData from "../MyData/menuData";

function SalesOverview() {
  const [orders, setOrders] = useState(ordersData);
  const [menuItems, setMenuItems] = useState(menuData);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add Sale states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [saleQuantity, setSaleQuantity] = useState("");

  // ==========================================
  // NORMALIZE OLD AND NEW ORDER DATA
  // ==========================================

  const normalizeOrders = (orders) => {
    return orders.map((order) => {
      // Old format:
      // items: {
      //   name: "Jollof Rice",
      //   quantity: 2,
      //   price: 5000
      // }

      if (
        typeof order.items === "object" &&
        order.items !== null
      ) {
        const item = order.items;

        const quantity = Number(
          item.quantity || order.quantity || 1
        );

        const price = Number(
          item.price || order.price || 0
        );

        return {
          ...order,
          items: item.name || "Unknown Item",
          quantity: quantity,
          price: price,
          total: Number(order.total) || price * quantity,
        };
      }

      // New format is already correct
      return {
        ...order,
        quantity: Number(order.quantity || 0),
        price: Number(order.price || 0),
        total: Number(order.total || 0),
      };
    });
  };

  // ==========================================
  // LOAD SAVED ORDERS AND MENU
  // ==========================================

  useEffect(() => {
    const savedOrders = localStorage.getItem("ordersData");
    const savedMenu = localStorage.getItem("menuData");

    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);

        const cleanedOrders = normalizeOrders(parsedOrders);

        setOrders(cleanedOrders);

        // Save cleaned version back to localStorage
        localStorage.setItem(
          "ordersData",
          JSON.stringify(cleanedOrders)
        );
      } catch (error) {
        console.error(
          "Error loading saved orders:",
          error
        );

        setOrders(ordersData);
      }
    }

    if (savedMenu) {
      try {
        const parsedMenu = JSON.parse(savedMenu);

        setMenuItems(parsedMenu);
      } catch (error) {
        console.error(
          "Error loading saved menu:",
          error
        );

        setMenuItems(menuData);
      }
    }
  }, []);

  // ==========================================
  // SALES CALCULATIONS
  // ==========================================

  const totalSales = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) =>
        total + Number(order.total || 0),
      0
    );

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  // ==========================================
  // SEARCH MENU ITEMS
  // ==========================================

  const filteredMenuItems = menuItems.filter((item) =>
    item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ==========================================
  // SELECT MENU ITEM
  // ==========================================

  const handleSelectItem = (item) => {
    if (
      item.available === false ||
      Number(item.quantity) <= 0
    ) {
      alert("This item is currently unavailable.");
      return;
    }

    setSelectedItem(item);
    setSearchTerm(item.name);
    setSaleQuantity("");
  };

  // ==========================================
  // CLEAR SELECTED ITEM
  // ==========================================

  const clearSelectedItem = () => {
    setSelectedItem(null);
    setSearchTerm("");
    setSaleQuantity("");
  };

  // ==========================================
  // ADD SALE
  // ==========================================

  const handleAddSale = (e) => {
    e.preventDefault();

    if (!selectedItem) {
      alert("Please select a menu item.");
      return;
    }

    const quantity = Number(saleQuantity);

    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    const availableQuantity = Number(
      selectedItem.quantity
    );

    if (quantity > availableQuantity) {
      alert(
        `Only ${availableQuantity} ${selectedItem.name} available in stock.`
      );
      return;
    }

    const price = Number(selectedItem.price);

    const total = price * quantity;

    // ==========================================
    // CREATE NEW ORDER ID
    // ==========================================

    const highestOrderId = orders.reduce(
      (highest, order) =>
        Math.max(
          highest,
          Number(order.id) || 0
        ),
      0
    );

    const newOrderId = highestOrderId + 1;

    // ==========================================
    // TODAY'S DATE
    // ==========================================

    const today = new Date()
      .toISOString()
      .split("T")[0];

    // ==========================================
    // CREATE NEW SALE
    // ==========================================

    const newOrder = {
      id: newOrderId,
      items: selectedItem.name,
      price: price,
      quantity: quantity,
      total: total,
      status: "Completed",
      date: today,
    };

    // ==========================================
    // ADD ORDER
    // ==========================================

    const updatedOrders = [
      newOrder,
      ...orders,
    ];

    // ==========================================
    // REDUCE MENU STOCK
    // ==========================================

    const updatedMenuItems = menuItems.map(
      (item) => {
        if (item.id === selectedItem.id) {
          const newQuantity =
            Number(item.quantity) - quantity;

          return {
            ...item,
            quantity: newQuantity,
            available: newQuantity > 0,
          };
        }

        return item;
      }
    );

    // ==========================================
    // UPDATE STATE
    // ==========================================

    setOrders(updatedOrders);
    setMenuItems(updatedMenuItems);

    // ==========================================
    // SAVE ORDERS
    // ==========================================

    localStorage.setItem(
      "ordersData",
      JSON.stringify(updatedOrders)
    );

    // ==========================================
    // SAVE MENU / STOCK
    // ==========================================

    localStorage.setItem(
      "menuData",
      JSON.stringify(updatedMenuItems)
    );

    // ==========================================
    // RESET FORM
    // ==========================================

    setSelectedItem(null);
    setSearchTerm("");
    setSaleQuantity("");

    alert("Sale added successfully!");
  };

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateOrderStatus = (
    orderId,
    newStatus
  ) => {
    const updatedOrders = orders.map(
      (order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
            }
          : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "ordersData",
      JSON.stringify(updatedOrders)
    );
  };

  // ==========================================
  // STATUS STYLES
  // ==========================================

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Preparing":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* SIDEBAR */}

      <SideMenu
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* MAIN CONTENT */}
      <div className="lg:pl-64">
        {/* ADMIN NAVBAR */}
        <AdminNavbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">
          
          <AdminHeader
            title="Sales Overview"
            subtitle="Manage your restaurant sales and orders."
          />

            {/* ==========================================
                STATS
            ========================================== */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* TOTAL SALES PRICE */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Total Sales Price
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-950">
                      ₦
                      {totalSales.toLocaleString()}
                    </h3>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

                    <Banknote className="h-6 w-6 text-green-600" />

                  </div>

                </div>

              </div>

              {/* TOTAL ORDERS */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Total Sales
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-950">
                      {totalOrders}
                    </h3>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">

                    <ShoppingBag className="h-6 w-6 text-blue-600" />

                  </div>

                </div>

              </div>

              {/* PENDING */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Pending Orders
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-950">
                      {pendingOrders}
                    </h3>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">

                    <Clock3 className="h-6 w-6 text-yellow-600" />

                  </div>

                </div>

              </div>

              {/* COMPLETED */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-slate-500">
                      Completed Orders
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-950">
                      {completedOrders}
                    </h3>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">

                    <CheckCircle2 className="h-6 w-6 text-green-600" />

                  </div>

                </div>

              </div>

            </div>

            {/* ==========================================
                ADD TO SALES
            ========================================== */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950">

                  <Plus className="h-5 w-5 text-white" />

                </div>

                <div>

                  <h2 className="font-bold text-slate-950">
                    Add to Sales
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add a menu item to today's sales.
                  </p>

                </div>

              </div>

              <form
                onSubmit={handleAddSale}
                className="mt-5"
              >

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

                  {/* MENU ITEM SEARCH */}

                  <div className="relative lg:col-span-6">

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Menu Item
                    </label>

                    <div className="relative">

                      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(
                            e.target.value
                          );
                          setSelectedItem(null);
                        }}
                        placeholder="Search menu items..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                      />

                      {selectedItem && (
                        <button
                          type="button"
                          onClick={
                            clearSelectedItem
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}

                    </div>

                    {/* SEARCH RESULTS */}

                    {searchTerm && !selectedItem && (
                      <div className="absolute left-0 right-0 z-30 mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                        {filteredMenuItems.length > 0 ? (
                          filteredMenuItems.map((item) => (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => handleSelectItem(item)}
                              disabled={
                                item.available === false ||
                                Number(item.quantity) <= 0
                              }
                              className={`flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left last:border-0 ${
                                item.available === false ||
                                Number(item.quantity) <= 0
                                  ? "cursor-not-allowed bg-slate-50 opacity-50"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              {/* Food Image */}
                              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>

                              {/* Food Details */}
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                  {item.name}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  ₦{Number(item.price).toLocaleString()}
                                </p>
                              </div>

                              {/* Stock */}
                              <span
                                className={`flex-shrink-0 text-xs font-semibold ${
                                  Number(item.quantity) <= 0 ||
                                  item.available === false
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {item.available === false
                                  ? "Unavailable"
                                  : `${item.quantity} left`}
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-4 text-sm text-slate-500">
                            No menu item found.
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  {/* QUANTITY */}

                  <div className="lg:col-span-3">

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      max={
                        selectedItem
                          ? Number(
                              selectedItem.quantity
                            )
                          : undefined
                      }
                      value={saleQuantity}
                      onChange={(e) =>
                        setSaleQuantity(
                          e.target.value
                        )
                      }
                      disabled={!selectedItem}
                      placeholder="Quantity"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />

                  </div>

                  {/* TOTAL */}

                  <div className="lg:col-span-3">

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Total Price
                    </label>

                    <div className="flex min-h-[46px] items-center rounded-xl bg-slate-100 px-4 text-sm font-bold text-slate-950">

                      ₦
                      {selectedItem && saleQuantity
                        ? (
                            Number(
                              selectedItem.price
                            ) *
                            Number(
                              saleQuantity
                            )
                          ).toLocaleString()
                        : "0"
                      }

                    </div>

                  </div>

                </div>

                {/* SELECTED ITEM */}

                {selectedItem && (
                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-4">
                      
                      {/* Food Image */}
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
                        <img
                          src={selectedItem.image}
                          alt={selectedItem.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Food Information */}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-bold text-slate-900">
                          {selectedItem.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          ₦{Number(selectedItem.price).toLocaleString()} per item
                        </p>

                        <p className="mt-1 text-sm font-medium text-green-600">
                          {selectedItem.quantity} left in stock
                        </p>
                      </div>

                      {/* Remove Selection */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedItem(null);
                          setSearchTerm("");
                          setSaleQuantity("");
                        }}
                        className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {!selectedItem && (
                  <button
                    type="submit"
                    disabled
                    className="mt-4 w-full rounded-xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-400 sm:w-auto"
                  >
                    Select an Item First
                  </button>
                )}

              </form>

            </section>

            {/* ==========================================
                RECENT ORDERS
            ========================================== */}

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* HEADER */}

              <div className="border-b border-slate-200 p-5">

                <h2 className="font-bold text-slate-950">
                  Recent Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View and manage recent sales.
                </p>

              </div>

              {/* ==========================================
                  DESKTOP TABLE
              ========================================== */}

              <div className="hidden overflow-x-auto lg:block">

                <table className="w-full min-w-[900px]">

                  <thead className="bg-slate-50">

                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">

                      <th className="px-6 py-4">
                        Order
                      </th>

                      <th className="px-6 py-4">
                        Item
                      </th>

                      <th className="px-6 py-4">
                        Quantity
                      </th>

                      <th className="px-6 py-4">
                        Amount
                      </th>

                      <th className="px-6 py-4">
                        Total Price
                      </th>

                      <th className="px-6 py-4">
                        Status
                      </th>

                      <th className="px-6 py-4">
                        Date
                      </th>

                      <th className="px-6 py-4">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {orders
                      .slice(0, 5)
                      .map((order) => (

                        <tr
                          key={order.id}
                          className="text-sm"
                        >

                          <td className="px-6 py-4 font-semibold text-slate-900">
                            #{order.id}
                          </td>

                          <td className="px-6 py-4 text-slate-700">
                            {order.items}
                          </td>

                          <td className="px-6 py-4 text-slate-700">
                            {order.quantity}
                          </td>

                          <td className="px-6 py-4 text-slate-700">
                            ₦
                            {Number(
                              order.price
                            ).toLocaleString()}
                          </td>

                          <td className="px-6 py-4 font-semibold text-slate-900">
                            ₦
                            {Number(
                              order.total
                            ).toLocaleString()}
                          </td>

                          <td className="px-6 py-4">

                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>

                          </td>

                          <td className="px-6 py-4 text-slate-600">
                            {order.date}
                          </td>

                          <td className="px-6 py-4">

                            <div className="flex flex-wrap gap-2">

                              {order.status ===
                                "Pending" && (
                                <button
                                  onClick={() =>
                                    updateOrderStatus(
                                      order.id,
                                      "Preparing"
                                    )
                                  }
                                  className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-200"
                                >
                                  Prepare
                                </button>
                              )}

                              {order.status ===
                                "Preparing" && (
                                <button
                                  onClick={() =>
                                    updateOrderStatus(
                                      order.id,
                                      "Completed"
                                    )
                                  }
                                  className="rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-200"
                                >
                                  Complete
                                </button>
                              )}

                              {(order.status ===
                                "Pending" ||
                                order.status ===
                                  "Preparing") && (
                                <button
                                  onClick={() =>
                                    updateOrderStatus(
                                      order.id,
                                      "Cancelled"
                                    )
                                  }
                                  className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200"
                                >
                                  Cancel
                                </button>
                              )}

                              {order.status ===
                                "Completed" && (
                                <span className="text-xs font-medium text-slate-400">
                                  No action
                                </span>
                              )}

                              {order.status ===
                                "Cancelled" && (
                                <span className="text-xs font-medium text-slate-400">
                                  Cancelled
                                </span>
                              )}

                            </div>

                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

              {/* ==========================================
                  MOBILE ORDERS
              ========================================== */}

              <div className="space-y-4 p-4 lg:hidden">

                {orders
                  .slice(0, 5)
                  .map((order) => (

                    <div
                      key={order.id}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >

                      {/* HEADER */}

                      <div className="flex items-start justify-between gap-3">

                        <div>

                          <p className="text-sm font-bold text-slate-950">
                            Order #{order.id}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {order.date}
                          </p>

                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>

                      </div>

                      {/* ITEM */}

                      <div className="mt-4 rounded-xl bg-slate-50 p-3">

                        <p className="text-sm font-semibold text-slate-900">
                          {order.items}
                        </p>

                        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">

                          <div>

                            <p className="text-slate-500">
                              Quantity
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                              {order.quantity}
                            </p>

                          </div>

                          <div>

                            <p className="text-slate-500">
                              Price
                            </p>

                            <p className="mt-1 font-semibold text-slate-900">
                              ₦
                              {Number(
                                order.price
                              ).toLocaleString()}
                            </p>

                          </div>

                          <div>

                            <p className="text-slate-500">
                              Total
                            </p>

                            <p className="mt-1 font-bold text-slate-950">
                              ₦
                              {Number(
                                order.total
                              ).toLocaleString()}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="mt-4 flex flex-wrap gap-2">

                        {order.status ===
                          "Pending" && (
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Preparing"
                              )
                            }
                            className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700"
                          >
                            Prepare
                          </button>
                        )}

                        {order.status ===
                          "Preparing" && (
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Completed"
                              )
                            }
                            className="rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-700"
                          >
                            Complete
                          </button>
                        )}

                        {(order.status ===
                          "Pending" ||
                          order.status ===
                            "Preparing") && (
                          <button
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Cancelled"
                              )
                            }
                            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700"
                          >
                            Cancel
                          </button>
                        )}

                      </div>

                    </div>

                  ))}

                {orders.length === 0 && (
                  <div className="py-10 text-center text-sm text-slate-500">
                    No orders available.
                  </div>
                )}

              </div>

            </section>

        </main>

      </div>

    </div>
  );
}

export default SalesOverview;
