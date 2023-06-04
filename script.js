import { firstMap } from "./maps/firstMap.js";
import { secondMap } from "./maps/secondMap.js";
import { thirdMap } from "./maps/thirdMap.js";

// Definição do mapa como uma matriz
var map = thirdMap;

var currentNode = [1, 1]; // Posição inicial [linha, coluna]
var previousNode = null; // Posição anterior [linha, coluna]
var gridSize = 100; // Tamanho de cada célula do grid
var delay = 150; // Duração do movimento em milissegundos
var delayFastest = 100;
var ambulancePosition;

var currentNode2 = [25, 16]; // Posição inicial [linha, coluna]
var previousNode2 = null;
var ambulancePosition2;

// Variável para armazenar o ID do temporizador do movimento
var timerId;
var timerId2;
var time;

function dijkstra(startNode, endNode) {
  // Cria uma matriz para representar a grade e definir distâncias iniciais
  var distances = [];
  for (var i = 0; i < map.length; i++) {
    distances[i] = [];
    for (var j = 0; j < map[i].length; j++) {
      distances[i][j] = Infinity;
    }
  }

  // Define a distância do ponto inicial como 0
  distances[startNode[0]][startNode[1]] = 0;

  // Cria uma matriz para armazenar os nós visitados
  var visited = [];
  for (var i = 0; i < map.length; i++) {
    visited[i] = [];
    for (var j = 0; j < map[i].length; j++) {
      visited[i][j] = false;
    }
  }

  var previousNodes = [];
  for (var i = 0; i < map.length; i++) {
    previousNodes[i] = [];
    for (var j = 0; j < map[i].length; j++) {
      previousNodes[i][j] = null;
    }
  }

  // Função auxiliar para encontrar o nó com a menor distância não visitado
  function findMinDistanceNode() {
    var minDistance = Infinity;
    var minNode = null;

    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        if (!visited[i][j] && distances[i][j] < minDistance) {
          minDistance = distances[i][j];
          minNode = [i, j];
          //     console.log(minDistance)
        }
      }
    }

    return minNode;
  }

  // Loop principal do algoritmo de Dijkstra
  while (true) {
    var currentNode = findMinDistanceNode();

    if (currentNode === null) {
      // Não há mais nós para visitar
      break;
    }

    var row = currentNode[0];
    var col = currentNode[1];

    // Marca o nó como visitado
    visited[row][col] = true;

    // Obtém os vizinhos do nó atual
    var neighbors = getNeighbors(currentNode);

    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      var neighborRow = neighbor[0];
      var neighborCol = neighbor[1];

      if (!visited[neighborRow][neighborCol]) {
        // Calcula a distância acumulada para o vizinho
        //   console.log(visited[neighborCol]);
        var distance = distances[row][col] + 1; // Considerando que cada célula tem distância 1

        if (distance < distances[neighborRow][neighborCol]) {
          // Atualiza a distância se for menor
          distances[neighborRow][neighborCol] = distance;
          previousNodes[neighborRow][neighborCol] = currentNode;
        }
      }
    }
  }
  var path = [];
  var currentPathNode = endNode;
  while (!isSameNode(currentPathNode, startNode)) {
    path.unshift(currentPathNode); // Adiciona o nó no início do caminho
    currentPathNode = previousNodes[currentPathNode[0]][currentPathNode[1]]; // Obtém o nó anterior
  }
  path.unshift(startNode); // Adiciona o nó inicial no início do caminho

  // Retorna o caminho percorrido
  return {
    distance: distances[endNode[0]][endNode[1]] - 1,
    path: path,
  };
}

function showPath(path) {
  for (var i = 0; i < path.length - 1; i++) {
    var node = path[i];
    var nodeElement = document.getElementById(
      "node-" + node[0] + "-" + node[1]
    );

    nodeElement.classList.add("path");
    // nodeElement.classList.add("active");

    if (nodeElement.classList.contains("path2")) {
      nodeElement.classList.remove("path");
      nodeElement.classList.remove("path2");
      nodeElement.classList.add("both");
    }
  }
}

