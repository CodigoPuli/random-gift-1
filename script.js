const giftCard = document.getElementById('gift-card');
const favoritesList = document.getElementById('favorites-list');
const gifts = [
    'images/regalo1.jpg',
    'images/regalo2.jpg',
    'images/regalo3.jpg',
    'images/regalo4.jpg',
    'images/regalo5.jpg',
    'images/regalo6.jpg',
    'images/regalo7.jpg',
    'images/regalo8.jpg',
    'images/regalo9.jpg',
    'images/regalo10.jpg',
    'images/regalo11.jpg',
    'images/regalo12.jpg',
    'images/regalo13.jpg'
];

let currentGift = 0;
let favorites = [];

function createCard(imageSrc) {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.innerHTML = `
        <img src="${imageSrc}" alt="Regalo">
        <button class="favorite-btn">❤️</button>
    `;
    return card;
}

function renderCards() {
    giftCard.innerHTML = '';
    const currentCard = createCard(gifts[currentGift]);
    giftCard.appendChild(currentCard);
    addFavoriteFunctionality(currentCard);  // Añadir funcionalidad de favoritos
}

function addFavoriteFunctionality(card) {
    const favoriteBtn = card.querySelector('.favorite-btn');

    // Verificar si el regalo está en favoritos
    if (favorites.includes(gifts[currentGift])) {
        favoriteBtn.classList.add('favorited');
    } else {
        favoriteBtn.classList.remove('favorited');
    }

    // Manejo del evento click
    favoriteBtn.addEventListener('click', () => {
        if (favorites.includes(gifts[currentGift])) {
            favorites = favorites.filter(gift => gift !== gifts[currentGift]);  // Eliminar de favoritos
        } else {
            favorites.push(gifts[currentGift]);  // Añadir a favoritos
        }
        favoriteBtn.classList.toggle('favorited');
        updateFavoritesList();  // Actualizar la lista de favoritos
    });
}

function updateFavoritesList() {
    // Limpiar la lista de favoritos
    favoritesList.innerHTML = '';

    // Mostrar las imágenes de los favoritos
    favorites.forEach((gift) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <img src="${gift}" alt="Favorito">
            <button class="favorite-btn">❤️</button>
        `;

        // Añadir el botón de favorito para eliminar del favorito si es necesario
        const favoriteBtn = favoriteItem.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', () => {
            favorites = favorites.filter(fav => fav !== gift);  // Eliminar de favoritos
            updateFavoritesList();  // Actualizar la lista de favoritos
        });

        favoritesList.appendChild(favoriteItem);
    });
}

renderCards();
