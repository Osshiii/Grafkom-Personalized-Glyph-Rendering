/**
 * Data geometri untuk huruf R, O, dan angka 7
 */

var allVertices = [];
var colors = [];
var normals = [];
var allIndices = [];
var indexOffset = 0;

// Koordinat untuk huruf R
var cubePoints = [
  [-0.9, -0.5, 0.0], // A, 0
  [-0.8, -0.5, 0.0], // B, 1
  [-0.8, 0.5, 0.0], // C, 2
  [-0.9, 0.5, 0.0], // D, 3
  [-0.9, -0.5, 0.2], // E, 4
  [-0.8, -0.5, 0.2], // F, 5
  [-0.8, 0.5, 0.2], // G, 6
  [-0.9, 0.5, 0.2], // H, 7
];

var cubePointsB = [
  [-0.8, 0.4, 0.0], // A, 0
  [-0.5, 0.4, 0.0], // B, 1
  [-0.5, 0.5, 0.0], // C, 2
  [-0.8, 0.5, 0.0], // D, 3
  [-0.8, 0.4, 0.2], // E, 4
  [-0.5, 0.4, 0.2], // F, 5
  [-0.5, 0.5, 0.2], // G, 6
  [-0.8, 0.5, 0.2], // H, 7
];

var cubePointsC = [
  [-0.8, 0.0, 0.0], // A, 0
  [-0.5, 0.0, 0.0], // B, 1
  [-0.5, 0.1, 0.0], // C, 2
  [-0.8, 0.1, 0.0], // D, 3
  [-0.8, 0.0, 0.2], // E, 4
  [-0.5, 0.0, 0.2], // F, 5
  [-0.5, 0.1, 0.2], // G, 6
  [-0.8, 0.1, 0.2], // H, 7
];

var cubePointsD = [
  [-0.5, 0.0, 0.0], // A, 0
  [-0.4, 0.0, 0.0], // B, 1
  [-0.4, 0.5, 0.0], // C, 2
  [-0.5, 0.5, 0.0], // D, 3
  [-0.5, 0.0, 0.2], // E, 4
  [-0.4, 0.0, 0.2], // F, 5
  [-0.4, 0.5, 0.2], // G, 6
  [-0.5, 0.5, 0.2], // H, 7
];

var cubePointsE = [
  [-0.5, -0.5, 0.0], // A, 0
  [-0.4, -0.5, 0.0], // B, 1
  [-0.7, 0.0, 0.0], // C, 2
  [-0.8, 0.0, 0.0], // D, 3
  [-0.5, -0.5, 0.2], // E, 4
  [-0.4, -0.5, 0.2], // F, 5
  [-0.7, 0.0, 0.2], // G, 6
  [-0.8, 0.0, 0.2], // H, 7
];

// Batang kiri O
var cubePointsO1 = [
  [-0.2, -0.5, 0.0], // A
  [-0.1, -0.5, 0.0], // B
  [-0.1, 0.5, 0.0], // C
  [-0.2, 0.5, 0.0], // D
  [-0.2, -0.5, 0.2], // E
  [-0.1, -0.5, 0.2], // F
  [-0.1, 0.5, 0.2], // G
  [-0.2, 0.5, 0.2], // H
];

// Batang kanan O
var cubePointsO2 = [
  [0.1, -0.5, 0.0],
  [0.2, -0.5, 0.0],
  [0.2, 0.5, 0.0],
  [0.1, 0.5, 0.0],
  [0.1, -0.5, 0.2],
  [0.2, -0.5, 0.2],
  [0.2, 0.5, 0.2],
  [0.1, 0.5, 0.2],
];

// Batang atas O
var cubePointsO3 = [
  [-0.1, 0.4, 0.0],
  [0.1, 0.4, 0.0],
  [0.1, 0.5, 0.0],
  [-0.1, 0.5, 0.0],
  [-0.1, 0.4, 0.2],
  [0.1, 0.4, 0.2],
  [0.1, 0.5, 0.2],
  [-0.1, 0.5, 0.2],
];

