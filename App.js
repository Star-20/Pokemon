

const pokemon1 = document.getElementById('pokemon1');
const cachedPokemon = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
            1}.png`
    }));

    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokemon_new) =>
                `
    <li class="banner" onclick="selectPokemon(${pokemon_new.id})">
        <img class="banner-image" src="${pokemon_new.image}"/>
        <h2 class="banner-title">${pokemon_new.id}. ${pokemon_new.name}</h2>
        </a>
    </li>
        `
        )
        .join('');
    pokemon1.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon_new = await res.json();
        cachedPokemon[id] = pokemon_new;
        displaypokemon_newPopup(pokemon_new);
    } else {
        displaypokemon_newPopup(cachedPokemon[id]);
    }
};

const displaypokemon_newPopup = (pokemon_new) => {
    console.log(pokemon_new);
    const type = pokemon_new.types.map((type) => type.type.name).join(', ');
    const htmlString = `
        <div class="popup">
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="banner">
                <img class="banner-image" src="${
                    pokemon_new.sprites['front_default']
                }"/>
                <h2 class="banner-title">${pokemon_new.name}</h2>
                <p><small>Type: ${type} | Height:</small> ${pokemon_new.height} | Weight: ${
        pokemon_new.weight
    }</p>
            </div>
        </div>
    `;
    pokemon1.innerHTML = htmlString + pokemon1.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();
