const template = document.querySelector('#poke').content;
const templatePoke = document.querySelector('#lista-pokemon').content;

const sectionCard = document.querySelector('#container-card');
const pokemon = document.querySelector('#list-poke');


const btnSelect = document.querySelector('.actions-btn');
//const btnSave = document.querySelector('.btn-save');
//const btnDelete = document.querySelector('.pokemon');

const cardPoke = document.querySelector('.row-card');


const fragment = document.createDocumentFragment();
let url = `https://pokeapi.co/api/v2/pokemon/`;

let pokem = {};
//let pokem = [];

document.addEventListener('DOMContentLoaded', () =>{
    fechData();
   // getLocalStorage();

    btnSelect.addEventListener('click', e => changePokemon(e));
    cardPoke.addEventListener('click', e => getPokemon(e));
    pokemon.addEventListener('click', e => deletePokemon(e));
    //btnSave.addEventListener('click', e =>getPokemon(e));

});

 const fechData = async(id = 100) =>{
     try {
         const res = await fetch(`${url}${id}`);
         const data = await res.json();
         createObj(data);
     } catch (error) {
          console.log(error)
     }
 }

 const createObj = (poke) => {
    //console.log(poke)

    const objeto = {
        id: poke.id,
        name: poke.name,
        height: poke.height,
        weight: poke.weight,
        image: poke.sprites.other.dream_world.front_default,
        type: poke.types[0].type.name,
        speed: poke.stats[5].base_stat,
        attack: poke.stats[1].base_stat
    }
    createHtml(objeto);
     
 }

    const createHtml = (obj) =>{
        cleanCard();
        const {name, height, weight, image, type, speed, id} = obj;

        const clone = template.cloneNode(true);

        clone.querySelector('.card-body-image').setAttribute('src', image);
        clone.querySelector('h2').textContent = name;
        clone.querySelector('p'). textContent = type;
        clone.querySelectorAll('.card-footer-details h3')[0].textContent = weight + 'kg';
        clone.querySelectorAll('.card-footer-details h3')[1].textContent = height + 'mts';
        clone.querySelectorAll('.card-footer-details h3')[2].textContent = speed + 'k/h';
        clone.querySelector('span').textContent = id;
        

        fragment.appendChild(clone);
         
        sectionCard.appendChild(fragment);
    }
   
    const changePokemon = (e) =>{
        if(e.target.classList.contains('btn-change')){
            
            const ramdom = obtRandomInt(1, 151);
            fechData(ramdom)
        }
    }
   

    function obtRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }

    const getPokemon = e => {
       if(e.target.classList.contains('btn-save')){
           pokeSelected = e.target.parentElement.parentElement;
           readPokemon(pokeSelected);  
       }
       console.log(e.target.classList.contains('btn-save'))
        e.stopPropagation();
    }

 const readPokemon = (pokemon) => {
    //console.log(pokemon)
    infoPokemon = {
        id: pokemon.querySelector('span').textContent,
        img: pokemon.querySelector('img').src,
        nam: pokemon.querySelector('h2').textContent
    }

      if(pokem.hasOwnProperty(infoPokemon.id)){
    
          alert('Este pokemon ya fue guardado');
       } 
       else{
         pokem[infoPokemon.id] = {...infoPokemon };
      }
       
    paintPokemon();    
 }

  const paintPokemon = () =>{

        cleanPokeHTML();
        console.log(pokem)
        // console.log(Object.values(pokem).length)

         if(Object.values(pokem).length > 12){
             console.log('no puede agregar mas pokemon')
           return;
         }
            Object.values(pokem).forEach(pokemo => {
                const clone = templatePoke.cloneNode(true);

            clone.querySelector('img').setAttribute('src', pokemo.img);
            clone.querySelector('p').textContent = pokemo.nam;
            clone.querySelector('span').textContent = pokemo.id;
            clone.querySelector('.btn-supr').dataset.id = pokemo.id;
            
            
            fragment.appendChild(clone); 
        });
            pokemon.appendChild(fragment);

            addLocalStorage();
    }

 
 const deletePokemon = (e) => {
      
     if(e.target.classList.contains('btn-supr'));{
         delete pokem[e.target.dataset.id];
     }

     const pokeId = e.target.dataset.id;
    
      pokem = Object.values(pokem).filter(pokemon => pokemon.id !== pokeId);

      paintPokemon();
      e.stopPropagation()
}

    const addLocalStorage = () =>{
    // localStorage.setItem('pokemon', JSON.stringify(pokem))
    
  }


//   const getLocalStorage = () => {

//     if(localStorage.getItem('pokemon') == null) {
//          pokem = [];
//     }else {
//         pokem = JSON.parse(localStorage.getItem('pokemon'));
//     }
     
//      // console.log(pokem)
    
//   }
  
   function cleanPokeHTML(){
      while(pokemon.firstChild){
          pokemon.removeChild(pokemon.firstChild)
      }
  }

  const cleanCard = () =>{
      while(sectionCard.firstChild){
          sectionCard.removeChild(sectionCard.firstChild);
      }
  }