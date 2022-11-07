import axios from 'axios';
export { fetchImages };

const baseURL = 'https://pixabay.com/api/';    
    
const API_KEY = '31011594-1ff7c9f95cd2b442eeb7c007c';

const fetchImages = async (page) => {
    const inputText = document.querySelector('[name="searchQuery"]');
    const response = await fetch(`${baseURL}?key=${API_KEY}&q=${inputText.value.trim()}&orientation=horizontal&image_type=photo&safesearch=true&per_page=40&page=${page}`);
    if (!response.ok) {
        throw console.error("Wystąpił błąd");
    }
    const images = await response.json();
    return images;
}


