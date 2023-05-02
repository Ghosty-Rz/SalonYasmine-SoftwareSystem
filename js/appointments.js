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

  function generateRandomID(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
  
function addAppointment() {
    const appointmentId = generateRandomID(4);
   
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
  <td><button type="button" onclick="deleteAppointment('${appointment.appointmentId}')">Delete</button></td>
  <td><button type="button" onclick="openEditForm('${appointment.appointmentId}')">Edit</button></td>
`;


      }
    });
  }
  function deleteAppointment(appointmentId) {
    const appointmentRef = database.ref('appointments/' + appointmentId);
  
    appointmentRef.remove()
      .then(() => {
        alert('Appointment deleted successfully');
        location.reload();
      })
      .catch((error) => {
        alert('Error deleting appointment:', error);
      });
  }
  function openEditForm(appointmentId) {
    const appointmentRef = database.ref('appointments/' + appointmentId);
    appointmentRef.once('value', (snapshot) => {
      const appointment = snapshot.val();
  
      document.getElementById('editAppointmentId').value = appointment.appointmentId;
      document.getElementById('editCustomer').value = appointment.customer;
      document.getElementById('editDate').value = appointment.date;
      document.getElementById('editTime').value = appointment.time;
      document.getElementById('editPrice').value = appointment.price;
  
      const editForm = document.getElementById('divEdit');
      editForm.style.display = 'block';
    });
  }
  
  window.onload = loadAppointments;
