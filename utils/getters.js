export function getItemByAlias(data, alias) {
  return data.find((i) => i.alias === alias);
}

export function getItemsByAlias(data, aliases) {
  const result = {};
  for (const alias of aliases) {
    result[alias] = getItemByAlias(data, alias);
  }
  return result;
}