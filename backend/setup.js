const Datastore = require("nedb");
// Create a new collection in the database for patients

// Create a new collection in the database
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

const membersCollection = new Datastore({
  filename: "./members.db",
  autoload: true,
});

const abonementsCollection = new Datastore({
  filename: "./abonements.db",
  autoload: true,
});

const purchasesCollection = new Datastore({
  filename: "./purchases.db",
  autoload: true,
});

// Define the schema for doctors
const doctorSchema = {
  doctor_name: String,
  doctor_id: Number,
  occupation: String,
};

const appointmentSchema = {
  id: Number,
  doctor_id: Number,
  time: String,
  day: String,
  available: Boolean,
};

const patientSchema = {
  name: String,
  last: String,
  middle: String,
  phone: String,
  policy: String,
  card: String,
};
const memberSchema = {
  name: String,
  last: String,
  middle: String,
  phone: String,
  type: String,
  card: String,
};
const abonementSchema = {
  name: String,
  description: String,
  price: Number,
};

const doctorsTable = [
  {
    doctor_name: "Логинов Семен",
    occupation: "стоматолог",
    doctor_id: 1,
    days: ["Понедельник", "Вторник", "Среда"],
  },
  {
    doctor_name: "Трофимов Иосиф",
    occupation: "офтальмолог",
    doctor_id: 2,

    days: ["Четверг", "Пятница", "Суббота"],
  },
  {
    doctor_name: "Федосеев Юрий",
    occupation: "стоматолог",
    doctor_id: 3,
    days: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  },
  {
    doctor_name: "Гончаренко Николай",
    occupation: "офтальмолог",
    doctor_id: 4,
    days: ["Понедельник", "Вторник", "Суббота"],
  },
];

const genererateAppointmentsTable = (doctors) => {
  // assuming the doctors is an array of objects containing doctor_id and doctor_name and days, which is an array of strings identifying the days of the week on which this doctor works
  // need to generate appointments for each doctor for each day of the week starting from 8:00 to 18:00 with 1 hour intervals
  // the appointments should be available by default and start from today and go for the next 21 days

  const appointments = [];
  const days = doctors.reduce((acc, doctor) => acc.concat(doctor.days), []);
  const today = new Date();
  const next21Days = new Date(today);
  next21Days.setDate(today.getDate() + 21);

  for (let doctor of doctors) {
    for (let day of days) {
      // find the date of this day in this week  in the format yyyy-mm-dd
      const dayIndex = days.indexOf(day);
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() + dayIndex);
      const dayString = dayDate.toISOString().split("T")[0];

      for (let i = 8; i <= 18; i++) {
        const time = `${i}:00`;
        const appointment = {
          doctor_id: doctor.doctor_id,
          time: time,
          day: dayString,
          available: true,
          id: Math.floor(Math.random() * 1000000),
        };
        appointments.push(appointment);
      }
    }
  }

  return appointments;
};

const appointmentsTable = genererateAppointmentsTable(doctorsTable);

const patientsTable = [
  {
    name: "Иван",
    last: "Иванов",
    middle: "Иванович",
    phone: "1234567890",
    policy: "1234567890",
    card: "1234567890",
  },
  {
    name: "Петр",
    last: "Петров",
    middle: "Петрович",
    phone: "1234567890",
    policy: "1234567890",
    card: "1234567890",
  },
  {
    name: "Сидор",
    last: "Сидоров",
    middle: "Сидорович",
    phone: "1234567890",
    policy: "1234567890",
    card: "1234567890",
  },
];

const membersTable = [
  {
    name: "Иван",
    last: "Иванов",
    middle: "Иванович",
    phone: "345345345",
    id: "12312341",
  },
  {
    name: "Петр",
    last: "Петров",
    middle: "Петрович",
    phone: "34345345",
    id: "34534535",
  },
  {
    name: "Сидор",
    last: "Сидоров",
    middle: "Сидорович",
    phone: "34534545",
    id: "34534553",
  },
];

