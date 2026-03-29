document.querySelectorAll('.carruselOfertasYProductos, .informacionRapidaEImportante').forEach(carrusel => {
    const imagenes = carrusel.querySelectorAll('img');
    let i = 0;

    carrusel.querySelector('.siguiente').addEventListener('click', () => {
        imagenes[i].classList.remove('active');
        i = (i + 1) % imagenes.length;
        imagenes[i].classList.add('active');
    });

    carrusel.querySelector('.anterior').addEventListener('click', () => {
        imagenes[i].classList.remove('active');
        i = (i - 1 + imagenes.length) % imagenes.length;
        imagenes[i].classList.add('active');
    });

    // intervalo de tiempo para cambiar imagenes en automatico
    setInterval(() => {
        imagenes[i].classList.remove('active');
        i = (i + 1) % imagenes.length;
        imagenes[i].classList.add('active');
    }, 3000);
});
