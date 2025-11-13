/* ===== FONDO MATRIX ===== */
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Ajustar tamaño inicial
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Etiquetas aleatorias
const etiquetas = [
  "<html>",
  "<body>",
  "<div>",
  "<p>",
  "<script>",
  "<h1>",
  "<span>",
  "let",
  "const",
  "return",
  "function()",
  "</div>",
  "</html>",
  "<?php",
  "echo",
  "$variable",
  "mysqli_connect",
  "SELECT",
  "INSERT",
  "UPDATE",
  "class",
  "require",
  "foreach",
  "if()",
  "endif;",
];

const fontSize = 30;
let columns = Math.floor(canvas.width / fontSize);

// Posiciones iniciales aleatorias
let drops = Array.from({ length: columns }, () =>
  Math.random() * (canvas.height / fontSize)
);

// Velocidades aleatorias por columna
let speeds = Array.from({ length: columns }, () => Math.random() * 0.3 + 0.1);

// Función principal de dibujo
function drawMatrix() {
  ctx.fillStyle = "#8dffe605";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#00ffaa");
  gradient.addColorStop(0.5, "#00ddff");
  gradient.addColorStop(1, "#6cd98b");
  ctx.fillStyle = gradient;
  ctx.font = fontSize + "px Consolas";
  ctx.shadowColor = "rgba(0,0,0,0.8)";
  ctx.shadowBlur = 8;

  for (let i = 0; i < drops.length; i++) {
    const text = etiquetas[Math.floor(Math.random() * etiquetas.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reinicia algunas gotas al azar
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i] += speeds[i];
  }
}

// Redibujar cada 50ms
setInterval(drawMatrix, 50);

// Reajustar al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () =>
    Math.random() * (canvas.height / fontSize)
  );
  speeds = Array.from({ length: columns }, () => Math.random() * 0.3 + 0.1);
});


///* ===== CAROUSEL ===== */
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".carousel img");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  let current = 0;
  let interval;

  function showImage(index) {
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }

  function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  }

  prev.addEventListener("click", () => {
    prevImage();
    resetAutoplay();
  });

  next.addEventListener("click", () => {
    nextImage();
    resetAutoplay();
  });

  // Autoplay
  function startAutoplay() {
    interval = setInterval(nextImage, 10000); // cambia cada 10 segundos
  }

  function resetAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }

  // Zoom inicial luego de cargar la página
  window.addEventListener("load", () => {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;
    setTimeout(() => {
      carousel.classList.add("ready");
      startAutoplay(); // inicia autoplay una vez cargada la imagen inicial
    }, 200); // pequeño delay para que cargue la primera imagen
  });
});


/* ===== ANIMACION CARDS ===== 
function animateCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      if (window.innerWidth > 768) {
        card.style.opacity = "1";
        card.style.transform =
          index % 2 === 0 ? "translateX(-30px)" : "translateX(30px)";
        setTimeout(() => {
          card.style.transform = "translateX(0)";
        }, 150 * index);
      } else {
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
      }
    }
  });
}
window.addEventListener("scroll", animateCards);
window.addEventListener("load", animateCards);

*/

/* ===== MODAL VIDEO ===== */
const modal = document.getElementById("videoModal");
const container = document.getElementById("videoContainer");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const videoSrc = card.dataset.video;
    if (videoSrc.endsWith(".mp4")) {
      container.innerHTML = `<video src="${videoSrc}" controls autoplay></video>`;
    } else {
      container.innerHTML = `<iframe src="${videoSrc}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    }
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Evita scroll en el fondo
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  container.innerHTML = "";
  document.body.style.overflow = ""; // Restaura scroll
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    container.innerHTML = "";
    document.body.style.overflow = ""; // Restaura scroll
  }
});

// Cierra con tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
    container.innerHTML = "";
    document.body.style.overflow = "";
  }
});

const topButton = document.querySelector(".top-button");

window.addEventListener("scroll", () => {
  topButton.classList.toggle("show", window.scrollY > 0);
});

document.addEventListener("DOMContentLoaded", async () => {
  const years = document.querySelectorAll(".projects .year"); // Selecciona todas las etiquetas .year
  const grids = document.querySelectorAll(".projects .container"); // Selecciona todos los contenedores

  // Configuramos las rutas en el mismo orden que en el HTML
  const rutas = [
    "../data/cuarto/cuarto.json",
    "../data/quinto/quinto.json",
    "../data/sexto/sexto.json",
    "../data/septimo/septimo.json",
  ];

  for (let i = 0; i < rutas.length; i++) {
    const yearTitle = years[i];
    const grid = grids[i];
    const url = rutas[i];

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error al cargar: ${url}`);
      }

      const data = await response.json();

      // Si no hay proyectos, ocultamos el título y el contenedor
      if (!data || data.length === 0) {
        yearTitle.style.display = "none";
        grid.style.display = "none";
        continue;
      }

      // Si hay proyectos, los agregamos
      data.forEach((project) => {
        const link = document.createElement("a");
        link.href = project.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.innerHTML = `
          <div class="card">
            <div class="card-header">
              <img src="${project.image}" alt="${project.name}">
            </div>
            <div class="card-body">
              <h3 class="card-title">${project.name}</h3>
              <p class="card-description">${project.desc}</p>
            </div>
          </div>
        `;
        grid.appendChild(link);
      });
    } catch (error) {
      console.error("Error al procesar los datos del JSON:", error);
      // También ocultamos el bloque si falla la carga
      yearTitle.style.display = "none";
      grid.style.display = "none";
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-animate]");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // deja de observar una vez animado
      }
    });
  }, {
    threshold: 0.1 // se activa cuando el 10% del elemento es visible
  });

  animatedElements.forEach(el => observer.observe(el));
});
