const Cartes = [
  "Coeur 7",
  "Coeur 8",
  "Coeur 9",
  "Coeur 10",
  "Coeur As",
  "Coeur Valet",
  "Coeur Dame",
  "Coeur Roi",

  "Trèfle 7",
  "Trèfle 8",
  "Trèfle 9",
  "Trèfle 10",
  "Trèfle As",
  "Trèfle Valet",
  "Trèfle Dame",
  "Trèfle Roi",
  
  "Pique 7",
  "Pique 8",
  "Pique 9",
  "Pique 10",
  "Pique As",
  "Pique Valet",
  "Pique Dame",
  "Pique Roi",
  
  "Carreau 7",
  "Carreau 8",
  "Carreau 9",
  "Carreau 10",
  "Carreau As",
  "Carreau Valet",
  "Carreau Dame",
  "Carreau Roi",
]


const ordreAtout = [
  'Valet',
  '9',
  'As',
  '10',
  'Roi',
  'Dame',
  '8',
  '7',
]

const ordreNonAtout = [
  'As',
  '10',
  'Roi',
  'Dame',
  'Valet',
  '9',
  '8',
  '7',
]

const pointsNonAtout = [
  11,
  10,
  4,
  3,
  2,
  0,
  0,
  0,
]

const pointsAtout = [
  20,
  14,
  11,
  10,
  4,
  3,
  0,
  0,
]

const pointsToutAtout = [
  14,
  9,
  6,
  5,
  3,
  1,
  0,
  0,
]

const pointsSansAtout = [
  19,
  10,
  4,
  3,
  2,
  0,
  0,
  0,
]

export {Cartes, ordreAtout, ordreNonAtout, pointsAtout, pointsNonAtout, pointsToutAtout, pointsSansAtout};