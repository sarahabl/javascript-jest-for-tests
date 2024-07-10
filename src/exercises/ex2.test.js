const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Charger le fichier HTML à partir du chemin spécifié
const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');

// Variables pour le DOM et le document
let dom;
let document;

// Avant chaque test, initialiser le DOM avec le contenu HTML
beforeEach(() => {
  // Créer une nouvelle instance de JSDOM avec le contenu HTML
  dom = new JSDOM(html, { runScripts: "dangerously" });
  document = dom.window.document;
  
  // Charger et exécuter le script ex2.js après avoir initialisé le DOM
  const scriptContent = fs.readFileSync(path.resolve(__dirname, './ex2.js'), 'utf8');
  const scriptElement = document.createElement("script");
  scriptElement.textContent = scriptContent;
  document.body.appendChild(scriptElement);
});

// Test pour vérifier que le message est mis à jour
test('updates message content on button click', () => {
  // Récupérer les éléments du bouton et du message dans le DOM
  const clickMeButton = document.getElementById('click-me-button');
  const message = document.getElementById('message');

  // Simuler un clic sur le bouton
  clickMeButton.click();

  // Vérifier que le contenu du paragraphe 'message' est mis à jour
  expect(message.textContent).toBe('Button was clicked!');
});