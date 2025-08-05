let modoRepaso = false;

async function ask() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("Clave Incorreta, Reintente...");
    return;
  }

  const question = document.getElementById('question').value.trim();
  if (!question) {
    alert("Por favor ingresá una pregunta.");
    return;
  }

  mostrarLoader(true);
  document.getElementById("answer").innerText = "";

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
      document.getElementById("answer").innerText = data.answer;
    } else {
      document.getElementById("answer").innerText = "⚠️ No se pudo obtener respuesta.";
    }
  } catch (error) {
    document.getElementById("answer").innerText = "⚠️ Error de conexión con el servidor.";
  }

  mostrarLoader(false);
}

async function activarModoRepaso() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const tema = prompt("¿Sobre qué tema querés repasar?");
  if (!tema) return;

  mostrarLoader(true);
  document.getElementById("answer").innerText = "";

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ modo: "repaso", tema })
    });

    const data = await response.json();

    if (data.answer) {
      document.getElementById("answer").innerText = data.answer;
    } else {
      document.getElementById("answer").innerText = "⚠️ No se pudo obtener pregunta de repaso.";
    }
  } catch (error) {
    document.getElementById("answer").innerText = "⚠️ Error de conexión con el servidor.";
  }

  mostrarLoader(false);
}

function mostrarLoader(visible) {
  const loader = document.getElementById("loader");
  loader.style.display = visible ? "block" : "none";
}