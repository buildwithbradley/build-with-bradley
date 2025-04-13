// /js/navbar-loader.js

const isInPagesFolder = window.location.pathname.includes('/pages/');
const prefix = isInPagesFolder ? '../' : '';

fetch(`${prefix}elements/navbar.html`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data;

    // Adjust <a href> and <img src> paths
    tempDiv.querySelectorAll('a, img').forEach(el => {
      const attr = el.tagName === 'IMG' ? 'src' : 'href';
      const value = el.getAttribute(attr);
      if (value && !value.startsWith('http') && !value.startsWith('#')) {
        el.setAttribute(attr, prefix + value);
      }
    });

    document.getElementById('navbar').innerHTML = tempDiv.innerHTML;
  })
  .catch(error => {
    console.error('Error loading navbar:', error);
  });
