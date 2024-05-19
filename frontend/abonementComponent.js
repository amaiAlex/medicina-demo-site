const abonementsContainer = document.getElementById("abonements-container");
let currentCard = "infoCard";
let chosenAbonement = null;
let chosenAbonementId = null;
let globalAbonementsData = [];

function chooseAbonement(abonement) {
  console.log({ abonement });
  chosenAbonement = abonement;
  chosenAbonementId = abonement.id; // Correcting the way we get the abonement ID
  currentCard = "purchaseCard";
  render();
}

function goBack() {
  currentCard = "infoCard";
  render();
}

function confirmPurchase() {
  currentCard = "registrationCard";
  render();
}

function completePurchase() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const patronymic = document.getElementById("patronymic").value;
  const phone = document.getElementById("phone").value;

  const purchaseData = {
    name: name,
    surname: surname,
    patronymic: patronymic,
    phone: phone,
    abonementId: chosenAbonementId,
  };

  console.log("Sending purchase data:", purchaseData); // Added log for debugging

  fetch("http://localhost:3000/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchaseData),
  })
    .then((response) => response.json())
    .then((newPurchase) => {
      console.log("New purchase:", newPurchase);
      // Optionally, show a success message or redirect to another page
    })
    .catch((error) => console.error("Error creating new purchase:", error));
}

function render() {
  if (currentCard === "infoCard") {
    abonementsContainer.innerHTML = "";
    fetch("http://localhost:3000/abonements")
      .then((response) => response.json())
      .then((abonementsData) => {
        globalAbonementsData = abonementsData;
        abonementsData.forEach((abonement) => {
          const cardHtml = `
            <div class="col mb-4" id="abonement-${abonement.id}">
              <div class="card">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${abonement.name}</h5>
                  <p class="card-text">Цена: ${abonement.price} руб.</p>
                  <a href="#" class="btn btn-primary purchase-abonement">Купить</a>
                </div>
              </div>
            </div>
          `;
          abonementsContainer.innerHTML += cardHtml;
        });
        addEventListeners();
      })
      .catch((error) =>
        console.error("Error fetching abonements data:", error)
      );
  } else if (currentCard === "purchaseCard") {
    const cardHtml = `
      <div class="col mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Вы выбрали: ${chosenAbonement.name}</h5>
            <p class="card-text">${chosenAbonement.description}</p>
            <p class="card-text">Цена: ${chosenAbonement.price} руб.</p>
            <a href="#" class="btn btn-primary" id="confirm-purchase">Подтвердить покупку</a>
            <button class="btn btn-warning" id="go-back">Назад</button>
          </div>
        </div>
      </div>
    `;
    abonementsContainer.innerHTML = cardHtml;
    document
      .getElementById("confirm-purchase")
      .addEventListener("click", confirmPurchase);
    document.getElementById("go-back").addEventListener("click", goBack);
  } else if (currentCard === "registrationCard") {
    const cardHtml = `
      <div class="col mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Заполните ваши данные</h5>
            <form>
              <div class="form-group">
                <label for="name">Имя</label>
                <input type="text" class="form-control" id="name" required>
              </div>
              <div class="form-group">
                <label for="surname">Фамилия</label>
                <input type="text" class="form-control" id="surname" required>
              </div>
              <div class="form-group">
                <label for="patronymic">Отчество</label>
                <input type="text" class="form-control" id="patronymic" required>
              </div>
              <div class="form-group">
                <label for="phone">Номер телефона</label>
                <input type="text" class="form-control" id="phone" required>
              </div>
              <button type="button" class="btn btn-primary" id="complete-purchase">Приобрести</button>
              <button type="button" class="btn btn-warning" id="go-back">Назад</button>
            </form>
          </div>
        </div>
      </div>
    `;
    abonementsContainer.innerHTML = cardHtml;
    document
      .getElementById("complete-purchase")
      .addEventListener("click", completePurchase);
    document.getElementById("go-back").addEventListener("click", goBack);
  }
}

function addEventListeners() {
  document.querySelectorAll(".purchase-abonement").forEach((button, index) => {
    button.addEventListener("click", () =>
      chooseAbonement(globalAbonementsData[index])
    );
  });
}

render();
