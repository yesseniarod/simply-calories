function sumCalories(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].calories;
  }
  return total;
}

export default sumCalories;
