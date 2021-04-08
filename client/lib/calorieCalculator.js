function calorieCalculator(gender, age, height, goalWeight, activityLevel) {
  let calories = 0;
  if (activityLevel === 'sedentary') {
    activityLevel = 1.2;
  } else if (activityLevel === 'lightly active') {
    activityLevel = 1.375;
  } else if (activityLevel === 'moderately active') {
    activityLevel = 1.55;
  } else {
    activityLevel = 1.725;
  }

  if (gender === 'female') {
    calories = (655 + (4.3 * goalWeight) + (4.7 * height) - (4.7 * age)) * activityLevel;
  } else {
    calories = (66 + (6.3 * goalWeight) + (12.9 * height) - (6.8 * age)) * activityLevel;
  }
  return calories.toFixed();
}

export default calorieCalculator;
