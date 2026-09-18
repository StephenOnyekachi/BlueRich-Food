
function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-950">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Icon size={21} />
          </div>
        )}
      </div>

      {description && (
        <p className="mt-4 text-xs text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}

export default StatCard;
