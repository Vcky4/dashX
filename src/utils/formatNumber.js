export default formatNumber = number => {
  if (typeof number !== 'number') {
    return '';
  }

  // Check if the number has decimal places
  if (Number.isInteger(number)) {
    return number.toLocaleString();
  } else {
    // Convert the number to a string with commas for thousands and millions separators,
    // but only show up to 2 decimal places
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
};
