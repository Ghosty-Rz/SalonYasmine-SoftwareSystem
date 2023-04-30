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
  