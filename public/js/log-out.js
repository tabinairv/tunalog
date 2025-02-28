document.getElementById('logoutButton').addEventListener('click', async () => {
  try {
      const response = await fetch('/logout', {
          method: 'POST',
          credentials: 'include'
      }); 
      if (response.ok) {
          window.location.href = '/';
      } else {
          const data = await response.json();
          document.getElementById('errorMessage').textContent = data.message;
          document.getElementById('errorMessage').style.display = 'block';
      }
  } catch (error) {
      console.error('Logout error:', error);
  }
});