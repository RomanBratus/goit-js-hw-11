import axios from 'axios';

const URL = 'https://pixabay.com/api';
const KEY = '32938330-25a7d9530d370aeaa9b179f57';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class PixabayApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.per_page = 40;
  }

  async getImage() {
    try {
      const res = await axios.get(
        `${URL}/?key=${KEY}&q=${this.query}&${OPTIONS}&per_page=${this.per_page}&page=${this.page}`
      );
      this.nextPage();
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}