
const ctx = document.getElementById('catchChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2019','2020','2021','2022','2023',],
        datasets: [{
            label: '',
            data: [1206, 1298, 1123, 1031, 1031, ],
            borderColor: '#49c6e5',
            backgroundColor: 'transparent',
            borderWidth: 2,
            tension: 0.1,
            pointBackgroundColor: '#49c6e5',
            pointRadius: 4,
            pointHoverRadius: 6,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#e0e0e0'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        aspectRatio: 3,  
        layout: {
          padding: 0  // Removes extra padding
        }, 
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Data tangkapan berdasarkan tahun
const dataPerTahun = {
    "2019": [
      { rank: "#1", country: "Australia", catch: "6455" },
      { rank: "#2", country: "Japan", catch: "5851" },
      { rank: "#3", country: "South Korea", catch: "1238" },
      { rank: "#4", country: "Taiwan", catch: "1229" },
      { rank: "#5", country: "Indonesia", catch: "1206" }
    ],
    "2020": [
      { rank: "#1", country: "Japan", catch: "5929" },
      { rank: "#2", country: "Australia", catch: "5027" },
      { rank: "#3", country: "Indonesia", catch: "1298" },
      { rank: "#4", country: "Korea", catch: "1231" },
      { rank: "#5", country: "Taiwan", catch: "1116" }
    ],
    "2021": [
      { rank: "#1", country: "Japan", catch: "6452" },
      { rank: "#2", country: "Australia", catch: "5729" },
      { rank: "#3", country: "Taiwan", catch: "1274" },
      { rank: "#4", country: "South Korea", catch: "1241" },
      { rank: "#5", country: "Indonesia", catch: "1123" }
    ],
    "2022": [
      { rank: "#1", country: "Indonesia", catch: "1031" },
      { rank: "#2", country: "Australia", catch: "6577" },
      { rank: "#3", country: "Japan", catch: "5887" },
      { rank: "#4", country: "New Zealand", catch: "935" },
      { rank: "#5", country: "South Korea", catch: "1173" }
    ],
     "2023": [
      { rank: "#1", country: "Japan", catch: "6335" },
      { rank: "#2", country: "Australia", catch: "6162" },
      { rank: "#3", country: "South Korea", catch: "1305" },
      { rank: "#4", country: "New Zealand", catch: "1172" },
      { rank: "#5", country: "Taiwan", catch: "1135" }
    ]
  };

  // Fungsi untuk update data tabel berdasarkan pilihan tahun
  function updateData() {
    const year = document.getElementById("year").value;
    const dataBody = document.getElementById("data-body");
    dataBody.innerHTML = ""; // Kosongkan tabel

    dataPerTahun[year].forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.rank}</td>
        <td>${item.country}</td>
        <td>${item.catch}</td>
      `;
      dataBody.appendChild(row);
    });
  }

  // Inisialisasi data tabel dengan tahun default (2023)
  window.onload = updateData;