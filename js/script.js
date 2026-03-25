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



/* Modulo de Productos Array de datos + filtros + ordenamiento */

const productos = [
  {
    id: 1,
    nombre: "Acetaminofén 500mg x 10 tab",
    categoria: "medicamentos",
    marca: "Genfar",
    precio: 4500,
    precioAntes: 5200,
    stock: true,
    destacado: true,
    nuevo: false,
    imagen: "img/productos/acetaminofen.png",
    descripcion: "Analgésico y antipirético"
  },
  {
    id: 2,
    nombre: "Vitamina C 1000mg x 30 tab",
    categoria: "vitaminas",
    marca: "MK",
    precio: 18900,
    precioAntes: null,
    stock: true,
    destacado: true,
    nuevo: true,
    imagen: "img/productos/vitamina-c.png",
    descripcion: "Refuerza el sistema inmune"
  },
  {
    id: 3,
    nombre: "Ibuprofeno 400mg x 10 tab",
    categoria: "medicamentos",
    marca: "La Santé",
    precio: 5800,
    precioAntes: 7000,
    stock: true,
    destacado: false,
    nuevo: false,
    imagen: "img/productos/ibuprofeno.png",
    descripcion: "Antiinflamatorio y analgésico"
  },
  {
    id: 4,
    nombre: "Protector solar SPF 50+",
    categoria: "cuidado-personal",
    marca: "Nivea",
    precio: 35000,
    precioAntes: null,
    stock: false,
    destacado: false,
    nuevo: false,
    imagen: "img/productos/protector-solar.png",
    descripcion: "Protección UVA/UVB diaria"
  },
  {
    id: 5,
    nombre: "Omega 3 x 60 cápsulas",
    categoria: "vitaminas",
    marca: "MK",
    precio: 28500,
    precioAntes: 32000,
    stock: true,
    destacado: true,
    nuevo: false,
    imagen: "img/productos/omega3.png",
    descripcion: "Salud cardiovascular"
  },
  {
    id: 6,
    nombre: "Alcohol antiséptico 500ml",
    categoria: "cuidado-personal",
    marca: "Isagel",
    precio: 9800,
    precioAntes: null,
    stock: true,
    destacado: false,
    nuevo: false,
    imagen: "img/productos/alcohol.png",
    descripcion: "Desinfección y antisepsia"
  },
  {
    id: 7,
    nombre: "Loratadina 10mg x 10 tab",
    categoria: "medicamentos",
    marca: "Genfar",
    precio: 3200,
    precioAntes: null,
    stock: true,
    destacado: false,
    nuevo: false,
    imagen: "img/productos/loratadina.png",
    descripcion: "Antihistamínico para alergias"
  },
  {
    id: 8,
    nombre: "Multivitamínico Centrum x 30",
    categoria: "vitaminas",
    marca: "Centrum",
    precio: 45000,
    precioAntes: 52000,
    stock: true,
    destacado: true,
    nuevo: false,
    imagen: "img/productos/centrum.png",
    descripcion: "Vitaminas y minerales esenciales"
  },
  {
    id: 9,
    nombre: "Crema hidratante corporal 400ml",
    categoria: "cuidado-personal",
    marca: "Nivea",
    precio: 22000,
    precioAntes: null,
    stock: true,
    destacado: false,
    nuevo: true,
    imagen: "img/productos/crema-hidratante.png",
    descripcion: "Hidratación profunda 48h"
  },
  {
    id: 10,
    nombre: "Amoxicilina 500mg x 21 cap",
    categoria: "medicamentos",
    marca: "La Santé",
    precio: 18500,
    precioAntes: 21000,
    stock: true,
    destacado: false,
    nuevo: false,
    imagen: "img/productos/amoxicilina.png",
    descripcion: "Antibiótico de amplio espectro"
  },
  {
    id: 11,
    nombre: "Suero oral 500ml",
    categoria: "medicamentos",
    marca: "Genfar",
    precio: 4200,
    precioAntes: null,
    stock: true,
    destacado: false,
    nuevo: false,
    imagen: "img/productos/suero-oral.png",
    descripcion: "Rehidratación oral"
  },
  {
    id: 12,
    nombre: "Colágeno hidrolizado x 60 tab",
    categoria: "vitaminas",
    marca: "MK",
    precio: 38000,
    precioAntes: 44000,
    stock: false,
    destacado: true,
    nuevo: false,
    imagen: "img/productos/colageno.png",
    descripcion: "Salud articular y de piel"
  }
];

