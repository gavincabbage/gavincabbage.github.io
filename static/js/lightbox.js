document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightboxLinks = Array.from(document.querySelectorAll('.lightbox-link'));
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].href;
  }

  galleryItems.forEach(function(item, index) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      showImage(index);
      lightbox.classList.add('active');
    });
  });

  // Standalone lightbox links (no navigation between them)
  lightboxLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      lightboxImg.src = link.href;
      lightbox.classList.add('active');
    });
  });

  lightbox.addEventListener('click', function() {
    lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
    } else if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    }
  });
});
