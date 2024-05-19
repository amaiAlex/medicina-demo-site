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
  { doctor_name: "Логинов Семен", occupation: "стоматолог", doctor_id: 1 },
  { doctor_name: "Трофимов Иосиф", occupation: "офтальмолог", doctor_id: 2 },
  { doctor_name: "Федосеев Юрий", occupation: "стоматолог", doctor_id: 3 },
  {
    doctor_name: "Гончаренко Николай",
    occupation: "офтальмолог",
    doctor_id: 4,
  },
];

const appointmentsTable = [
  // Doctor 1 schedule
  { id: 1, doctor_id: 1, time: "8:00", day: "Понедельник", available: true },
  { id: 2, doctor_id: 1, time: "9:00", day: "Понедельник", available: true },
  { id: 3, doctor_id: 1, time: "10:00", day: "Понедельник", available: true },
  { id: 4, doctor_id: 1, time: "11:00", day: "Понедельник", available: true },
  { id: 5, doctor_id: 1, time: "12:00", day: "Понедельник", available: true },
  { id: 6, doctor_id: 1, time: "13:00", day: "Понедельник", available: true },
  { id: 7, doctor_id: 1, time: "14:00", day: "Понедельник", available: true },
  { id: 8, doctor_id: 1, time: "15:00", day: "Понедельник", available: true },
  { id: 9, doctor_id: 1, time: "16:00", day: "Понедельник", available: true },
  { id: 10, doctor_id: 1, time: "17:00", day: "Понедельник", available: true },
  { id: 11, doctor_id: 1, time: "18:00", day: "Понедельник", available: true },
  { id: 12, doctor_id: 1, time: "8:00", day: "Вторник", available: true },
  { id: 13, doctor_id: 1, time: "9:00", day: "Вторник", available: true },
  { id: 14, doctor_id: 1, time: "10:00", day: "Вторник", available: true },
  { id: 15, doctor_id: 1, time: "11:00", day: "Вторник", available: true },
  { id: 16, doctor_id: 1, time: "12:00", day: "Вторник", available: true },
  { id: 17, doctor_id: 1, time: "13:00", day: "Вторник", available: true },
  { id: 18, doctor_id: 1, time: "14:00", day: "Вторник", available: true },
  { id: 19, doctor_id: 1, time: "15:00", day: "Вторник", available: true },
  { id: 20, doctor_id: 1, time: "16:00", day: "Вторник", available: true },
  { id: 21, doctor_id: 1, time: "17:00", day: "Вторник", available: true },
  { id: 22, doctor_id: 1, time: "18:00", day: "Вторник", available: true },
  { id: 23, doctor_id: 1, time: "8:00", day: "Среда", available: true },
  { id: 24, doctor_id: 1, time: "9:00", day: "Среда", available: true },
  { id: 25, doctor_id: 1, time: "10:00", day: "Среда", available: true },
  { id: 26, doctor_id: 1, time: "11:00", day: "Среда", available: true },
  { id: 27, doctor_id: 1, time: "12:00", day: "Среда", available: true },
  { id: 28, doctor_id: 1, time: "13:00", day: "Среда", available: true },
  { id: 29, doctor_id: 1, time: "14:00", day: "Среда", available: true },
  { id: 30, doctor_id: 1, time: "15:00", day: "Среда", available: true },
  { id: 31, doctor_id: 1, time: "16:00", day: "Среда", available: true },
  { id: 32, doctor_id: 1, time: "17:00", day: "Среда", available: true },
  { id: 33, doctor_id: 1, time: "18:00", day: "Среда", available: true },
  // Doctor 2 schedule
  { id: 34, doctor_id: 2, time: "8:00", day: "Четверг", available: true },
  { id: 35, doctor_id: 2, time: "9:00", day: "Четверг", available: true },
  { id: 36, doctor_id: 2, time: "10:00", day: "Четверг", available: true },
  { id: 37, doctor_id: 2, time: "11:00", day: "Четверг", available: true },
  { id: 38, doctor_id: 2, time: "12:00", day: "Четверг", available: true },
  { id: 39, doctor_id: 2, time: "13:00", day: "Четверг", available: true },
  { id: 40, doctor_id: 2, time: "14:00", day: "Четверг", available: true },
  { id: 41, doctor_id: 2, time: "15:00", day: "Четверг", available: true },
  { id: 42, doctor_id: 2, time: "16:00", day: "Четверг", available: true },
  { id: 43, doctor_id: 2, time: "17:00", day: "Четверг", available: true },
  { id: 44, doctor_id: 2, time: "18:00", day: "Четверг", available: true },
  { id: 45, doctor_id: 2, time: "8:00", day: "Пятница", available: true },
  { id: 46, doctor_id: 2, time: "9:00", day: "Пятница", available: true },
  { id: 47, doctor_id: 2, time: "10:00", day: "Пятница", available: true },
  { id: 48, doctor_id: 2, time: "11:00", day: "Пятница", available: true },
  { id: 49, doctor_id: 2, time: "12:00", day: "Пятница", available: true },
  { id: 50, doctor_id: 2, time: "13:00", day: "Пятница", available: true },
  { id: 51, doctor_id: 2, time: "14:00", day: "Пятница", available: true },
  { id: 52, doctor_id: 2, time: "15:00", day: "Пятница", available: true },
  { id: 53, doctor_id: 2, time: "16:00", day: "Пятница", available: true },
  { id: 54, doctor_id: 2, time: "17:00", day: "Пятница", available: true },
  { id: 55, doctor_id: 2, time: "18:00", day: "Пятница", available: true },
  { id: 56, doctor_id: 2, time: "8:00", day: "Суббота", available: true },
  { id: 57, doctor_id: 2, time: "9:00", day: "Суббота", available: true },
  { id: 58, doctor_id: 2, time: "10:00", day: "Суббота", available: true },
  { id: 59, doctor_id: 2, time: "11:00", day: "Суббота", available: true },
  { id: 60, doctor_id: 2, time: "12:00", day: "Суббота", available: true },
  { id: 61, doctor_id: 2, time: "13:00", day: "Суббота", available: true },
  { id: 62, doctor_id: 2, time: "14:00", day: "Суббота", available: true },
  { id: 63, doctor_id: 2, time: "15:00", day: "Суббота", available: true },
  { id: 64, doctor_id: 2, time: "16:00", day: "Суббота", available: true },
  { id: 65, doctor_id: 2, time: "17:00", day: "Суббота", available: true },
  { id: 66, doctor_id: 2, time: "18:00", day: "Суббота", available: true },
  // Doctor 3 schedule
  { id: 67, doctor_id: 3, time: "8:00", day: "Четверг", available: true },
  { id: 68, doctor_id: 3, time: "9:00", day: "Четверг", available: true },
  { id: 69, doctor_id: 3, time: "10:00", day: "Четверг", available: true },
  { id: 70, doctor_id: 3, time: "11:00", day: "Четверг", available: true },
  { id: 71, doctor_id: 3, time: "12:00", day: "Четверг", available: true },
  { id: 72, doctor_id: 3, time: "13:00", day: "Четверг", available: true },
  { id: 73, doctor_id: 3, time: "14:00", day: "Четверг", available: true },
  { id: 74, doctor_id: 3, time: "15:00", day: "Четверг", available: true },
  { id: 75, doctor_id: 3, time: "16:00", day: "Четверг", available: true },
  { id: 76, doctor_id: 3, time: "17:00", day: "Четверг", available: true },
  { id: 77, doctor_id: 3, time: "18:00", day: "Четверг", available: true },
  { id: 78, doctor_id: 3, time: "8:00", day: "Пятница", available: true },
  { id: 79, doctor_id: 3, time: "9:00", day: "Пятница", available: true },
  { id: 80, doctor_id: 3, time: "10:00", day: "Пятница", available: true },
  { id: 81, doctor_id: 3, time: "11:00", day: "Пятница", available: true },
  { id: 82, doctor_id: 3, time: "12:00", day: "Пятница", available: true },
  { id: 83, doctor_id: 3, time: "13:00", day: "Пятница", available: true },
  { id: 84, doctor_id: 3, time: "14:00", day: "Пятница", available: true },
  { id: 85, doctor_id: 3, time: "15:00", day: "Пятница", available: true },
  { id: 86, doctor_id: 3, time: "16:00", day: "Пятница", available: true },
  { id: 87, doctor_id: 3, time: "17:00", day: "Пятница", available: true },
  { id: 88, doctor_id: 3, time: "18:00", day: "Пятница", available: true },
  { id: 89, doctor_id: 3, time: "8:00", day: "Суббота", available: true },
  { id: 90, doctor_id: 3, time: "9:00", day: "Суббота", available: true },
  { id: 91, doctor_id: 3, time: "10:00", day: "Суббота", available: true },
  { id: 92, doctor_id: 3, time: "11:00", day: "Суббота", available: true },
  { id: 93, doctor_id: 3, time: "12:00", day: "Суббота", available: true },
  { id: 94, doctor_id: 3, time: "13:00", day: "Суббота", available: true },
  { id: 95, doctor_id: 3, time: "14:00", day: "Суббота", available: true },
  { id: 96, doctor_id: 3, time: "15:00", day: "Суббота", available: true },
  { id: 97, doctor_id: 3, time: "16:00", day: "Суббота", available: true },
  { id: 98, doctor_id: 3, time: "17:00", day: "Суббота", available: true },
  { id: 99, doctor_id: 3, time: "18:00", day: "Суббота", available: true },
  // Doctor 4 schedule
  { id: 100, doctor_id: 4, time: "8:00", day: "Понедельник", available: true },
  { id: 101, doctor_id: 4, time: "9:00", day: "Понедельник", available: true },
  { id: 102, doctor_id: 4, time: "10:00", day: "Понедельник", available: true },
  { id: 103, doctor_id: 4, time: "11:00", day: "Понедельник", available: true },
  { id: 104, doctor_id: 4, time: "12:00", day: "Понедельник", available: true },
  { id: 105, doctor_id: 4, time: "13:00", day: "Понедельник", available: true },
  { id: 106, doctor_id: 4, time: "14:00", day: "Понедельник", available: true },
  { id: 107, doctor_id: 4, time: "15:00", day: "Понедельник", available: true },
  { id: 108, doctor_id: 4, time: "16:00", day: "Понедельник", available: true },
  { id: 109, doctor_id: 4, time: "17:00", day: "Понедельник", available: true },
  { id: 110, doctor_id: 4, time: "18:00", day: "Понедельник", available: true },
  { id: 111, doctor_id: 4, time: "8:00", day: "Вторник", available: true },
  { id: 112, doctor_id: 4, time: "9:00", day: "Вторник", available: true },
  { id: 113, doctor_id: 4, time: "10:00", day: "Вторник", available: true },
  { id: 114, doctor_id: 4, time: "11:00", day: "Вторник", available: true },
  { id: 115, doctor_id: 4, time: "12:00", day: "Вторник", available: true },
  { id: 116, doctor_id: 4, time: "13:00", day: "Вторник", available: true },
  { id: 117, doctor_id: 4, time: "14:00", day: "Вторник", available: true },
  { id: 118, doctor_id: 4, time: "15:00", day: "Вторник", available: true },
  { id: 119, doctor_id: 4, time: "16:00", day: "Вторник", available: true },
  { id: 120, doctor_id: 4, time: "17:00", day: "Вторник", available: true },
  { id: 121, doctor_id: 4, time: "18:00", day: "Вторник", available: true },
  { id: 122, doctor_id: 4, time: "8:00", day: "Среда", available: true },
  { id: 123, doctor_id: 4, time: "9:00", day: "Среда", available: true },
  { id: 124, doctor_id: 4, time: "10:00", day: "Среда", available: true },
  { id: 125, doctor_id: 4, time: "11:00", day: "Среда", available: true },
  { id: 126, doctor_id: 4, time: "12:00", day: "Среда", available: true },
  { id: 127, doctor_id: 4, time: "13:00", day: "Среда", available: true },
  { id: 128, doctor_id: 4, time: "14:00", day: "Среда", available: true },
  { id: 129, doctor_id: 4, time: "15:00", day: "Среда", available: true },
  { id: 130, doctor_id: 4, time: "16:00", day: "Среда", available: true },
  { id: 131, doctor_id: 4, time: "17:00", day: "Среда", available: true },
  { id: 132, doctor_id: 4, time: "18:00", day: "Среда", available: true },
];

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
