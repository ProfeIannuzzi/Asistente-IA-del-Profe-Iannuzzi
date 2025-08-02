async function ask() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const question = document.getElementById('question').value;
  if (!question.trim()) {
    alert("Por favor, escribí una pregunta.");
    return;
  }

  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('answer').innerText = '';

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, ampliar: true })
    });

    const data = await response.json();
    if (data?.answer) {
      document.getElementById("answer").innerHTML = data.answer.replace(/\n/g, "<br>");
    } else {
      document.getElementById("answer").innerText = "Error al generar respuesta.";
    }
  } catch (error) {
    document.getElementById("answer").innerText = "Error al contactar con el servidor.";
  } finally {
    document.getElementById('loader').classList.add('hidden');
  }
}

function toggleRepaso() {
  const tema = prompt("¿Sobre qué tema querés practicar?");
  if (!tema) return;

  document.getElementById('loader').classList.remove('hidden');
  document.getElementById('answer').innerText = '';

  fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ modo: "repaso", tema })
  })
  .then(res => res.json())
  .then(data => {
    if (data?.answer) {
      const respuesta = `
        <p>${data.answer.replace(/\n/g, "<br>")}</p>
        <button onclick="toggleRepaso()">📚 Nueva pregunta del mismo tema</button>
        <button onclick="location.reload()">🔙 Volver a la página de bienvenida</button>
      `;
      document.getElementById("answer").innerHTML = respuesta;
    } else {
      document.getElementById("answer").innerText = "No se pudo obtener una pregunta de repaso.";
    }
  })
  .catch(() => {
    document.getElementById("answer").innerText = "Error al contactar con el servidor.";
  })
  .finally(() => {
    document.getElementById('loader').classList.add('hidden');
  });
}