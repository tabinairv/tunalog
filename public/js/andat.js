// Data untuk CPUE dan tahun
const cpueDataPoints = [
  { x: 2015, y: 6000000 },
  { x: 2016, y: 5500000 },
  { x: 2017, y: 5000000 },
  { x: 2018, y: 4500000 },
  { x: 2019, y: 3000000 },
  { x: 2020, y: 2000000 },
  { x: 2021, y: 1000000 },
  { x: 2022, y: 500000 }
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
                  text: 'Tahun'
              },
              ticks: {
                  callback: function(value) { return parseInt(value); }
              }
          },
          y: {
              beginAtZero: true,
              title: {
                  display: true,
                  text: 'CPUE (kg/hari.setting)'
              }
          }
      }
  }
});

//msy
const msyCtx = document.getElementById("msyChart").getContext("2d");
const effort = [0, 2068, 4137, 6205, 8273, 10342, 12410, 14478, 16547, 18615, 20683, 22752, 24820, 26888, 28957, 31025, 33093, 35162, 37230, 39298, 41367];
const yieldData = [0, 25285, 47909, 67870, 85171, 99809, 111787, 121102, 127756, 131748, 133079, 131748, 127756, 121102, 111787, 99809, 85171, 67870, 47909, 25285, 0];

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
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fishing Effort (units)"
        }
      },
      y: {
        title: {
          display: true,
          text: "Yield (tons)"
        },
        beginAtZero: true
      }
    }
  }
});