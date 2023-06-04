let s = "s"; // só to fazendo isso pq o espaçamento tava deixando
let e = "e"; // dificil de ler o mapa.

var secondMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 6, 6, 6, 6, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 6, 5, 5, 6, s, 0, 0, 0, 0, s, 0, 3, 3, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 6, 5, 5, 6, s, 0, 0, 0, 0, s, 0, 3, 3, 0, s, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 6, 6, 6, 6, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 1],
  [1, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 1],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 3, 3, 0, s, 0, 7, 7, 7, 7, 7],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 3, 3, 0, s, 0, 7, 7, 7, 7, 7],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 7, 7, 7, 7, 8],
  [1, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, 0, 7, 7, 7, 8, 8],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, 0, 7, 7, 8, 8, 8],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 3, 3, 0, s, 0, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 3, 3, 0, s, 0, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8],
  [1, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8],
  [1, 2, s, s, s, s, 2, s, s, s, s, 2, s, s, s, s, 2, 0, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8],
];

export { secondMap };