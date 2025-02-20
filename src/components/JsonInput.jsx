import { useState } from "react";
import styles from "./JsonInput.module.css";
import { useDispatch } from "react-redux";
import { initializeTable } from "../slices/tableSlice";

const JsonInput = () => {
  const [jsonInput, setJsonInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      dispatch(initializeTable(parsedJson));
      setJsonInput("");
    } catch (error) {
      alert("Invalid JSON");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here"
      />
      <button className={styles.button} onClick={handleSubmit}>
        Submit JSON
      </button>
    </div>
  );
};

export default JsonInput;
