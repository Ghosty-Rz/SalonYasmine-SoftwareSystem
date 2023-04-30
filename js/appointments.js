const firebaseConfig = {
    apiKey: "AIzaSyCO6r3g8WJ6DKDGRJ_zPQyGF5Jw4EoQcLo",
    authDomain: "salonyas-48030.firebaseapp.com",
    databaseURL: "https://salonyas-48030-default-rtdb.firebaseio.com",
    projectId: "salonyas-48030",
    storageBucket: "salonyas-48030.appspot.com",
    messagingSenderId: "859006398884",
    appId: "1:859006398884:web:d4c8391436e23d38085131",
    measurementId: "G-H4NX84ZHCL"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
function addAppointment() {
    const appointmentId = document.getElementById('appointmentId').value;
    const customer = document.getElementById('customer').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const price = document.getElementById('price').value;
  
    // Add the new appointment to the database
    database.ref('appointments/' + appointmentId).set({
      appointmentId: appointmentId,
      customer: customer,
      date: date,
      time: time,
      price: price,
    }, (error) => {
      if (error) {
        alert('The write failed...');
      } else {
        alert('Appointment added successfully');
        location.reload();
      }
    });
  }
  
  // Function to view appointment details
  function viewAppointment(appointmentId) {
    // Retrieve the appointment data from the database and display it
    alert(`Displaying details for appointment ID: ${appointmentId}`);
  }
  
  // Function to edit appointment details
  function editAppointment(appointmentId) {
    // Retrieve the appointment data from the database and allow editing
    alert(`Editing appointment with ID: ${appointmentId}`);
  }
  
  function loadAppointments() {
    const appointmentsRef = database.ref('appointments');
    appointmentsRef.on('value', (snapshot) => {
      const appointments = snapshot.val();
      const appointmentsTable = document.getElementById('appointments-table');
  
      for (const appointmentId in appointments) {
        const appointment = appointments[appointmentId];
        const newRow = appointmentsTable.insertRow();
  
        newRow.innerHTML = `
          <td>${appointment.appointmentId}</td>
          <td>${appointment.customer}</td>
          <td>${appointment.date}</td>
          <td>${appointment.time}</td>
          <td>${appointment.price}</td>
          <td><button type="button" onclick="viewAppointment('${appointment.appointmentId}')">View</button></td>
          <td><button type="button" onclick="editAppointment('${appointment.appointmentId}')">Edit</button></td>
        `;
      }
    });
  }
  
  window.onload = loadAppointments;