const abonementsTable = [
  {
    name: "Зал",
    description:
      "Абонемент 'Зал' в нашем фитнес клубе предоставляет неограниченный доступ к тренажерному залу с разнообразным оборудованием для эффективных тренировок. Получите возможность заниматься в любое удобное время и наслаждаться поддержкой профессиональных тренеров, которые помогут вам достичь ваших фитнес-целей. Включая в себя широкий спектр услуг, от инструктажа до доступа к групповым занятиям, этот абонемент предлагает все необходимое для здорового образа жизни и активного времяпрепровождения.",
    price: 1000,
    id: "1",
    maxUses: 30,
  },
  {
    name: "Бассейн",
    description:
      "Абонемент 'Бассейн' в нашем фитнес клубе открывает доступ к современному бассейну с комфортными условиями для плавания и релаксации. Насладитесь возможностью заняться водными тренировками, улучшить свою физическую форму и расслабиться после тяжелого дня. Этот абонемент включает доступ к инструкторам, групповым занятиям в бассейне и другим дополнительным удобствам, чтобы вы могли наслаждаться полным спектром водных занятий в любое время.",
    price: 2000,
    id: "2",
    maxUses: 30,
  },
  {
    name: "Йога",
    description:
      "Абонемент 'Йога' в нашем фитнес клубе предоставляет возможность погрузиться в мир практики йоги с опытными инструкторами. Откройте для себя гармонию и баланс через различные стили йоги, подходящие как начинающим, так и опытным практикующим. Насладитесь спокойной атмосферой наших занятий и поддержкой на пути к улучшению физического и эмоционального благополучия.",
    price: 1000,
    id: "3",
    maxUses: 30,
  },
  {
    name: "Танцы",
    description:
      "Абонемент 'Танцы' в нашем фитнес клубе предлагает возможность окунуться в мир ритма и движения под руководством профессиональных инструкторов. Изучайте различные стили танцев, от современных до латиноамериканских, и наслаждайтесь энергией и весельем занятий. Независимо от вашего уровня подготовки, абонемент 'Танцы' поможет вам выразить себя и улучшить координацию, гибкость и физическую форму.",
    price: 2000,
    id: "4",
    maxUses: 30,
  },
  {
    name: "Кардио",
    description:
      "Абонемент 'Кардио' в нашем фитнес клубе предоставляет возможность эффективных кардиотренировок для улучшения сердечно-сосудистой системы и сжигания лишних калорий. Получите доступ к широкому выбору кардиооборудования, включая беговые дорожки, велотренажеры и эллиптические тренажеры. Наши инструкторы помогут вам разработать индивидуальную программу тренировок, соответствующую вашим целям и уровню подготовки, чтобы вы могли достичь максимальных результатов в улучшении своего здоровья и физической формы.",
    price: 2000,
    id: "5",
    maxUses: 30,
  },
];

const purchasesTable = [
  {
    phone: "345345345",
    abonementId: "1",
    remainingUses: 30,
  },
  {
    phone: "34345345",
    abonementId: "2",
    remainingUses: 30,
  },
  {
    phone: "34534545",
    abonementId: "3",
    remainingUses: 30,
  },
];

// Insert sample doctors data into the collection only if no data exists
doctorsCollection.count({}, (err, count) => {
  if (err) {
    console.error("Error counting doctors data:", err);
  } else if (count === 0) {
    doctorsCollection.insert(doctorsTable, (err, newDocs) => {
      if (err) {
        console.error("Error inserting doctors data:", err);
      } else {
        console.log("Doctors data inserted successfully:", newDocs);
      }
    });
  } else {
    console.log("Doctors data already exists in the database");
  }
});

// Insert sample appointments data into the collection only if no data exists
appointmentsCollection.count({}, (err, count) => {
  if (err) {
    console.error("Error counting appointments data:", err);
  } else if (count === 0) {
    appointmentsCollection.insert(appointmentsTable, (err, newDocs) => {
      if (err) {
        console.error("Error inserting appointments data:", err);
      } else {
        console.log("Appointments data inserted successfully:", newDocs);
      }
    });
  } else {
    console.log("Appointments data already exists in the database");
  }
});

patientsCollection.count({}, (err, count) => {
  if (err) {
    console.error("Error counting patients data:", err);
  } else if (count === 0) {
    patientsCollection.insert(patientsTable, (err, newDocs) => {
      if (err) {
        console.error("Error inserting patients data:", err);
      } else {
        console.log("Patients data inserted successfully:", newDocs);
      }
    });
  } else {
    console.log("Patients data already exists in the database");
  }
});

membersCollection.count({}, (err, count) => {
  if (err) {
    console.error("Error counting members data:", err);
  } else if (count === 0) {
    membersCollection.insert(membersTable, (err, newDocs) => {
      if (err) {
        console.error("Error inserting members data:", err);
      } else {
        console.log("Members data inserted successfully:", newDocs);
      }
    });
  } else {
    console.log("Members data already exists in the database");
  }
});

abonementsCollection.count({}, (err, count) => {
  if (err) {
    console.error("Error counting abonements data:", err);
  } else if (count === 0) {
    abonementsCollection.insert(abonementsTable, (err, newDocs) => {
      if (err) {
        console.error("Error inserting abonements data:", err);
      } else {
        console.log("Abonements data inserted successfully:", newDocs);
      }
    });
  } else {
    console.log("Abonements data already exists in the database");
  }
});

purchasesCollection.count({}, (err, count) => {
  if (err) {
    console.error("Error counting purchases data:", err);
  } else if (count === 0) {
    purchasesCollection.insert(purchasesTable, (err, newDocs) => {
      if (err) {
        console.error("Error inserting purchases data:", err);
      } else {
        console.log("Purchases data inserted successfully:", newDocs);
      }
    });
  } else {
    console.log("Purchases data already exists in the database");
  }
});
