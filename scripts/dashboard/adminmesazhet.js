let mesazhetTABELA = "";

fetch("http://localhost:3000/mesazhet")
  .then((response) => response.json())
  .then((mesazhet) => {
    mesazhet.forEach((mesazhi) => {
      mesazhetTABELA += `
            <tr>
                <td>${mesazhi.id}</td>
                <td>${mesazhi.emriPlote}</td>
                <td>${mesazhi.email}</td>
                <td>${mesazhi.telefoni}</td>
                <td>${mesazhi.subjekti}</td>
                <td>${mesazhi.Mesazhi}</td>
                <td>
                    <button class="py-1 px-2 text-white bg-danger border-0 rounded-2 mx-1 mesazhDelete" data-id="${mesazhi.id}">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    document.getElementById("mesazhetTabela").innerHTML = mesazhetTABELA;
  });

document.addEventListener("click", function (e) {
  if (e.target.closest(".mesazhDelete")) {
    const btn = e.target.closest(".mesazhDelete");
    const row = btn.closest("tr");
    const id = btn.dataset.id;

    const konfirm = confirm("A je i sigurt qe don me fshi kete mesazh?");
    if (!konfirm) return;

    fetch(`http://localhost:3000/mesazhet/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        alert("Mesazhi u fshi");
        row.remove();
      }
    });
  }
});
