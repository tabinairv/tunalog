//search bar
const data = [
  { name: 'PPS Nizam Zachman', path: 'guest-nizam.html' },
  { name: 'PU Benoa', path: 'guest-benoa.html' },
  { name: 'PPN Palabuhanratu', path: 'guest-palabuhan.html' },
  { name: 'PPS Cilacap', path: 'guest-cilacap.html' },
  { name: 'PPN Prigi', path: 'guest-prigi.html' },
  { name: 'PPP Pondok Dadap', path: 'guest-pondok-dadap.html' },
  { name: 'PPP Labuhan Lombok', path: 'guest-labuhan-lombok.html' },
  { name: 'IOTC', path: 'guest-iotc.html' },
  { name: 'CCSBT', path: 'guest-ccsbt.html' },
  { name: 'WCPFC', path: 'guest-wcpfc.html' } 
];

function searchFunction() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const searchResults = document.getElementById('search-results');

  if (!query) {
    searchResults.style.display = 'none';
    return;
  }

  const results = data.filter(item => item.name.toLowerCase().includes(query));

  if (results.length > 0) {
    searchResults.innerHTML = results.map(item => 
      `<p onclick="selectResult('${item.path}')">${item.name}</p>`
    ).join('');
    searchResults.style.display = 'block';
  } else {
    searchResults.innerHTML = '<p>No results found</p>';
    searchResults.style.display = 'block';
  }
}

function selectResult(path) {
  window.location.href = path;
}

document.getElementById('search-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const firstResult = document.querySelector('#search-results p');
    if (firstResult) {
      firstResult.click();
    }
  }
});