function showPathFastest(path) {
  var index = 0;
  var intervalId = setInterval(function () {
    if (index >= path.length) {
      clearInterval(intervalId);
      return;
    }

    var node = path[index];
    var nodeElement = document.getElementById(
      "node-" + node[0] + "-" + node[1]
    );

    nodeElement.classList.add("active");

    setTimeout(function () {
      nodeElement.classList.remove("active");
    }, delayFastest);

    index++;
  }, delayFastest);
}

function showPathFastest2(path) {
  var index = 0;
  var intervalId = setInterval(function () {
    if (index >= path.length) {
      clearInterval(intervalId);
      return;
    }

    var node = path[index];
    var nodeElement = document.getElementById(
      "node-" + node[0] + "-" + node[1]
    );

    nodeElement.classList.add("active2");

    setTimeout(function () {
      nodeElement.classList.remove("active2");
    }, delayFastest);

    index++;
  }, delayFastest);
}

function erasePath(path) {
  for (var i = 0; i < path.length - 1; i++) {
    var node = path[i];
    var nodeElement = document.getElementById(
      "node-" + node[0] + "-" + node[1]
    );
    nodeElement.classList.remove("path");
  }
}

function showPath2(path) {
  for (var i = 0; i < path.length - 1; i++) {
    var node = path[i];
    var nodeElement = document.getElementById(
      "node-" + node[0] + "-" + node[1]
    );
    nodeElement.classList.add("path2");
    // nodeElement.classList.add("active2");

    if (nodeElement.classList.contains("path")) {
      nodeElement.classList.remove("path");
      nodeElement.classList.remove("path2");
      nodeElement.classList.add("both");
    }
  }
}

function erasePath2(path) {
  for (var i = 0; i < path.length - 1; i++) {
    var node = path[i];
    var nodeElement = document.getElementById(
      "node-" + node[0] + "-" + node[1]
    );
    nodeElement.classList.remove("path2");
  }
}

function eraseBothPath(path) {
  for (var i = 0; i < path.length - 1; i++) {
    var node = path[i];
    var nodeElement = document.getElementById(
      "node-" + node[0] + "-" + node[1]
    );
    nodeElement.classList.remove("both");
  }
}

// Função para mover a ambulância
function moveAmbulance(start) {
  // console.log("new start", start)
  var currentNodeElement = document.getElementById(
    "node-" + start[0] + "-" + start[1]
  );
  currentNodeElement.classList.add("active");

  ambulancePosition = [start[0], start[1]];

  // Aguarda um tempo para mostrar o movimento
  timerId = setTimeout(function () {
    if (previousNode !== null) {
      var previousNodeElement = document.getElementById(
        "node-" + previousNode[0] + "-" + previousNode[1]
      );
    }

    currentNodeElement.classList.remove("active");

    // Obtém os vizinhos do nó atual
    var neighbors = getNeighbors(start);

    // Remove o nó anterior dos vizinhos
    if (previousNode !== null) {
      neighbors = neighbors.filter(function (neighbor) {
        return !isSameNode(neighbor, previousNode);
      });
    }

    // Se não houver vizinhos disponíveis, encerra o movimento
    if (neighbors.length === 0) {
      clearTimeout(timerId);
      var ambulancePosition = document.getElementsByClassName("active")[0];
      var ambulanceElementId = ambulancePosition.id;
      var ambulancePositionArr = ambulanceElementId
        .split("-")
        .slice(1)
        .map(Number);
      console.log("Posição da ambulância:", ambulancePositionArr);
      return;
    }

    // Verifica se está em um nó (2)
    var isAtNode = map[start[0]][start[1]] === 2;

    // Seleciona o próximo nó considerando apenas o sentido correto das ruas
    var nextNode;
    if (isAtNode) {
      var validNeighbors = neighbors.filter(function (neighbor) {
        return map[neighbor[0]][neighbor[1]] === "s";
      });
      nextNode =
        validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
    } else {
      nextNode = neighbors[Math.floor(Math.random() * neighbors.length)];
    }

    // Atualiza a posição da ambulância
    previousNode = start.slice();
    start = nextNode.slice();

    // Chama recursivamente para o próximo movimento
    moveAmbulance(start);
  }, delay);
}

