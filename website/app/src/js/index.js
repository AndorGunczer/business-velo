window.addEventListener('load', function() {
    const logosContainer = document.querySelector('.logos');
    // Scroll to the middle of the container
    logosContainer.scrollLeft = (logosContainer.scrollWidth - logosContainer.clientWidth) / 2;
});

const logosContainer = document.querySelector('.logos');
const images = document.querySelectorAll('.logos-slide img');

function highlightCenterImage() {
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
    if (closestImage) {
        closestImage.classList.add('active');
    }

    // Add near-active class to the two images next to the center image
    if (closestIndex > 0) {
        images[closestIndex - 1].classList.add('near-active'); // Previous image
    }
    if (closestIndex < images.length - 1) {
        images[closestIndex + 1].classList.add('near-active'); // Next image
    }
}

// Call the function when the user scrolls
logosContainer.addEventListener('scroll', highlightCenterImage);

// Call the function once on page load to initialize
window.addEventListener('load', highlightCenterImage);
