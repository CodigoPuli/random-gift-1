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

function createCard(imageSrc) {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.innerHTML = `<img src="${imageSrc}" alt="Regalo">`;
    return card;
}

function showFeedback(message, color) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.textContent = message;
    feedback.style.color = color;
    feedback.style.position = 'absolute';
    feedback.style.bottom = '10px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.fontSize = '1.5rem';
    feedback.style.fontWeight = 'bold';
    feedback.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.5)';
    giftCard.appendChild(feedback);
    setTimeout(() => feedback.remove(), 1000);
}

function renderCards() {
    giftCard.innerHTML = '';
    const currentCard = createCard(gifts[currentGift]);
    giftCard.appendChild(currentCard);
}

function addSwipeFunctionality() {
    const card = document.querySelector('.gift-card');

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const startDrag = (x) => {
        startX = x;
        isDragging = true;
        card.style.transition = 'none';
    };

    const duringDrag = (x) => {
        if (!isDragging) return;
        currentX = x;
        const diff = currentX - startX;
        card.style.transform = `translateX(${diff}px) rotate(${diff / 20}deg)`;
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;

        card.style.transition = 'transform 0.3s ease-in-out';

        if (diff > 100 && currentGift > 0) { // Deslizar a la derecha
            card.style.transform = 'translateX(1000px) rotate(20deg)';
            showFeedback('Dislike', 'red');
            card.addEventListener('transitionend', () => {
                currentGift = (currentGift - 1 + gifts.length) % gifts.length;
                renderCards();
                addSwipeFunctionality();
            }, { once: true });
        } else if (diff < -100 && currentGift < gifts.length - 1) { // Deslizar a la izquierda
            card.style.transform = 'translateX(-1000px) rotate(-20deg)';
            showFeedback('Like', 'green');
            card.addEventListener('transitionend', () => {
                currentGift = (currentGift + 1) % gifts.length;
                renderCards();
                addSwipeFunctionality();
            }, { once: true });
        } else {
            card.style.transform = 'translateX(0) rotate(0)';
        }
    };

    // Eventos para ratón
    card.addEventListener('mousedown', (e) => startDrag(e.clientX));
    card.addEventListener('mousemove', (e) => duringDrag(e.clientX));
    card.addEventListener('mouseup', endDrag);
    card.addEventListener('mouseleave', endDrag);

    // Eventos para pantallas táctiles
    card.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    card.addEventListener('touchmove', (e) => duringDrag(e.touches[0].clientX));
    card.addEventListener('touchend', endDrag);
}

renderCards();
addSwipeFunctionality();
