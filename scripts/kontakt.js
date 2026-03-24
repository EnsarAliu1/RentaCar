fetch("http://localhost:3000/mesazhet")
  .then((response) => response.json())
  .then((mesazhet) => {
    console.log(mesazhet);
  });

const mesazhet = "http://localhost:3000/mesazhet";

const kontaktForm = document.getElementById("kontaktForm");

function showToast(message, type) {
  const toastElement = document.getElementById("pageToast");
  const toastText = document.getElementById("toastText");

  toastText.textContent = message;

  toastElement.classList.remove("text-bg-success", "text-bg-danger");

  if (type === "success") {
    toastElement.classList.add("text-bg-success");
  } else if (type === "error") {
    toastElement.classList.add("text-bg-danger");
  }

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

// Kontrollo nese ka toast te ruajtur ne sessionStorage (pas reload)
window.addEventListener("DOMContentLoaded", () => {
  const pendingToast = sessionStorage.getItem("pendingToast");
  if (pendingToast) {
    const { message, type } = JSON.parse(pendingToast);
    sessionStorage.removeItem("pendingToast");
    showToast(message, type);
  }
});

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
    showToast("Ju lutem plotesoni fushat perkatese!", "error");
    return;
  } else if (!email.includes("@")) {
    showToast("Emaili duhet te jete ne formen e duhur!", "error");
    return;
  } else if (!telefoni.startsWith("+")) {
    showToast("Numri i telefonit duhet te jet ne formatin e duhur!", "error");
    return;
  }

  const newMessage = {
    emriPlote: emriPlote,
    email: email,
    telefoni: telefoni,
    subjekti: subjekti,
    Mesazhi: mesazhi,
  };

  sessionStorage.setItem("pendingToast", JSON.stringify({
    message: "Mesazhi u dergua me sukses!",
    type: "success"
  }));

  fetch("http://localhost:3000/mesazhet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  })
    .then((response) => response.json())
    .then(() => {
      kontaktForm.reset();
    });
};

kontaktForm.addEventListener("submit", onSendMessage);
