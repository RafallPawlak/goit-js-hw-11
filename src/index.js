import { fetchImages } from "./js/fetchimages";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
//import { noop } from "lodash";

const buttonSub = document.querySelector('button[type="submit"]');
const galleryItem = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
const perPage = 40;

    const handler = event => {
    event.preventDefault();
    fetchImages().then((images) => {
        if (images.total === 0)
        {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
        render(images);
        console.log(images);
            Notify.success(`Hooray! We found ${images.total} images.`)
});
} 

const render = images => {
    const markup = images.hits.map((image) => {
        return `<div class="photo-card">
                  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                    <div class="info">
                      <p class="info-item">
                        <b>Likes: ${image.likes}</b>
                      </p>
                      <p class="info-item">
                        <b>Views: ${image.views}</b>
                      </p>
                      <p class="info-item">
                        <b>Comments: ${image.comments}</b>
                      </p>
                      <p class="info-item">
                        <b>Downloads: ${image.downloads}</b>
                      </p>
                    </div>
                </div>`
    })
    .join('');
  galleryItem.insertAdjacentHTML('beforeend', markup);
}

function onLoadMoreBtn() {
  page += 1;
  //simpleLightBox.destroy();

  fetchImages( page)
    .then(( images ) => {
      render(images);
      //simpleLightBox = new SimpleLightbox('.gallery a').refresh();

        const totalPages = Math.ceil(images.total / perPage);
        console.log(totalPages);

      if (page > totalPages) {
          loadMoreBtn.classList.add('is-hidden');
          Notify.failure("We're sorry, but you've reached the end of search results.");
        //alertEndOfSearch();
      }
    })
    .catch(error => console.log(error));
}

buttonSub.addEventListener('click', handler);
loadMoreBtn.addEventListener('click', onLoadMoreBtn)