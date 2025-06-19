export default function CategorySelector({ onSelect }) {
  const categories = ["General","Science", "Logic","History", "Space","Math", "Sports", "Movies", "Games", "Music", "Art", "Geography"];
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
