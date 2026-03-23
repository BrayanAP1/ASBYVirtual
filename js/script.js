let index = 0;

const imagenes = document.querySelectorAll(".imagenesOfertasYProductos img")

function mostrarImagen(i){
    imagenes.forEach(img => img.classList.remove("active"));
    imagenes[i].classList.add("active");
}

document.querySelector(".siguiente").addEventListener("click",()=>{
    index=(index + 1) % imagenes.length;
    mostrarImagen(index);
});

document.querySelector(".anterior").addEventListener("click", ()=>{
    index = (index - 1 + imagenes.length) % imagenes.length;
    mostrarImagen(index);
});

setInterval(()=>{
    index = (index + 1)% imagenes.length;
    mostrarImagen(index);
},3500) 