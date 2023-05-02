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
  
  const suppliersTable = document.getElementById("suppliers-table");
  
  // Fetch suppliers and display them in the table
  function fetchsuppliers() {
    db.ref("suppliers")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const id = childSnapshot.key;
          const supplier = childSnapshot.val();
          addSupplierToTable(id, supplier);
        });
      });
  }
  
  function addsupplierToTable(id, supplier) {
    const newRow = suppliersTable.insertRow(-1);
    newRow.insertCell(0).innerHTML = id;
    newRow.insertCell(1).innerHTML = supplier.name;
    newRow.insertCell(2).innerHTML = supplier.status;
    newRow.insertCell(3).innerHTML = `<button type="button" onclick="editsupplier('${id}')">Edit</button>`;
    newRow.insertCell(4).innerHTML = `<button type="button" onclick="viewsupplier('${id}')">View</button>`;
  }
  
  // Add a new supplier to the Realtime Database
  function addsupplier() {
    const id = document.getElementById("supplierId").value;
    const name = document.getElementById("supplierName").value;
    const status = document.getElementById("status").value;
  
    db.ref("suppliers/" + id)
      .set({
        name: name,
        status: status,
      })
      .then(() => {
        addsupplierToTable(id, { name: name, status: status });
        document.getElementById("addsupplierForm").style.display = "none";
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  
  // Edit a supplier in the Realtime Database (replace this function with your desired behavior)
  function editsupplier(id) {
    alert(`Edit supplier with ID: ${id}`);
  }
  
  // View a supplier in the Realtime Database (replace this function with your desired behavior)
  function viewsupplier(id) {
    alert(`View supplier with ID: ${id}`);
  }
  
  fetchsuppliers();