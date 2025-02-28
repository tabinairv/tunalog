const ctxBar = document.getElementById('barChart').getContext('2d');
const barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['2018', '2019', '2020', '2021', '2022','2023'],
        datasets: [{
            label: 'Produksi TCT di Samudra Hindia',
            data: [119976114.5, 99917274.61, 132509054.5, 169488487.1, 177326310.6, 228938805],
            backgroundColor: '#2563eb',
        }]
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
      },
      layout: {
          padding: 0, // Remove padding around the chart area
      }
  }
});

const ctxPie = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Pancing Ulur', 'Pengangkut', 'Pukat cincin Pelagis Besar', 'Pukat cincin Pelagis Kecil', 'Rawai Tuna'],
        datasets: [{
          data: [45472227.59, 188428005, 293619609.2, 142358170.5, 86877864.1],
            backgroundColor: ['#60a5fa', '#3b82f6', '#2563eb', '#1e40af'],
        }]
    },
    options: {
        layout: {
            padding: 0 // **Removes extra padding**
        },
        plugins: {
            legend: {
                position: 'right' // Moves legend to the right to save space
            }
        },
        responsive: true, // Ensures the pie chart adjusts based on screen size
    }
});


// RFMO
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  if (index >= slides.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = slides.length - 1;
  } else {
    currentIndex = index;
  }
  document.querySelector('.carousel').style.transform = `translateX(${-currentIndex * 100}%)`;
  
  // Update dots
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}
function currentSlide(index) {
  showSlide(index - 1);
}
function autoScroll() {
  currentIndex++;
  showSlide(currentIndex);
}

// Scroll otomatis setiap 7 detik
setInterval(autoScroll, 7000);

