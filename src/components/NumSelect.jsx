import styles from "./NumSelect.module.css";

function NumSelect({ selectedNum, setSelectedNum }) {
  return (
    <select
      className={styles.select}
      value={selectedNum}
      onChange={(e) => setSelectedNum(Number(e.target.value))}>
      {Array.from({ length: 10 }, (_, index) => index).map((num) => (
        <option value={num} key={num}>
          {num}
        </option>
      ))}
    </select>
  );
}

export default NumSelect;