/* =============================================
   RANGO DE PRECIO (se calcula automáticamente)
   ============================================= */
const PRECIO_MIN = Math.min(...productos.map(p => p.precio));
const PRECIO_MAX = Math.max(...productos.map(p => p.precio));

/* =============================================
   ESTADO DE FILTROS
   ============================================= */
let filtros = {
  categoria: "todos",
  marca: "todas",
  soloEnStock: false,
  precioMin: PRECIO_MIN,
  precioMax: PRECIO_MAX,
  orden: "destacados"
};

/* =============================================
   FORMATEAR MONEDA COP
   ============================================= */
function formatPrecio(valor) {
  return "$" + valor.toLocaleString("es-CO");
}

/* =============================================
   RENDERIZAR PRODUCTOS
   ============================================= */
function renderizarProductos() {
  const grid = document.getElementById("productos-grid");
  const contador = document.getElementById("productos-contador");
  if (!grid) return;

  // 1. Filtrar
  let resultado = productos.filter(p => {
    if (filtros.categoria !== "todos" && p.categoria !== filtros.categoria) return false;
    if (filtros.marca !== "todas" && p.marca !== filtros.marca) return false;
    if (filtros.soloEnStock && !p.stock) return false;
    if (p.precio < filtros.precioMin || p.precio > filtros.precioMax) return false;
    return true;
  });

  // 2. Ordenar
  resultado.sort((a, b) => {
    switch (filtros.orden) {
      case "precio-asc":  return a.precio - b.precio;
      case "precio-desc": return b.precio - a.precio;
      case "nombre-az":   return a.nombre.localeCompare(b.nombre, "es");
      case "nuevos":      return (b.nuevo ? 1 : 0) - (a.nuevo ? 1 : 0);
      case "destacados":
      default:            return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0);
    }
  });

  // 3. Actualizar contador
  if (contador) {
    contador.textContent = resultado.length + " producto" + (resultado.length !== 1 ? "s" : "");
  }

  // 4. Sin resultados
  if (resultado.length === 0) {
    grid.innerHTML = `
      <div class="productos-vacio">
        <div class="productos-vacio-icon">🔍</div>
        <p>No encontramos productos con esos filtros.</p>
        <button onclick="limpiarFiltros()">Limpiar filtros</button>
      </div>`;
    return;
  }

  // 5. Renderizar tarjetas
  grid.innerHTML = resultado.map(p => {
    const pct = p.precioAntes ? Math.round((1 - p.precio / p.precioAntes) * 100) : 0;
    const badgeDescuento = p.precioAntes
      ? `<span class="producto-badge producto-badge--descuento">-${pct}%</span>` : "";
    const badgeNuevo = p.nuevo
      ? `<span class="producto-badge producto-badge--nuevo">Nuevo</span>` : "";
    const badgeAgotado = !p.stock
      ? `<span class="producto-badge producto-badge--agotado">Agotado</span>` : "";
    const precioAntes = p.precioAntes
      ? `<span class="producto-precio-antes">${formatPrecio(p.precioAntes)}</span>` : "";

    return `
      <div class="producto-card${!p.stock ? " agotado" : ""}">
        <div class="producto-badges">
          ${badgeDescuento}${badgeNuevo}${badgeAgotado}
        </div>
        <div class="producto-imagen">
          <img
            src="${p.imagen}"
            alt="${p.nombre}"
            loading="lazy"
            onerror="this.src='img/producto-default.png'; this.onerror=null;"
          >
        </div>
        <div class="producto-info">
          <span class="producto-marca">${p.marca}</span>
          <h3 class="producto-nombre">${p.nombre}</h3>
          <p class="producto-descripcion">${p.descripcion}</p>
          <div class="producto-precios">
            ${precioAntes}
            <span class="producto-precio">${formatPrecio(p.precio)}</span>
          </div>
          <button
            class="producto-btn-agregar"
            ${!p.stock ? "disabled" : ""}
            onclick="agregarAlCarrito(${p.id})"
          >
            ${p.stock ? "Agregar al carrito" : "No disponible"}
          </button>
        </div>
      </div>`;
  }).join("");
}

