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

function addSupplierToTable(id, supplier) {
  const newRow = suppliersTable.insertRow(-1);
  newRow.insertCell(0).innerHTML = id;
  newRow.insertCell(1).innerHTML = supplier.name;
  newRow.insertCell(2).innerHTML = supplier.status;
  newRow.insertCell(3).innerHTML = `<button type="button" onclick="editSupplier('${id}')">Edit</button>`;
  newRow.insertCell(4).innerHTML = `<button type="button" onclick="viewSupplier('${id}')">View</button>`;
}

function generateRandomID(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }

function addSupplier() {
  const id = generateRandomID(4);
  console.log(id); 
  const name = document.getElementById("supplierName").value;
  const status = document.getElementById("status").value;

  db.ref("suppliers/" + id)
    .set({
      name: name,
      status: status,
    })
    .then(() => {
      addSupplierToTable(id, { name: name, status: status });
      document.getElementById("newServiceForm").reset();
      document.querySelector("#divOne .close").click();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function editSupplier(id) {
  alert(`Edit supplier with ID: ${id}`);
}

function viewSupplier(id) {
  alert(`View supplier with ID: ${id}`);
}

fetchsuppliers();