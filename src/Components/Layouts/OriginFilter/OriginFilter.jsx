import { useState } from "react";
import ORIGINS from "../../../origins/productOrigins";

const OriginsFilter = ({ switchOrigin }) => {
  const [selectedOrigin, setSelectedOrigin] = useState("");

  const handleChange = event => {
    setSelectedOrigin(event.target.value);
    switchOrigin(event.target.value);
  };

  return (
    <div className="inline-flex w-2/4 rounded-md shadow-sm" role="group">
      <select
        id="origins"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        value={selectedOrigin}
        onChange={handleChange}
      >
        <option value="" defaultValue>
          Todos los orígenes
        </option>
        {ORIGINS.map(({ originValue, text }) => (
          <option key={originValue} value={originValue}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OriginsFilter;
