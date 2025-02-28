const translations = {
  en: {
      "dashboard": "Dashboard",
      "port": "Port",
      "report": "Report",
      "find-out": "Find Out More",
      "total-active-vessel": "Total Active Vessel",
      "total-IUU-vessel": "Total IUU Fishing Vessel",
      "total-API": "Total Fishing Gear",
      "TCT-production": "TCT Production in Indian Ocean",
      "gear-use": "Use of Fishing Gear",
      "port-landing": "TCT Port Landing",
      "blue-economy-regulation": "Blue Economy Regulation",
      "blue-economy-text": "5 Blue Economy Regulation - Priority Agenda of the Indonesian Ministry of Maritime Affairs and Fisheries",
      "conservation": "Expanding Marine Conservation Areas",
      "PIT": "Quota-Based Measured Fishing",
      "marine-aquaculture" : "Developing Marine, Brackish and Sustainable Aquaculture",
      "coastal-management" : "Management and Monitoring of Coasts and Small Islands",
      "plastic-waste" : "Handling Plastic Waste in the Sea",
      "depart-date" : "Depart Date",
      "arrival-date" : "Arrival Date",
      "depart-port" : "Port of Departure",
      "arrival-port" : "Port of Arrival",
      "ship-name" : "Vessel Name",
      "owner-name" : "Owner Name",
      "sipi-number" : "Vessel License Number",
      "spkp" : "SPKP Transmitter",      
      "trip" : "Trip",
      "jenis-api" : "Fishing Gear Type",
      "gt" : "Gross Tonnage",
      "panjang-kapal" : "Vessel Length",
      "pengenal-kapal" : "Vessel Registration Number",
      "awak-wni" : "Indonesian Ship Crew",
      "awak-wna" : "Foreign Ship Crew",
      "wpp" : "Fisheries Management Area",
      "dpi" : "Fishing Ground",
      "lintang" : "Latitude",
      "bujur" : "Longitude",
      "fish-type" : "Types of Fish",
      "jumlah-ekor" : "Number of Fish",
      "weight" : "Total Weight",
      "video-text" : "TunaLog is a website-based service for managing TCT (tuna, skipjack, mackerel) fisheries in the Indian Ocean.",
      "sustainable-fisheries" : "Sustainable Fisheries",
      "sustainable-fisheries-text" : "Capture fisheries are activities that involve fishing in various water bodies, including lakes and marine environments. Sustainability is a major concern, with threats from illegal, unreported, unregulated (IUU) fishing and destructive fishing practices. To address these issues, efforts such as promoting environmentally friendly fishing gear, improving fisheries management, and developing short-term and long-term economic recovery strategies are needed",
  },
  id: {
      "dashboard": "Beranda",
      "port": "Pelabuhan",
      "report": "Pelaporan",
      "find-out": "Cari Tau Lebih",
      "total-active-vessel": "Total Kapal Aktif",
      "total-IUU-vessel": "Total Kapal IUU",
      "total-API": "Total API",
      "TCT-production": "Produksi TCT di Samudera Hindia",
      "gear-use": "Penggunaan Alat Tangkap",
      "port-landing": "Pelabuhan Pendaratan TCT",
      "blue-economy-regulation": "Regulasi Ekonomi Biru",
      "blue-economy-text": "5 Kebijakan Ekonomi Biru - Agenda Prioritas Kementerian Kelautan dan Perikanan RI",
      "conservation": "Memperluas Kawasan Konservasi Laut",
      "PIT": "Penangkapan Ikan Terukur Berbasis Kuota",
      "marine-aquaculture" : "Mengembangkan Budidaya Air Laut, Payau, dan Berkelanjutan", 
      "coastal-management" : "Pengelolaan dan Pengawasan Pesisir dan Pulau-Pulau Kecil",
      "plastic-waste" : "Penanganan Sampah Plastik di Laut",
      "depart-date" : "Tanggal Keberangkat",
      "arrival-date": "Tanggal Kedatangan",
      "depart-port" : "Pelabuhan Keberangkatan",
      "arrival-port" : "Pelabuhan Kedatangan",
      "ship-name" : "Nama Kapal",
      "owner-name" : "Nama Pemilik",
      "sipi-number" : "Nomor Perizinan Berusaha",
      "spkp" : "Transmiter SPKP",
      "trip": "Trip Ke-",
      "jenis-api" : "Jenis API",
      "gt" : "GT Kapal",
      "panjang-kapal" : "Panjang Kapal",
      "pengenal-kapal" : "Tanda Pengenal Kapal",
      "awak-wni" : "Awak Kapal WNI",
      "awak-wna" : "Awak Kapal WNA",
      "wpp" : "WPP",
      "dpi" : "DPI",
      "lintang" : "Lintang",
      "bujur" : "Bujur",
      "fish-type" : "Jenis Ikan",
      "jumlah-ekor" : "Jumlah Ekor",
      "weight" : "Berat Total",
      "video-text" : "TunaLog adalah layanan untuk pengelolaan perikanan TCT (tuna, cakalang, tongkol) berbasis website di Samudra Hindia",      
      "sustainable-fisheries" : "Perikanan Berkelanjutan",
      "sustainable-fisheries-text" : "Perikanan tangkap adalah aktivitas yang melibatkan kegiatan penangkapan ikan di berbagai badan air, termasuk danau dan lingkungan laut. Keberlanjutan menjadi perhatian utama, dengan ancaman dari illegal, unreported, unregulated (IUU) Fishing dan penggunaan penangkapan ikan yang merusak. Untuk mengatasi permasalahan tersebut, upaya seperti promosi alat tangkap ramah lingkungan, peningkatan pengelolaan perikanan, serta pengembangan strategi pemulihan ekonomi jangka pendek dan jangka panjang",

     
  }
};

function setLanguage(lang) {
  document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[lang][key]) element.innerHTML = translations[lang][key];
  });
  document.documentElement.lang = lang;
  localStorage.setItem('language', lang);
  // Highlight active flag
  document.querySelectorAll('.language-selector img').forEach(img => {
      img.classList.toggle('active', img.getAttribute('onclick') === `setLanguage('${lang}')`);
  });
}

// Apply saved or default language on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language') || 'en';
  setLanguage(savedLang);
});