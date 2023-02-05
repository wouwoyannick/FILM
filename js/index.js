$(document).ready(function () {

    $("form").submit(function(e) {
        e.preventDefault() 
        var valeur=$("input").val()
        getFilm(valeur)
    })

    async function getFilm(titre) {
        
        try {
          const response = await axios.get('https://www.omdbapi.com/?apikey=95046cdf&s='+titre);
          var films=response.data.Search
           
          $(".films").empty()

          $.each(films, function (index, item) { 
            if (item.Poster!=="N/A") {
                $(".films").append(
                    `<div class="col-lg-3 col-md-6">
                        <div class="card mb-3">
                            <img src="${item.Poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${item.Title}</h5>
                                <a href="#" class="btn btn-primary" onclick="getSingleFilm('${item.imdbID}')">Lire Plus</a>
                            </div>
                        </div>
                    </div>`
                );
            }
              
          });

        } catch (error) {
          console.error(error);
        }   
    }
   
});

const getSingleFilm=(id)=>{
    sessionStorage.setItem("id",id)
    window.location.pathname="/page/Filmitem.html"
    return false
}

async function getIdFilm() {
    try {
      const response = await axios.get('https://www.omdbapi.com/?apikey=95046cdf&i='+sessionStorage.getItem("id"));
      let Filmitem=response.data
      $(".img").html('<img src='+Filmitem.Poster+' class="img-fluid">');
      $(".film").html(
        `<ul class="list-group">
            <li class="list-group-item"><strong>LE TITRE</strong>: ${Filmitem.Title}</li>
            <li class="list-group-item"><strong>LES ACTEURS PRINCIPAUX</strong>:  ${Filmitem.Actors}</li>
            <li class="list-group-item"><strong>LE BUDGET DU FILM</strong>:  ${Filmitem.BoxOffice}</li>
            <li class="list-group-item"><strong>LE PAYS D'ORIGINE</strong>:  ${Filmitem.Country}</li>
            <li class="list-group-item"><strong>ANNEE DE SORTIE</strong>:  ${Filmitem.Year}</li>
            <li class="list-group-item"><strong>DATE DE SORTIE</strong>:  ${Filmitem.DVD}</li>
            <li class="list-group-item"><strong>LE REALISATEUR</strong>:  ${Filmitem.Director}</li>
            <li class="list-group-item"><strong>LES SCENARISTES</strong>:  ${Filmitem.Writer}</li>
            <li class="list-group-item"><strong>LA DESCRIPTION</strong>:  ${Filmitem.Plot}</li>
        </ul>`
      );
    } catch (error) {
      console.error(error);
    }
}