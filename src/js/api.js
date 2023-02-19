const ENDPOINT = 'https://pixabay.com/api/';



function fetchData(query) {
  return fetch(
    `${ENDPOINT}?key=33763502-a627660fe51c212db75711873&image_type=photo&orientation=horizontal&safesearch=true&q=${query}`
  )
    .then(response => response.json())
}

export default fetchData;
