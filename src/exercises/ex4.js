// On importe la bibliothèque axios
import axios from 'axios';

// On récupère les données métérologiques en utilisant l'API OpenWeatherMap
export const fetchData = async () => {
  const apiKey = '1db3cf629ed34b77854175aa24be064d';
  const city = 'Rennes';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// On récupère en asynchrone les données météo en utilisat l'API. Ensuite, elle crée un élément <div> pour afficher ces données dans le DOM (Document Object Model). Le texte affiché contient la description météorologique et la température en degrés Celsius. 
export const displayDataInDOM = async () => {
  try {
    const data = await fetchData();
    const container = document.createElement('div');
    container.id = 'weather-container';
    container.textContent = `Weather: ${data.weather[0].description}, Temperature: ${(data.main.temp - 273.15).toFixed(2)}°C`;
    document.getElementById('paragraph-container').appendChild(container);
  } catch (error) {
    console.error('Error displaying data:', error);
  }
};

// Cette fonction supprime l’élément <div> contenant les données météorologiques du DOM
export const removeWeatherData = () => {
  const container = document.getElementById('weather-container');
  if (container) {
    container.remove();
  }
};

// e code vérifie si l’environnement est un navigateur (vérification de typeof document !== 'undefined'). S’il l’est, il ajoute deux écouteurs d’événements :
// Lorsque le DOM est chargé, il appelle displayDataInDOM.
// Lorsque le DOM est chargé, il recherche un bouton avec l’ID 'remove-paragraph-button' et ajoute un écouteur d’événements pour supprimer les données météorologiques lorsqu’il est cliqué.
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', displayDataInDOM);
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('remove-paragraph-button');
    if (button) {
      button.addEventListener('click', removeWeatherData);
    }
  });
}