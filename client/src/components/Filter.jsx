const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function Filter({ current, onChange }) {
  return (
    <div className="flex gap-2 mb-4">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            current === f.value
              ? "bg-brand text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
