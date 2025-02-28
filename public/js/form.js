document.getElementById('logbookForm').addEventListener('submit', handleSubmit, { once: true });
    
    async function handleSubmit(event) {
    event.preventDefault(); 
    event.stopImmediatePropagation();

    const submitBtn = document.getElementById('submitBtn');
     submitBtn.disabled = true;

    const namaKapal = document.getElementById('namaKapal').value;
    const namaPemilik = document.getElementById('namaPemilik').value;
    const nomorPerizinan = document.getElementById('nomorPerizinan').value;
    const transmiterSPKP = document.getElementById('transmiterSPKP').value;
    const tripKe = document.getElementById('tripKe').value;
    const jenisAPI = document.getElementById('jenisAPI').value;
    const grossTonage = document.getElementById('grossTonage').value;
    const panjangKapal = document.getElementById('panjangKapal').value;
    const radioPanggil = document.getElementById('radioPanggil').value;
    const tandaPengenalKapal = document.getElementById('tandaPengenalKapal').value;
    const awakKapalWNI = document.getElementById('awakKapalWNI').value;
    const awakKapalWNA = document.getElementById('awakKapalWNA').value;
    const wppnri = document.getElementById('wppnri').value;
    const daerahPenangkapanIkan = document.getElementById('daerahPenangkapanIkan').value;
    const pelabuhanKeberangkatan = document.getElementById('pelabuhanKeberangkatan').value;
    const pelabuhanKedatangan = document.getElementById('pelabuhanKedatangan').value;
    const tanggalKeberangkatan = document.getElementById('tanggalKeberangkatan').value;
    const tanggalKedatangan = document.getElementById('tanggalKedatangan').value;
    const lintang = document.getElementById('lintang').value;
    const bujur = document.getElementById('bujur').value;
    const jenisIkan = document.getElementById('jenisIkan').value;
    const jumlahEkor = document.getElementById('jumlahEkor').value;
    const berat = document.getElementById('berat').value;    

    function showServerMessage(message, color) {
        const serverMessage = document.getElementById('serverMessage');
        if (serverMessage) {
            serverMessage.style.color = color;
            serverMessage.textContent = message;
        }
    }

    try {
        const response = await fetch('http://localhost:3000/formRoute/logbook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ namaKapal, namaPemilik, nomorPerizinan, transmiterSPKP, tripKe, 
                jenisAPI, grossTonage, panjangKapal, radioPanggil, tandaPengenalKapal, awakKapalWNI, 
                awakKapalWNA, wppnri, daerahPenangkapanIkan, pelabuhanKeberangkatan, pelabuhanKedatangan, tanggalKeberangkatan,
                tanggalKedatangan, lintang, bujur, jenisIkan, jumlahEkor, berat }),
        });

        if (response.ok) {
            showServerMessage('Data berhasil dimasukkan!', 'green');
            document.getElementById('logbookForm').reset();
          } else {
            showServerMessage('Gagal memasukkan data.', 'red');
          }
        } catch (error) {
          console.error('Error:', error);
          showServerMessage('Terjadi kesalahan server.', 'red');
        } finally {
          submitBtn.disabled = false;
        }             

}




  