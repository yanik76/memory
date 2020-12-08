(function () {
    let numberCaught = 0;
    let caughtField = document.querySelector('.caught');
    let timeField = document.querySelector('.timer');
    let timeField2 = document.querySelector('.timer2');
    let plateau = document.querySelector("#plateau");
    let btnReset = document.querySelector(".reset");
    let btnReset2 = document.querySelector(".reset2");
    let flippedCards = [];
    let card, front, bg;
    let j, x, i;
    let cards;
    let seconds = 0;
    let cardSize;


    btnReset.addEventListener("click", reset);
    btnReset2.addEventListener("click", reset);
    //Le menu disparaît au début du jeu
    $("#menu").hide();
    $("#menu2").hide();
    //Définition d'un tableau avec toutes les faces des cartes
    let bgCards = [
        "images/charmander.svg",
        "images/pikachu.svg",
        "images/squirtle.svg",
        "images/snorlax.svg",
        "images/charmander.svg",
        "images/pikachu.svg",
        "images/squirtle.svg",
        "images/snorlax.svg",
        "images/eevee.svg",
        "images/eevee.svg",
        "images/meowth.svg",
        "images/meowth.svg",
        "images/zubat.svg",
        "images/venonat.svg",
        "images/zubat.svg",
        "images/venonat.svg",
        "images.rattata.svg",
        "images.rattata.svg",
        "images.dratini.svg",
        "images.dratini.svg",
    ]
    let bgCardsLength = bgCards.length;
    shuffle(bgCards);

    //Création de chaque carte avec une face particuliere et ajout d'un écouteur au clic
    for (let i = 0; i < bgCardsLength; i++) {
        card = document.createElement("div");
        card.setAttribute("class", "card");
        card.innerHTML = "<figure class='back'></figure><figure class='front'></figure>";
        plateau.appendChild(card);
        //Calcul de la hauteur en fonction de la largeur - qui s'adapte en responsive
        cardSize = $('.card').width();
        $('.card').css('height', cardSize)
        front = card.childNodes[1];
        bg = "url(" + bgCards[i] + ") no-repeat";
        front.style.background = bg;
        card.addEventListener('click', function () {
            addFlipped(this);
        });
    }
    //Reset : on sélectionne toutes les cartes et on leur retire le classe reset
    //On enlève le menu
    //On réinitialise lesletiables
    function reset() {
        cards = document.querySelectorAll(".card");
        for (let u = 0; u < cards.length; u++) {
            cards[u].classList.remove('flipped');
        }
        $("#menu").fadeOut("fast");
        $("#menu2").fadeOut("fast");
        numberCaught = 0;
        caughtField.innerHTML = numberCaught;
        seconds = 0;
    }
    //A chaque fois que le tableau est initialisé, les cartes sont mélangés 
    function shuffle(tab) {
        for (i = tab.length; i > 0; i--) {
            j = Math.floor(Math.random() * i);
            x = tab[i - 1];
            tab[i - 1] = tab[j];
            tab[j] = x;
        }
    }
    //Quand on clique sur une carte, la classe "flipped" s'aout à celle-ci, ce qui donne l'impression qu'elle se retourne
    //On l'ajoute dans le tableau 'flippedCards'
    function addFlipped(target) {
        if (!target.classList.contains('flipped')) {
            target.classList.add('flipped');
            flippedCards.push(target);
            if (flippedCards.length > 1) {
                removeFlipped();
            }
        }
    }

    //A partir du moment où 2 cartes sont dans 'flipped', chaque fois qu'une carte est retournée, on retire le premier élément du tableau 'flippedCards'
    function removeFlipped() {
        if (flippedCards.length > 2) {
            flippedCards[0].classList.remove('flipped');
            flippedCards.shift();
        }
        checkResult();
    }
    //Si les cartes retournées sont identiques, alors on ajoute 1 au score et on réinitialise flippedCards (mais les 2 cartes restent retournées)
    //Si le score est égal à la moitié du tableau, alors le menu apparaît parce que c'est la victoire
    function checkResult() {
        if (flippedCards[0].innerHTML == flippedCards[1].innerHTML) {
            numberCaught++;
            caughtField.innerHTML = numberCaught;
            flippedCards = [];
            if (numberCaught == bgCardsLength / 2 && seconds < 40) {
                $("#menu").fadeIn("fast");
                timeField.innerHTML = seconds;
            }
            else if
                (numberCaught == bgCardsLength / 2 && seconds > 40) {
                $("#menu2").fadeIn("fast");
                timeField2.innerHTML = seconds;
            }
        }
    }
    //Timer
    setInterval(function () {
        seconds++;
    }, 1000);
}());