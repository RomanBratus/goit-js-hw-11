import Notiflix from 'notiflix';

import PixabayApiService from './getPromisPixaby.js';

import LoadMoreBtn from './components/LoadMoreBtn.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');

const pixabayApiService = new PixabayApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', isHidden: true });

form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchArticles);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  pixabayApiService.resetPage();
  clearNewList();
  loadMoreBtn.show();

  pixabayApiService.query = value;

  fetchArticles().finally(() => form.reset());
}

async function fetchArticles() {
  loadMoreBtn.disable();

  try {
    const data = await pixabayApiService.getImage();

    const { hits, totalHits } = data;
    if (hits.length === 0) throw new Error(onNothingFound());

    const markup = hits.reduce(
      (markup, hits) => createMarkup(hits) + markup,
      ''
    );
    appendNewToList(markup);

    let page = pixabayApiService.page - 1;
    let limitPerPage = pixabayApiService.per_page;
    if (pixabayApiService.page - 1 === 1) onInfo(totalHits);
    const totalPages = totalHits / limitPerPage;

    if (page > totalPages) throw new Error(onNoMore());

    loadMoreBtn.enable();
  } catch (err) {
    return err;
  }
}

function onNothingFound(err) {
  loadMoreBtn.hide();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}