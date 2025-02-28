const ctx = document.getElementById('catchChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2018','2019','2020','2021','2022',],
        datasets: [{
            label: '',
            data: [527285, 536653, 515349, 547984, 514486, ],
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
  { "rank": "#1", "country": "Indonesia", "catch": "536.653" },
  { "rank": "#2", "country": "South Korea", "catch": "347.418" },
  { "rank": "#3", "country": "Japan", "catch": "329.834" },
  { "rank": "#4", "country": "Taiwan", "catch": "321.918" },
  { "rank": "#5", "country": "PG", "catch": "267.937" }
],
"2020": [
  { "rank": "#1", "country": "Indonesia", "catch": "515.349" },
  { "rank": "#2", "country": "Japan", "catch": "315.436" },
  { "rank": "#3", "country": "South Korea", "catch": "279.341" },
  { "rank": "#4", "country": "Taiwan", "catch": "244.883" },
  { "rank": "#5", "country": "Philippines", "catch": "216.905" }
],
"2021": [
  { "rank": "#1", "country": "Indonesia", "catch": "547.984" },
  { "rank": "#2", "country": "Japan", "catch": "353.504" },
  { "rank": "#3", "country": "Taiwan", "catch": "269.292" },
  { "rank": "#4", "country": "South Korea", "catch": "257.109" },
  { "rank": "#5", "country": "KI", "catch": "188.291" }
],
"2022": [
  { "rank": "#1", "country": "Indonesia", "catch": "514.486" },
  { "rank": "#2", "country": "Japan", "catch": "285.387" },
  { "rank": "#3", "country": "Taiwan", "catch": "279.847" },
  { "rank": "#4", "country": "KR", "catch": "255.746" },
  { "rank": "#5", "country": "PG", "catch": "218.466" }
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