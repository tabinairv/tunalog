// Data untuk chart garis (Jumlah produksi tahunan)
const lineChartData = {
  labels: ['2018', '2019', '2020', '2021', '2022','2023',],
  datasets: [{
      label: 'Produksi',
      data: [32104221.75, 19419265.45, 35056779.16, 46044330, 70233404.5, 38410019], // Data produksi tahunan
      borderColor: '#33d1d1',
      fill: false,
      tension: 0.1 
  }]
};
// Data untuk chart batang (Jumlah produksi per alat tangkap)
const barChartData = {
    labels: [
        'Bouke ami', 
        'Hand Line Tuna', 
        'Jala jatuh berkapal', 
        'Jaring insang hanyut', 
        'Jaring insang oseanik', 
        'Jaring liong bun', 
        'Jaring Tarik Berkantong', 
        'Pancing Cumi', 
        'Pancing Ulur', 
        'Pengangkut', 
        'Pukat cincin Pelagis Besar dengan satu kapal', 
        'Pukat cincin Pelagis Kecil dengan satu kapal', 
        'Rawai dasar', 
        'Rawai Tuna'
      ],
  datasets: [{
      label: 'Produksi',
      data: [
        105936, 
        274936, 
        540425, 
        495148, 
        413177, 
        20439, 
        3428934, 
        660611, 
        197431, 
        3746617, 
        134900455.5, 
        6574118, 
        137697, 
        17037929.26
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
        data: [
            2581868, 107334980.8, 40616766.84, 271229, 1408, 12151, 
            248865, 87702, 51935, 606467, 16698523.05, 21958
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



// Data untuk CPUE dan effort
const cpueDataPoints = [
    { x: 116, y: 264066},
    { x: 99, y: 177715},
    { x: 79, y: 355990},
    { x: 74, y: 556248},
    { x: 49, y: 516501}    
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
            url: 'json/nizam-produksi-2.json',
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

$(document).ready(function() {
    $('#APITable').DataTable({
        ajax: {
            url: 'json/nizam-API-2.json',
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
const effort = [0, 52066, 104132, 156198, 208265, 260331, 312397, 364463, 416529, 468595, 520661, 572727, 624794, 676860, 728926, 780992, 833058, 885124, 937190, 989257, 1041323];
const yieldData = [0, 6439425, 12201015, 17284771, 21690693, 25418781, 28469035, 30841454, 32536040, 33552791, 33891708, 33552791, 32536040, 30841454, 28469035, 25418781, 21690693, 17284771, 12201015, 6439425, 0];

const yearData = [
    { x: 264066, y: 30564193, label: "2018" },
    { x: 177715, y: 17535979, label: "2019" },
    { x: 355990, y: 28266108, label: "2020" },
    { x: 556248, y: 41168210, label: "2021" },
    { x: 516501, y: 25437915, label: "2022" }
            
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

