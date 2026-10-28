/* eslint-disable react/prop-types -- Component props follow the project's JSX convention. */
export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  counts = {},
}) {
  return (
    <div
      className="catalog-categories"
      role="group"
      aria-label="Filtrar proyectos por categoría"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          aria-pressed={selectedCategory === category.id}
          className={selectedCategory === category.id ? "is-selected" : ""}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.id === "todos" ? "Todos los proyectos" : category.name}
          {counts[category.id] !== undefined && (
            <span>{String(counts[category.id]).padStart(2, "0")}</span>
          )}
        </button>
      ))}
    </div>
  );
}
