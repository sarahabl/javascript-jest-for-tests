// ex2.test.js

const fs = require('fs'); // Module Node.js pour interagir avec le système de fichiers
const path = require('path'); // Module Node.js pour manipuler les chemins de fichiers
const { JSDOM } = require('jsdom'); // Module JSDOM pour simuler un environnement DOM dans Node.js

// Charger l'HTML depuis le fichier index.html
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

// Initialiser le DOM en utilisant JSDOM
let dom;
let document;

beforeEach(() => {
  // Créer une nouvelle instance JSDOM avec le contenu HTML et permettre l'exécution des scripts
  dom = new JSDOM(html, { runScripts: "dangerously" });
  document = dom.window.document;
  
  // Charger le script ex2.js dans le DOM simulé après son initialisation
  const scriptContent = fs.readFileSync(path.resolve(__dirname, './ex2.js'), 'utf8');
  const scriptElement = document.createElement("script");
  scriptElement.textContent = scriptContent;
  document.body.appendChild(scriptElement); // Ajouter le script au corps du document
});

// Test pour vérifier que le message est mis à jour lors du clic sur le bouton
test('updates message content on button click', () => {
  // Récupérer les éléments du DOM nécessaires pour le test
  const clickMeButton = document.getElementById('click-me-button');
  const message = document.getElementById('message');

  // Simuler un clic sur le bouton
  clickMeButton.click();

  // Vérifier que le contenu du paragraphe 'message' est mis à jour après le clic
  expect(message.textContent).toBe('Button was clicked!');
});
