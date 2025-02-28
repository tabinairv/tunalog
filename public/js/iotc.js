const ctx = document.getElementById('vesselChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2010', '2011', '2012', '2013', '2014','2015','2016','2017','2018','2019','2020','2021','2022','2023',],
        datasets: [{
            label: '',
            data: [993, 1196, 1275, 0, 0, 584, 271, 246, 324, 315, 382, 435, 462, 567, ],
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
  { "rank": "#1", "country": "Indonesia", "catch": "386.588" },
  { "rank": "#2", "country": "Iran Islamic Rep.", "catch": "243.003" },
  { "rank": "#3", "country": "India", "catch": "179.685" },
  { "rank": "#4", "country": "EU. Spain", "catch": "176.509" },
  { "rank": "#5", "country": "Maldives", "catch": "134.467" }
],
"2020": [
  { "rank": "#1", "country": "Indonesia", "catch": "441.913" },
  { "rank": "#2", "country": "Iran Islamic Rep.", "catch": "257.147" },
  { "rank": "#3", "country": "Maldives", "catch": "146.888" },
  { "rank": "#4", "country": "EU. Spain", "catch": "146.259" },
  { "rank": "#5", "country": "India", "catch": "137.954" }
],
"2021": [
  { "rank": "#1", "country": "Indonesia", "catch": "405.317" },
  { "rank": "#2", "country": "Iran Islamic Rep.", "catch": "273.181" },
  { "rank": "#3", "country": "EU. Spain", "catch": "158.045" },
  { "rank": "#4", "country": "Maldives", "catch": "143.532" },
  { "rank": "#5", "country": "India", "catch": "143.202" }
],
"2022": [
  { "rank": "#1", "country": "Indonesia", "catch": "489.737" },
  { "rank": "#2", "country": "Iran Islamic Rep.", "catch": "282.377" },
  { "rank": "#3", "country": "India", "catch": "177.833" },
  { "rank": "#4", "country": "Maldives", "catch": "154.746" },
  { "rank": "#5", "country": "EU. Spain", "catch": "149.735" }
],
"2023": [
  { "rank": "#1", "country": "Indonesia", "catch": "469.751" },
  { "rank": "#2", "country": "Iran Islamic Rep.", "catch": "274.272" },
  { "rank": "#3", "country": "India", "catch": "179.909" },
  { "rank": "#4", "country": "Maldives", "catch": "160.486" },
  { "rank": "#5", "country": "EU. Spain", "catch": "137.602" }
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