const backendURL = "https://asistente-ia-del-profe-iannuzzi-2.onrender.com";

async function ask() {
  const password = document.getElementById("password").value;
  const question = document.getElementById("question").value.trim();

  if (password !== "mfi") {
    alert("❌ clave incorrecta, reintente!!");
    return;
  }

  if (!question) {
    alert("Por favor ingresá una pregunta.");
    return;
  }

  mostrarLoader(true);
  try {
    const response = await fetch(`${backendURL}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    mostrarRespuesta(data.answer || "⚠️ No se pudo obtener respuesta.");
  } catch (error) {
    mostrarRespuesta("⚠️ No se pudo obtener respuesta.");
    console.error("❌ Error al consultar:", error);
  } finally {
    mostrarLoader(false);
  }
}

function mostrarLoader(activo) {
  const loader = document.getElementById("loader");
  loader.style.display = activo ? "block" : "none";
}

function mostrarRespuesta(texto) {
  const respuesta = document.getElementById("answer");
  respuesta.innerText = texto;
  respuesta.classList.add("mostrar");
}

async function iniciarRepaso() {
  const tema = prompt("📚 ¿Sobre qué tema querés repasar?");
  if (!tema) return;

  mostrarLoader(true);
  try {
    const response = await fetch(`${backendURL}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modo: "repaso", tema })
    });

    const data = await response.json();
    mostrarRespuesta(data.answer || "⚠️ No se pudo obtener respuesta.");
  } catch (error) {
    mostrarRespuesta("⚠️ No se pudo obtener respuesta.");
    console.error("❌ Error en modo repaso:", error);
  } finally {
    mostrarLoader(false);
  }
}