// Ton lien Render exact !
const apiURL = "https://tp-nosql-o-herbiet.onrender.com/api/pokemons";
const pokedexContainer = document.getElementById('pokedex-container');

// Fonction asynchrone pour aller chercher les données
async function fetchPokemons() {
    try {
        // On "fetch" (récupère) les données de ton API
        const response = await fetch(apiURL);
        const data = await response.json(); // On traduit la réponse en JSON
        
        // On vérifie si le tableau "data" est vide (comme on l'a vu sur ton navigateur)
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

// Fonction pour fabriquer les cartes HTML
function displayPokemons(pokemons) {
    pokedexContainer.innerHTML = ""; // On efface le message de chargement

    // Pour chaque pokémon dans ta base de données...
    pokemons.forEach(pokemon => {
        // On crée une <div>
        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        // On remplit la carte avec le nom et l'image (tu pourras adapter selon comment tu as nommé tes variables dans ton schéma mongoose !)
        card.innerHTML = `
            <img src="${pokemon.picture || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'}" alt="Image de ${pokemon.name}">
            <h3>${pokemon.name || 'Nom inconnu'}</h3>
            <p>HP : ${pokemon.hp || '?'}</p>
        `;

        // On ajoute la carte à l'écran
        pokedexContainer.appendChild(card);
    });
}

// On démarre la machine quand le fichier est lu
fetchPokemons();