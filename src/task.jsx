function Task({ item, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={item.done}
          onChange={onToggle}
          className="w-5 h-5 cursor-pointer"
        />
        <span
          className={`text-lg ${
            item.done ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {item.text}
        </span>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 font-medium px-3 py-1"
      >
        Delete
      </button>
    </div>
  );
}

export default Task;
