const form = document.getElementById("adminForm");

const onAdminLogin = (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    alert("Ju lutem plotesoni username dhe fjalekalimin!");
    return;
  }

  fetch("http://localhost:3000/admins")
    .then((response) => response.json())
    .then((admins) => {
      const admin = admins.find(
        (a) => a.username === username && a.password === password,
      );

      if (!admin) {
        alert("Username ose fjalkalimi eshte i gabuar!");
        return;
      }

      localStorage.setItem("adminUsername", admin.username);
      localStorage.setItem("adminId", admin.id);

      alert("Hyrja u krye me sukses!");
      window.location.href = "../../views/dashboard/admindashboard.html";
    });
};

form.addEventListener("submit", onAdminLogin);