function moveAmbulance2(start) {
  var currentNodeElement2 = document.getElementById(
    "node-" + start[0] + "-" + start[1]
  );
  currentNodeElement2.classList.add("active2");

  ambulancePosition2 = [start[0], start[1]];

  // Aguarda um tempo para mostrar o movimento
  timerId2 = setTimeout(function () {
    if (previousNode2 !== null) {
      var previousNodeElement2 = document.getElementById(
        "node-" + previousNode2[0] + "-" + previousNode2[1]
      );
    }

    currentNodeElement2.classList.remove("active2");

    // Obtém os vizinhos do nó atual
    var neighbors2 = getNeighbors(start);

    // Remove o nó anterior dos vizinhos
    if (previousNode2 !== null) {
      neighbors2 = neighbors2.filter(function (neighbor2) {
        return !isSameNode(neighbor2, previousNode2);
      });
    }

    // Se não houver vizinhos disponíveis, encerra o movimento
    if (neighbors2.length === 0) {
      clearTimeout(timerId2);
      var ambulancePosition2 = document.getElementsByClassName("active2")[0];
      var ambulanceElementId2 = ambulancePosition2.id;
      var ambulancePositionArr2 = ambulanceElementId2
        .split("-")
        .slice(1)
        .map(Number);
      console.log("Posição da ambulância:", ambulancePositionArr2);
      return;
    }

    // Verifica se está em um nó (2)
    var isAtNode2 = map[start[0]][start[1]] === 2;

    // Seleciona o próximo nó considerando apenas o sentido correto das ruas
    var nextNode2;
    if (isAtNode2) {
      var validNeighbors2 = neighbors2.filter(function (neighbor2) {
        return map[neighbor2[0]][neighbor2[1]] === "s";
      });
      nextNode2 =
        validNeighbors2[Math.floor(Math.random() * validNeighbors2.length)];
    } else {
      nextNode2 = neighbors2[Math.floor(Math.random() * neighbors2.length)];
    }

    // Atualiza a posição da ambulância
    previousNode2 = start.slice();
    start = nextNode2.slice();

    // Chama recursivamente para o próximo movimento
    moveAmbulance2(start);
  }, delay);
}

// Função para obter os vizinhos de um nó
function getNeighbors(node) {
  var row = node[0];
  var col = node[1];

  var neighbors = [];

  if (row > 0 && isStreet(row - 1, col)) {
    neighbors.push([row - 1, col]); // Vizinho acima
  }
  if (row < map.length - 1 && isStreet(row + 1, col)) {
    neighbors.push([row + 1, col]); // Vizinho abaixo
  }
  if (col > 0 && isStreet(row, col - 1)) {
    neighbors.push([row, col - 1]); // Vizinho à esquerda
  }
  if (col < map[0].length - 1 && isStreet(row, col + 1)) {
    neighbors.push([row, col + 1]); // Vizinho à direita
  }

  return neighbors;
}

// Função para verificar se uma célula é uma "rua"
function isStreet(row, col) {
  return map[row][col] === "s" || map[row][col] === "e" || map[row][col] === 2;
}

// Função para verificar se dois nós são iguais
function isSameNode(node1, node2) {
  return node1[0] === node2[0] && node1[1] === node2[1];
}

function restart() {
  moveAmbulance();

  getPositionOnClick();
}