/* =============================================
   FILTRO: CATEGORÍA
   ============================================= */
function aplicarFiltroCategoria(valor) {
  filtros.categoria = valor;
  document.querySelectorAll(".filtro-cat-btn").forEach(btn => {
    btn.classList.toggle("activo", btn.dataset.valor === valor);
  });
  renderizarProductos();
}

/* =============================================
   FILTRO: MARCA
   ============================================= */
function aplicarFiltroMarca(valor) {
  filtros.marca = valor;
  renderizarProductos();
}

/* =============================================
   FILTRO: SOLO EN STOCK
   ============================================= */
function aplicarFiltroStock(checked) {
  filtros.soloEnStock = checked;
  renderizarProductos();
}

/* =============================================
   FILTRO: RANGO DE PRECIO
   ============================================= */
function aplicarFiltroPrecio() {
  const min = parseInt(document.getElementById("precio-min").value);
  const max = parseInt(document.getElementById("precio-max").value);
  // Asegurar que min <= max
  if (min > max) {
    document.getElementById("precio-min").value = max;
    filtros.precioMin = max;
  } else {
    filtros.precioMin = min;
  }
  filtros.precioMax = max;
  actualizarLabelsPrecio();
  renderizarProductos();
}

function actualizarLabelsPrecio() {
  const labelMin = document.getElementById("label-precio-min");
  const labelMax = document.getElementById("label-precio-max");
  if (labelMin) labelMin.textContent = formatPrecio(filtros.precioMin);
  if (labelMax) labelMax.textContent = formatPrecio(filtros.precioMax);
}

/* =============================================
   ORDENAMIENTO
   ============================================= */
function aplicarOrden(valor) {
  filtros.orden = valor;
  renderizarProductos();
}

/* =============================================
   LIMPIAR TODOS LOS FILTROS
   ============================================= */
function limpiarFiltros() {
  filtros = {
    categoria: "todos",
    marca: "todas",
    soloEnStock: false,
    precioMin: PRECIO_MIN,
    precioMax: PRECIO_MAX,
    orden: "destacados"
  };

  const selMarca  = document.getElementById("filtro-marca");
  const selOrden  = document.getElementById("filtro-orden");
  const chkStock  = document.getElementById("filtro-stock");
  const sliderMin = document.getElementById("precio-min");
  const sliderMax = document.getElementById("precio-max");

  if (selMarca)  selMarca.value  = "todas";
  if (selOrden)  selOrden.value  = "destacados";
  if (chkStock)  chkStock.checked = false;
  if (sliderMin) sliderMin.value = PRECIO_MIN;
  if (sliderMax) sliderMax.value = PRECIO_MAX;

  actualizarLabelsPrecio();
  aplicarFiltroCategoria("todos");
}

/* =============================================
   CARRITO (básico — conecta con tu lógica)
   ============================================= */
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto || !producto.stock) return;

  // --- Conecta aquí con tu sistema de carrito ---
  console.log("Agregado:", producto.nombre, "·", formatPrecio(producto.precio));

  // Animación del badge en navbar
  const badge = document.querySelector(".nav-cart-badge");
  if (badge) {
    const actual = parseInt(badge.textContent) || 0;
    badge.textContent = actual + 1;
    badge.classList.remove("badge-pulso");
    void badge.offsetWidth; // reflow para reiniciar animación
    badge.classList.add("badge-pulso");
    setTimeout(() => badge.classList.remove("badge-pulso"), 400);
  }

  // Feedback visual en el botón
  const card = document.querySelector(`.producto-card:nth-child(${productos.findIndex(p => p.id === id) + 1})`);
  const btn = event && event.target;
  if (btn) {
    const textoOriginal = btn.textContent;
    btn.textContent = "✓ Agregado";
    btn.style.background = "#1b5e20";
    setTimeout(() => {
      btn.textContent = textoOriginal;
      btn.style.background = "";
    }, 1500);
  }
}

