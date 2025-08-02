async function ask(ampliar = false) {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const question = document.getElementById('question').value;
  const answerEl = document.getElementById("answer");
  answerEl.innerHTML = '<div class="loader"></div>';

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, ampliar })
    });

    const data = await response.json();
    answerEl.innerHTML = "";

    if (data.answer) {
      answerEl.innerHTML = `
        <div class="respuesta-animada">${data.answer}</div>
        ${!ampliar ? `<button onclick="ask(true)" class="btn-ampliar">🔍 Ampliar con fuentes confiables</button>` : ""}
      `;
    } else {
      answerEl.innerText = "⚠️ Error al generar respuesta.";
    }

  } catch (error) {
    answerEl.innerText = "❌ Error de conexión con el servidor.";
  }
}

function mostrarRepaso() {
  document.getElementById("repaso").style.display = "block";
}

async function iniciarRepaso() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const tema = document.getElementById('tema').value;
  const answerEl = document.getElementById("answer");
  answerEl.innerHTML = '<div class="loader"></div>';

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modo: "repaso", tema })
    });

    const data = await response.json();
    answerEl.innerHTML = `
      <div class="respuesta-animada">${data.answer}</div>
      <button onclick="iniciarRepaso()" class="btn-ampliar">🔁 Nueva pregunta</button>
      <button onclick="location.reload()" class="btn-ampliar">🏠 Volver al inicio</button>
    `;
  } catch (error) {
    answerEl.innerText = "❌ Error al generar repaso.";
  }
}
