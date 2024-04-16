
async function main(){
  const BASE_URL = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score"

  bestmovie_res = await axios.get("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
  showBestMovie(bestmovie_res.data.results[0]);
  //.then((response) => { showBestMovie(response.data.results[0]) })
  //.catch((errors) => console.log(errors))

  topmovies_res_page1 = await axios.get("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
  topmovies_res_page2 = await axios.get("http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score");
  movieCarousel(topmovies_res_page1.data.results, topmovies_res_page2.data.results);
  //.then((response) => { movieCarousel(response.data.results, 1) })
  //.catch((errors) => console.log(errors))

  
  //.then((response) => { movieCarousel(response.data.results, 2) })
  //.catch((errors) => console.log(errors))
}

function showBestMovie(bestMovieData) {
  try{
  str = ' ' + bestMovieData.title + ' ';
  img_url = '' + bestMovieData.image_url + '';

  const bestMovie_title = document.querySelector("p.best-movie-title");
  bestMovie_title.innerHTML = bestMovieData.title;
  const bestMovie_details = document.querySelector("p.best-movie-genre");
  bestMovie_details.innerHTML = "Genres: " + bestMovieData.genres + "<br> Year: " + bestMovieData.year + "<br> IMDB SCORE: " + bestMovieData.imdb_score;
  document.querySelector("#best-movie-img").src = img_url;
  get_movie_details(bestMovieData.id);
  show_modal_window(bestMovieData.id);
  }
  catch (errors) {
    console.error(errors);
  }
}


async function movieCarousel(movieData_page1, movieData_page2) {
  let divCarousel = document.getElementById("Category0-carousel");
  count = 0;
  for (let i=1; i<=7; i++){
    let divMovie = document.createElement("div");
    divMovie.className = "carousel-single-movie";
    let img = document.createElement("img");
    if (i<=4)
      url = movieData_page1[i].image_url;
    else{
      url = movieData_page2[count].image_url;
      count += 1;
    }
    img.src = url;
    img.className = "carousel-single-movie";
    divMovie.appendChild(img);
    divCarousel.appendChild(divMovie);
    
}
}

function get_movie_details(movieID) {
  movie_url = "http://localhost:8000/api/v1/titles/" + movieID;
  axios.get(movie_url)
  .then((res) => {show_modal_window(res.data)})
  .catch((err) => console.log(err))
}

function show_modal_window(movieData){
  var modal = document.getElementById("movie-modal");
  var btn = document.getElementById("more-details");
  var close_btn = document.getElementById("close");
  const description = document.getElementById("description");

  descr_str = ("<tr><td>Movie: </td><td>" + movieData.title + "</td><td><img src=" + movieData.image_url + "></img></td>" +
                "<tr><td>Actors: </td><td>" + movieData.actors + "</td>" +
                "<tr><td>Director: </td><td>" + movieData.directors + "</td>" +
                "<tr><td>Release date: </td><td>" + movieData.date_published + "</td>" +
                "<tr><td>Duration: </td><td>" + movieData.duration + "</td>" +
                "<tr><td>Box Office Result: </td><td>" + movieData.rated + "</td>" +
                "<tr><td>Country of Origin: </td><td>" + movieData.countries + "</td>" +
                "<tr><td>Description: </td><td>" + movieData.description + "</td>");
  
  description.innerHTML = descr_str
  description.style.border = "2px grey solid"
  btn.onclick = function() {
    modal.style.display = "block";
  }
  close_btn.onclick = function(){
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
}

main()