// Função para obter a posição da ambulância ao clicar
function getPositionOnClick() {
  var yellowElements = document.getElementsByClassName("yellow");

  for (var i = 0; i < yellowElements.length; i++) {
    yellowElements[i].addEventListener("click", function () {
      var elementId = this.id;
      var position = elementId.split("-").slice(1).map(Number);
      var shortestDistance = dijkstra(ambulancePosition, position);
      var shortestDistance2 = dijkstra(ambulancePosition2, position);
      const distancia = document.getElementById("distancia");
      distancia.innerHTML = `Peso da primeira ambulância: ${shortestDistance.distance}`;

      const caminho = document.getElementById("caminho");
      const text = shortestDistance.path.map((item) => `[${item}]`);
      const nextPos = shortestDistance.path.map((item) => item);
      var positionSlowest = nextPos.shift();
      text.pop();
      var newPosition = nextPos.pop();
      caminho.innerHTML = `Caminho da primeira ambulância: ${text}`;

      showPath(shortestDistance.path);

      const distancia2 = document.getElementById("distancia2");
      distancia2.innerHTML = `Peso da segunda ambulância: ${shortestDistance2.distance}`;

      const caminho2 = document.getElementById("caminho2");
      const text2 = shortestDistance2.path.map((item) => `[${item}]`);
      const newPos2 = shortestDistance2.path.map((item) => item);
      var positionSlowest2 = newPos2.shift();
      text2.pop();
      var newPosition2 = newPos2.pop();
      caminho2.innerHTML = `Caminho da segunda ambulância: ${text2}`;

      showPath2(shortestDistance2.path);
      clearTimeout(timerId);

      clearTimeout(timerId2);

      var audio = document.getElementById('sirene'); // Caminho para o arquivo de som da ambulância
      audio.volume = 0.5;

      const menorCaminho = document.getElementById("menorCaminho");
      if (shortestDistance.distance < shortestDistance2.distance) {
        menorCaminho.innerHTML = `Ambulância que percorre o menor caminho até o hospital: Ambulância Um, ${shortestDistance.distance}`;

        showPathFastest(shortestDistance.path);

        audio.play();

        setTimeout(() => {
          moveAmbulance(newPosition);
          moveAmbulance2(positionSlowest);
          audio.pause();
        }, 3000);

      } else {
        menorCaminho.innerHTML = `Ambulância que percorre o menor caminho até o hospital e a distância percorrida: Ambulância Dois, ${shortestDistance2.distance}`;

        showPathFastest2(shortestDistance2.path);

        audio.play();

        setTimeout(() => {
          moveAmbulance2(newPosition2);
          moveAmbulance(positionSlowest);
          audio.pause();
        }, 3000);
      }

      this.style.backgroundColor = "red";

      setTimeout(() => {
        var path = shortestDistance.path;
        var path2 = shortestDistance2.path;

        var resetNode = shortestDistance.path[0];
        var resetNode2 = shortestDistance2.path[0];

        var resetNodeElement = document.getElementById(
          "node-" + resetNode[0] + "-" + resetNode[1]
        );

        var resetNodeElement2 = document.getElementById(
          "node-" + resetNode2[0] + "-" + resetNode2[1]
        );

        resetNodeElement.classList.remove("active");
        resetNodeElement2.classList.remove("active2");
        resetNodeElement.classList.remove("path");
        resetNodeElement2.classList.remove("path2");

        erasePath(path);
        erasePath2(path2);
        eraseBothPath(path);
        eraseBothPath(path2);

        this.style.backgroundColor = "yellow";

      }, 3000);
    });
  }
}


