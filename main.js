const backendUrl = "https://asistente-ia-del-profe-iannuzzi-2.onrender.com";

async function ask() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const question = document.getElementById('question').value.trim();
  if (!question) return;

  const answerEl = document.getElementById("answer");
  answerEl.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (data.answer) {
      answerEl.innerHTML = `
        <div class="fade-in">${data.answer}</div>
        <p class="base-prof">Esta respuesta es elaborada en base al material provisto por el Profesor.</p>
        <button onclick="ampliarRespuesta('${question}')" class="ampliar-btn">🌐 Ampliar con fuentes confiables</button>
      `;
    } else {
      answerEl.innerText = "⚠️ No se pudo obtener respuesta.";
    }
  } catch (err) {
    answerEl.innerText = "❌ Error al consultar el servidor.";
  }
}

async function ampliarRespuesta(pregunta) {
  const answerEl = document.getElementById("answer");
  answerEl.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta })
    });

    const data = await response.json();

    if (data.ampliacion) {
      answerEl.innerHTML = `
        <div class="fade-in">${data.ampliacion}</div>
        <p class="base-prof">Fuentes utilizadas:</p>
        <ul>${data.fuentes.map(url => `<li><a href="${url}" target="_blank">${url}</a></li>`).join("")}</ul>
      `;
    } else {
      answerEl.innerText = "⚠️ No se pudo ampliar la respuesta.";
    }
  } catch {
    answerEl.innerText = "❌ Error al buscar información externa.";
  }
}

async function repaso() {
  const tema = prompt("¿Sobre qué tema querés repasar?");
  if (!tema) return;

  const respuesta = await fetch(`${backendUrl}/api/repaso`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tema })
  });

  const data = await respuesta.json();

  mostrarPreguntaRepaso(data.pregunta, tema);
}

function mostrarPreguntaRepaso(pregunta, tema) {
  const contenedor = document.getElementById("answer");
  contenedor.innerHTML = `
    <div class="fade-in">
      <p><strong>Pregunta:</strong> ${pregunta}</p>
      <textarea id="respuestaAlumno" placeholder="Escribí tu respuesta..."></textarea>
      <br>
      <button onclick="enviarRespuesta('${pregunta}', '${tema}')">Enviar respuesta</button>
    </div>
  `;
}

async function enviarRespuesta(pregunta, tema) {
  const respuesta = document.getElementById("respuestaAlumno").value;

  const res = await fetch(`${backendUrl}/api/corregir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pregunta, respuesta })
  });

  const data = await res.json();

  const contenedor = document.getElementById("answer");
  contenedor.innerHTML = `
    <div class="fade-in">
      ${data.correcta ? "✅ ¡Correcto!" : `❌ Incorrecto. ${data.explicacion}`}
      <br><br>
      <button onclick="repaso()">📚 Nueva pregunta del mismo tema</button>
      <button onclick="volverInicio()">🔙 Volver a la página de bienvenida</button>
    </div>
  `;
}

function volverInicio() {
  location.reload();
}

// 👉 Exponer funciones para HTML
window.ask = ask;
window.repaso = repaso;