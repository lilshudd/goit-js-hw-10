import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_0tliFFPEVf09LKSbCOWcEMZ3eW88u80IE6ah3HdZ236eohn0Sx4naPJS8jMcGNfn';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching cat for breed ${breedId}:`, error);
      throw error;
    });
}
