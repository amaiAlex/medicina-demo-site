// install packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// initialise database
const Datastore = require('nedb');
const db = new Datastore({ filename: './datafile.db', autoload: true });


const doctorsCollection = new Datastore({
  filename: './doctors.db',
  autoload: true
});

const appointmentsCollection = new Datastore({
filename: './appointments.db',
autoload: true
});

const patientsCollection = new Datastore({
filename: './patients.db',
autoload: true
});

// initialise server instance
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 3000;

// Define the schema for doctors
const doctorSchema = {
  doctor_name: String,
  doctor_id: Number,
  occupation: String
};

function updateAvailability(doctorId, day, time) {
  appointmentsCollection.update(
    { doctor_id: doctorId, day: day, time: time },
    { $set: { available: false } },
    { multi: true },
    (err, numReplaced) => {
      if (err) {
        console.error('Error updating availability:', err);
      } else {
        console.log(`Updated ${numReplaced} records for doctor ${doctorId}, day ${day}, time ${time}`);
      }
    }
  );
}
  

// Route to fetch list of doctors
app.get('/doctors', (req, res) => {
  doctorsCollection.find({}, (err, doctors) => {
    if (err) {
      res.status(500).send('Error fetching doctors data');
    } else {
      res.json(doctors);
    }
  });
});

app.get('/patients', (req, res) => {
  patientsCollection.find({}, (err, patients) => {
    if (err) {
      res.status(500).send('Error fetching patients data');
    } else {
      res.json(patients);
    }
  }); 
});

app.post('/appointments', (req, res) => {
  const appointmentData = req.body;

  // Вставляем новую запись с установленным значением available в false
  const newAppointmentData = {
    ...appointmentData,
    available: false
  };

  appointmentsCollection.insert(newAppointmentData, (err, newAppointment) => {
    if (err) {
      res.status(500).send('Ошибка при создании записи на прием');
    } else {
      updateAvailability(appointmentData.doctor_id, appointmentData.day, appointmentData.time);
      res.json(newAppointment);
    }
  });
});

app.get('/appointments', (req, res) => {
  const doctorId = req.query.doctor_id; // Получаем ID врача из параметров запроса
console.log({doctorId})

  appointmentsCollection.find({ doctor_id: Number(doctorId) }, (err, appointments) => {
    if (err) {
      res.status(500).send('Error fetching appointments data');
    } else {
      res.json(appointments);
    }
  })

  // appointmentsCollection.find({}, (err, appointments) => {
  //   if (err) {
  //     res.status(500).send('Error fetching appointments data');
  //   } else {
  //     res.json(appointments);
  //   }
  // });
});

function generateRandomNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000); // Генерация 10-значного числа
}

app.post('/patients', (req, res) => {
  const patientData = req.body;
  
  // Генерируем случайные номера policy и card
  const policyNumber = generateRandomNumber().toString();
  const cardNumber = generateRandomNumber().toString();
  
  // Добавляем сгенерированные номера в данные пациента
  patientData.policy = policyNumber;
  patientData.card = cardNumber;

  patientsCollection.insert(patientData, (err, newPatient) => {
    if (err) {
      res.status(500).send('Ошибка при создании записи на прием');
    } else {
      res.json(newPatient);
    }
  });
});

app.post('/check-policy', (req, res) => {
  const policyNumber = req.body.policyNumber;

  // Ищем пациента с данным номером полиса в базе данных
  patientsCollection.findOne({ policy: policyNumber }, (err, patient) => {
    if (err) {
      res.status(500).send('Ошибка при поиске пациента');
    } else {
      if (patient) {
        // Если пациент найден, возвращаем информацию о пациенте
        res.json({ exists: true, patient });
      } else {
        // Если пациент не найден, возвращаем информацию об отсутствии пациента
        res.json({ exists: false });
      }
    }
  });
});



// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the doctor appointment system!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