/* =============================================
   BÚSQUEDA DESDE EL NAVBAR
   ============================================= */
function buscar() {
  const input = document.getElementById("busqueda");
  if (!input) return;
  const termino = input.value.trim().toLowerCase();
  if (!termino) {
    renderizarProductos();
    return;
  }

  const grid = document.getElementById("productos-grid");
  const contador = document.getElementById("productos-contador");

  const resultado = productos.filter(p =>
    p.nombre.toLowerCase().includes(termino) ||
    p.descripcion.toLowerCase().includes(termino) ||
    p.marca.toLowerCase().includes(termino) ||
    p.categoria.toLowerCase().includes(termino)
  );

  if (contador) contador.textContent = resultado.length + " resultado" + (resultado.length !== 1 ? "s" : "");

  // Scroll suave a la sección de productos
  const seccion = document.getElementById("seccion-productos");
  if (seccion) seccion.scrollIntoView({ behavior: "smooth", block: "start" });

  if (resultado.length === 0) {
    grid.innerHTML = `
      <div class="productos-vacio">
        <div class="productos-vacio-icon">🔍</div>
        <p>No hay resultados para "<strong>${termino}</strong>".</p>
        <button onclick="limpiarBusqueda()">Ver todos los productos</button>
      </div>`;
    return;
  }

  grid.innerHTML = resultado.map(p => {
    const pct = p.precioAntes ? Math.round((1 - p.precio / p.precioAntes) * 100) : 0;
    const badgeDescuento = p.precioAntes
      ? `<span class="producto-badge producto-badge--descuento">-${pct}%</span>` : "";
    const badgeAgotado = !p.stock
      ? `<span class="producto-badge producto-badge--agotado">Agotado</span>` : "";
    const precioAntes = p.precioAntes
      ? `<span class="producto-precio-antes">${formatPrecio(p.precioAntes)}</span>` : "";

    // Resaltar término de búsqueda en el nombre
    const nombreResaltado = p.nombre.replace(
      new RegExp(`(${termino})`, "gi"),
      '<mark>$1</mark>'
    );

    return `
      <div class="producto-card${!p.stock ? " agotado" : ""}">
        <div class="producto-badges">${badgeDescuento}${badgeAgotado}</div>
        <div class="producto-imagen">
          <img src="${p.imagen}" alt="${p.nombre}" loading="lazy"
            onerror="this.src='img/producto-default.png'; this.onerror=null;">
        </div>
        <div class="producto-info">
          <span class="producto-marca">${p.marca}</span>
          <h3 class="producto-nombre">${nombreResaltado}</h3>
          <p class="producto-descripcion">${p.descripcion}</p>
          <div class="producto-precios">
            ${precioAntes}
            <span class="producto-precio">${formatPrecio(p.precio)}</span>
          </div>
          <button class="producto-btn-agregar" ${!p.stock ? "disabled" : ""}
            onclick="agregarAlCarrito(${p.id})">
            ${p.stock ? "Agregar al carrito" : "No disponible"}
          </button>
        </div>
      </div>`;
  }).join("");
}

function limpiarBusqueda() {
  const input = document.getElementById("busqueda");
  if (input) input.value = "";
  renderizarProductos();
}

/* =============================================
   INICIALIZAR
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar sliders de precio con los valores reales
  const sliderMin = document.getElementById("precio-min");
  const sliderMax = document.getElementById("precio-max");
  if (sliderMin) { sliderMin.min = PRECIO_MIN; sliderMin.max = PRECIO_MAX; sliderMin.value = PRECIO_MIN; }
  if (sliderMax) { sliderMax.min = PRECIO_MIN; sliderMax.max = PRECIO_MAX; sliderMax.value = PRECIO_MAX; }
  actualizarLabelsPrecio();

  // Render inicial
  renderizarProductos();

  // Búsqueda también con Enter
  const inputBusqueda = document.getElementById("busqueda");
  if (inputBusqueda) {
    inputBusqueda.addEventListener("keydown", e => {
      if (e.key === "Enter") buscar();
    });

    
  }
  
});

