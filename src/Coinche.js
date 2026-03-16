import { createWebSocketModuleRunnerTransport } from "vite/module-runner";
import {Cartes, ordreAtout, ordreNonAtout, pointsAtout, pointsNonAtout} from "./cartes"

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

    // tout atout
    if (atout === 'Tout') {
      // console.log('tout atout')
      // les 2 sont de la couleur
      if (cList[0] === arrList[0] && cList[0] === couleurJouee) {
        const cIndexNonAtout = ordreAtout.findIndex(o => o === cList[1])
        const arrIndexNonAtout = ordreAtout.findIndex(o => o === arrList[1])
        if (cIndexNonAtout < arrIndexNonAtout)
          return c
        else
          return acc
      }

      // un seul est de la couleur
      if (cList[0] === couleurJouee && arrList[0] !== couleurJouee)
        return c
      if (cList[0] !== couleurJouee && arrList[0] === couleurJouee)
        return acc
      
      return acc
    }

    else if (atout === 'Sans') {
      // console.log('sasn atput')
      // les 2 sont de la couleur
      if (cList[0] === arrList[0] && cList[0] === couleurJouee) {
        const cIndexNonAtout = ordreNonAtout.findIndex(o => o === cList[1])
        const arrIndexNonAtout = ordreNonAtout.findIndex(o => o === arrList[1])
        if (cIndexNonAtout < arrIndexNonAtout)
          return c
        else
          return acc
      }

      // un seul est de la couleur
      if (cList[0] === couleurJouee && arrList[0] !== couleurJouee)
        return c
      if (cList[0] !== couleurJouee && arrList[0] === couleurJouee)
        return acc
    
      return acc
    }

    // classique
    else {
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

      return acc
    }

  }, '')

  // console.log('carte gagnante', newHighestCard)

  return newHighestCard
}

const ramasserPli = (highestCard, cardsPlayed) => {

}

const compterPoints = (cardsPlayed = [], couleurJouee = '', atout = '') => {
  const pointsPli = cardsPlayed.reduce((acc, c) => {
    const cArr = c.split(' ')
    if (atout === 'Tout') {
      const pos = ordreAtout.findIndex(position => cArr[1] === position)
      acc = acc + pointsAtout[pos]
      return acc
    }
    else if (atout === 'Sans') {
      const pos = ordreNonAtout.findIndex(position => cArr[1] === position)
      acc = acc + pointsNonAtout[pos]
      return acc
    }
    else {
      if (c[0] === atout) {
        const pos = ordreAtout.findIndex(position => cArr[1] === position)
        acc = acc + pointsAtout[pos]
        return acc
      }
      else {
        const pos = ordreNonAtout.findIndex(position => cArr[1] === position)
        acc = acc + pointsNonAtout[pos]
        return acc
      }
    }
  }, 0)

  return pointsPli
}

const findIsWin = (pointsPlayer = [], plisPlayer = [], annonce = '', annoncePlayerIndex = 0) => {
  const annonceArray = annonce.split(' ')
  const mise = annonceArray[0]

  let win = false

  if (mise === 'Capot') {
    const plisTotal = plisPlayer[annoncePlayerIndex] + plisPlayer[(annoncePlayerIndex + 2) % 4]
    if (plisTotal === 8)
      win = true
  }
  else if (mise === 'Générale') {
    if (plisPlayer[annoncePlayerIndex] === 8)
      win = true
  }
  else {
    const pointsTotal = pointsPlayer[annoncePlayerIndex] + pointsPlayer[(annoncePlayerIndex + 2) % 4]
    if (pointsTotal >= mise)
      win = true
  }

  return win
}

const pointsDebut = (hand = []) => {
  const points = hand.reduce((acc, c) => {
    const cArr = c.split(' ')
    const pos = ordreNonAtout.findIndex(position => cArr[1] === position)
    acc = acc + pointsNonAtout[pos]
    return acc
  }, 0)

  return points
}

