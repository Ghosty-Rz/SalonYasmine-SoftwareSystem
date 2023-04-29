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
const app = firebase.initializeApp(firebaseConfig);
const database = app.database();

// Add openSidebar and closeSidebar functions if they were in the original script.js file
function openSidebar() {
  // Your code for opening the sidebar
}

function closeSidebar() {
  // Your code for closing the sidebar
}

var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
barChart.render();

document.getElementById('newServiceForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const newService = {
    serviceName: formData.get('serviceName'),
    // ... add other fields here
  };

  database.ref('/services').push(newService).then(() => {
    console.log('Service added successfully');
    event.target.reset();
  }).catch((error) => {
    console.error('Failed to add service:', error);
  });
});
