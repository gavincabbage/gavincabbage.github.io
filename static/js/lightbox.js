document.addEventListener('DOMContentLoaded', function() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightboxLinks = Array.from(document.querySelectorAll('.lightbox-link'));
  let currentIndex = 0;
  let isGalleryMode = false;

  function closeLightbox() {
    lightbox.classList.remove('active');
  }

  function showImage(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].href;
  }

  function openGallery(index) {
    isGalleryMode = true;
    showImage(index);
    lightbox.classList.add('active', 'gallery-mode');
  }

  function openSingle(src) {
    isGalleryMode = false;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    lightbox.classList.remove('gallery-mode');
  }

  // Gallery items
  galleryItems.forEach(function(item, index) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      openGallery(index);
    });
  });

  // Standalone lightbox links
  lightboxLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      openSingle(link.href);
    });
  });

  // Close button
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeLightbox();
  });

  // Navigation buttons
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (isGalleryMode) showImage(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (isGalleryMode) showImage(currentIndex + 1);
  });

  // Click on backdrop closes
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (isGalleryMode && e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    } else if (isGalleryMode && e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    }
  });

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    if (!isGalleryMode) return;
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
      showImage(currentIndex + 1);
    } else if (diff < -swipeThreshold) {
      showImage(currentIndex - 1);
    }
  }
});
