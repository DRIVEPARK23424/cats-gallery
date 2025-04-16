export async function getCats() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=6')
    const data = await response.json();
    return data;
  }