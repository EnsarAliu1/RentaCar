fetch("http://localhost:3000/clients")
  .then((response) => response.json())
  .then((clients) => {
    console.log(clients);
  });
const clients = "http://localhost:3000/clients";

const form = document.getElementById("regjistrimForm");

const onClientCreate = (event) => {
  event.preventDefault();
  const emri = document.getElementById("emri").value;
  const mbiemri = document.getElementById("mbiemri").value;
  const email = document.getElementById("email").value;
  const telefoni = document.getElementById("telefoni").value;
  const password = document.getElementById("password").value;
  const konfirmo = document.getElementById("konfirmo").value;

  if (password !== konfirmo) {
    alert("Fjalekalimi dhe konfirmi duhet te jene te njejta!");
    return;
  } else if (password.length < 8) {
    alert("Fjalekalimi duhet te kete te pakten 8 karaktere!");
    return;
  } else if (!email.includes("@")) {
    alert("Emaili duhet te jete ne formatin e duhur!");
    return;
  } else if (email === clients.email) {
    alert("Ky email eshte i perodorur, ju lutem zgjidhni nje email tjeter!");
    return;
  } else if (telefoni === clients.telefoni) {
    alert(
      "Ky numer telefoni eshte i perodorur, ju lutem zgjidhni nje numer tjeter!",
    );
    return;
  } else if (
    emri === "" ||
    mbiemri === "" ||
    email === "" ||
    telefoni === "" ||
    password === "" ||
    konfirmo === ""
  ) {
    alert("Ju lutem plotesoni te gjitha fushat!");
    return;
  }

  const newClient = {
    emri: emri,
    mbiemri: mbiemri,
    email: email,
    telefoni: telefoni,
    password: password,
    username: emri + mbiemri.toLowerCase(),
  };

  const response = fetch("http://localhost:3000/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClient),
  })
    .then((response) => response.json())
    .then((data) => {
      form.reset();
    });
  window.location.href = "../views/hyr.html";
  alert("Llogaria u krijua me sukses!");
};

form.addEventListener("submit", onClientCreate);
