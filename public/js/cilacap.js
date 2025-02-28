// Data untuk chart garis (Jumlah produksi tahunan)
const lineChartData = {
    labels: ['2018', '2019', '2020', '2021', '2022','2023',],
    datasets: [{
        label: 'Produksi',
        data: [
            4184214.9, 4600014.2, 8831356.55, 7204810, 11532346.5, 4520890.35
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
        'Hand Line Tuna', 'Huhate', 'Jala jatuh berkapal', 'Jaring angkat lainnya', 
        'Jaring insang berlapis', 'Jaring insang hanyut', 'Jaring insang kombinasi dengan tramel net', 
        'Jaring insang lainnya', 'Jaring insang oseanik', 'Jaring liong bun', 
        'Jaring Tarik Berkantong', 'Lampara dasar', 'Panah', 'Pancing Cumi', 'Pancing Tonda', 
        'Pancing Ulur', 'Payang', 'Pengangkut', 'Pukat cincin dua kapal', 
        'Pukat cincin Pelagis Besar dengan satu kapal', 'Pukat cincin Pelagis Kecil dengan satu kapal', 
        'Pukat cincin satu kapal', 'Pukat hela dasar berpapan', 'Pukat Pantai', 
        'Pukat tarik lainnya', 'Rawai dasar', 'Rawai hanyut', 'Rawai Tuna', 'Tombak'
      ], // Alat tangkap atau kategori lainnya
    datasets: [{
        label: 'Produksi',
        data: [
            86018, 122255, 246635, 9728, 134012, 2765722.35, 2915, 6002, 5285, 387063, 
            6784152.6, 7078, 1388354, 370204, 129411, 2440, 7270, 6731, 3248, 27128, 
            5635591.45, 1219782.5, 4650, 11656, 1573123, 2480, 1691, 16433, 3652089, 
            6168, 1058200.5, 1166482.15, 14022028.95, 11605
          ], // Data untuk Series 1
        backgroundColor: '#33d1d1'
    }]
  };
  // Data for the clustered chart (Hasil Tangkapan per Spesies Ikan)
  const clusteredChartData = {
    labels: [
        'Albakora', 'Cakalang', 'Madidihang', 'Tenggiri', 'Tenggiri Papan', 'Tongkol Abu-Abu', 
        'Tongkol Banyar', 'Tongkol Pisang-Balaki', 'Tongkol Pisang-Cerutu', 'Tuna Mata Besar', 'Tuna Sirip Biru Selatan'
    ],
      datasets: [{
          label: 'Hasil Tangkapan (Kg)',
          data: [
            1182538, 17971823.45, 6265336.7, 37844, 3934, 88596, 
            1896, 26124, 121447, 15160938.35, 13155
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
    { x: 15612, y: 1179567 },
    { x: 15767, y: 1257897 },
    { x: 21187, y: 3065329 },
    { x: 34420, y: 2445774 },
    { x: 65828, y: 4647388 }       
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
              url: 'json/cilacap-produksi-2.json',
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
              url: 'json/cilacap-API-2.json',
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
    0, 18781, 37561, 56342, 75122, 93903, 112683, 131464, 150244, 
    169025, 187805, 206586, 225366, 244147, 262927, 281708, 300488, 
    319269, 338049, 356830, 375610
  ];
  
  const yieldData = [
    0, 1694910, 3067236, 4163024, 5022480, 5680660, 6168089, 6511304, 6733339, 
    6854149, 6890989, 6858747, 6770238, 6636461, 6466835, 6269394, 6050968, 
    5817339, 5573378, 5323168, 5070106
  ];  
  
  const yearData = [
    { x: 15612, y: 1179567, label: "2018" },
    { x: 15767, y: 1257897, label: "2019" },
    { x: 21187, y: 3065329, label: "2020" },
    { x: 34420, y: 2445774, label: "2021" },
    { x: 65828, y: 4647388, label: "2022" }
            
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
  