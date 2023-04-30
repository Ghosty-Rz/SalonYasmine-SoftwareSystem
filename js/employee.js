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
  const db = firebase.database();
  
  const employeesTable = document.getElementById("employees-table");
  
  // Fetch employees and display them in the table
  function fetchEmployees() {
    db.ref("employees")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const id = childSnapshot.key;
          const employee = childSnapshot.val();
          addEmployeeToTable(id, employee);
        });
      });
  }
  
  function addEmployeeToTable(id, employee) {
    const newRow = employeesTable.insertRow(-1);
    newRow.insertCell(0).innerHTML = id;
    newRow.insertCell(1).innerHTML = employee.name;
    newRow.insertCell(2).innerHTML = employee.status;
    newRow.insertCell(3).innerHTML = `<button type="button" onclick="editEmployee('${id}')">Edit</button>`;
    newRow.insertCell(4).innerHTML = `<button type="button" onclick="viewEmployee('${id}')">View</button>`;
  }
  
  // Add a new employee to the Realtime Database
  function addEmployee() {
    const id = document.getElementById("employeeId").value;
    const name = document.getElementById("employeeName").value;
    const status = document.getElementById("status").value;
  
    db.ref("employees/" + id)
      .set({
        name: name,
        status: status,
      })
      .then(() => {
        addEmployeeToTable(id, { name: name, status: status });
        document.getElementById("addEmployeeForm").style.display = "none";
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  
  // Edit an employee in the Realtime Database (replace this function with your desired behavior)
  function editEmployee(id) {
    alert(`Edit employee with ID: ${id}`);
  }
  
  // View an employee in the Realtime Database (replace this function with your desired behavior)
  function viewEmployee(id) {
    alert(`View employee with ID: ${id}`);
  }
  
  fetchEmployees();
  