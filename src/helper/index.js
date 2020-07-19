export const flattenObject = obj => {
  if (!obj || obj === null) return {};
  const keys = Object.keys(obj)

  return keys.reduce((acc, k) => {
      const value = obj[k]

      return typeof value === 'object' ?
            {...acc, ...flattenObject(value)} :
           {...acc, [k]: value}
  } , {})
}

export const doSort = (items, field) => {
  if (!field || field === null) return items;
  items.sort((a, b) => {
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  });
  return items;
}