document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: '1', img: 'imagens/1.jpeg' },
        { name: '1', img: 'imagens/1.png' },
        { name: '2', img: 'imagens/2.jpeg' },
        { name: '2', img: 'imagens/2.png' },
        { name: '3', img: 'imagens/3.jpeg' },
        { name: '3', img: 'imagens/3.png' },
        { name: '4', img: 'imagens/4.jpeg' },
        { name: '4', img: 'imagens/4.png' },
        // Adicione mais pares de cartas conforme necessário
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('#game-board');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        cardArray.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.setAttribute('class', 'card');
            cardElement.setAttribute('data-id', index);
            cardElement.addEventListener('click', flipCard);
            grid.appendChild(cardElement);
        });
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.innerHTML = `<img src="${cardArray[cardId].img}" alt="Card image">`;

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = cardsChosenId;
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Você encontrou um par!');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].innerHTML = '';
            cards[optionTwoId].innerHTML = '';
        }
        cardsChosen = [];
        cardsChosenId = [];
        if (cardsWon.length === cardArray.length / 2) {
            alert('Parabéns! Você encontrou todos os pares!');
        }
    }

    createBoard();
});
