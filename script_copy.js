
/*let pokemonList = [
    { name: 'Balbasure', height: 7, type: ['grass', 'poison'] },
    { name: 'Charizard', height: 2, type: ['fire', 'flying'] },
    { name: 'Mightyena', height: 1.7, type: 'dark' }
];
for (let i = 0;
    i < pokemonList.length; i++) {
    if(pokemonList[i].height >= 5) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - Wow, that is big!" + "<br>")
    }
    else if (pokemonList[i].height >= 2 && pokemonList[i].height < 5){
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - That is a medium pokemon!" + "<br>")
    }
    else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + " m) - That is a small pokemon!" + "<br>")
    }
}*/

/*let pokemonRepository =(function(){
    let pokemonList = [
        { name: 'Balbasure', 
        height: 7, 
        type: ['grass', 'poison'] },

        { name: 'Charizard', 
        height: 2, 
        type: ['fire', 'flying'] },

        { name: 'Mightyena', 
        height: 1.7, 
        type: 'dark' }
    ]

    function getAll() {
        return pokemonList;
      }

      function add(pokemon) { 
        if (typeof pokemon === 'object' && 'name' in pokemon){
        pokemonList.push(pokemon);
      }
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');
        
        let button = document.createElement('button');
        button.innerText = pokemon.name
        button.classList.add('button-class');
    
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        button.addEventListener('click', function(event) {
			showDetails(pokemon)
		})
	}

	function showDetails(pokemon) {
		console.log(pokemon);
    }
        

      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
      }

})()

pokemonRepository.add({name:'Fearow', height: 1.2, type:['normal', 'flying']});


pokemonRepository.getAll().forEach(function(pokemon){
pokemonRepository.addListItem(pokemon);
})*/

/*let container = document.querySelector('.container');
container.innerHTML = '<button>Click Me</button>';
console.log(container.innerHTML);*/

