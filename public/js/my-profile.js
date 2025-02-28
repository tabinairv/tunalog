// Fungsi untuk mengambil data pengguna dari localStorage
function getUserData() {
  const user = JSON.parse(localStorage.getItem('user'));  // Ambil data pengguna dari localStorage
  return user;
}

// Fungsi untuk mengisi form dengan data pengguna
function populateProfileForm() {
  const user = getUserData();  // Ambil data pengguna

  if (user) {
      // Isi field form dengan data pengguna
      document.getElementById('email').value = user.email || ''; 
      
  } else {
      console.log('No user data found in localStorage');
  }
}

// Isi form saat halaman dimuat
window.onload = populateProfileForm;
