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
  fetchServices();
}

document.addEventListener('DOMContentLoaded', initializeForm);

// Function to handle View button click
function viewService(serviceKey) {
  console.log('Viewing service with key:', serviceKey);
  // Add your code to view the service details
}

// Function to handle Edit button click
function editService(serviceKey) {
  console.log('Editing service with key:', serviceKey);
  // Add your code to edit the service details
}

