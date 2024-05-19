const doctorsContainer = document.getElementById("doctors-container");
let currentCard = "infoCard";
var chosenDoctor = null;
var chosenDayId = "";
var chosenTimeId = "";
var globalDoctorsData = [];

function chooseDoctor(doctor) {
  console.log({ doctor });
  chosenDoctor = doctor;
  currentCard = "dayCard";
  render();
}

function chooseDay(day) {
  chosenDayId = day;
  currentCard = "timeCard";
  render();
}

function goBack() {
  if (currentCard === "dayCard") {
    currentCard = "infoCard";
  } else if (currentCard === "timeCard") {
    currentCard = "dayCard";
  }
  render();
}

function chooseTime(time) {
  chosenTimeId = time;
  console.log("Chosen time:", chosenTimeId);
  // Perform any action needed with the chosen time
}
// сделай функцию для отправки данных на сервер
function sendAppointmentData() {
  fetch("http://localhost:3000/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      doctor_id: chosenDoctor.doctor_id,
      day: chosenDayId,
      time: chosenTimeId,
    }),
  })
    .then((response) => response.json())
    .then((newAppointment) => {
      console.log("New appointment:", newAppointment);
    })
    .catch((error) => console.error("Error creating new appointment:", error));
  console.log(
    "Отправлено на сервер:",
    chosenDoctor.doctor_id,
    chosenDayId,
    chosenTimeId
  );
}
function getDoctorImage(doctor_id) {
  switch (doctor_id) {
    case 1:
      return "public/doc1.jpg";
    case 2:
      return "public/doc5.jpg";
    case 3:
      return "public/doc3.jpg";
    case 4:
      return "public/doc4.jpg";
    default:
      return "/default.jpg";
  }
}

function render() {
  if (currentCard === "infoCard") {
    doctorsContainer.innerHTML = "";
  }
  if (currentCard === "infoCard") {
    // Fetch doctors data from the server
    fetch("http://localhost:3000/doctors")
      .then((response) => response.json())
      .then((doctorsData) => {
        globalDoctorsData = doctorsData;
        doctorsData.forEach((doctor) => {
          let cardHtml = `
            <div class="col mb-4" id="doctor-${doctor.doctor_id}">
              <div class="card">
              <img src="${getDoctorImage(
                doctor.doctor_id
              )}" class="card-img-top" alt="${doctor.name}">
              <div class="card-body d-flex flex-column">
                  <p class="card-text mt-auto">${doctor.occupation}</p>
                  <h5 class="card-title">${doctor.doctor_name}</h5>
                  <a href="#" class="btn btn-primary make-appointment" onclick='chooseDoctor(${JSON.stringify(
                    doctor
                  )})'>Записаться на прием</a>
                </div>
              </div>
            </div>
          `;
          doctorsContainer.innerHTML += cardHtml;
        });
      })
      .catch((error) => console.error("Error fetching doctors data:", error));
  } else if (currentCard === "dayCard") {
    // Fetch appointments data for the selected doctor from the server
    fetch(
      `http://localhost:3000/appointments?doctor_id=${chosenDoctor.doctor_id}`
    )
      .then((response) => response.json())
      .then((appointments) => {
        let cardHtml = `
          <div class="col mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${chosenDoctor.doctor_name}</h5>
                ${appointments
                  .map((appointment) => appointment.day)
                  .filter((day, index, days) => days.indexOf(day) === index)
                  .map((day) => {
                    return ` <a href="#" onclick="chooseDay('${day}')" class="btn btn-primary make-appointment mt-2 mb-2">${day}</a>`;
                  })
                  .join("")}
                  <button class="btn btn-warning" onclick="goBack()">Назад</button>
              </div>
            </div>
          </div>
        `;
        document.getElementById(`doctor-${chosenDoctor.doctor_id}`).innerHTML =
          cardHtml;
      })
      .catch((error) =>
        console.error("Error fetching appointments data:", error)
      );
  } else if (currentCard === "timeCard") {
    // Fetch appointments data for the selected doctor from the server
    fetch(
      `http://localhost:3000/appointments?doctor_id=${chosenDoctor.doctor_id}&day=${chosenDayId}`
    )
      .then((response) => response.json())
      .then((appointments) => {
        let cardHtml = `
          <div class="col mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${chosenDoctor.doctor_name}</h5>
                ${appointments
                  .map((appointment) => appointment.time)
                  .filter((time, index, times) => times.indexOf(time) === index)
                  .map((time) => {
                    // Проверяем доступность времени
                    const isAvailable = appointments.some(
                      (appointment) =>
                        appointment.time === time &&
                        appointment.day === chosenDayId &&
                        appointment.doctor_id === chosenDoctor.doctor_id &&
                        appointment.available
                    );
                    // Применяем соответствующий класс в зависимости от доступности времени
                    const buttonClass = isAvailable
                      ? "btn btn-primary"
                      : "btn btn-secondary disabled";
                    return ` <a href="registerPage.html" onclick="chooseTime('${time}'); sendAppointmentData();" class="${buttonClass} make-appointment mt-2 mb-2">${time}</a>`;
                  })
                  .join("")}
                  <button class="btn btn-warning" onclick="goBack()">Назад</button>
              </div>
            </div>
          </div>
        `;
        console.log({ chosenDoctor, chosenDayId, chosenTimeId });

        document.getElementById(`doctor-${chosenDoctor.doctor_id}`).innerHTML =
          cardHtml;
      })
      .catch((error) =>
        console.error("Error fetching appointments data:", error)
      );
  }
}

render();
