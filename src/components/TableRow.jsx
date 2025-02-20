import { useState } from "react";
import styles from "./TableRow.module.css";

const TableRow = ({
  label,
  value,
  onAllocPercentClick,
  onAllocValClick,
  variance,
  isChild,
}) => {
  const [input, setInput] = useState("");
  const tdClass = isChild ? styles.tdRight : null;

  return (
    <tr>
      <td className={tdClass}>{label}</td>
      <td className={tdClass}>{value.toFixed(2)}</td>
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
      <td className={tdClass}>{variance.toFixed(2)}</td>
    </tr>
  );
};

export default TableRow;
