export default function CategorySelector({ onSelect }) {
  const categories = ["General", "Tech", "Science", "History"];
  return (
    <div className="grid gap-4">
      {categories.map(cat => (
        <button key={cat} onClick={() => onSelect(cat)} className="btn-primary">
          {cat}
        </button>
      ))}
    </div>
  );
}
