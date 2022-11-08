import { fetchImages } from './js/fetchImages';
import { render } from './js/renderImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const _ = require('lodash');

const searchForm = document.querySelector('#search-form');
const galleryItem = document.querySelector('.gallery');
const topBtn = document.querySelector('.top-btn');
let query = '';
let page = 1;
const perPage = 40;
let simpleLightBox;

function searchOn(event) {
  event.preventDefault();
  query = event.currentTarget.searchQuery.value.trim();
  galleryItem.innerHTML = '';

  if (query === '') {
     //loadMoreBtn.style.visibility = "hidden";
    Notify.warning("Please fill in the blank field.");
    return
    } 
  
  fetchImages(page, query)
    .then(({ data } ) => {
      if (data.total === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      } else {
        render(data.hits);
        simpleLightBox = new SimpleLightbox('.gallery a').refresh();
        //loadMoreBtn.style.visibility = "visible";
        topBtn.style.visibility = "visible";
        Notify.success(`Hooray! We found ${data.total} images.`);
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
  };

const handleInfiniteScroll = _.throttle(() => {
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500;

      if (endOfPage) {
        page += 1;
        fetchImages(page, query)
          .then(( { data } ) => {
            render(data.hits);
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            const totalPages = Math.ceil(data.totalHits / perPage);

      if (page > totalPages) {
          Notify.failure("We're sorry, but you've reached the end of search results.");
          //loadMoreBtn.style.visibility = "hidden";
      }
    })
    .catch(error => console.log(error));
    }
}, 600);

function onTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}


onTopBtn();

document.addEventListener('scroll', handleInfiniteScroll);
searchForm.addEventListener('submit', searchOn);
topBtn.addEventListener('click', onTopBtn);



//============ LOAD MORE BUTTON =========================//

//const loadMoreBtn = document.querySelector('.load-more');
//loadMoreBtn.addEventListener('click', onLoadMoreBtn);
//function onLoadMoreBtn() {
//   page += 1;
//   simpleLightBox.destroy();
//   fetchImages(page, query)
//     .then(( images ) => {
//       render(images);
//       simpleLightBox = new SimpleLightbox('.gallery a').refresh();

//         const totalPages = Math.ceil(images.total / perPage);
//         console.log(totalPages);

//       if (page > totalPages) {
  
//           Notify.failure("We're sorry, but you've reached the end of search results.");
//           loadMoreBtn.style.visibility = "hidden";
//       }
//     })
//     .catch(error => console.log(error));
// }