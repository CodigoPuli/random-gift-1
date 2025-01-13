const nextBtn = document.getElementById('next-btn');
const giftCard = document.getElementById('gift-card');
const gifts = [
    'images/regalo1.jpg',
    'images/regalo2.jpg',
    'images/regalo3.jpg', // Agrega más imágenes en la carpeta "images"
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

nextBtn.addEventListener('click', () => {
    currentGift = (currentGift + 1) % gifts.length;
    giftCard.innerHTML = `<img src="${gifts[currentGift]}" alt="Regalo"> <button id="next-btn">Siguiente</button>`;
    addSwipeFunctionality();
});

// Agregar funcionalidad de swipe con ratón o touch
let startX = 0;
let currentX = 0;
let isDragging = false;

giftCard.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    giftCard.style.transition = 'none'; // Desactivamos la transición mientras se arrastra
});

giftCard.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const diff = currentX - startX;
    giftCard.style.transform = `translateX(${diff}px)`; // Mueve la tarjeta
});

giftCard.addEventListener('mouseup', () => {
    isDragging = false;
    giftCard.style.transition = 'transform 0.3s ease-in-out';
    if (currentX - startX > 100) {
        // Deslizar hacia la derecha (aceptar regalo)
        nextGift();
    } else if (startX - currentX > 100) {
        // Deslizar hacia la izquierda (rechazar regalo)
        nextGift();
    } else {
        // Si no se desliza lo suficiente, volver a la posición inicial
        giftCard.style.transform = 'translateX(0)';
    }
});

giftCard.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    giftCard.style.transition = 'none';
});

giftCard.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    giftCard.style.transform = `translateX(${diff}px)`;
});

giftCard.addEventListener('touchend', () => {
    isDragging = false;
    giftCard.style.transition = 'transform 0.3s ease-in-out';
    if (currentX - startX > 100) {
        nextGift();
    } else if (startX - currentX > 100) {
        nextGift();
    } else {
        giftCard.style.transform = 'translateX(0)';
    }
});

function nextGift() {
    currentGift = (currentGift + 1) % gifts.length;
    giftCard.innerHTML = `<img src="${gifts[currentGift]}" alt="Regalo"> <button id="next-btn">Siguiente</button>`;
    addSwipeFunctionality();
}

addSwipeFunctionality();
