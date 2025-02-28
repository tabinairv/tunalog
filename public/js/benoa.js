// Data untuk chart garis (Jumlah produksi tahunan)
const lineChartData = {
    labels: ['2018', '2019', '2020', '2021', '2022','2023',],
    datasets: [{
        label: 'Produksi',
        data: [2833062, 5536455, 6451915, 11501672, 12421343, 10451792], // Data produksi tahunan
        borderColor: '#33d1d1',
        fill: false,
        tension: 0.1 
    }]
  };
  // Data untuk chart batang (Jumlah produksi per alat tangkap)
  const barChartData = {
    labels: [
        'Bagan perahu', 'Bubu', 'Cantrang', 'Dogol', 'Gillnet', 
        'Hand Line Tuna', 'Jaring insang berlapis', 'Jaring insang hanyut', 
        'Jaring insang lainnya', 'Jaring liong bun', 'Panah', 'Pancing Cumi', 
        'Pancing Tonda', 'Pancing Ulur', 'Payang', 'Pengangkut', 
        'Pukat cincin Pelagis Besar dengan satu kapal', 
        'Pukat cincin Pelagis Kecil dengan satu kapal', 'Pukat Pantai', 
        'Pukat tarik lainnya', 'Rawai dasar', 'Rawai hanyut', 'Rawai Tuna'
      ], // Alat tangkap atau kategori lainnya
    datasets: [{
        label: 'Produksi',
        data: [
            61456, 133638, 87344, 1753, 25577, 43366, 493722, 3342534, 1539582, 
            30754, 4779, 30541, 10081, 187725, 972977, 178339, 8612326, 2573201, 
            5466893, 1477, 121, 344767, 25053285.8], // Data untuk Series 1
        backgroundColor: '#33d1d1'
    }]
  };
  // Inisialisasi chart garis
  const ctxLine = document.getElementById('chartLine').getContext('2d');
  const lineChart = new Chart(ctxLine, {
      type: 'line',
      data: lineChartData,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: false // Sembunyikan legend jika tidak diperlukan
              }
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Tahun' // Label untuk sumbu x
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Hasil Tangkapan (kg)' // Label untuk sumbu y
                  },
                  beginAtZero: true
              }
          }
      }
  });
  // Inisialisasi chart batang
  const ctxBar = document.getElementById('chartBar').getContext('2d');
  const barChart = new Chart(ctxBar, {
      type: 'bar',
      data: barChartData,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: true,
                  position: 'top'
              }
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Alat Tangkap' // Label untuk sumbu x
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Hasil Tangkapan (kg)' // Label untuk sumbu y
                  },
                  beginAtZero: true
              }
          }
      }
  });
  //Hasil Tangkapan per Jenis Ikan
  // Data for the clustered chart (Hasil Tangkapan per Spesies Ikan)
  const clusteredChartData = {
      labels: [
          'Albakora', 'Cakalang', 'Madidihang', 'Tenggiri', 'Tenggiri Batang', 'Tenggiri Papan', 
          'Tongkol Abu-Abu', 'Tongkol Banyar', 'Tongkol Pisang-Balaki', 'Tongkol Pisang-Cerutu', 
          'Tuna Mata Besar', 'Tuna Sirip Biru Selatan'
      ],
      datasets: [{
          label: 'Hasil Tangkapan (Kg)',
          data: [
            12793123.8, 11766584, 15685955, 667758, 14510, 95097,
            142678, 80633, 244350, 126380, 5192051, 2387119
          ],
          backgroundColor: '#33d1d1'
      }]
  };
  // Inisialisasi clustered bar chart
  const ctxClustered = document.getElementById('clusteredChart').getContext('2d');
  const clusteredChart = new Chart(ctxClustered, {
      type: 'bar',
      data: clusteredChartData,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: false  // Hides the legend
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 10000000  // Adjust the step size for better visibility
                  },
                  title: {
                      display: true,
                      text: 'Hasil Tangkapan (Kg)' 
                  }
              },
              x: {
                  ticks: {
                      autoSkip: false,      // Keep all x-axis labels visible
                      maxRotation: 45,       // No rotation for clarity
                      minRotation: 45,       
                  },
                  title: {
                      display: true,
                      text: 'Jenis Ikan'
                  }
              }
          }
      }
  });

