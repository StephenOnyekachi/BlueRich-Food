
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import MenuCard from "../Components/MenuCard";
import menuData from "../MyData/menuData";
import AIAssistant from "../Components/AIAssistant";

function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(menuData.map((item) => item.category)),
  ];

  const filteredMenu = useMemo(() => {
    return menuData.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-slate-950 px-6 pb-14 pt-32 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Bluerich Bakery & Restaurant
          </p>

          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            Our Menu
          </h1>

          <p className="mt-4 max-w-xl text-slate-300">
            Explore our selection of freshly prepared meals, pastries and
            refreshing drinks.
          </p>
        </div>
      </section>

      {/* Menu */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Search + Filter */}
        <div className="sticky top-0 z-20 -mx-6 bg-slate-50 px-6 py-4 lg:static lg:mx-0 lg:px-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <SlidersHorizontal
                size={18}
                className="shrink-0 text-slate-500"
              />

              {categories.map((itemCategory) => (
                <button
                  key={itemCategory}
                  onClick={() => setCategory(itemCategory)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    category === itemCategory
                      ? "bg-slate-950 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {itemCategory}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {filteredMenu.length} menu items
            </p>

            {search && (
              <p className="text-sm text-slate-500">
                Results for "{search}"
              </p>
            )}
          </div>

          {filteredMenu.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMenu.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white py-20 text-center">
              <h3 className="text-xl font-bold text-slate-900">
                No menu items found
              </h3>

              <p className="mt-2 text-slate-500">
                Try another search or category.
              </p>
            </div>
          )}
        </div>
      </main>

      <AIAssistant />
    </div>
  );
}

export default Menu;
