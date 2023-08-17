import CATEGORIES from "../../categories/productCategories";

const CategoryFilter = ({ switchCategory }) => {
  const handleClick = category => {
    switchCategory(category);
  };

  return (
    <div>
      <button
        className="rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={() => handleClick(null)}
      >
        Todos
      </button>
      {CATEGORIES.map(({ categoryValue, text }) => (
        <button
          key={categoryValue}
          className="rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={() => handleClick(categoryValue)}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
