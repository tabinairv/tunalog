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
  labels: ['Jaring insang hanyut', 'Purse Seine Pelagis Besar', 'Purse Seine Pelagis Kecil','Pukat Pantai','Rawai Tuna'], // Alat tangkap atau kategori lainnya
  datasets: [{
      label: 'Produksi',
      data: [10720468.5,157726318.1, 10824702, 11003971, 24044344.26], // Data untuk Series 1
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
              display: false // Sembunyikan label jika tidak diperlukan
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
              display: true, // Tampilkan label untuk setiap series
              position: 'top'
          }
      },
      scales: {
          y: {
              beginAtZero: true // Mulai dari 0 pada sumbu y
          }
      }
  }
});

//produksi
$(document).ready(function() {
  $('#productionTable').DataTable({
      ajax: {
          url: 'json/nizam-produksi.json',
          dataSrc: '',
          error: function(xhr, status, error) {
              console.log("Error loading data:", error);
          }
      },
      columns: [
          { data: 'tahun', title: 'Tahun' },
          { data: 'jenis', title: 'Nama Jenis Ikan' },
          { data: 'spesies', title: 'Nama Spesies' },
          { data: 'produksi', title: 'Produksi (Kg)' },
          { data: 'trip days', title: 'Trip Days' }
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
          url: 'json/nizam-API.json',
          dataSrc: '',
          error: function(xhr, status, error) {
              console.log("Error loading data:", error);
          }
      },
      columns: [
          { data: 'tahun', title: 'Tahun' },
          { data: 'alat tangkap', title: 'Alat Tangkap' },
          { data: 'produksi', title: 'Produksi (Kg)' }            
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