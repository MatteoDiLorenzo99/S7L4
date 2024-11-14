//ADESSO CI ATTACCHIAMO AL DATABASE
import { getImages } from './db.js';

// CARICHIAMO I BOTTONI TRAMITE ID
const ButtonLoad = document.getElementById('btnLoadImg');
const ButtonLoadSecondary = document.getElementById('btnLoadImg2');

// CARICHIAMO I CONTAINER DELLE FOTO
const photoscard = document.getElementsByTagName('img');

// CARICHIAMO TUTTI I BOTTONI
const buttons = document.querySelectorAll('button');

// Filtra i bottoni che hanno un determinato testo
const filteredButtons = Array.from(buttons).filter(button => button.textContent.trim().toLowerCase() === 'edit'.toLowerCase());

const mindachange = document.getElementsByTagName('small')


// Aggiungiamo un event listener al bottone per caricare le immagini al click
ButtonLoad.addEventListener('click', function(e) {
  e.preventDefault();
  // Quando il bottone viene cliccato, carichiamo le immagini
  getImages("nature")
    .then(photos => {
      loadPhotosIntoCards(photos); // Passa direttamente l'array di foto senza JSON.stringify
    })
    .catch(error => console.error(error));
});

// Aggiungiamo un event listener al bottone per caricare le immagini al click
ButtonLoadSecondary.addEventListener('click', function(e) {
  e.preventDefault();
  // Quando il bottone viene cliccato, carichiamo le immagini
  getImages("People")
    .then(photos => {
      loadPhotosIntoCards(photos); // Passa direttamente l'array di foto senza JSON.stringify
    })
    .catch(error => console.error(error));
});

// Funzione per caricare le foto nel DOM
const loadPhotosIntoCards = function(photos) {

  // Iteriamo sugli elementi img e sulle foto ottenute
  for (let i = 0; i < photoscard.length && i < photos.length; i++) {
    photoscard[i].src = photos[i].src.medium; // Imposta l'attributo src dell'elemento img
    photoscard[i].alt = photos[i].photographer; // Aggiunge un testo alternativo per l'immagine
    mindachange[i].innerHTML = photos[i].id;
    // Forza le immagini a essere quadrate (con una larghezza e altezza specificate)
    photoscard[i].style.width = "auto";   // Imposta la larghezza
    photoscard[i].style.height = "200px";  // Imposta l'altezza
    photoscard[i].style.objectFit = "cover"; // Assicura che l'immagine riempia il quadrato senza deformarsi
  }

  // Modifica il testo dei bottoni filtrati
  filteredButtons.forEach(button => {
    button.innerHTML = "Hide";  // Cambia il testo del bottone in "Hide"
  });
}


const nascondicard = function(button){
const card = button.closest('.card');  // Trova la card più vicina al bottone

      // Rimuovi la card dal DOM
      if (card) {
        card.remove();
      }
}


// Aggiungi l'eventListener per ciascun bottone filtrato
filteredButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();  // Impedisce il comportamento predefinito

    if (!button.textContent.toLowerCase().includes("hide")) {
      // Se il testo del bottone NON contiene "hide"
      console.log("Il bottone non contiene 'hide', eseguire l'azione!");
      
    } else {
      // Nascondiamo la card
      nascondicard(button)
    }
  });
});

