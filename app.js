// Ton lien Render exact !
const apiURL = "https://tp-nosql-o-herbiet.onrender.com/api/pokemons";
const pokedexContainer = document.getElementById('pokedex-container');

// Fonction asynchrone pour aller chercher les données
async function fetchPokemons() {
    try {
        // On "fetch" (récupère) les données de ton API
        const response = await fetch(apiURL);
        const data = await response.json(); // On traduit la réponse en JSON
        
        // On vérifie si le tableau "data" est vide
        if (data.data.length === 0) {
            pokedexContainer.innerHTML = "<p class='loading'>Aucun Pokémon dans la base de données pour le moment ! 😢</p>";
            return;
        }

        // S'il y a des Pokémon, on lance la fonction pour les afficher
        displayPokemons(data.data);

    } catch (error) {
        console.error("Erreur de connexion à l'API :", error);
        pokedexContainer.innerHTML = "<p class='loading'>Oups, impossible de se connecter à l'API Render.</p>";
    }
}

// Fonction pour fabriquer les cartes HTML (C'EST CETTE PARTIE QUI A CHANGÉ)
function displayPokemons(pokemons) {
    pokedexContainer.innerHTML = ""; // On efface le message de chargement

    // Pour chaque pokémon dans ta base de données...
    pokemons.forEach(pokemon => {
        // On crée une <div>
        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        // On va chercher les infos avec la bonne orthographe de ton JSON
        const nom = pokemon.name.french || 'Inconnu';
        const image = pokemon.image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
        const hp = pokemon.base ? pokemon.base.HP : '?';

        // On remplit la carte
        card.innerHTML = `
            <img src="${image}" alt="Image de ${nom}">
            <h3>${nom}</h3>
            <p>HP : ${hp}</p>
        `;

        // On ajoute la carte à l'écran
        pokedexContainer.appendChild(card);
    });
}

// On démarre la machine quand le fichier est lu
fetchPokemons();