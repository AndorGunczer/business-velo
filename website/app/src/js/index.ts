const logosContainer = document.querySelector('.logos');
const images = Array.from(document.querySelectorAll('.logos-slide img')); // Convert NodeList to Array

window.addEventListener('load', function() {
    if (logosContainer == null) {
        console.error("FATAL: logosContainer is NULL");
        return;
    }
    // Scroll to the middle of the container
    logosContainer.scrollLeft = (logosContainer.scrollWidth - logosContainer.clientWidth) / 2;
});

function highlightCenterImage() {
    if (logosContainer == null) {
        console.error("FATAL: logosContainer is NULL");
        return;
    }

    // Check if all elements in 'images' are HTMLElements
    if (!images.every(img => img instanceof HTMLElement)) {
        console.error("FATAL: Not all images are HTMLElement.");
        return;
    }

    const containerCenter = logosContainer.scrollLeft + logosContainer.clientWidth / 2;
    
    let closestImage = null;
    let closestDistance = Infinity;
    let closestIndex = -1;

    // Find the image closest to the center
    images.forEach((img, index) => {

        const imgCenter = img.offsetLeft + img.clientWidth / 2;
        const distance = Math.abs(containerCenter - imgCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestImage = img;
            closestIndex = index; // Store the index of the closest image
        }
    });

    // Remove active and near-active classes from all images
    images.forEach((img) => {
        img.classList.remove('active');
        img.classList.remove('near-active');
    });

    // Add active class to the closest image
    if (closestImage instanceof HTMLElement) {
        closestImage.classList.add('active');
    }

    // Add near-active class to the two images next to the center image
    if (closestIndex > 0) { // Check for previous image
        const prevImage = images[closestIndex - 1];
        if (prevImage instanceof HTMLElement) {
            prevImage.classList.add('near-active'); // Previous image
        }
    }

    if (closestIndex < images.length - 1) { // Check for next image
        const nextImage = images[closestIndex + 1];
        if (nextImage instanceof HTMLElement) {
            nextImage.classList.add('near-active'); // Next image
        }
    }
}

if (logosContainer == null) {
    console.error("FATAL: logosContainer is NULL");
} else {
    logosContainer.addEventListener('scroll', highlightCenterImage);
}

// Call the function once on page load to initialize
window.addEventListener('load', highlightCenterImage);
