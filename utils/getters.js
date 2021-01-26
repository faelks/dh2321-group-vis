export function getItemByAlias(data, alias) {
  return data.find((i) => i.alias === alias);
}

export function getItemsByAlias(data, aliases, withAlias = true) {
  const result = withAlias ? {} : [];
  for (const alias of aliases) {
    if (withAlias) {
      result[alias] = getItemByAlias(data, alias);
    } else {
      result.push(getItemByAlias(data, alias));
    }
  }
  return result;
}
