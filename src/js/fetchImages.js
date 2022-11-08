import axios from 'axios';
export { fetchImages };

const baseURL = 'https://pixabay.com/api/';    
    
const API_KEY = '31011594-1ff7c9f95cd2b442eeb7c007c';

async function fetchImages(page, query) {
    const response = await axios.get(`${baseURL}?key=${API_KEY}&q=${query}&orientation=horizontal&image_type=photo&safesearch=true&per_page=40&page=${page}`,);

    return response;
}


