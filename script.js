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
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 1000);
}

function renderCards() {
    giftCard.innerHTML = '';
    const currentCard = createCard(gifts[currentGift]);
    const nextCard = createCard(gifts[(currentGift + 1) % gifts.length]);
    nextCard.style.transform = 'scale(0.9)';
    giftCard.appendChild(nextCard);
    giftCard.appendChild(currentCard);
}

function addSwipeFunctionality() {
    const cards = document.querySelectorAll('.gift-card');
    if (cards.length < 2) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const currentCard = cards[1];
    const nextCard = cards[0];

    const startDrag = (x) => {
        startX = x;
        isDragging = true;
        currentCard.style.transition = 'none';
        nextCard.style.transition = 'none';
    };

    const duringDrag = (x) => {
        if (!isDragging) return;
        currentX = x;
        const diff = currentX - startX;
        currentCard.style.transform = `translateX(${diff}px) rotate(${diff / 20}deg)`;
        nextCard.style.transform = `scale(${Math.max(0.9, 1 - Math.abs(diff) / 300)})`;
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;

        if (Math.abs(diff) > 100) {
            currentCard.style.transition = 'transform 0.3s ease-in-out';
            nextCard.style.transition = 'transform 0.3s ease-in-out';

            if (diff > 0) {
                currentCard.style.transform = 'translateX(1000px) rotate(20deg)';
                showFeedback('Dislike', 'red');
            } else {
                currentCard.style.transform = 'translateX(-1000px) rotate(-20deg)';
                showFeedback('Like', 'green');
            }

            nextCard.style.transform = 'scale(1)';
            currentCard.addEventListener('transitionend', () => {
                currentGift = (currentGift + 1) % gifts.length;
                renderCards();
                addSwipeFunctionality();
            }, { once: true });
        } else {
            currentCard.style.transition = 'transform 0.3s ease-in-out';
            nextCard.style.transition = 'transform 0.3s ease-in-out';
            currentCard.style.transform = 'translateX(0) rotate(0)';
            nextCard.style.transform = 'scale(0.9)';
        }
    };

    // Eventos para ratón
    currentCard.addEventListener('mousedown', (e) => startDrag(e.clientX));
    currentCard.addEventListener('mousemove', (e) => duringDrag(e.clientX));
    currentCard.addEventListener('mouseup', endDrag);
    currentCard.addEventListener('mouseleave', endDrag);

    // Eventos para pantallas táctiles
    currentCard.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    currentCard.addEventListener('touchmove', (e) => duringDrag(e.touches[0].clientX));
    currentCard.addEventListener('touchend', endDrag);
}

renderCards();
addSwipeFunctionality();
