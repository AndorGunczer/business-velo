const logosContainer = document.querySelector('.logos');
const images = Array.from(document.querySelectorAll('.logos-slide img')); // Convert NodeList to Array
window.addEventListener('load', function () {
    if (logosContainer == null) {
        console.error("FATAL: logosContainer is NULL");
        return;
    }
    // Scroll to the middle of the container
    logosContainer.scrollLeft = (logosContainer.scrollWidth - logosContainer.clientWidth) / 2;
});
function imageCarousel() {
    const defaultIMGSize = 192;
    const minScale = 0.5; // 50% of the default size at the edges
    const maxScale = 1; // 100% of the default size at the center
    const scrollContainer = document.getElementById('scroll-container'); // The horizontally scrolling section
    if (!scrollContainer)
        return;
    // Function to scale images based on position relative to the center of the scroll container
    const scaleImages = () => {
        const containerCenter = scrollContainer.offsetWidth / 2;
        const scrollOffset = scrollContainer.scrollLeft;
        images.forEach((img) => {
            // console.log(`IMAGE: ${img}`);
            let positionOfImg = img.getBoundingClientRect();
            const containerRect = scrollContainer.getBoundingClientRect();
            const imgCenter = (positionOfImg.left + positionOfImg.width / 2) - (containerRect.left); //+ scrollOffset
            // Calculate offset from the container's center
            const offsetFromCenter = Math.abs(containerCenter - imgCenter);
            // console.log(`OFFSET FROM CENTER: ${offsetFromCenter}`);
            const maxDistance = scrollContainer.offsetWidth / 2; // Max possible distance from center
            // console.log(`MAX DISTANCE: ${maxDistance}`);
            // Calculate scaling factor based on the offset
            let scaleFactor = maxScale - (offsetFromCenter / maxDistance) * (maxScale - minScale);
            // console.log(scaleFactor);
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
    window.addEventListener('load', scaleImages);
}
// Call the carousel function on page load
imageCarousel();
