const BASE_URL = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"

axios.get(BASE_URL)
.then((response) => { showBestMovie(response.data.results[0]) })
.catch((errors) => console.log(errors))

function showBestMovie(bestMovieData) {
  console.log(bestMovieData.title);
  console.log(bestMovieData.image_url)
  str = ' ' + bestMovieData.title + ' ';
  img_url = '' + bestMovieData.image_url + '';

  bestMovie = document.getElementById('best-movie-title')
  bestMovie.innerHTML = str
  let img = document.createElement('img');
  img.src = img_url
  bestMovie.appendChild(img);
}