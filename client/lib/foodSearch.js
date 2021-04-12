export default function getFoodItem() {
  fetch('https://trackapi.nutritionix.com/v2/search/instant?query=apple', {
    method: 'GET',
    headers: {
      'x-app-id': 'dd9e56ab',
      'x-app-key': '4da30138c0f96e06685a4cf9c173e61e'
    }
  })
    .then(response => response.json())
    // .then(result => console.log(result))
    .catch(error => console.error(error));
}
