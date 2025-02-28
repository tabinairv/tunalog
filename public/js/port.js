async function fetchProductionData() {
  try {
      const response = await fetch('http://localhost:3000/production')
      if (!response.ok) {
          throw new Error('Gagal mengambil data');
      }
      const data = await response.json();
      console.log(data)
      updateTable(data)
  }
  catch (error) {
      console.error('Error:', error)
  }
}

function updateTable(data) {
  $('#productionTable').DataTable ({
      data: data,
      columns: [
          {data: 'tahun', title: 'Tahun'},
          {data: 'namaJenis', title: 'Nama Jenis Ikan'},
          {data: 'namaLatin', title: 'Nama Spesies'},
          {data: 'berat', title: 'Berat (Kg)'},
          {data: 'tripDays', title: 'Trip Days'}
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
}