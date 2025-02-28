const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const header = document.querySelector('.header');
const userIcons = document.querySelector('.user-icons');
const leftSection = document.querySelector('.left-section');
const toggleButton = document.createElement('button');
toggleButton.innerHTML = '<i class="fas fa-angle-left"></i>';
toggleButton.classList.add('toggle-btn');
sidebar.prepend(toggleButton);

// Menambahkan referensi ke container dan stock-status
const container = document.querySelector('.container');
const stockGrid = document.querySelector('.status-grid');

// Menambahkan event listener untuk tombol collapse
toggleButton.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  const collapsed = sidebar.classList.contains('collapsed');
  const sidebarWidth = collapsed ? '60px' : '250px';

  // Mengatur margin dan lebar elemen lain sesuai perubahan sidebar
  mainContent.style.marginLeft = sidebarWidth;
  header.style.left = sidebarWidth;
  header.style.width = `calc(100% - ${sidebarWidth})`;
  userIcons.style.marginLeft = leftSection.offsetWidth + 'px';

  // Mengubah jumlah kolom di container berdasarkan status collapse sidebar
  if (collapsed) {
    // Sidebar collapse, set 4 kolom untuk container utama
    container.style.gridTemplateColumns = 'repeat(4, 1fr)';
    // Mengatur jumlah kolom di stock-status menjadi 5 kolom
    stockGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';
  } else {
    // Sidebar kembali normal, set 3 kolom untuk container utama
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
    // Mengatur jumlah kolom di stock-status menjadi 4 kolom
    stockGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
  }

  // Mengubah ikon toggle sesuai dengan status collapse
  toggleButton.innerHTML = collapsed ? '<i class="fas fa-angle-right"></i>' : '<i class="fas fa-angle-left"></i>';
});