// Função para setar cada um dos elementos no DOM
function setMapElements() {
  var mapElement = document.getElementById("map");

  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      var nodeElement = document.createElement("div");
      nodeElement.id = "node-" + i + "-" + j;
      nodeElement.classList.add("node");
      nodeElement.style.left = j * gridSize + "px";
      nodeElement.style.top = i * gridSize + "px";

      if (isStreet(i, j)) {
        nodeElement.classList.add("street");
      }
      if (map[i][j] === 2) {
        nodeElement.classList.add("yellow");
      }
      if (map[i][j] === 3) {
        nodeElement.classList.add("predio");
      }
      if (map[i][j] === 4) {
        nodeElement.classList.add("calçada");
      }
      if (map[i][j] === 5) {
        nodeElement.classList.add("fonte");
      }
      if (map[i][j] === 6) {
        nodeElement.classList.add("grama");
      }
      if (map[i][j] === 7) {
        nodeElement.classList.add("areia");
      }
      if (map[i][j] === 8) {
        nodeElement.classList.add("mar");
      }

      mapElement.appendChild(nodeElement);
    }
  }

  function beach() {
    setInterval(() => {
      var nodeElement2 = document.getElementById("node-20-26");
      var nodeElement3 = document.getElementById("node-21-25");
      var nodeElement4 = document.getElementById("node-22-24");
      var nodeElement5 = document.getElementById("node-23-23");
      var nodeElement6 = document.getElementById("node-24-22");
      var nodeElement7 = document.getElementById("node-25-21");
      var nodeElement8 = document.getElementById("node-26-20");
      var nodeElement9 = document.getElementById("node-27-19");
      var nodeElement10 = document.getElementById("node-19-27");
      var nodeElement11 = document.getElementById("node-19-26");
      var nodeElement12 = document.getElementById("node-18-27");
      var nodeElement13 = document.getElementById("node-23-22");
      var nodeElement14 = document.getElementById("node-22-23");
      var nodeElement15 = document.getElementById("node-20-25");
      var nodeElement16 = document.getElementById("node-21-24");
      nodeElement2.classList.add("mar2");
      nodeElement3.classList.add("mar2");
      nodeElement4.classList.add("mar2");
      nodeElement5.classList.add("mar2");
      nodeElement6.classList.add("mar2");
      nodeElement7.classList.add("mar2");
      nodeElement8.classList.add("mar2");
      nodeElement9.classList.add("mar2");
      nodeElement10.classList.add("mar2");
      nodeElement11.classList.add("mar2");
      nodeElement12.classList.add("mar2");
      nodeElement13.classList.add("mar2");
      nodeElement14.classList.add("mar2");
      nodeElement15.classList.add("mar2");
      nodeElement16.classList.add("mar2");

      var nodeElement17 = document.getElementById("node-19-25");
      nodeElement17.classList.add("areia3");

      var nodeElement18 = document.getElementById("node-25-19");
      nodeElement18.classList.add("areia3");

      var nodeElement19 = document.getElementById("node-24-21");
      nodeElement19.classList.add("areia3");

      var nodeElement20 = document.getElementById("node-21-23");
      nodeElement20.classList.add("areia3");
    }, 3000);

    setInterval(() => {
      console.log("areia");

      var nodeElement2 = document.getElementById("node-20-26");
      var nodeElement3 = document.getElementById("node-21-25");
      var nodeElement4 = document.getElementById("node-22-24");
      var nodeElement5 = document.getElementById("node-23-23");
      var nodeElement6 = document.getElementById("node-24-22");
      var nodeElement7 = document.getElementById("node-25-21");
      var nodeElement8 = document.getElementById("node-26-20");
      var nodeElement9 = document.getElementById("node-27-19");
      var nodeElement10 = document.getElementById("node-19-27");
      var nodeElement11 = document.getElementById("node-19-26");
      var nodeElement12 = document.getElementById("node-18-27");
      var nodeElement13 = document.getElementById("node-23-22");
      var nodeElement14 = document.getElementById("node-22-23");
      var nodeElement15 = document.getElementById("node-20-25");
      var nodeElement16 = document.getElementById("node-21-24");

      nodeElement2.classList.remove("mar2");
      nodeElement2.classList.add("areia2");
      nodeElement3.classList.remove("mar2");
      nodeElement3.classList.add("areia2");
      nodeElement4.classList.remove("mar2");
      nodeElement4.classList.add("areia2");
      nodeElement5.classList.remove("mar2");
      nodeElement5.classList.add("areia2");
      nodeElement6.classList.remove("mar2");
      nodeElement6.classList.add("areia2");
      nodeElement7.classList.remove("mar2");
      nodeElement7.classList.add("areia2");
      nodeElement8.classList.remove("mar2");
      nodeElement8.classList.add("areia2");
      nodeElement9.classList.remove("mar2");
      nodeElement9.classList.add("areia2");
      nodeElement10.classList.remove("mar2");
      nodeElement10.classList.add("areia2");
      nodeElement11.classList.remove("mar2");
      nodeElement11.classList.add("areia2");
      nodeElement12.classList.remove("mar2");
      nodeElement12.classList.add("areia2");
      nodeElement13.classList.remove("mar2");
      nodeElement13.classList.add("areia2");
      nodeElement14.classList.remove("mar2");
      nodeElement14.classList.add("areia2");
      nodeElement15.classList.remove("mar2");
      nodeElement15.classList.add("areia2");
      nodeElement16.classList.remove("mar2");
      nodeElement16.classList.add("areia2");
    }, 6000);

    return;
  }

  beach();
}


const cidadeSom = document.getElementById("cidade")
cidadeSom.volume = 0.1
cidadeSom.play()

//inicializa o mapa e seus elementos
setMapElements();

// Inicia o movimento do ponto
moveAmbulance(currentNode);

moveAmbulance2(currentNode2);

// Obtém a posição ao clicar no elemento amarelo
getPositionOnClick();

document.addEventListener("dblclick", function () {
  restart();
});
