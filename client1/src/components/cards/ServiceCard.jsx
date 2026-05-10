export default function ServiceCard({ title, subtitle }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 p-4 text-white shadow-md">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-orange-50">{subtitle}</p>
    </div>
  );
}
