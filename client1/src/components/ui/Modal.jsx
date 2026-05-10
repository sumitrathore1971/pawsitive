export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-sm text-slate-500">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
