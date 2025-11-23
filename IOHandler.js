/**
 * IO Handler untuk menangani input dari pengguna
 */

var freeze = false;
var scaleFactor = 1.0;
var lightPosition = [2.0, 2.0, 3.0];
var currentLightPreset = 1;

/**
 * Menangani event klik mouse untuk pause/resume animasi
 */
function onMouseClick(event) {
  freeze = !freeze;
}

/**
 * Menangani event scroll mouse untuk zoom in/out
 */
function onWheel(event) {
  event.preventDefault();
  scaleFactor += event.deltaY * -0.001;
  scaleFactor = Math.min(Math.max(0.5, scaleFactor), 2.0);
}

/**
 * Menangani event keydown (tombol ditekan)
 */
function onKeydown(event) {
  if (event.keyCode == 32) {
    // SPACE key
    freeze = true;
    event.preventDefault();
  } else if (event.keyCode == 49) {
    // Key 1
    setLightPreset(1);
  } else if (event.keyCode == 50) {
    // Key 2
    setLightPreset(2);
  } else if (event.keyCode == 51) {
    // Key 3
    setLightPreset(3);
  }
}

/**
 * Menangani event keyup (tombol dilepas)
 */
function onKeyup(event) {
  if (event.keyCode == 32) {
    // SPACE key
    freeze = false;
  }
}

/**
 * Mengubah preset posisi cahaya
 */
function setLightPreset(preset) {
  currentLightPreset = preset;
  
  // Remove active class from all buttons
  var buttons = document.querySelectorAll('.light-preset-btn');
  buttons.forEach(function(btn) {
    btn.classList.remove('active');
  });
  
  // Add active class to clicked button
  if (buttons[preset - 1]) {
    buttons[preset - 1].classList.add('active');
  }
  
  switch (preset) {
    case 1:
      lightPosition = [2.0, 2.0, 3.0];
      break;
    case 2:
      lightPosition = [-2.0, 2.0, 3.0];
      break;
    case 3:
      lightPosition = [0.0, 3.0, 0.0];
      break;
  }
  updateLightIndicator();
}

/**
 * Update tampilan indikator cahaya
 */
function updateLightIndicator() {
  var lightPosX = document.getElementById("lightPosX");
  var lightPosY = document.getElementById("lightPosY");
  var lightPosZ = document.getElementById("lightPosZ");

  if (lightPosX && lightPosY && lightPosZ) {
    lightPosX.textContent = lightPosition[0].toFixed(1);
    lightPosY.textContent = lightPosition[1].toFixed(1);
    lightPosZ.textContent = lightPosition[2].toFixed(1);
  }
}

/**
 * Menginisialisasi semua event listener
 */
function initEventListeners() {
  document.addEventListener("click", onMouseClick, false);
  document.addEventListener("wheel", onWheel, false);
  document.addEventListener("keydown", onKeydown, false);
  document.addEventListener("keyup", onKeyup, false);
  updateLightIndicator();
}