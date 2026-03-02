const form = document.getElementById("hyrForm");

const onClientLogin = (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Ju lutem plotesoni email dhe fjalekalimin!");
    return;
  }

  fetch("http://localhost:3000/clients")
    .then((response) => response.json())
    .then((clients) => {
      const client = clients.find(
        (c) => c.email === email && c.password === password,
      );

      if (!client) {
        alert("Emaili ose fjalekalimi eshte i gabuar!");
        return;
      }

      localStorage.setItem("username", client.username);
      localStorage.setItem("clientId", client.id);

      alert("Hyrja u krye me sukses!");
      window.location.href = "../views/index.html";
    });
};

form.addEventListener("submit", onClientLogin);
