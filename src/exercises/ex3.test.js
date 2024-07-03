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
  
  // Charger le script ex3.js dans le DOM simulé après son initialisation
  const scriptContent = fs.readFileSync(path.resolve(__dirname, './ex3.js'), 'utf8');
  const scriptElement = document.createElement("script");
  scriptElement.textContent = scriptContent;
  document.body.appendChild(scriptElement); // Ajouter le script au corps du document
});

// Test pour vérifier la validation des emails
test('displays "Valid email!" message for a valid email', () => {
  // Récupérer les éléments du DOM nécessaires pour le test
  const emailInput = document.getElementById('email-input');
  const emailForm = document.getElementById('email-form');
  const validationMessage = document.getElementById('validation-message');

  // Simuler la saisie d'un email valide
  emailInput.value = 'test@example.com';

  // Créer un événement de soumission du formulaire en utilisant JSDOM
  const event = new dom.window.Event('submit', {
    bubbles: true,
    cancelable: true
  });

  // Déclencher manuellement l'événement de soumission sur le formulaire
  emailForm.dispatchEvent(event);

  // Vérifier que le message de validation est correctement affiché pour un email valide
  expect(validationMessage.textContent).toBe('Valid email!');
  expect(validationMessage.style.color).toBe('green');
});

test('displays "Invalid email!" message for an invalid email', () => {
  // Récupérer les éléments du DOM nécessaires pour le test
  const emailInput = document.getElementById('email-input');
  const emailForm = document.getElementById('email-form');
  const validationMessage = document.getElementById('validation-message');

  // Simuler la saisie d'un email invalide
  emailInput.value = 'invalid-email';

  // Créer un événement de soumission du formulaire en utilisant JSDOM
  const event = new dom.window.Event('submit', {
    bubbles: true,
    cancelable: true
  });

  // Déclencher manuellement l'événement de soumission sur le formulaire
  emailForm.dispatchEvent(event);

  // Vérifier que le message de validation est correctement affiché pour un email invalide
  expect(validationMessage.textContent).toBe('Invalid email!');
  expect(validationMessage.style.color).toBe('red');
});