// Data untuk CPUE dan tahun
const cpueDataPoints = [
    { x: 11222, y: 2821736 },
    { x: 21695, y: 5447273 },
    { x: 27467, y: 6406708 },
    { x: 43401, y: 11386684 },
    { x: 35081, y: 8809427 }    
];
// Fungsi untuk menghitung regresi linear
function calculateLinearRegression(data) {
    const n = data.length;
    const sumX = data.reduce((acc, point) => acc + point.x, 0);
    const sumY = data.reduce((acc, point) => acc + point.y, 0);
    const sumXY = data.reduce((acc, point) => acc + point.x * point.y, 0);
    const sumXX = data.reduce((acc, point) => acc + point.x * point.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const regressionData = data.map(point => ({
        x: point.x,
        y: slope * point.x + intercept
    }));

    return regressionData;
}
// Data untuk garis regresi
const regressionDataPoints = calculateLinearRegression(cpueDataPoints);
// Inisialisasi chart
const cpueCtx = document.getElementById('cpueRegressionChart').getContext('2d');
const cpueRegressionChart = new Chart(cpueCtx, {
    type: 'scatter',
    data: {
        datasets: [
            {
                label: 'CPUE (kg/hari.setting)',
                data: cpueDataPoints,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                showLine: false,
                pointRadius: 5
            },
            {
                label: 'Regresi Linier',
                data: regressionDataPoints,
                type: 'line',
                borderColor: 'blue',
                borderWidth: 2,
                fill: false,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Effort (trip days)'
                },
                ticks: {
                    callback: function(value) { return parseInt(value); }
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'CPUE (kg/trip days)'
                }
            }
        }
    }
});

//msy
const msyCtx = document.getElementById("msyChart").getContext("2d");
const effort = [
    0, 1533, 3066, 4600, 6133, 7666, 9199, 10733, 12266, 13799, 
    15332, 16866, 18399, 19932, 21465, 22999, 24532, 26065, 
    27598, 29132, 30665
  ];
  
  const yieldData = [
    0, 701873, 1270162, 1723935, 2079841, 2352397, 2554245, 2696372, 
    2788318, 2838346, 2853602, 2840251, 2803598, 2748201, 2677958, 
    2596196, 2505744, 2408997, 2307971, 2204357, 2099563
  ];  

  const yearData = [
    { x: 11222, y: 2821736, label: "2018" },
    { x: 21695, y: 5447273, label: "2019" },
    { x: 27467, y: 6406708, label: "2020" },
    { x: 43401, y: 11386684, label: "2021" },
    { x: 35081, y: 8809427, label: "2022" }
            
];
const msyChart = new Chart(msyCtx, {
  type: "line",
  data: {
    labels: effort,
    datasets: [
      {
        label: "Yield (tons)",
        data: yieldData,
        borderColor: "#4CAF50",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#4CAF50",
        pointRadius: 4,
        fill: true,
        backgroundColor: "rgba(76, 175, 80, 0.2)"
      },
      {
        label: "Year",
        data: yearData,
        type: "scatter",
        backgroundColor: "orange",
        pointRadius: 6
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "fMSY (trip days)"
        }
      },
      y: {
        title: {
          display: true,
          text: "MSY (kg/tahun)"
        },
        beginAtZero: true
      }
    }
  },
  plugins: [
    {
      id: "customLabels",
      afterDatasetsDraw(chart, args, options) {
        const { ctx, data } = chart;
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const meta = chart.getDatasetMeta(1); // The scatter dataset (Year Data)
        meta.data.forEach((point, index) => {
          const year = yearData[index].label;
          ctx.fillText(year, point.x + 10, point.y);
        });
      }
    }
  ]
});  

//produksi
$(document).ready(function() {
    $('#productionTable').DataTable({
        ajax: {
            url: 'json/benoa-produksi-2.json',
            dataSrc: '',
            error: function(xhr, status, error) {
                console.log("Error loading data:", error);
            }
        },
        columns: [
            { data: 'Tahun', title: 'Tahun' },
            { data: 'Nama Jenis Ikan', title: 'Nama Jenis Ikan' },
            { data: 'Nama Latin', title: 'Nama Spesies' },
            { data: 'Berat (Kg)', title: 'Produksi (Kg)' },
            { data: 'Trip Days', title: 'Trip Days' }
        ],
        paging: true,
        searching: true,
        lengthChange: true,
        pageLength: 10,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'csvHtml5',
                text: 'Download CSV',
                title: 'Data Produksi'
            },
            {
                extend: 'excelHtml5',
                text: 'Download Excel',
                title: 'Data Produksi'
            },
            {
                extend: 'pdfHtml5',
                text: 'Download PDF',
                title: 'Data Produksi',
                orientation: 'landscape',
                pageSize: 'A4'
            },
            {
                extend: 'print',
                text: 'Print Table'
            }
        ]
    });
});

//alat tangkap
$(document).ready(function() {
    $('#APITable').DataTable({
        ajax: {
            url: 'json/benoa-API-2.json',
            dataSrc: '',
            error: function(xhr, status, error) {
                console.log("Error loading data:", error);
            }
        },
        columns: [
            { data: 'Tahun', title: 'Tahun' },
            { data: 'Alat Tangkap', title: 'Alat Tangkap' },
            { data: 'Berat (Kg)', title: 'Produksi (Kg)' }            
        ],
        paging: true,
        searching: true,
        lengthChange: true,
        pageLength: 10,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'csvHtml5',
                text: 'Download CSV',
                title: 'Data Produksi'
            },
            {
                extend: 'excelHtml5',
                text: 'Download Excel',
                title: 'Data Produksi'
            },
            {
                extend: 'pdfHtml5',
                text: 'Download PDF',
                title: 'Data Produksi',
                orientation: 'landscape',
                pageSize: 'A4'
            },
            {
                extend: 'print',
                text: 'Print Table'
            }
        ]
    });
});



