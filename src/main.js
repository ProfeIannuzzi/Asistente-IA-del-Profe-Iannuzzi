async function ask() {
  const password = document.getElementById('password').value;
  if (password !== 'mfi') {
    alert("No, No, No....  ESA NO ES!!");
    return;
  }

  const question = document.getElementById('question').value;

  const response = await fetch("https://asistente-ia-del-profe-iannuzzi-2.onrender.com/api/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();

  if (data?.choices?.[0]?.message?.content) {
    document.getElementById("answer").innerText = data.choices[0].message.content;
  } else {
    document.getElementById("answer").innerText = "Error al generar respuesta.";
  }
}
