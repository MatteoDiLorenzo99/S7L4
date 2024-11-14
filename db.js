const URL = 'https://api.pexels.com/v1/search'
const API_KEY = "bdnDaSXFYNO7aKMP09gJcBYRGSDXcp4eodVNQ2y3i5aqLejWVDIaxRw8";
//PRIMA FUNZIONE: OTTENERE LE IMMAGINI DAL DB DI PEXEL
export async function getImages(query) {
    const response = await fetch(`${URL}?query=${query}&per_page=10`, {
      headers: {
        Authorization: API_KEY
      }
    });
  
    if (!response.ok) {
      throw new Error("Errore nella richiesta API");
    }
    const data = await response.json();
    return data.photos; // Array di foto
  }


