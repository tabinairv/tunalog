// Data untuk chart garis (Jumlah produksi tahunan)
const lineChartData = {
    labels: ['2018', '2019', '2020', '2021', '2022','2023',],
    datasets: [{
        label: 'Produksi',
        data: [
            766462, 2057862, 1648788, 1904604, 2241668, 1106129
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
        'Bagan perahu', 'Bubu', 'Cantrang', 'Gillnet', 'Hand Line Tuna', 
        'Huhate', 'Jaring insang berlapis', 'Jaring insang hanyut', 'Jaring insang lainnya', 
        'Jaring insang lingkar', 'Panah', 'Pancing Tonda', 'Pancing Ulur', 'Payang', 
        'Pengangkut', 'Pukat cincin Pelagis Kecil dengan satu kapal', 'Pukat hela dasar berpapan', 
        'Pukat Pantai', 'Pukat tarik lainnya', 'Rawai hanyut'
      ], 
    datasets: [{
        label: 'Produksi',
        data: [
            24807, 39354, 70375, 8720, 37831, 69788, 55997, 739698, 350467, 7080, 
            7364, 6875606, 413830, 238033, 14109, 118757, 6489, 637641, 5247, 4320
          ], 
        backgroundColor: '#33d1d1'
    }]
  };
  // Data for the clustered chart (Hasil Tangkapan per Spesies Ikan)
  const clusteredChartData = {
    labels: [
        'Albakora', 'Cakalang', 'Madidihang', 'Tongkol Abu-Abu', 'Tongkol Banyar', 
        'Tongkol Pisang-Balaki', 'Tongkol Sirara-Gigi Anjing', 'Tuna Mata Besar', 'Tuna Sirip Biru Selatan'
    ],
      datasets: [{
          label: 'Hasil Tangkapan (Kg)',
          data: [
            1011383, 4209912, 4048834, 1082, 84285, 300, 
            1276, 368358, 83
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
  
//CPUE 
  const cpueDataPoints = [
    { x: 991, y: 766462 },
    { x: 24406, y: 2004340 },
    { x: 18744, y: 1618558 },
    { x: 8123, y: 1789369 },
    { x: 25, y: 50311 }       
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

//msy
const msyCtx = document.getElementById("msyChart").getContext("2d");
const effort = [
  0, 825, 1650, 2475, 3300, 4125, 4950, 5775, 6600, 7425, 
  8250, 9075, 9900, 10725, 11550, 12375, 13200, 14025, 14850, 15675, 16500
];
const yieldData = [
  0, 797636, 1443462, 1959148, 2363613, 2673357, 2902744, 3064264, 
  3168755, 3225609, 3242946, 3227773, 3186120, 3123164, 3043337, 
  2950420, 2847627, 2737679, 2622870, 2505119, 2386027
];
// Data for orange dots (yearly data points)
const yearData = [
    { x: 991, y: 766462, label: "2018" },
    { x: 24406, y: 2004340, label: "2019" },
    { x: 18744, y: 1618558, label: "2020" },
    { x: 8123, y: 1789369, label: "2021" },
    { x: 25, y: 50311, label: "2022" }
            
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
              url: 'json/labuhan-produksi-2.json',
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
              url: 'json/labuhan-API-2.json',
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
  


  
  