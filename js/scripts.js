// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}



// ---------- CHARTS ----------

// BAR CHART
var barChartOptions = {
  series: [{
    data: [10, 8, 6, 4, 2],
    name: "Services",
  }],
  chart: {
    type: "bar",
    background: "transparent",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: [
    "#2962ff",
    "#d50000",
    "#2e7d32",
    "#ff6d00",
    "#583cb3",
  ],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    }
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
  },
  grid: {
    borderColor: "#55596e",
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  legend: {
    labels: {
      colors: "#f5f7ff",
    },
    show: true,
    position: "top",
  },
  stroke: {
    colors: ["transparent"],
    show: true,
    width: 2
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
  xaxis: {
    categories: ["Manicure permanent", "Brushing", "Epilation", "coupe de cheveux", "pedicure"],
    title: {
      style: {
        color: "#f5f7ff",
      },
    },
    axisBorder: {
      show: true,
      color: "#55596e",
    },
    axisTicks: {
      show: true,
      color: "#55596e",
    },
    labels: {
      style: {
        colors: "#f5f7ff",
      },
    },
  },
  yaxis: {
    title: {
      text: "Count",
      style: {
        color:  "#f5f7ff",
      },
    },
    axisBorder: {
      color: "#55596e",
      show: true,
    },
    axisTicks: {
      color: "#55596e",
      show: true,
    },
    labels: {
      style: {
        colors: "#f5f7ff",
      },
    },
  }
};  

// Your web app's Firebase configuration
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

function fetchServices() {
  const servicesTableBody = document.querySelector('#services-table tbody');
  
  database.ref('/services').on('value', (snapshot) => {
    servicesTableBody.innerHTML = ''; // Clear the existing table content

    snapshot.forEach((childSnapshot) => {
      const service = childSnapshot.val();
      const serviceKey = childSnapshot.key;
      
      // Create a new table row
      const row = document.createElement('tr');

      // Add service name
      const nameCell = document.createElement('td');
      nameCell.textContent = service.serviceName;
      row.appendChild(nameCell);

      // Add service price
      const priceCell = document.createElement('td');
      priceCell.textContent = service.servicePrice + ' Dh';
      row.appendChild(priceCell);

      // Add view and edit buttons
      const viewCell = document.createElement('td');
      const viewButton = document.createElement('button');
      viewButton.textContent = 'View';
      viewButton.addEventListener('click', () => viewService(serviceKey));
      viewCell.appendChild(viewButton);
      row.appendChild(viewCell);

      const editCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editService(serviceKey));
      editCell.appendChild(editButton);
      row.appendChild(editCell);

      // Add the row to the table
      servicesTableBody.appendChild(row);
    });
  });
}

function initializeForm() {
  document.getElementById('newServiceForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newService = {
      serviceName: formData.get('serviceName'),
      serviceDescription: formData.get('serviceDescription'),
      servicePrice: formData.get('servicePrice'),
      serviceCategory: formData.get('serviceCategory'),
      serviceDuration: formData.get('serviceDuration'),
      servicePercentage: formData.get('servicePercentage')
    };

    database.ref('/services').push(newService).then(() => {
      console.log('Service added successfully');
      event.target.reset();
    }).catch((error) => {
      console.error('Failed to add service:', error);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeForm();
  fetchServices();
});

// Function to handle View button click
function viewService(serviceKey) {
  console.log('Viewing service with key:', serviceKey);
  database.ref(`/services/${serviceKey}`).once('value', (snapshot) => {
    const service = snapshot.val();
    viewServiceDetails(service);
  });
}

// Function to handle Edit button click
function editService(serviceKey) {
  console.log('Editing service with key:', serviceKey);
  database.ref(`/services/${serviceKey}`).once('value', (snapshot) => {
    const service = snapshot.val();
    editServiceDetails(serviceKey, service);
  });
}

function viewServiceDetails(service) {
  // Create a modal to display the service details
  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.appendChild(modal);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.appendChild(modalContent);

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => modal.remove();
  modalContent.appendChild(closeBtn);

  const serviceDetails = document.createElement('div');
  serviceDetails.innerHTML = `
    <h2>${service.serviceName}</h2>
    <p>Description: ${service.serviceDescription}</p>
    <p>Price: ${service.servicePrice} Dh</p>
    <p>Category: ${service.serviceCategory}</p>
    <p>Duration: ${service.serviceDuration} minutes</p>
    <p>Employee's wage percentage: ${service.servicePercentage}%</p>
  `;
  modalContent.appendChild(serviceDetails);
}

function editServiceDetails(serviceKey, service) {
  // Create a modal with a form to edit the service details
  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.appendChild(modal);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.appendChild(modalContent);

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close');
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => modal.remove();
  modalContent.appendChild(closeBtn);

  const editForm = document.createElement('form');
  editForm.innerHTML = `
    <label>Service Name</label>
    <input type="text" name="serviceName" value="${service.serviceName}">
    <label>Service Description</label>
    <textarea>${service.serviceDescription}</textarea>
    <label>Service Price</label>
    <input type="number" name="servicePrice" value="${service.servicePrice}">
    <label>Category</label>
    <input type="text" name="serviceCategory" value="${service.serviceCategory}">
    <label>Duration</label>
    <input type="number" name="serviceDuration" value="${service.serviceDuration}">
    <label>Employee's wage percentage</label>
    <input type="number" name="servicePercentage" value="${service.servicePercentage}">
    <input type="submit" value="Save Changes">
  `;
  modalContent.appendChild(editForm);

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(editForm);
    const updatedService = {
      serviceName: formData.get('serviceName'),
      serviceDescription: formData.get('serviceDescription'),
      servicePrice: formData.get('servicePrice'),
      serviceCategory: formData.get('serviceCategory'),
      serviceDuration: formData.get('serviceDuration'),
      servicePercentage: formData.get('servicePercentage')
    };

    database.ref(`/services/${serviceKey}`).update(updatedService).then(() => {
      console.log('Service updated successfully');
      modal.remove();
    }).catch((error) => {
      console.error('Failed to update service:', error);
    });
  });
}
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