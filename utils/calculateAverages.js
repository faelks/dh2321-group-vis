export function calculateAverages(data) {
  const result = {};
  const firstItem = data[0];
  const keys = Object.keys(firstItem);

  const numericalKeys = [];
  for (const key of keys) {
    if (typeof firstItem[key] === "number" && !key.includes("diff")) {
      numericalKeys.push(key);
    }
  }

  for (const key of numericalKeys) {
    const sum = data.reduce((acc, item) => acc + item[key], 0);
    result[key] = sum / data.length;
  }

  return result;
}
