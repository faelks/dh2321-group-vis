import styles from "../styles/Pill.module.scss";

export function Pill({ label, value, average }) {
  const className =
    value >= average ? styles.pillPositive : styles.pillNegative;

  return (
    <div className={className}>
      {label}: {value.toPrecision(2)}
    </div>
  );
}