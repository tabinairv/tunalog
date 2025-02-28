// Data untuk chart garis (Jumlah produksi tahunan)
const lineChartData = {
    labels: ['2018', '2019', '2020', '2021', '2022','2023',],
    datasets: [{
        label: 'Produksi',
        data: [
            2790809, 1393749, 1426670, 1348546, 1175267, 1193729
          ]          
          , // Data produksi tahunan
        borderColor: '#33d1d1',
        fill: false,
        tension: 0.1 
    }]
  };
  // Data untuk chart batang (Jumlah produksi per alat tangkap)
  const barChartData = {
    labels: [
        'Bagan perahu', 'Bubu', 'Cantrang', 'Dogol', 'Gillnet', 
        'Hand Line Tuna', 'Huhate', 'Jaring insang berlapis', 'Jaring insang hanyut', 
        'Jaring insang lainnya', 'Jaring insang lingkar', 'Lampara dasar', 'Panah', 
        'Pancing Tonda', 'Pancing Ulur', 'Payang', 'Pukat cincin dua kapal', 
        'Pukat cincin Pelagis Kecil dengan satu kapal', 'Pukat hela dasar berpapan', 
        'Pukat Pantai', 'Pukat tarik lainnya', 'Rawai dasar', 'Rawai hanyut'
      ], 
    datasets: [{
        label: 'Produksi',
        data: [
            26257, 25512, 60808, 9920, 6904, 175654, 5237, 29575, 374440, 119472, 
            173, 222, 4266, 176441, 7561775, 166381, 256344, 14064, 11214, 300027, 
            218, 890, 2976
          ], 
        backgroundColor: '#33d1d1'
    }]
  };
  // Data for the clustered chart (Hasil Tangkapan per Spesies Ikan)
  const clusteredChartData = {
    labels: [
        'Albakora', 'Cakalang', 'Madidihang', 'Tenggiri', 'Tongkol Abu-Abu', 'Tongkol Banyar', 
        'Tongkol Pisang-Cerutu', 'Tuna Mata Besar'
    ],
      datasets: [{
          label: 'Hasil Tangkapan (Kg)',
          data: [
            1160312, 4973216, 2292682, 272, 180932, 21282, 
            291584, 408490
        ],
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
  
  // Data untuk CPUE dan effort
  const cpueDataPoints = [
    { x: 950, y: 2790390 },
    { x: 503, y: 1393749 },
    { x: 425, y: 1404153 },
    { x: 619, y: 1293222 },
    { x: 245, y: 674467 }       
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
                  label: 'CPUE (kg/trip days)',
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
  
  //produksi
  $(document).ready(function() {
      $('#productionTable').DataTable({
          ajax: {
              url: 'json/pondok-dadap-produksi-2.json',
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
              url: 'json/pondok-dadap-API-2.json',
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
  
  //msy
  const msyCtx = document.getElementById("msyChart").getContext("2d");
  const effort = [
    0, 1671, 3342, 5013, 6684, 8355, 10026, 11697, 13368, 15039, 
    16710, 18381, 20052, 21722, 23393, 25064, 26735, 28406, 30077, 31748, 33419
  ]; 
  
  const yieldData = [
    0, 4283925, 7752512, 10522144, 12694440, 14358005, 15589992, 16457477, 
    17018675, 17324026, 17417141, 17335649, 17111938, 16773816, 16345082, 
    15846045, 15293967, 14703463, 14086846, 13454434, 12814816
  ];    
const yearData = [
    { x: 950, y: 2790390, label: "2018" },
    { x: 503, y: 1393749, label: "2019" },
    { x: 425, y: 1404153, label: "2020" },
    { x: 619, y: 1293222, label: "2021" },
    { x: 245, y: 674467, label: "2022" }
            
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
  
  