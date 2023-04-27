const githubApiUrl = 'https://api.github.com';
const githubToken = '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';
const owner = 'Ghosty-Rz';
const repo = 'SalonYasmine-SoftwareSystem';
const jsonFilePath = 'js/services.json  ';

async function fetchData() {
  const response = await fetch(
    `${githubApiUrl}/repos/${owner}/${repo}/contents/${jsonFilePath}`,
    {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    }
  );
  const data = await response.json();
  const fileContent = JSON.parse(atob(data.content));
  loadServices(fileContent);
}

async function saveService(name, price) {
  const response = await fetch(
    `${githubApiUrl}/repos/${owner}/${repo}/contents/${jsonFilePath}`,
    {
      headers: {
        Authorization: `token ${githubToken}`,
      },
    }
  );
  const data = await response.json();
  const fileContent = JSON.parse(atob(data.content));

  fileContent.push({ name, price });

  await fetch(
    `${githubApiUrl}/repos/${owner}/${repo}/contents/${jsonFilePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${githubToken}`,
      },
      body: JSON.stringify({
        message: 'Add new service',
        content: btoa(JSON.stringify(fileContent, null, 2)),
        sha: data.sha,
      }),
    }
  );
}

// ... (rest of the code)

// Load services on page load
fetchData();

// Add an event listener for form submission
document.querySelector('form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const serviceName = document.querySelector("input[type='text']");
  const servicePrice = document.querySelector("input[type='number']");

  await saveService(serviceName.value, servicePrice.value);

  addToTable(serviceName.value, servicePrice.value);

  serviceName.value = '';
  servicePrice.value = '';
});
