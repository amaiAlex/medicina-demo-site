const Datastore = require('nedb');
// Create a new collection in the database for patients

// Create a new collection in the database
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

// Define the schema for doctors
const doctorSchema = {
    doctor_name: String,
    doctor_id: Number,
    occupation: String
};

const appointmentSchema = {
    id: Number,
    doctor_id: Number,
    time: String,
    day: String,
    available: Boolean
  };
  
  const patientSchema = {
    name: String,
    last: String,
    middle: String,
    phone: String,
    policy: String,
    card: String
  };

const doctorsTable = [
    { doctor_name: "Логинов Семен", occupation: "стоматолог", doctor_id: 1 },
    { doctor_name: "Трофимов Иосиф", occupation: "офтальмолог", doctor_id: 2 },
    { doctor_name: "Федосеев Юрий", occupation: "стоматолог", doctor_id: 3 },
    { doctor_name: "Гончаренко Николай", occupation: "офтальмолог", doctor_id: 4 }
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
  { name: "Иван", last: "Иванов", middle: "Иванович", phone: "1234567890", policy: "1234567890", card: "1234567890" },
  { name: "Петр", last: "Петров", middle: "Петрович", phone: "1234567890", policy: "1234567890", card: "1234567890" },
  { name: "Сидор", last: "Сидоров", middle: "Сидорович", phone: "1234567890", policy: "1234567890", card: "1234567890" }
];



// Insert sample doctors data into the collection only if no data exists
doctorsCollection.count({}, (err, count) => {
  if (err) {
    console.error('Error counting doctors data:', err);
  } else if (count === 0) {
    doctorsCollection.insert(doctorsTable, (err, newDocs) => {
      if (err) {
        console.error('Error inserting doctors data:', err);
      } else {
        console.log('Doctors data inserted successfully:', newDocs);
      }
    });
  } else {
    console.log('Doctors data already exists in the database');
  }
});

// Insert sample appointments data into the collection only if no data exists
appointmentsCollection.count({}, (err, count) => {
  if (err) {
    console.error('Error counting appointments data:', err);
  } else if (count === 0) {
    appointmentsCollection.insert(appointmentsTable, (err, newDocs) => {
      if (err) {
        console.error('Error inserting appointments data:', err);
      } else {
        console.log('Appointments data inserted successfully:', newDocs);
      }
    });
  } else {
    console.log('Appointments data already exists in the database');
  }
});

patientsCollection.count({}, (err, count) => {
  if (err) {
    console.error('Error counting patients data:', err);
  } else if (count === 0) {
    patientsCollection.insert(patientsTable, (err, newDocs) => {
      if (err) {
        console.error('Error inserting patients data:', err);
      } else {
        console.log('Patients data inserted successfully:', newDocs);
      }
    });
  } else {
    console.log('Patients data already exists in the database');
  }
}
);



