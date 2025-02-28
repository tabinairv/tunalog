// Data untuk chart garis (Jumlah produksi tahunan)
const lineChartData = {
    labels: ['2018', '2019', '2020', '2021', '2022','2023',],
    datasets: [{
        label: 'Produksi',
        data: [
            349763, 622685, 575369, 1922275.22, 1791523, 628650], // Data produksi tahunan
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
        'Jaring insang lainnya', 'Jaring insang oseanik', 'Jaring Insang Tetap', 
        'Jaring liong bun', 'Lampara dasar', 'Panah', 'Pancing berjoran', 
        'Pancing Tonda', 'Pancing Ulur', 'Payang', 'Pukat hela dasar berpapan', 
        'Pukat Pantai', 'Pukat tarik lainnya', 'Rawai dasar', 'Rawai Tuna'
      ], 
    datasets: [{
        label: 'Produksi',
        data: [
            11553, 21070, 11666, 214, 5719, 332170, 61678, 813376, 211947, 80, 
            238, 6834, 2839, 1236, 9698, 491690, 400570, 193871.5, 15369, 442195, 
            6048, 978, 2849225.72
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
        data: [610488, 2192483.14, 2360578.58, 6765, 2604, 298.5, 7919, 11600, 3977, 33971, 663272, 286],
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
  
  // Data untuk CPUE dan effort
  const cpueDataPoints = [
    { x: 186572, y: 349763 },
    { x: 505923, y: 612960 },
    { x: 507533, y: 560307 },
    { x: 1563427, y: 1754727 },
    { x: 337771, y: 1255571 }        
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
              url: 'json/palabuhan-produksi-2.json',
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
              url: 'json/palabuhan-API-2.json',
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
    0, 208449, 416898, 625347, 833795, 1042244, 1250693, 1459142, 1667591, 
    1876040, 2084489, 2292938, 2501386, 2709835, 2918284, 3126733, 3335182, 
    3543631, 3752080, 3960529, 4168977
  ];
  
  const yieldData = [
    0, 406175, 735045, 997644, 1203607, 1361336, 1478145, 1560395, 1613604, 
    1642555, 1651384, 1643657, 1622447, 1590388, 1549738, 1502423, 1450078, 
    1394090, 1335626, 1275665, 1215020
  ];
  
  const yearData = [
    { x: 186572, y: 349763, label: "2018" },
    { x: 505923, y: 612960, label: "2019" },
    { x: 507533, y: 560307, label: "2020" },
    { x: 1563427, y: 1754727, label: "2021" },
    { x: 337771, y: 1255571, label: "2022" }
            
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
  
  