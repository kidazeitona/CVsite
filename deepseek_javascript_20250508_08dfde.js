// script.js
document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');

    // Drag & Drop handlers
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        [...files].forEach(file => {
            if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const mediaElement = file.type.startsWith('image/') 
                    ? `<img src="${e.target.result}" alt="Uploaded media">`
                    : `<video controls><source src="${e.target.result}"></video>`;
                
                preview.innerHTML += mediaElement;
            }
            reader.readAsDataURL(file);
        });
    }
});