let klinetetTABELA = "";

fetch("http://localhost:3000/clients")
  .then((response) => response.json())
  .then((clients) => {
    clients.forEach((client) => {
      klinetetTABELA += `
            <tr>
                <td>${client.id}</td>
                <td>${client.emri}</td>
                <td>${client.mbiemri}</td>
                <td>${client.email}</td>
                <td>${client.telefoni}</td>
                <td>${client.username}</td>
                <td>
                    <button class="py-1 px-2 text-dark bg-info border-0 rounded-2 mx-1 klientEdit" data-id="${client.id}">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="py-1 px-2 text-white bg-danger border-0 rounded-2 mx-1 klientDelete" data-id="${client.id}">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    document.getElementById("klientTabela").innerHTML = klinetetTABELA;
  });

/*edit klientet**********************************************/

document.addEventListener("click", (e) => {
  if (e.target.closest(".klientEdit")) {
    const row = e.target.closest("tr");
    const id = e.target.closest(".klientEdit").dataset.id;
    const cells = row.querySelectorAll("td");

    const originals = {
      emri: cells[1].textContent,
      mbiemri: cells[2].textContent,
      email: cells[3].textContent,
      telefoni: cells[4].textContent,
      username: cells[5].textContent,
    };
    row.dataset.originals = JSON.stringify(originals);

    cells[1].innerHTML = `<input style="width:100%" value="${originals.emri}">`;
    cells[2].innerHTML = `<input style="width:100%" value="${originals.mbiemri}">`;
    cells[3].innerHTML = `<input style="width:100%" value="${originals.email}">`;
    cells[4].innerHTML = `<input style="width:100%" value="${originals.telefoni}">`;
    cells[5].innerHTML = `<input style="width:100%" value="${originals.username}">`;

    cells[6].innerHTML = `
      <button class="py-1 px-2 text-dark bg-info border-0 rounded-2 mx-1 saveBtn" data-id="${id}">Save</button>
      <button class="py-1 px-2 text-white bg-danger border-0 rounded-2 mx-1 cancelBtn">Cancel</button>
    `;
  }

  //butoni per save
  if (e.target.classList.contains("saveBtn")) {
    const row = e.target.closest("tr");
    const id = e.target.dataset.id;
    const cells = row.querySelectorAll("td");

    const updated = {
      emri: cells[1].querySelectorAll("input").value,
      mbiemri: cells[2].querySelector("input").value,
      email: cells[3].querySelector("input").value,
      telefoni: cells[4].querySelector("input").value,
      username: cells[5].querySelector("input").value,
    };

    fetch(`http://localhost:3000/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).then(() => {
      cells[1].textContent = updated.emri;
      cells[2].textContent = updated.mbiemri;
      cells[3].textContent = updated.email;
      cells[4].textContent = updated.telefoni;
      cells[5].textContent = updated.username;

      cells[6].innerHTML = `
        <button class="editBtn" data-id="${id}">Edit</button>
        <button class="klientDelete" data-id="${id}">Delete</button>
      `;
    });
  }

  //butoni per cancel
  if (e.target.classList.contains("cancelBtn")) {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");
    const originals = JSON.parse(row.dataset.originals);
    const id =
      row.querySelector(".saveBtn")?.dataset.id ||
      row.querySelector(".editBtn")?.dataset.id;

    cells[1].textContent = originals.emri;
    cells[2].textContent = originals.mbiemri;
    cells[3].textContent = originals.email;
    cells[4].textContent = originals.telefoni;
    cells[5].textContent = originals.username;

    cells[7].innerHTML = `
      <button class="py-1 px-2 text-dark bg-info border-0 rounded-2 mx-1 klientEdit" data-id="${id}"><i class="bi bi-pencil-square"></i></button>
      <button class="py-1 px-2 text-white bg-danger border-0 rounded-2 mx-1 klientDelete" data-id="${id}"><i class="bi bi-trash-fill"></i></button>
    `;
  }
});
/**********************************************/
document.addEventListener("click", function (e) {
  if (e.target.closest(".klientDelete")) {
    const btn = e.target.closest(".klientDelete");
    const row = btn.closest("tr");
    const id = btn.dataset.id;

    const konfirm = confirm("A je i sigurte qe do me fshi kete klient?");
    if (!konfirm) return;

    fetch(`http://localhost:3000/clients/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        alert("Klienti u fshi!");
        row.remove();
      } else {
        alert("Gabim! Nuk mund te fshihet klienti");
      }
    });
  }
});
