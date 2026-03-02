fetch("http://localhost:3000/mesazhet")
  .then((response) => response.json())
  .then((mesazhet) => {
    console.log(mesazhet);
  });

const mesazhet = "http://localhost:3000/mesazhet";

const kontaktForm = document.getElementById("kontaktForm");

const onSendMessage = (event) => {
  event.preventDefault();
  const emriPlote = document.getElementById("emriPlote").value;
  const email = document.getElementById("email").value;
  const telefoni = document.getElementById("telefoni").value;
  const subjekti = document.getElementById("subjekti").value;
  const mesazhi = document.getElementById("mesazhi").value;

  if (
    emriPlote === "" ||
    email === "" ||
    telefoni === "" ||
    subjekti === "" ||
    mesazhi === ""
  ) {
    alert("Ju lutem plotesoni fushat perkatese!");
    return;
  } else if (!email.includes("@")) {
    alert("Emaili duhet te jete ne formen e duhur!");
    return;
  } else if (!telefoni.startsWith("+")) {
    alert("Numri i telefonit duhet te jet ne formatin e duhur!");
    return;
  }

  const newMessage = {
    emriPlote: emriPlote,
    email: email,
    telefoni: telefoni,
    subjekti: subjekti,
    Mesazhi: mesazhi,
  };

  const response = fetch("http://localhost:3000/mesazhet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  })
    .then((response) => response.json())
    .then(() => {
      kontaktForm.reset();
      alert("Mesazhi u dergua me sukses!");
    });
};

kontaktForm.addEventListener("submit", onSendMessage);
