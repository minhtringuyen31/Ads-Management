document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchButton').addEventListener('click', function () {
        fetchLogs();
    });
});

function fetchLogs() {
    // Example URL - replace with your actual endpoint

    // DOM elements
    const dateFromInput = document.getElementById('from');
    const dateToInput = document.getElementById('to');
    fetch('http://localhost:5001/search-logs', {

        method: "POST", headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }, body: JSON.stringify({ from: dateFromInput, to: dateToInput })
    })
        .then(response => response.json())
        .then(data => {
            displayLogs(data.logs);
        })
        .catch(error => console.error('Error:', error));
}

function displayLogs(logs) {
    const tableBody = document.getElementById('logsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    logs.forEach(log => {
        let row = tableBody.insertRow();
        row.insertCell(0).innerHTML = log.timestamp;
        row.insertCell(1).innerHTML = log.level;
        row.insertCell(2).innerHTML = log.status;
        row.insertCell(3).innerHTML = log.request;
        row.insertCell(4).innerHTML = log.message;
    });
}
