// Récupère l'élément <form> du DOM avec l'ID 'email-form'
const emailForm = document.getElementById('email-form');

// Récupère l'élément <input> du DOM avec l'ID 'email-input', où l'utilisateur saisit l'email
const emailInput = document.getElementById('email-input');

// Récupère l'élément <p> du DOM avec l'ID 'validation-message', où le message de validation sera affiché
const validationMessage = document.getElementById('validation-message');

// Fonction qui valide l'email saisi par l'utilisateur
function validateEmail() {
  const email = emailInput.value; // Récupère la valeur saisie dans l'input email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email

  if (emailPattern.test(email)) { // Vérifie si l'email correspond au pattern
    validationMessage.textContent = 'Valid email!'; // Affiche un message de validation positif
    validationMessage.style.color = 'green'; // Définit la couleur du message en vert
  } else {
    validationMessage.textContent = 'Invalid email!'; // Affiche un message de validation négatif
    validationMessage.style.color = 'red'; // Définit la couleur du message en rouge
  }
}

// Ajoute un écouteur d'événement 'submit' sur le formulaire 'emailForm'
emailForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Empêche la soumission du formulaire par défaut
  validateEmail(); // Appelle la fonction validateEmail() pour valider l'email saisi
});