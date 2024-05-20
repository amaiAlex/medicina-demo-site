// install packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment");
console.log(moment().format("YYYY-MM-DD"));
// initialise database
const Datastore = require("nedb");
const db = new Datastore({ filename: "./datafile.db", autoload: true });

const doctorsCollection = new Datastore({
  filename: "./doctors.db",
  autoload: true,
});

const appointmentsCollection = new Datastore({
  filename: "./appointments.db",
  autoload: true,
});

const patientsCollection = new Datastore({
  filename: "./patients.db",
  autoload: true,
});

const abonementsCollection = new Datastore({
  filename: "./abonements.db",
  autoload: true,
});

const membersCollection = new Datastore({
  filename: "./members.db",
  autoload: true,
});

const purchasesCollection = new Datastore({
  filename: "./purchases.db",
  autoload: true,
});

// initialise server instance
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 3000;

// Define the schema for doctors (not used in this code, consider removing or implementing schema validation)
const doctorSchema = {
  doctor_name: String,
  doctor_id: Number,
  occupation: String,
};

// server for DOCTOR APPOINTMENT SYSTEM

function updateAvailability(doctorId, day, time) {
  appointmentsCollection.update(
    { doctor_id: doctorId, day: day, time: time },
    { $set: { available: false } },
    { multi: true },
    (err, numReplaced) => {
      if (err) {
        console.error("Error updating availability:", err);
      } else {
        console.log(
          `Updated ${numReplaced} records for doctor ${doctorId}, day ${day}, time ${time}`
        );
      }
    }
  );
}

function getWeekDates(weeksFromNow = 0) {
  const startOfWeek = moment().add(weeksFromNow, "weeks").startOf("isoWeek");
  const endOfWeek = moment().add(weeksFromNow, "weeks").endOf("isoWeek");
  let dates = [];
  for (let m = moment(startOfWeek); m.isBefore(endOfWeek); m.add(1, "days")) {
    dates.push(m.format("YYYY-MM-DD"));
  }
  return dates;
}

app.get("/available-dates", (req, res) => {
  const currentWeekDates = getWeekDates();
  const nextWeekDates = getWeekDates(1);
  res.json([...currentWeekDates, ...nextWeekDates]);
});

// Route to fetch list of doctors
app.get("/doctors", (req, res) => {
  doctorsCollection.find({}, (err, doctors) => {
    if (err) {
      res.status(500).send("Error fetching doctors data");
    } else {
      res.json(doctors);
    }
  });
});

app.get("/patients", (req, res) => {
  patientsCollection.find({}, (err, patients) => {
    if (err) {
      res.status(500).send("Error fetching patients data");
    } else {
      res.json(patients);
    }
  });
});

app.post("/appointments", (req, res) => {
  const appointmentData = req.body;

  // Вставляем новую запись с установленным значением available в false
  const newAppointmentData = {
    ...appointmentData,
    available: false,
  };

  appointmentsCollection.insert(newAppointmentData, (err, newAppointment) => {
    if (err) {
      res.status(500).send("Ошибка при создании записи на прием");
    } else {
      updateAvailability(
        appointmentData.doctor_id,
        appointmentData.day,
        appointmentData.time
      );
      res.json(newAppointment);
    }
  });
});

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

app.get("/appointments", (req, res) => {
  const doctor_id = Number(req.query.doctor_id);

  // Если указан день, фильтруем по дню, иначе возвращаем все дни для данного доктора
  const query = doctor_id ? { doctor_id } : {};

  appointmentsCollection.find(query, (err, appointments) => {
    if (err) {
      return res.status(500).send("Error fetching appointments data");
    } else {
      return res.json(appointments);
    }
  });
});

function generateRandomNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000); // Генерация 10-значного числа
}

