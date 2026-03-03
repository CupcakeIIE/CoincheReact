import {Cartes, ordreAtout, ordreNonAtout} from "./cartes"

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


const getHighestCard = (cardsPlayed = [], couleurJouee = '', atout = '') => {
  const newHighestCard = cardsPlayed.reduce((acc, c) => {
    if (c === '')
      return acc
    if (acc === '')
      return c

    const cList = c.split(' ')
    const arrList = acc.split(' ')
    // cas les 2 sont de la couleur (qui n'est pas de l'atout)
    if (cList[0] === arrList[0] && cList[0] === couleurJouee && couleurJouee !== atout) {
      const cIndexNonAtout = ordreNonAtout.findIndex(o => o === cList[1])
      const arrIndexNonAtout = ordreNonAtout.findIndex(o => o === arrList[1])
      if (cIndexNonAtout < arrIndexNonAtout)
        return c
      else
        return acc
    }

    // cas les 2 sont de l'atout (ou la couleur est de l'atout)
    if (cList[0] === arrList[0] && ((cList[0] === couleurJouee && couleurJouee === atout) || cList[0] === atout)) {
      const cIndexNonAtout = ordreAtout.findIndex(o => o === cList[1])
      const arrIndexNonAtout = ordreAtout.findIndex(o => o === arrList[1])
      if (cIndexNonAtout < arrIndexNonAtout)
        return c
      else
        return acc
    }

    // cas un couleur un atout
    if (cList[0] === couleurJouee && arrList[0] === atout && couleurJouee !== atout)
      return acc
    if (cList[0] === atout && arrList[0] === couleurJouee && couleurJouee !== atout)
      return c

    // cas un des 2 n'est ni atout ni couleur
    if (cList[0] !== couleurJouee && cList[0] !== atout)
      return acc
    if (arrList[0] !== couleurJouee && arrList[0] !== atout)
      return c

  }, '')

  return newHighestCard
}

const ramasserPli = (highestCard, cardsPlayed) => {

}

export  {mixCards, decoupe, distribution, getHighestCard, ramasserPli}