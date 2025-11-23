/**
 * Main function untuk inisialisasi WebGL dan render loop
 */
function main() {
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  if (!gl) {
    alert("WebGL not supported!");
    return;
  }

  // Inisialisasi event listeners
  initEventListeners();

  // Create vertex buffer untuk objek utama
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(allVertices), gl.STATIC_DRAW);

  // Create color buffer
  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Create normal buffer
  var normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

  // Create index buffer
  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(allIndices),
    gl.STATIC_DRAW
  );

  console.log("Total vertices:", allVertices.length / 3);
  console.log("Total indices:", allIndices.length);

  // Create shaders untuk objek utama
  var vertexShaderCode =
    document.getElementById("vertexShaderCode").textContent;
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  // Check for vertex shader compilation errors
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "Vertex shader compilation error:",
      gl.getShaderInfoLog(vertexShader)
    );
  }

  var fragmentShaderCode =
    document.getElementById("fragmentShaderCode").textContent;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  // Check for fragment shader compilation errors
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(
      "Fragment shader compilation error:",
      gl.getShaderInfoLog(fragmentShader)
    );
  }

  // Create program untuk objek utama
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  // Check for program linking errors
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking error:", gl.getProgramInfoLog(program));
    alert("Shader program failed to link. See console for details.");
    return;
  }

  // Setup program untuk objek utama
  gl.useProgram(program);

  // Ensure viewport is set to canvas size (important on some platforms)
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Disable face culling so both sides render while debugging
  gl.disable(gl.CULL_FACE);

  // Setup attributes untuk objek utama
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  var aPos = gl.getAttribLocation(program, "aPosition");
  if (aPos === -1) console.warn("Attribute aPosition not found in shader");
  gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPos);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  var aColor = gl.getAttribLocation(program, "aColor");
  if (aColor === -1) console.warn("Attribute aColor not found in shader");
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aColor);

  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  var aNormal = gl.getAttribLocation(program, "aNormal");
  if (aNormal === -1) console.warn("Attribute aNormal not found in shader");
  gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aNormal);

  // Setup uniforms untuk objek utama
  var uAmbientColor = gl.getUniformLocation(program, "uAmbientColor");
  var uAmbientIntensity = gl.getUniformLocation(program, "uAmbientIntensity");
  var uDiffuseColor = gl.getUniformLocation(program, "uDiffuseColor");
  var uDiffusePosition = gl.getUniformLocation(program, "uDiffusePosition");
  var uNormalMatrix = gl.getUniformLocation(program, "uNormalMatrix");
  var uViewerPosition = gl.getUniformLocation(program, "uViewerPosition");
  var uModel = gl.getUniformLocation(program, "uModel");
  var uView = gl.getUniformLocation(program, "uView");
  var uProjection = gl.getUniformLocation(program, "uProjection");

  // Setup matrices
  var model = glMatrix.mat4.create();
  var view = glMatrix.mat4.create();
  var camera = [0, 0, 4];
  glMatrix.mat4.lookAt(view, camera, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

  var projection = glMatrix.mat4.create();
  glMatrix.mat4.perspective(
    projection,
    glMatrix.glMatrix.toRadian(45),
    canvas.width / canvas.height,
    0.1,
    20.0
  );

  // Set initial uniform values untuk objek utama
  gl.uniform3fv(uAmbientColor, [0.3, 0.3, 0.3]);
  gl.uniform1f(uAmbientIntensity, 0.5);
  gl.uniform3fv(uDiffuseColor, [1.0, 1.0, 1.0]);
  gl.uniform3fv(uDiffusePosition, lightPosition);
  gl.uniform3fv(uViewerPosition, camera);

  // Safety checks: ensure there's geometry to draw
  if (!allVertices || allVertices.length === 0) {
    console.error("No vertex data found (allVertices is empty).");
    return;
  }
  if (!allIndices || allIndices.length === 0) {
    console.error("No index data found (allIndices is empty).");
    return;
  }

  // Enable depth testing
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  // Animation loop
  var angle = 0;
  function render() {
    if (!freeze) {
      angle += 0.01;
    }

    // Clear canvas
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Update model matrix dengan scaling
    glMatrix.mat4.identity(model);
    glMatrix.mat4.rotateX(model, model, angle * 0.5);
    glMatrix.mat4.rotateY(model, model, angle * 0.3);
    glMatrix.mat4.scale(model, model, [scaleFactor, scaleFactor, scaleFactor]);

    // Update matrices uniforms
    gl.uniformMatrix4fv(uModel, false, model);
    gl.uniformMatrix4fv(uView, false, view);
    gl.uniformMatrix4fv(uProjection, false, projection);

    // UPDATE POSISI CAHAYA SETIAP FRAME
    gl.uniform3fv(uDiffusePosition, lightPosition);

    // Update normal matrix - PENTING untuk lighting yang benar
    var normalMatrix = glMatrix.mat3.create();
    glMatrix.mat3.normalFromMat4(normalMatrix, model);
    gl.uniformMatrix3fv(uNormalMatrix, false, normalMatrix);

    // Draw objek utama
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, allIndices.length, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(render);
  }

  render();
}

// Panggil main function ketika halaman selesai dimuat
window.onload = main;