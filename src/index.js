import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfoContainer = document.querySelector('.cat-info');

  const showError = () => {
    error.style.display = 'block';
    loader.style.display = 'none';
  };

  try {
    loader.style.display = 'block';

    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });

    loader.style.display = 'none';

    breedSelect.addEventListener('change', async () => {
      const selectedBreedId = breedSelect.value;

      try {
        loader.style.display = 'block';
        error.style.display = 'none';

        const catInfo = await fetchCatByBreed(selectedBreedId);
        catInfoContainer.innerHTML = '';

        const catImage = document.createElement('img');
        catImage.src = catInfo[0].url;
        catInfoContainer.appendChild(catImage);

        const catDetails = document.createElement('div');
        catDetails.innerHTML = `
          <p class="cat-name">${catInfo[0].breeds[0].name}</p>
          <p class="cat-desc">${catInfo[0].breeds[0].description}</p>
          <p> <span class="cat-temp">Temperament: </span>${catInfo[0].breeds[0].temperament}</p>
        `;
        catInfoContainer.appendChild(catDetails);

        loader.style.display = 'none';
      } catch (error) {
        console.error('Error fetching cat info:', error);
        showError();
      }
    });
  } catch (error) {
    console.error('Error fetching breeds:', error);
    showError();
  }
});
