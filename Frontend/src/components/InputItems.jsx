function InputItems({ htmlFor, type, content, placeholder, value, setValue }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-gray-300 block"
      >
        {content}
      </label>
      <input
        type={type}
        className="w-full px-3 py-4 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
        placeholder={placeholder}
        id={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default InputItems;
