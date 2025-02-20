import { useState } from "react";

const TableRow = ({
  label,
  value,
  onAllocPercentClick,
  onAllocValClick,
  variance,
}) => {
  const [input, setInput] = useState("");
  return (
    <tr>
      <td>{label}</td>
      <td>{value.toFixed(2)}</td>
      <td>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(Number(e.target.value))}
        />
      </td>
      <td>
        <button
          onClick={() => {
            onAllocPercentClick(input);
            setInput("");
          }}
        >
          Allocate %
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            onAllocValClick(input);
            setInput("");
          }}
        >
          Allocate val
        </button>
      </td>
      <td>{variance.toFixed(2)}</td>
    </tr>
  );
};

export default TableRow;