app.post("/patients", (req, res) => {
  const patientData = req.body;

  // Генерируем случайные номера policy и card
  const policyNumber = generateRandomNumber().toString();
  const cardNumber = generateRandomNumber().toString();

  // Добавляем сгенерированные номера в данные пациента
  patientData.policy = policyNumber;
  patientData.card = cardNumber;

  patientsCollection.insert(patientData, (err, newPatient) => {
    if (err) {
      res.status(500).send("Ошибка при создании записи на прием");
    } else {
      res.json(newPatient);
    }
  });
});

app.post("/check-policy", (req, res) => {
  const policyNumber = req.body.policyNumber;

  // Ищем пациента с данным номером полиса в базе данных
  patientsCollection.findOne({ policy: policyNumber }, (err, patient) => {
    if (err) {
      res.status(500).send("Ошибка при поиске пациента");
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

// server for FITNESS CLUB

app.put("/decreaseRemainingUses", (req, res) => {
  const { phone, abonementId } = req.body;

  purchasesCollection.findOne({ phone, abonementId }, (err, purchase) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Ошибка при поиске записи покупки" });
    }

    if (!purchase) {
      return res.status(404).json({ message: "Запись покупки не найдена" });
    }

    purchase.remainingUses--;

    // Обновляем запись в коллекции purchasesCollection
    purchasesCollection.update(
      { phone, abonementId },
      purchase,
      {},
      (err, numUpdated) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Произошла ошибка при обновлении записи покупки",
          });
        }

        if (numUpdated === 0) {
          return res
            .status(500)
            .json({ message: "Не удалось обновить запись покупки" });
        }

        // Возвращаем успешный ответ
        res.json({ message: "Остаток успешно уменьшен" });
      }
    );
  });
});

app.get("/abonements", (req, res) => {
  abonementsCollection.find({}, (err, abonements) => {
    if (err) {
      res.status(500).send("Error fetching abonements data");
    } else {
      res.json(abonements);
    }
  });
});

app.get("/members", (req, res) => {
  membersCollection.find({}, (err, members) => {
    if (err) {
      res.status(500).send("Error fetching members data");
    } else {
      res.json(members);
    }
  });
});

app.get("/purchases", (req, res) => {
  purchasesCollection.find({}, (err, purchases) => {
    if (err) {
      res.status(500).send("Error fetching purchases data");
    } else {
      res.json(purchases);
    }
  });
});

app.post("/purchase", (req, res) => {
  const { name, surname, patronymic, phone, abonementId } = req.body;

  membersCollection.findOne({ phone }, (err, member) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (!member) {
      const newMember = {
        name,
        last: surname,
        middle: patronymic,
        phone,
        id: generateId(),
      };
      membersCollection.insert(newMember, (err, insertedMember) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        addOrUpdatePurchase(phone, abonementId, res);
      });
    } else {
      addOrUpdatePurchase(phone, abonementId, res);
    }
  });
});

function addOrUpdatePurchase(phone, abonementId, res) {
  purchasesCollection.findOne({ phone, abonementId }, (err, purchase) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (purchase) {
      // Обновляем существующую запись
      purchasesCollection.update(
        { _id: purchase._id },
        { $inc: { remainingUses: 30 } },
        {},
        (err, numUpdated) => {
          if (err) {
            res.status(500).send(err);
            return;
          }
          res
            .status(200)
            .send({ ...purchase, remainingUses: purchase.remainingUses + 30 });
        }
      );
    } else {
      // Создаем новую запись
      const newPurchase = { phone, abonementId, remainingUses: 30 };
      purchasesCollection.insert(newPurchase, (err, insertedPurchase) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.status(200).send(insertedPurchase);
      });
    }
  });
}

app.post("/check-purchases", (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  purchasesCollection.find({ phone: phoneNumber }, (err, purchases) => {
    if (err) {
      res.status(500).send("Error fetching purchases data");
    } else {
      if (purchases.length === 0) {
        // Если покупок нет, отправляем сообщение об отсутствии данных
        res.json({
          exists: false,
          message: "No purchases found for this phone number",
        });
      } else {
        // Если покупки найдены, отправляем список покупок
        res.json({ exists: true, purchases });
      }
    }
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the doctor appointment system!");
});

// Start the server (ensure the server is started only once)
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
