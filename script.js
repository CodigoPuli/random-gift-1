const giftContainer = document.getElementById('gift-container');
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
    addSwipeFunctionality(currentCard);  // Añadir funcionalidad de swipe
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

function addSwipeFunctionality(card) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const startDrag = (e) => {
        startX = e.clientX || e.touches[0].clientX;
        isDragging = true;
        card.style.transition = 'none';
    };

    const duringDrag = (e) => {
        if (!isDragging) return;
        currentX = e.clientX || e.touches[0].clientX;
        const diff = currentX - startX;
        card.style.transform = `translateX(${diff}px) rotate(${diff / 20}deg)`;
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;

        if (Math.abs(diff) > 100) {
            card.style.transition = 'transform 0.3s ease-in-out';
            card.style.transform = `translateX(${diff > 0 ? 1000 : -1000}px) rotate(${diff / 20}deg)`;

            // Cambiar la imagen actual por la siguiente
            currentGift = (currentGift + (diff > 0 ? -1 : 1) + gifts.length) % gifts.length;

            card.addEventListener('transitionend', () => {
                renderCards();
            }, { once: true });
        } else {
            card.style.transition = 'transform 0.3s ease-in-out';
            card.style.transform = 'translateX(0) rotate(0)';
        }
    };

    // Eventos para ratón
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('mousemove', duringDrag);
    card.addEventListener('mouseup', endDrag);
    card.addEventListener('mouseleave', endDrag);

    // Eventos para pantallas táctiles
    card.addEventListener('touchstart', startDrag);
    card.addEventListener('touchmove', duringDrag);
    card.addEventListener('touchend', endDrag);
}

renderCards();