const isJouable = (hand = [], card ='', couleurJouee = '', atout = '', highestCard = '', cardsPlayed = [], indexMe = 0) => {
  const cardList = card.split(' ')

  // si aucune carte de jouee sur ce pli, on peut toutes les jouer
  if (couleurJouee === '')
    return true

  const indexHighestCard = cardsPlayed.findIndex(c => c === highestCard)

  // tout atout
  if (atout === 'Tout') {
    // si non regarder si il y a de l'atout supérieur à celui déjà jouer (si un déjà jouer)
    // console.log('highestCard', highestCard)
    const hCardList = highestCard.split(' ')
    const posHCardList = ordreAtout.findIndex(o => o === hCardList[1])
    const thereIsAtoutHigher = hand.some(c => {
      const cList = c.split(' ')
      if (cList[0] === couleurJouee && hCardList[0] === couleurJouee) {
        const posCList = ordreAtout.findIndex(o => o === cList[1])
        if (posCList < posHCardList)
          return true
        else
          return false
      }
    })
    const posCard = ordreAtout.findIndex(o => o === cardList[1])
    if ((cardList[0] !== couleurJouee || (cardList[0] === couleurJouee && posCard > posHCardList)) && thereIsAtoutHigher)
      return false
    
    // si non, regarder si il y a de l'atout
    const thereIsAtout = hand.some(c => {
      const cList = c.split(' ')
      if (cList[0] === couleurJouee)
        return true
      else
        return false
    })
    // console.log('card atout', card, thereIsAtout)
    if (cardList[0] !== couleurJouee && thereIsAtout)
      return false

    return true
  }

  // sans atout
  else if (atout === 'Sans') {
    // regarder si il y a de la couleur
    const thereIsColor = hand.some(c => {
      const cList = c.split(' ')
      if (cList[0] === couleurJouee)
        return true
      else
        return false
    })
    if (cardList[0] !== couleurJouee && thereIsColor && couleurJouee !== atout)
      return false

    return true
  }

  // classique
  else {
    // regarder si il y a de la couleur
    const thereIsColor = hand.some(c => {
      const cList = c.split(' ')
      if (cList[0] === couleurJouee)
        return true
      else
        return false
    })
    // console.log('card color', card, thereIsColor)
    if (cardList[0] !== couleurJouee && thereIsColor && couleurJouee !== atout)
      return false
    
    // pas de la couleur (couleur n'est pas de l'atout) et partenaire maitre
    if (!thereIsColor && couleurJouee !== atout && indexHighestCard%2 === indexMe%2)
      return true

    // si non regarder si il y a de l'atout supérieur à celui déjà jouer (si un déjà jouer)
    const hCardList = highestCard.split(' ')
    const posHCardList = ordreAtout.findIndex(o => o === hCardList[1])
    const thereIsAtoutHigher = hand.some(c => {
      const cList = c.split(' ')
      if (cList[0] === atout && hCardList[0] === atout) {
        const posCList = ordreAtout.findIndex(o => o === cList[1])
        if (posCList < posHCardList)
          return true
        else
          return false
      }
    })
    // console.log('card atout higher', card, thereIsAtoutHigher)
    const posCard = ordreAtout.findIndex(o => o === cardList[1])
    if ((cardList[0] !== atout || (cardList[0] === atout && posCard > posHCardList)) && thereIsAtoutHigher && (!thereIsColor || couleurJouee === atout))
      return false

    // si non, regarder si il y a de l'atout
    const thereIsAtout = hand.some(c => {
      const cList = c.split(' ')
      if (cList[0] === atout)
        return true
      else
        return false
    })
    // console.log('card atout', card, thereIsAtout)
    if (cardList[0] !== atout && (!thereIsColor || couleurJouee === atout) && thereIsAtout)
      return false

    // si non, la mettre comme jouable
    return true
  }
}

const sortCards = (hand = [], atout = '') => {
  const order = ['Carreau', 'Coeur', 'Pique', 'Trèfle']
  const orderAtout = ['Valet', '9', 'As', '10', 'Roi', 'Dame', '8', '7']
  const orderNonAtout = ['As', '10', 'Roi', 'Dame', 'Valet', '9', '8', '7']

  const sortedHand = hand.reduce((acc, carte) => {
    const carteArray = carte.split(' ')
    const posCouleurCarte = order.findIndex(o => o === carteArray[0])
    const posValeurCarte = (atout === carteArray[0] ? orderAtout.findIndex(o => o === carteArray[1]) : orderNonAtout.findIndex(o => o === carteArray[1]))

    const indexNewPlace = acc.findIndex(a => {
      const aArray = a.split(' ')
      const posCouleurA = order.findIndex(o => o === aArray[0])
      const posValeurA = (atout === aArray[0] ? orderAtout.findIndex(o => o === aArray[1]) : orderNonAtout.findIndex(o => o === aArray[1]))
      if (posCouleurCarte < posCouleurA)
        return true
      if (posCouleurCarte > posCouleurA)
        return false
      if (posCouleurCarte === posCouleurA && posValeurCarte < posValeurA)
        return true
      if (posCouleurCarte === posCouleurA && posValeurCarte > posValeurA)
        return false
    })

    let newAcc = [...acc];

    if (indexNewPlace === -1)
      newAcc.push(carte)
    else
      newAcc = [...acc.slice(0, indexNewPlace), carte, ...acc.slice(indexNewPlace)]

    return newAcc
  }, [])

  return sortedHand
}

export {
  mixCards, 
  decoupe, 
  distribution, 
  getHighestCard, 
  ramasserPli, 
  compterPoints, 
  findIsWin, 
  pointsDebut, 
  isJouable, 
  sortCards
}