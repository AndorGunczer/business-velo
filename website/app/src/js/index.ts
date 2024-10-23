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

function imageCarousel() {
    const defaultIMGSize: number = 192;
    const minScale: number = 0.5; // 50% of the default size at the edges
    const maxScale: number = 1; // 100% of the default size at the center
    const scrollContainer = document.getElementById('scroll-container'); // The horizontally scrolling section

    if (!scrollContainer) return;

    // Function to scale images based on position relative to the center of the scroll container
    const scaleImages = () => {
        const containerCenter = scrollContainer.offsetWidth / 2;

        images.forEach((img) => {
            let positionOfImg = img.getBoundingClientRect();
            const containerRect = scrollContainer.getBoundingClientRect();
            const imgCenter = (positionOfImg.left + positionOfImg.width / 2) - containerRect.left;
            
            // Calculate offset from the container's center
            const offsetFromCenter = Math.abs(containerCenter - imgCenter);
            const maxDistance = scrollContainer.offsetWidth / 2; // Max possible distance from center
            
            // Calculate scaling factor based on the offset
            let scaleFactor = maxScale - (offsetFromCenter / maxDistance) * (maxScale - minScale);

            // Ensure scale factor stays within the minScale and maxScale range
            scaleFactor = Math.max(minScale, Math.min(maxScale, scaleFactor));

            // Apply scaling to the image size
            const scaledSize = defaultIMGSize * scaleFactor;
            img.style.width = `${scaledSize}px`;
            img.style.height = `${scaledSize}px`;
        });
    };

    // Initial scaling of images
    scaleImages();

    // Event listener for container's horizontal scroll to dynamically adjust images
    scrollContainer.addEventListener('scroll', scaleImages);
    window.addEventListener('resize', scaleImages);
}

// Call the carousel function on page load
imageCarousel();


// function highlightCenterImage() {
//     if (logosContainer == null) {
//         console.error("FATAL: logosContainer is NULL");
//         return;
//     }

//     // Check if all elements in 'images' are HTMLElements
//     if (!images.every(img => img instanceof HTMLElement)) {
//         console.error("FATAL: Not all images are HTMLElement.");
//         return;
//     }

//     const containerCenter = logosContainer.scrollLeft + logosContainer.clientWidth / 2;
    
//     let closestImage = null;
//     let closestDistance = Infinity;
//     let closestIndex = -1;

//     // Find the image closest to the center
//     images.forEach((img, index) => {

//         const imgCenter = img.offsetLeft + img.clientWidth / 2;
//         const distance = Math.abs(containerCenter - imgCenter);

//         if (distance < closestDistance) {
//             closestDistance = distance;
//             closestImage = img;
//             closestIndex = index; // Store the index of the closest image
//         }
//     });

//     // Remove active and near-active classes from all images
//     images.forEach((img) => {
//         img.classList.remove('active');
//         img.classList.remove('near-active');
//     });

//     // Add active class to the closest image
//     if (closestImage instanceof HTMLElement) {
//         closestImage.classList.add('active');
//     }

//     // Add near-active class to the two images next to the center image
//     if (closestIndex > 0) { // Check for previous image
//         const prevImage = images[closestIndex - 1];
//         if (prevImage instanceof HTMLElement) {
//             prevImage.classList.add('near-active'); // Previous image
//         }
//     }

//     if (closestIndex < images.length - 1) { // Check for next image
//         const nextImage = images[closestIndex + 1];
//         if (nextImage instanceof HTMLElement) {
//             nextImage.classList.add('near-active'); // Next image
//         }
//     }
// }

// if (logosContainer == null) {
//     console.error("FATAL: logosContainer is NULL");
// } else {
//     logosContainer.addEventListener('scroll', highlightCenterImage);
// }

// // Call the function once on page load to initialize
// window.addEventListener('load', highlightCenterImage);
