

const sayHiFromBackend = async ()=> {
    // when you query localhost:3000/ while the server is running, you will get the greeting
const res = await fetch('http://localhost:3000') // send a request
const json = await res.json() //interpret the result
console.log(json) // use the result
document.getElementById('say-hi').innerText = json.docs[0].name // react the frontend
}

    // Add event listener to the "Записаться на прием" buttons
    document.querySelectorAll('.make-appointment').forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault(); // Prevent default link behavior
        const doctorName = item.getAttribute('data-doctor');
        replaceWithAppointmentButtons(item.parentNode.parentNode, doctorName);
      });
    });
  
   // Function to replace the doctor's card with appointment buttons
function replaceWithAppointmentButtons(card, doctorName) {
  // Hide the doctor's image
  card.querySelector('.card-img-top').style.display = 'none';

  // Create new card body with appointment buttons
  const newCardBody = document.createElement('div');
  newCardBody.classList.add('card-body', 'd-flex', 'flex-column');

  // Save the doctor's name and profession for later restoration
  const doctorTitle = card.querySelector('.card-title').textContent;
  const doctorProfession = card.querySelector('.card-text').textContent;

  // Create buttons for appointment days based on the selected doctor
  let days = [];
  if (doctorName === 'Трофимов Иосиф' || doctorName === 'Федосеев Юрий') {
    days = ['четверг', 'пятница', 'суббота'];
  } else {
    days = ['понедельник', 'вторник', 'среда'];
  }
  days.forEach(day => {
    const button = document.createElement('a');
    button.href = '#';
    button.classList.add('btn', 'btn-primary', 'appointment-day');
    button.textContent = day;
    button.addEventListener('click', event => {
      event.preventDefault();
      replaceWithHourButtons(newCardBody, day);
      // Hide the "Назад" button when a day button is clicked
      newCardBody.querySelector('.back-button').style.display = 'none';
    });
    newCardBody.appendChild(button);
  });

  // Create "Назад" button
  const backButton = document.createElement('a');
  backButton.href = '#';
  backButton.classList.add('btn', 'btn-primary', 'back-button');
  backButton.textContent = 'Назад';
  newCardBody.appendChild(backButton);

  // Replace existing card body with new one
  card.querySelector('.card-body').replaceWith(newCardBody);

  // Add event listener to the "Назад" button
  backButton.addEventListener('click', event => {
    event.preventDefault();
    restoreOriginalCard(card, doctorTitle, doctorProfession);
  });
}

// Function to replace appointment buttons with hour buttons
function replaceWithHourButtons(cardBody, day) {
  // Clear existing content
  cardBody.innerHTML = '';

  // Create buttons for appointment hours
  for (let hour = 9; hour <= 18; hour++) {
    const button = document.createElement('a');
    button.href = 'registerPage.html'; // Устанавливаем ссылку на страницу registerPage.html
    button.classList.add('btn', 'btn-primary', 'appointment-hour', 'mb-2');
    button.textContent = `${hour}:00`;
    cardBody.appendChild(button);
  }

  // Create "Назад" button
  const backButton = document.createElement('a');
  backButton.href = '#';
  backButton.classList.add('btn', 'btn-primary', 'back-button');
  backButton.textContent = 'Назад';
  cardBody.appendChild(backButton);

  // Add event listener to the "Назад" button
  backButton.addEventListener('click', event => {
    event.preventDefault();
    // Here you can decide what to do when the back button is clicked
    // For example, you can go back to the list of days
  });
}

    // Function to restore the original view of the doctor's card
    function restoreOriginalCard(card, doctorTitle, doctorProfession) {
      // Show the doctor's image
      card.querySelector('.card-img-top').style.display = 'block';
  
      // Create new card body with doctor's name, profession, and "Записаться на прием" button
      const newCardBody = document.createElement('div');
      newCardBody.classList.add('card-body', 'd-flex', 'flex-column');
  
      // Restore doctor's name and profession
      const doctorName = document.createElement('h5');
      doctorName.classList.add('card-title');
      doctorName.textContent = doctorTitle;
      newCardBody.appendChild(doctorName);
  
      const profession = document.createElement('p');
      profession.classList.add('card-text', 'mt-auto');
      profession.textContent = doctorProfession;
      newCardBody.appendChild(profession);
  
      // Restore "Записаться на прием" button
      const appointmentButton = document.createElement('a');
      appointmentButton.href = '#';
      appointmentButton.classList.add('btn', 'btn-primary', 'make-appointment');
      appointmentButton.textContent = 'Записаться на прием';
      newCardBody.appendChild(appointmentButton);
  
      // Replace existing card body with new one
      card.querySelector('.card-body').replaceWith(newCardBody);
  
      // Add event listener to the "Записаться на прием" button
      appointmentButton.addEventListener('click', event => {
        event.preventDefault();
        replaceWithAppointmentButtons(card, doctorTitle);
      });
    }
