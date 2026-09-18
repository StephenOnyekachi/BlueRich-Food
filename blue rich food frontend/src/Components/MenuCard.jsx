
import { MessageCircle } from "lucide-react";

function MenuCard({ item }) {
  const whatsappNumber = "2348000000000";

  const message = `Hello Bluerich Bakery & Restaurant 👋

I would like to pre-order:

*${item.name}*
Price: ₦${item.price.toLocaleString()}

Please provide more details.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900">
            {item.name}
          </h3>

          <p className="whitespace-nowrap font-bold text-blue-600">
            ₦{item.price.toLocaleString()}
          </p>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {item.description}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <MessageCircle size={18} />
          Pre-order on WhatsApp
        </a>
      </div>
    </article>
  );
}

export default MenuCard;
