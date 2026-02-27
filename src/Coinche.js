import Cartes from "./cartes"

const mixCards = () => {
  const mixedCards = [];
  const usedCards = Array(Cartes.length).fill(false);

  while (mixedCards.length < 32) {
    const indexChosen = Math.floor(Math.random() * Cartes.length)
    if (!usedCards[indexChosen]) {
      mixedCards.push(Cartes[indexChosen])
      usedCards[indexChosen] = true
    }
  }
  // console.log('mixedCards', mixedCards)

  return mixedCards;
}

const decoupe = (cards = []) => {
  // on ne découpe pas dans les 2 premières carte ni les 2 dernières
  // donc on prend un nombre aléatoire entre 0 et 28 et on ajoute 2
  const decoupeNumber = Math.floor(Math.random() * 28) + 2
  const cardsDecouper = [...cards.slice(decoupeNumber), ...cards.slice(0, decoupeNumber)]

  // console.log('cardsDdecouper', cardsDecouper)
  return cardsDecouper
}

const distribution = (cards = []) => {
  const cardsDistributed = [];

  let i = 0;
  while (i < 4) {
    let j = 0;
    while (j < 3) {
      cardsDistributed.push(cards[i*3 + j])
      j = j + 1
    }

    let k = 0;
    while (k < 2) {
      cardsDistributed.push(cards[12 + i*2 + k])
      k = k + 1
    }

    let l = 0;
    while (l < 3) {
      cardsDistributed.push(cards[12 + 8 + i*3 + l])
      l = l + 1
    }

    i = i + 1
  }

  // console.log('cardsDistributed', cardsDistributed)
  return cardsDistributed
}

export  {mixCards, decoupe, distribution}