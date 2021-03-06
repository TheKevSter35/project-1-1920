/*** Fetching data -> refactor into module later ***/
const button = document.getElementById('submitbtn')
button.addEventListener("click", getUserInput);

function getUserInput() {
  //Get the user input
  const userInput = document.querySelector("input").value
  console.log("Searching for: ", userInput)

  //Loading State
  const trefwoord = document.getElementById("trefwoord")
      trefwoord.innerHTML = ''
      trefwoord.innerHTML = 'Zoeken naar ' + (userInput) + '......'

  const main = document.querySelector('main');
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
  const query = (userInput);
  const key = '0076bc3bc11d080e07a303360178002a';
  const secret = '187b973dc49e054fa7635313a9c8540f';
  const detail = 'Default';


  const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`;
  const config = {
    Authorization: `Bearer ${secret}`
  };

  fetch(url, config)
    .then(response => {
      const list = document.getElementById('list')
      list.innerHTML = ''
      return response.json();
    })
    .then(data => {
      render(data);
      const trefwoord = document.getElementById("trefwoord")
      trefwoord.innerHTML = ''
      trefwoord.innerHTML = 'Boeken gevonden over: ' + (userInput)
    })
    .catch(err => {
      console.log(err);
    });

  // render data
  function render(data) {
    const results = data.results;
    console.dir(results);
    results.forEach(item => {
      const html = `
            <article>
              <img src="${
                item.coverimages ? item.coverimages[1] : 'Geen samenvatting'
              }">
              <a href = '#${item.isbn ? item.isbn[0]: '' }'></a>
            </article>
            
          `;
      main.insertAdjacentHTML('beforeend', html);
      routie({

        [item.isbn]: function () {
            const Info = document.getElementById('detail')
            Info.innerHTML = ""
            const hash = window.location.hash.slice(1)
            if (hash == item.isbn) {
              const html = `
            <ul id = "bookinfo">
            <li>
            <img src="${
               item.coverimages[1]
            }">
            </li>
            <li>
            <b>Titel</b>
              <p>${item.titles}</p>
              <hr>
              <b>Talen </b>
              <p>${item.languages}</p>
              <hr>
              <b>Samenvatting </b>
              <p>${item.summaries ? item.summaries[0] : 'Geen samenvatting'}</p>
              <hr>
              <p><a class='close' href ="#overview"> X </a>
             <a href ="#editor"> Maak een Werkstuk </a>
             </p>
            </li>
            </ul>
            
          `;
              Info.insertAdjacentHTML('beforeend', html);

            }
          },
          overview: function () {
            const overview = document.getElementById("bookinfo");
            overview.parentNode. removeChild(overview);
          },
          editor: function () {
            const Info = document.getElementById('page')
            Info.innerHTML = ""
            const html = `
            <section id="editor">
            <div class="block1">
              <sidebar>
               
             <p> <img id ="editorbook" src="https://v111.nbc.bibliotheek.nl/thumbnail?uri=http://data.bibliotheek.nl/ggc/ppn/363926461&token=c1322402"></p>
            <div class="controls">
             <button id "back" onclick="document.getElementById('editorbook').src='https://v111.nbc.bibliotheek.nl/thumbnail?uri=http://data.bibliotheek.nl/ggc/ppn/363926461&token=c1322402'">Vorige</button> 
             <p>Bladzijde</p>
             <button id "next" onclick="document.getElementById('editorbook').src='./static/source/voorbeeld-blz.jpg'">Volgende</button> 
            </div>
          </div>
            <div class="block2">
              <div class="editorButtons">
                <ul>
                  <button onclick="document.getElementById('editorveld').style.fontFamily = 'Helvetica'"><img src="./static/source/text.svg" alt=""></button>
                  <button onclick="document.getElementById('editorveld').style.fontWeight  = '900'"><img src="./static/source/bold.svg" alt=""></button>
                  <button onclick="document.getElementById('editorveld').style.fontStyle  = 'italic'"><img src="./static/source/italic.svg" alt=""></button>
                  <button onclick="document.getElementById('editorveld').style.textDecoration  = 'underline'"><img src="./static/source/underline.svg" alt=""></button>
                  <button onclick="document.getElementById('editorveld').style.color = 'red'" ><img src="./static/source/color.svg" alt=""></button>
                  <input class="filebutton" type="file">
                  <button onclick="window.print()" ><img src="./static/source/print.svg" alt=""></button>
                  <button> <a href="mailto:email@address.com"><img src="./static/source/gmail.svg" alt=""></a></button>
                  <button><img src="./static/source/pdf.svg" alt=""></button>
                  </ul>
                <textarea id="editorveld" rows="29" cols="80"></textarea>
              </div>
            </sidebar>
            </div>
          </section>
          
          `;

              Info.insertAdjacentHTML('beforeend', html);
          
          }
          
      })
    })
  }
}

//bron:     //https://www.delubas.nl/leesseries/skoop/voor-makkelijk-lezen-in-groep-5-tm-8/