// Batang bawah O
var cubePointsO4 = [
  [-0.1, -0.5, 0.0],
  [0.1, -0.5, 0.0],
  [0.1, -0.4, 0.0],
  [-0.1, -0.4, 0.0],
  [-0.1, -0.5, 0.2],
  [0.1, -0.5, 0.2],
  [0.1, -0.4, 0.2],
  [-0.1, -0.4, 0.2],
];

// Batang atas 7
var cubePoints7a = [
  [0.3, 0.4, 0.0],
  [0.8, 0.4, 0.0],
  [0.8, 0.5, 0.0],
  [0.3, 0.5, 0.0],
  [0.3, 0.4, 0.2],
  [0.8, 0.4, 0.2],
  [0.8, 0.5, 0.2],
  [0.3, 0.5, 0.2],
];

// Batang miring 7
var cubePoints7b = [
  [0.5, -0.5, 0.0],
  [0.6, -0.5, 0.0],
  [0.8, 0.4, 0.0],
  [0.7, 0.4, 0.0],
  [0.5, -0.5, 0.2],
  [0.6, -0.5, 0.2],
  [0.8, 0.4, 0.2],
  [0.7, 0.4, 0.2],
];

var cubeColors = [
  [1.0, 0.0, 0.0], // merah - depan
  [0.0, 1.0, 0.0], // hijau - kanan
  [0.0, 0.0, 1.0], // biru - atas
  [1.0, 1.0, 0.0], // kuning - kiri
  [1.0, 0.5, 0.0], // oranye - belakang
  [0.5, 0.0, 1.0], // ungu - bawah
];

var faceNormals = [
  [0.0, 0.0, 1.0], // depan
  [1.0, 0.0, 0.0], // kanan
  [0.0, 1.0, 0.0], // atas
  [-1.0, 0.0, 0.0], // kiri
  [0.0, 0.0, -1.0], // belakang
  [0.0, -1.0, 0.0], // bawah
];

/**
 * Membuat kubus dari 8 titik
 */
function createCube(points) {
  var faces = [
    [0, 1, 2, 3], // depan
    [1, 5, 6, 2], // kanan
    [3, 2, 6, 7], // atas
    [0, 3, 7, 4], // kiri
    [4, 5, 6, 7], // belakang
    [0, 1, 5, 4], // bawah
  ];

  for (var f = 0; f < faces.length; f++) {
    var face = faces[f];
    var color = cubeColors[f];
    var normal = faceNormals[f];

    // Tambahkan 4 vertices untuk face ini
    for (var i = 0; i < 4; i++) {
      var idx = face[i];
      allVertices.push(points[idx][0], points[idx][1], points[idx][2]);
      colors.push(color[0], color[1], color[2]);
      normals.push(normal[0], normal[1], normal[2]);
    }

    // Tambahkan 2 triangles (6 indices) untuk face ini
    allIndices.push(
      indexOffset + 0,
      indexOffset + 1,
      indexOffset + 2,
      indexOffset + 0,
      indexOffset + 2,
      indexOffset + 3
    );

    indexOffset += 4;
  }
}

// Buat semua kubus untuk huruf R
createCube(cubePoints);
createCube(cubePointsB);
createCube(cubePointsC);
createCube(cubePointsD);
createCube(cubePointsE);

// Buat semua kubus untuk huruf O
createCube(cubePointsO1);
createCube(cubePointsO2);
createCube(cubePointsO3);
createCube(cubePointsO4);

// Buat semua kubus untuk angka 7
createCube(cubePoints7a);
createCube(cubePoints7b);

console.log("Total vertices:", allVertices.length / 3);
console.log("Total indices:", allIndices.length);
console.log("Total triangles:", allIndices.length / 3);