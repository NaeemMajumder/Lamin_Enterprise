// image upload limit
const form = document.getElementById('uploadForm');
const fileInput = document.getElementById('image');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function (event) {
    errorMessage.style.display = 'none';
    const { files } = fileInput, maxFiles = 10, maxSize = 20 * 1024 * 1024;

    if (files.length > maxFiles || [...files].reduce((a, f) => a + f.size, 0) > maxSize) {
        errorMessage.textContent = `You can upload up to ${maxFiles} images, total size under 20MB.`;
        errorMessage.style.display = 'block';
        event.preventDefault();
    }
});