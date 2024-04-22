# JustStremaIT Project Guidelines

This reopository contains frontend and backend code for the JustStreamIT website to stream through various movies by categories and imdb ratings.
Frontend code has been written in HTML/CSS/JavaScript.
Backend data is fetched from an existing API.

### OCMovies-API: Test API providing movie information

The API provides these endpoints to get detailed infomation about movies filtered by
various criteria such as genre, IMDB score or year. Endpoints allow users to retrieve
information for individual movies or lists of movies.

### Installation of Backend

This locally-executable API can be installed and executed from [http://localhost:8000/api/v1/titles/](http://localhost:8000/api/v1/titles/) using the following steps.

1. Clone this repository using `$ git clone https://github.com/OpenClassrooms-Student-Center/   OCMovies-API-EN-FR.git` (you can also download the code [as a zip file](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip))
2. Move to the ocmovies-api root folder with `$ cd ocmovies-api-en`
3. Create a virtual environment for the project with `$ python -m venv env` on windows or `$ python3 -m venv env` on macos or linux.
4. Activate the virtual environment with `$ env\Scripts\activate` on windows or `$ source env/bin/activate` on macos or linux.
5. Install project dependencies with `$ pip install -r requirements.txt`
6. Create and populate the project database with `$ python manage.py create_db`
7. Run the server with `$ python manage.py runserver`

### For Frontend

1. To fetch data from API, axios library needs to be installed in javascript. 
2. From frontend folder, open index.html in the local browser.