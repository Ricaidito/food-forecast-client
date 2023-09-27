import CATEGORIES from "../../categories/productCategories";

const CategoryFilter = ({ switchCategory }) => {
  const handleClick = category => {
    switchCategory(category);
  };

  return (
    <div className="inline-flex w-2/4 rounded-md shadow-sm" role="group">
      <button
        className="rounded-l-lg border border-gray-200 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
        onClick={() => handleClick(null)}
      >
        Todos
      </button>
      {CATEGORIES.map(({ categoryValue, text }) => (
        <button
          key={categoryValue}
          className="rounded-l-lg border border-gray-200 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
          onClick={() => handleClick(categoryValue)}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
