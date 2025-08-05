async function ask() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const question = document.getElementById('question').value.trim();
  if (!question) {
    alert("Por favor, escribí una pregunta.");
    return;
  }

  mostrarLoader(true);

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    mostrarLoader(false);

    if (data.answer) {
      mostrarRespuesta(data.answer);
    } else {
      mostrarRespuesta("⚠️ No se pudo obtener respuesta.");
    }
  } catch (error) {
    mostrarLoader(false);
    mostrarRespuesta("⚠️ Error al conectarse con el servidor.");
  }
}

async function activarModoRepaso() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const tema = prompt("📚 ¿Sobre qué tema querés repasar?");
  if (!tema) return;

  mostrarLoader(true);

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modo: "repaso", tema })
    });

    const data = await response.json();
    mostrarLoader(false);

    if (data.answer) {
      mostrarRespuesta(data.answer);
    } else {
      mostrarRespuesta("⚠️ No se pudo generar una pregunta.");
    }
  } catch (error) {
    mostrarLoader(false);
    mostrarRespuesta("⚠️ Error al conectarse con el servidor.");
  }
}

function mostrarRespuesta(texto) {
  const answer = document.getElementById("answer");
  answer.innerText = texto;
  answer.classList.remove("fade");
  void answer.offsetWidth; // Reiniciar animación
  answer.classList.add("fade");
}

function mostrarLoader(visible) {
  const loader = document.getElementById("loader");
  loader.style.display = visible ? "block" : "none";
}