/* if(pokemon.height >= 5) {
        document.write(pokemon.name + " (height: " + pokemon.height + " m) - Wow, that is big!" + "<br>")
    }
    else if (pokemon.height >= 2 && pokemon.height < 5){
        document.write(pokemon.name + " (height: " + pokemon.height + " m) - That is a medium pokemon!" + "<br>")
    }
    else {
        document.write(pokemon.name + " (height: " + pokemon.height + " m)- That is a small pokemon!" + "<br>")
    }  */

    let pokemonRepository = (function () {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        function add(pokemon) { 
            if (typeof pokemon === 'object' && 'name' in pokemon){
            pokemonList.push(pokemon);
          } else {
            console.log("pokemon is not correct");
          }
        }

        function getAll() {
            return pokemonList;
          }

        function addListItem(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list');
    
            let listpokemon = document.createElement('li');
            
            let button = document.createElement('button');
            button.innerText = pokemon.name
            button.classList.add('button-class');
        
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
    
            button.addEventListener('click', function(event) {
                showDetails(pokemon)
            });
        }
    
      
        function loadList() {
          return fetch(apiUrl).then(function (response) {
            return response.json();
          }).then(function (json) {
            json.results.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url
              };
              add(pokemon);
            });
          }).catch(function (e) {
            console.error(e);
          })
        }


        function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (details) {
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types;
            }).catch(function (e) {
              console.error(e);
            });
          }

        function showDetails(pokemon) {
            pokemonRepository.loadDetails(pokemon).then(function () {
              console.log(pokemon);
            });
          }

        return {
          add: add,
          getAll: getAll,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          showDetails: showDetails,

        };
      })();
      
      pokemonRepository.loadList().then(function() {
        pokemonRepository.getAll().forEach(function(pokemon){
          pokemonRepository.addListItem(pokemon);
        });
      });


         /* let pokemonRepository = (function () {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        function add(pokemon) { 
            if (typeof pokemon === 'object' && 'name' in pokemon){
            pokemonList.push(pokemon);
          } else {
            console.log("pokemon is not correct");
          }
        }

        function getAll() {
            return pokemonList;
          }

        function addListItem(pokemon) {
            let pokemonList = document.querySelector('.pokemon-list');
    
            let listpokemon = document.createElement('li');
            
            let button = document.createElement('button');
            button.innerText = pokemon.name
            button.classList.add('button-class');
        
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
    
            button.addEventListener('click', function(event) {
                showDetails(pokemon)
            });
        }
    
        function loadList() {
          return fetch(apiUrl).then(function (response) {
            return response.json();
          }).then(function (json) {
            json.results.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url
              };
              add(pokemon);
            });
          }).catch(function (e) {
            console.error(e);
          })
        }


        function loadDetails(item) {
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
              return response.json();
            }).then(function (details) {
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.types = details.types;
            }).catch(function (e) {
              console.error(e);
            });
          }

        function showDetails(pokemon) {
            pokemonRepository.loadDetails(pokemon).then(function () {
              console.log(pokemon);
            });
          }

        return {
          add: add,
          getAll: getAll,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          showDetails: showDetails,

        };
      })();
      
      pokemonRepository.loadList().then(function() {
        pokemonRepository.getAll().forEach(function(pokemon){
          pokemonRepository.addListItem(pokemon);
        });
      });*/

      let pokemonRepository = (function () {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        let pokemonListElement = document.querySelector('.pokemon-list');


        function add(pokemon) {
          if (
            typeof pokemon === "object" &&
            "name" in pokemon
          ) {
            pokemonList.push(pokemon);
          } else {
            console.log("pokemon is not correct");
          }
        }

        function getAll() {
          return pokemonList;
        }

        function addListItem(pokemon) {
          let pokemonList = document.querySelector(".pokemon-list");
          let listpokemon = document.createElement("li");
          let button = document.createElement("button");
          button.innerText = pokemon.name;
          button.classList.add("button-class");
          listpokemon.appendChild(button);
          pokemonList.appendChild(listpokemon);
          button.addEventListener("click", function(event) {
            showDetails(pokemon);
          });
        };
      
        function loadList() {
          return fetch(apiUrl).then(function (response) {
            return response.json();
          }).then(function (json) {
            json.results.forEach(function (item) {
              let pokemon = {
                name: item.name,
                detailsUrl: item.url
              };
              add(pokemon);
              console.log(pokemon);
            });
          }).catch(function (e) {
            console.error(e);
          })
        }
      
        function loadDetails(item) {
          let url = item.detailsUrl;
          return fetch(url).then(function (response) {
            return response.json();
          }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types.map((type) => type.type.name).join(',');
          }).catch(function (e) {
            console.error(e);
          });
        }


        function showDetails(pokemon) {
          pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
            //console.log(item);
          });
        };

        function showModal(pokemon) {
        let modalContainer = document.querySelector('.modal-container');  
        modalContainer.innerText = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let title = document.createElement('h1');
        title.innerText = pokemon.name;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrl;

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = "Height: " + pokemon.height;

        let pokemonTypes = document.createElement('p');
        pokemonTypes.innerText = "Type: " + pokemon.types;

        modal.appendChild(title);  
        modal.appendChild(pokemonImage);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes);
        modalContainer.appendChild(modal);
          
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        })

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        let modalContainer = document.querySelector('.modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('.modal-container');
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });
        
      
        return {
          add: add,
          getAll: getAll,
          addListItem: addListItem,
          loadList: loadList,
          loadDetails: loadDetails,
          showDetails: showDetails
        };
      })();
      
      
      pokemonRepository.loadList().then(function () {
        pokemonRepository.getAll().forEach(function (pokemon) {
          pokemonRepository.addListItem(pokemon);
        });
      });



              // show the modal content
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    let $modalContainer = $("#modal-container");
    //clear existing content of the model
    modalHeader.empty();
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1>" + item.name + "</h1>");
    // // creating img in modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    // //creating element for height in modal content
    let heightElement = $("<p>" + "height : " + item.height + "</p>");
    // //creating element for weight in modal content
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>");
    // //creating element for type in modal content
    let typesElement = $("<p>" + "types : " + item.types + "</p>");
    // //creating element for abilities in modal content
    let abilitiesElement = $("<p>" + "abilities : " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

   //modal
 function showModal(pokemon) {
  let modalBody = $(".modal-body");
  let modalTitle = $(".modal-title");

  modalTitle.empty();
  modalBody.empty();

  let titleElement = $("<h1>" + pokemon.name + "</h1>");
  let imageElement = $('<img class="modal-img">');
  imageElement.attr("src", pokemon.imageUrl);
  let contentElement = $("<p>" + "Height: " + pokemon.height + "</p>");
  let typesElement = $("<p>" + "Type: " + pokemon.types + "</p>");
  let abilityElement = $("<p>" + "Ability: " + pokemon.abilities + "</p>");

  modalTitle.append(titleElement);
  modalBody.append(imageElement);
  modalBody.append(contentElement);
  modalBody.append(typesElement);
  modalBody.append(abilityElement);
}

searchBar.addEventListener("input", function () {
  let pokemonList = document.querySelectorAll(".button-pokemon");
  let inputValue = searchBar.value.toUpperCase();

  pokemonList.forEach(function (pokemon) {
    if (pokemon.innerText.toUpperCase().indexOf(inputValue) > -1) {
      pokemon.style.display = "";
    } else {
      pokemon.style.display = "none";
    }
  });
});