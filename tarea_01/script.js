document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM cargado');
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel img');
    console.log('Número de imágenes:', images.length);
    const totalImages = images.length;

    function showNextImage() {
        console.log('Cambiando imagen');
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
    }

    // Mostrar la primera imagen
    images[currentIndex].classList.add('active');

    // Cambiar la imagen cada 3 segundos
    setInterval(showNextImage, 3000);
});
