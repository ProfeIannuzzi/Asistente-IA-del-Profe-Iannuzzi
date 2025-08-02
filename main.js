async function ask() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const question = document.getElementById('question').value;
  if (!question) {
    alert("Por favor escribí una pregunta.");
    return;
  }

  document.getElementById("answer").innerHTML = '<div class="loader"></div>';

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (data?.answer) {
      const respuestaConAnimacion = `<div class="fade-in">${data.answer}</div>`;
      document.getElementById("answer").innerHTML = respuestaConAnimacion;
    } else {
      document.getElementById("answer").innerText = "Error al generar respuesta.";
    }
  } catch (error) {
    document.getElementById("answer").innerText = "Error de conexión con el servidor.";
  }
}

async function repaso() {
  const tema = prompt("¿Sobre qué tema querés repasar?");
  if (!tema) return;

  document.getElementById("answer").innerHTML = '<div class="loader"></div>';

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ modo: "repaso", tema })
    });

    const data = await response.json();

    if (data?.answer) {
      const respuestaConAnimacion = `<div class="fade-in">${data.answer}</div>`;
      document.getElementById("answer").innerHTML = respuestaConAnimacion;
    } else {
      document.getElementById("answer").innerText = "Error al generar pregunta de repaso.";
    }
  } catch (error) {
    document.getElementById("answer").innerText = "Error de conexión con el servidor.";
  }
}