const apiURL = "https://tp-nosql-o-herbiet.onrender.com/api/pokemons";
const pokedexContainer = document.getElementById('pokedex-container');
const searchInput = document.getElementById('search-input'); // On récupère la barre de recherche

let allPokemons = []; // On crée une variable pour stocker TOUS les pokémons

async function fetchPokemons() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        if (data.data.length === 0) {
            pokedexContainer.innerHTML = "<p class='loading'>Aucun Pokémon trouvé ! 😢</p>";
            return;
        }

        allPokemons = data.data; // On sauvegarde la liste complète ici
        displayPokemons(allPokemons); // On affiche tout au début

    } catch (error) {
        console.error("Erreur :", error);
        pokedexContainer.innerHTML = "<p class='loading'>Erreur de connexion à l'API.</p>";
    }
}

// --- LA MAGIE DE LA RECHERCHE ---
searchInput.addEventListener('input', (e) => {
    const searchString = e.target.value.toLowerCase(); // Ce que l'utilisateur tape

    // On filtre la liste sauvegardée
    const filteredPokemons = allPokemons.filter(pokemon => {
        const nom = pokemon.name.french.toLowerCase();
        return nom.includes(searchString);
    });

    displayPokemons(filteredPokemons); // On ré-affiche seulement ceux qui correspondent
});

function displayPokemons(pokemons) {
    pokedexContainer.innerHTML = ""; 

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        const nom = pokemon.name.french || 'Inconnu';
        let image = pokemon.image;
        
        if (!image || image.includes('localhost') || !image.startsWith('http')) {
            image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        }
        
        const hp = pokemon.base ? pokemon.base.HP : '?';

        card.innerHTML = `
            <img src="${image}" alt="Image de ${nom}">
            <h3>${nom}</h3>
            <p>HP : ${hp}</p>
        `;
        pokedexContainer.appendChild(card);
    });
}

fetchPokemons();