
function AdminHeader({
  title,
  description,
  action,
  actionIcon: ActionIcon,
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <button
          onClick={action}
          className="
            nline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 
            text-sm font-semibold text-white transition hover:bg-slate-800
          "
        >
          {ActionIcon && <ActionIcon size={18} />}
          Add Menu Item
        </button>
      )}
    </div>
  );
}

export default AdminHeader;
