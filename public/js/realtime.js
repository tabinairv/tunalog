document.addEventListener('DOMContentLoaded', async () => {
  const tableBody = document.getElementById('reportData');

  async function fetchLogbookData() {
    try {
      const response = await fetch('http://localhost:3000/formRoute/logbooks'); 
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }
      const data = await response.json();
      
      tableBody.innerHTML = ''; a

      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.tanggalKeberangkatan || '-'}</td>
          <td>${item.tanggalKedatangan || '-'}</td>
          <td>${item.pelabuhanKeberangkatan || '-'}</td>
          <td>${item.pelabuhanKedatangan || '-'}</td>
          <td>${item.namaKapal || '-'}</td>
          <td>${item.namaPemilik || '-'}</td>
          <td>${item.nomorPerizinan || '-'}</td>
          <td>${item.transmiterSPKP || '-'}</td>
          <td>${item.tripKe || '-'}</td>
          <td>${item.jenisAPI || '-'}</td>
          <td>${item.grossTonage || '-'}</td>
          <td>${item.panjangKapal || '-'}</td>
          <td>${item.tandaPengenalKapal || '-'}</td>
          <td>${item.awakKapalWNI || '-'}</td>
          <td>${item.awakKapalWNA || '-'}</td>
          <td>${item.wppnri || '-'}</td>
          <td>${item.daerahPenangkapanIkan || '-'}</td>
          <td>${item.lintang || '-'}</td>
          <td>${item.bujur || '-'}</td>
          <td>${item.jenisIkan || '-'}</td>
          <td>${item.jumlahEkor || '-'}</td>
          <td>${item.berat || '-'}</td>
        `;
        tableBody.appendChild(row);
      });

    } catch (error) {
      console.error('Error:', error);
      tableBody.innerHTML = '<tr><td colspan="22" style="color: red;">Gagal memuat data</td></tr>';
    }
  }

  fetchLogbookData(); // Panggil fungsi saat halaman dimuat
});

//csv 
document.getElementById('downloadCsv').addEventListener('click', () => {
  const table = document.querySelector("table");
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Mengambil header tabel
  const headers = Array.from(table.querySelectorAll("th")).map(th => th.innerText);
  csvContent += headers.join(",") + "\n";

  // Mengambil isi tabel
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach(row => {
    const cells = Array.from(row.querySelectorAll("td")).map(td => td.innerText);
    csvContent += cells.join(",") + "\n";
  });

  // Membuat dan mengunduh file CSV
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "logbook.csv");
  link.click();
});






