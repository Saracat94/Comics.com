// CAROUSEL

// Seleziona l'elemento contenitore del carosello

let carousel = document.querySelector("#carousel-cards");

// dichiara le variabili per il mouse e il comportamento del carosello
let isDragging = false;
let startX;
let scrollLeft;

//lista dei mouseEvent applicati al selettore carosello

//evento per il tasto del mouse tenuto premuto (mousedown). identificazione della x iniziale. pageX restituisce la coordinata X in corrispondenza della quale è stato fatto clic con il mouse

carousel.addEventListener('mousedown', function(e) {
  isDragging = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

// evento per lo scorrimento. calcolo spostamento del mouse
// "preventDefault()" per evitare che la finestra del browser scorrerà accidentalmente

carousel.addEventListener('mousemove', function(e) {
  if(!isDragging) return;
  e.preventDefault();
  let x = e.pageX - carousel.offsetLeft;
  let walk = (x - startX) * 3;
  carousel.scrollLeft = scrollLeft - walk;
});

// evento per interrompere lo scroll al rilascio del pulsante del mouse
carousel.addEventListener('mouseup', function(e) {
  isDragging = false;
});

// JSON DOCUMENTATION and APPLICATION

fetch('./comics.json')
.then(response => response.json())
.then(json => {

  let collection = json.data.results
  
  
  // per ogni fumetto in collection devo creare una chiave detta "pubblished" con valore una data random tra il 01/01/2023 e 15/03/2023
  
  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  collection.forEach((comic) => {
    comic.pubblished = randomDate(new Date(2023, 0, 1), new Date())
  })
  
  // devo filtrare i 4 ultimi fumetti piu recenti e esporre il risultato nell html
  let sortingByDateComics = collection.sort((a, b) => b.pubblished - a.pubblished).slice(0,4)
  
  
  // prendere il luogo dove andare a visualizzare le card 
  const upcomingBooksWrapper = document.querySelector('#upcomingBooksWrapper');
  sortingByDateComics.forEach((comic) => {
    let div = document.createElement('div')
    div.classList.add('card', 'col-4', 'mx-0', 'px-0', 'py-0', 'container-fluid', 'h-auto')
    div.innerHTML = `     
                            <img src="${(!comic.images.length == 0) ? comic.images[0].path : "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"}/portrait_incredible.jpg" class="card-img-top img-fluid" alt="...">
                            <div class="card-body card-bd-comics">
                              <p class="f-p text-white fw-bold fs-2">${comic.title.split("#")[0]}</p>
                              <p class="f-s text-white fw-light">${comic.series.name}</p>
                              <p class="f-s text-white m-0 fst-italic">Annuncio del: ${comic.pubblished.toLocaleDateString("it-IT")}</p>
                              <p class="f-p text-white fw-light fs-4">Prezzo: ${comic.prices[0].price} €</p>
                              <button class="btn f-s text-white fw-light bottom-0">
                                Visualizza prodotto <img src="icons8-cerchiato-destro-30.png">
                              </button>
                            </div>
                          `

    upcomingBooksWrapper.append(div)
    
  })

  const copyright = document.querySelector('.copyright');
  copyright.textContent = json.attributionText
  
  
})

// <div class="card bg-card-comic p-2 h-100">
    //   <div class="container h-100">
    //     <div class="row h-100">
    //       <div class="col-5">
    //         <img src="${(!comic.images.length == 0) ? comic.images[0].path : "https://blogs.cul.columbia.edu/rbml/files/2021/12/1991QuarterlyCover-scaled"}/landscape_xlarge.jpg" class="img-fluid" alt="...">
    //       </div>
    //       <div class="col-7 h-100 d-flex flex-column justify-content-between">
    //         <div>
    //           <p class="f-p h1 tx-thi">${comic.title.split("#")[0]}</p>
    //           <p class="f-p lead text-white">${comic.series.name}</p>
    //           <p class="f-s text-secondary">${comic.description ?  comic.description.substring(0, 200) + " [...]": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus libero eveniet odit aliquam esse saepe. Quo, non vero animi, saepe natus doloribus quibusdam nihil eaque id nobis veniam! Autem, minima?Lorem ipsum dolor, sit amet consectetur adipisicing elit."}</p>
    //           <p class="f-s text-white m-0 fw-bold fst-italic">${comic.pubblished.toLocaleDateString("it-IT")}</p>
    //         </div>
    //         <div class="d-flex justify-content-between align-items-center">
    //           <p class="f-p tx-acc h3 m-0">${comic.prices[0].price} €</p>
    //           <button class="btn d-flex align-items-center">
    //             <p class="my-0 me-2 f-s tx-acc fw-bold">Checkout</p>
    //             <i class="bi bi-arrow-right-circle-fill fs-2 tx-acc"></i>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>