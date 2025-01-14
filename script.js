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

function createCard(imageSrc, className) {
    const card = document.createElement('div');
    card.className = `gift-card ${className}`;
    card.innerHTML = `<img src="${imageSrc}" alt="Regalo">`;
    return card;
}

function renderCards() {
    giftCard.innerHTML = '';

    const currentCard = createCard(gifts[currentGift], 'current');
    const nextCard = createCard(gifts[(currentGift + 1) % gifts.length], 'next');
    const prevCard = createCard(gifts[(currentGift - 1 + gifts.length) % gifts.length], 'prev');

    giftCard.appendChild(prevCard);
    giftCard.appendChild(currentCard);
    giftCard.appendChild(nextCard);
}

function addSwipeFunctionality() {
    const currentCard = document.querySelector('.gift-card.current');
    const nextCard = document.querySelector('.gift-card.next');
    const prevCard = document.querySelector('.gift-card.prev');

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const startDrag = (x) => {
        startX = x;
        isDragging = true;
        currentCard.style.transition = 'none';
        nextCard.style.transition = 'none';
        prevCard.style.transition = 'none';
    };

    const duringDrag = (x) => {
        if (!isDragging) return;
        currentX = x;
        const diff = currentX - startX;
        currentCard.style.transform = `translateX(${diff}px) rotate(${diff / 20}deg)`;
        if (diff > 0) {
            prevCard.style.transform = `translateX(${diff - 300}px) scale(1)`;
        } else {
            nextCard.style.transform = `translateX(${diff + 300}px) scale(1)`;
        }
    };

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        const diff = currentX - startX;

        if (diff > 100) {
            currentCard.style.transition = 'transform 0.3s ease-in-out';
            currentCard.style.transform = 'translateX(1000px)';
            prevCard.style.transition = 'transform 0.3s ease-in-out';
            prevCard.style.transform = 'translateX(0) scale(1)';
            currentGift = (currentGift - 1 + gifts.length) % gifts.length;
        } else if (diff < -100) {
            currentCard.style.transition = 'transform 0.3s ease-in-out';
            currentCard.style.transform = 'translateX(-1000px)';
            nextCard.style.transition = 'transform 0.3s ease-in-out';
            nextCard.style.transform = 'translateX(0) scale(1)';
            currentGift = (currentGift + 1) % gifts.length;
        } else {
            currentCard.style.transition = 'transform 0.3s ease-in-out';
            currentCard.style.transform = 'translateX(0) rotate(0)';
            prevCard.style.transition = 'transform 0.3s ease-in-out';
            prevCard.style.transform = 'translateX(-300px) scale(0.9)';
            nextCard.style.transition = 'transform 0.3s ease-in-out';
            nextCard.style.transform = 'translateX(300px) scale(0.9)';
        }

        currentCard.addEventListener('transitionend', () => {
            renderCards();
            addSwipeFunctionality();
        }, { once: true });
    };

    currentCard.addEventListener('mousedown', (e) => startDrag(e.clientX));
    currentCard.addEventListener('mousemove', (e) => duringDrag(e.clientX));
    currentCard.addEventListener('mouseup', endDrag);
    currentCard.addEventListener('mouseleave', endDrag);

    currentCard.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    currentCard.addEventListener('touchmove', (e) => duringDrag(e.touches[0].clientX));
    currentCard.addEventListener('touchend', endDrag);
}

renderCards();
addSwipeFunctionality();
