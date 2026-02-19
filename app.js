// Ton lien Render exact !
const apiURL = "https://tp-nosql-o-herbiet.onrender.com/api/pokemons";
const pokedexContainer = document.getElementById('pokedex-container');

// Fonction asynchrone pour aller chercher les données
async function fetchPokemons() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json(); 
        
        if (data.data.length === 0) {
            pokedexContainer.innerHTML = "<p class='loading'>Aucun Pokémon dans la base de données pour le moment ! 😢</p>";
            return;
        }

        displayPokemons(data.data);

    } catch (error) {
        console.error("Erreur de connexion à l'API :", error);
        pokedexContainer.innerHTML = "<p class='loading'>Oups, impossible de se connecter à l'API Render.</p>";
    }
}

// Fonction pour fabriquer les cartes HTML
function displayPokemons(pokemons) {
    pokedexContainer.innerHTML = ""; 

    pokemons.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        const nom = pokemon.name.french || 'Inconnu';
        let image = pokemon.image;
        
        // La fameuse rustine anti-localhost !
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

// On démarre la machine quand le fichier est lu
fetchPokemons();