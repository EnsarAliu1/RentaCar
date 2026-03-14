const parametrat = new URLSearchParams(window.location.search);
const automjetiId = parametrat.get("automjetiId");

fetch(`http://localhost:3000/automjetet/${automjetiId}`)
  .then((response) => response.json())
  .then((automjeti) => {
    let automjetiHTML = `
        <div class="card">
            <div class="card-img">
                <img class="w-100 h-100 rounded-top-2" src="${automjeti.img}" alt="">
            </div>
            <div class="card-body">
                <div class="row justify-content-between align-content-center ">
                    <div class="col text-start">
                        <p class="card-title fw-bold ">${automjeti.emri}</p>
                        <p class="text-pharagraph">${automjeti.viti}</p>
                    </div>

                </div>
                <hr>
                <div class="row text-pharagraph">
                    <div class="col">
                        <p><i class="bi bi-fuel-pump"></i> ${automjeti.karburanti}</p>
                    </div>
                    <div class="col">
                        <p><i class="bi bi-gear"></i> ${automjeti.transmisioni}</p>
                    </div>
                    <div class="col">
                        <p><i class="bi bi-people"></i> ${automjeti.kapaciteti} vende</p>
                    </div>
                </div>
                <hr>
                <div class="row d-flex justify-content-between align-content-center  text-pharagraph">
                    <div class="col text-start">
                        <p>Cmimi ditor</p>
                    </div>
                    <div class="col text-end">
                        <p class="text-primary fs-4">€${automjeti.cmimi}</p>
                    </div>
                </div>
            </div>
        </div>            
      `;
    document.getElementById("automjeti-container").innerHTML = automjetiHTML;

    const rezervimiForm = document.getElementById("rezervimiForm");

    const onCreateReservation = (event) => {
      event.preventDefault();
      const dataeFillimit = document.getElementById("dataeFillimit").value;
      const dataeMbarimit = document.getElementById("dataeMbarimit").value;
      const shenime = document.getElementById("shenime").value;

      const username = localStorage.getItem("username");
      const clinetId = localStorage.getItem("clientId");

      if (dataeFillimit === "" || dataeMbarimit === "") {
        alert("Ju lutem zgjedhni datat per fillim dhe mbarim te rezervimit! ");
        return;
      } else if (username === null) {
        alert("Duhet te beheni login per te rezervuar");
        return;
      }

      const newReservation = {
        automjetiId: automjetiId,
        clientId: clinetId,
        username: username,
        dataMarrjes: dataeFillimit,
        dataKthimit: dataeMbarimit,
        shenime: shenime,
      };

      const respose = fetch("http://localhost:3000/rezervimet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      })
        .then((response) => response.json())
        .then(() => {
          rezervimiForm.reset();
          alert("Rezervimi u be me sukses!");
        });
    };

    rezervimiForm.addEventListener("submit", onCreateReservation);
  });
