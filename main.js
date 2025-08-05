let modoRepasoActivo = false;

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

  mostrarLoader(true);

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    document.getElementById("answer").innerHTML = data.answer || "⚠️ No se pudo obtener respuesta.";
  } catch (err) {
    document.getElementById("answer").innerHTML = "⚠️ No se pudo obtener respuesta.";
  } finally {
    mostrarLoader(false);
  }
}

async function activarModoRepaso() {
  const tema = prompt("¿Sobre qué tema querés repasar?");
  if (!tema) return;

  mostrarLoader(true);

  try {
    const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modo: "repaso", tema })
    });

    const data = await response.json();
    document.getElementById("answer").innerHTML = data.answer || "⚠️ No se pudo obtener respuesta.";
  } catch (err) {
    document.getElementById("answer").innerHTML = "⚠️ No se pudo obtener respuesta.";
  } finally {
    mostrarLoader(false);
  }
}

function mostrarLoader(mostrar) {
  document.getElementById("loader").style.display = mostrar ? "inline-block" : "none";
}