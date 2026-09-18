
import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";

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

function EditItem() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [formData, setFormData] = useState(initialForm);

    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (name === "image" && files?.[0]) {
            const imageUrl = URL.createObjectURL(files[0]);

            setFormData((prev) => ({
                ...prev,
                image: imageUrl,
            }));

            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const savedMenu =
            JSON.parse(localStorage.getItem("menuData")) || menuData;

        const updatedMenu = savedMenu.map((item) =>
            item.id === Number(id)
                ? {
                    ...item,
                    name: formData.name,
                    description: formData.description,
                    price: Number(formData.price),
                    category: formData.category,
                    image: formData.image,
                    available: formData.available,
                    quantity: Number(formData.quantity),
                }
                : item
        );

        localStorage.setItem("menuData", JSON.stringify(updatedMenu));

        alert("Menu item updated successfully!");

        navigate("/dashboard");
    };

    useEffect(() => {
        const savedMenu = JSON.parse(
            localStorage.getItem("menuData")
        ) || menuData;

        const item = savedMenu.find(
            (item) => String(item.id) === String(id)
        );

        console.log("FOUND ITEM:", item);
        console.log("ITEM IMAGE:", item?.image);

        if (item) {
            setFormData({
                name: item.name,
                description: item.description,
                price: item.price,
                category: item.category,
                image: item.image,
                available: item.available,
                quantity: item.quantity,
            });
        }
    }, [id]);

    return(
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
                        title="Edit Item"
                        description="Here's an overview of item to edit."
                    />

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div>
                            {/* Form */}
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
                                        rows="3"
                                        placeholder="Describe the menu item..."
                                        required
                                        className="
                                            w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none 
                                            transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50
                                        "
                                    />
                                </div>

                                {/* Price + Category */}
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    
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

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Quantity
                                        </label>

                                        <input
                                            type="number"
                                            name="quantity"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                            min="0"
                                            required
                                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            Category
                                        </label>

                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                        >
                                            <option value="Meals">Meals</option>
                                            <option value="Pastries">Pastries</option>
                                            <option value="Drinks">Drinks</option>
                                            <option value="Specials">Specials</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Image */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Item Image
                                    </label>

                                    {/* Current image */}
                                    {formData.image && (
                                        <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                        <img
                                            src={formData.image}
                                            alt={formData.name || "Menu item"}
                                            className="h-48 w-full object-contain sm:h-64"
                                        />
                                        </div>
                                    )}

                                    {/* Upload new image */}
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3"
                                    />

                                    <p className="mt-2 text-sm text-slate-500">
                                        Select a new image if you want to replace the current one.
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
                                        className="w-full rounded-xl border border-slate-200 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                                    >
                                        Cancel
                                    </Link>

                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )

}

export default EditItem;