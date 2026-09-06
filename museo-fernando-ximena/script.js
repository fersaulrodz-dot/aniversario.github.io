/* =========================================================
   MUSEO FERNANDO & XIMENA
   SCRIPT PRINCIPAL (Versión Romántica y Fluida)
========================================================= */

const MAX_FOTOS_POR_MES = 50;

const MUSEO = {
  cartaFinal: `Ximena,\n\nUn año ha sido poco para ver tus sueños,\ny aun así, cada paso es un mapa compartido,\nde tus silencios y risas, nos hemos vuelto dueños,\nborrando los miedos, abrazando lo vivido.\n\nNo hace falta descifrar tu filosofía,\nni escribir sin rumbo, con prisas o sin rima,\nhe aprendido a leer tu alma, noche tras día,\ncon la paciencia de quien ama lo que se estima.\n\nDéjame seguir sumando momentos a tu lado,\nhacer de nuestra vida un verso más honesto.\n\nPues... Mi alma tiene tu nombre.`,
  firma: `Con todo mi amor,\n\nFernando ♡`,
  meses: [
    { numero: "01 / 12", nombre: "Octubre 2025", carpeta: "01-octubre-2025", etiqueta: "El comienzo", historia: "El tres de octubre fue el día en que comenzó nuestra historia y desde entonces mi amor por ti ha crecido cada día." },
    { numero: "02 / 12", nombre: "Noviembre 2025", carpeta: "02-noviembre-2025", etiqueta: "Los primeros recuerdos", historia: "Noviembre fue un mes lleno de momentos especiales. Además fue aquí donde te propuse matrimonio y me dijiste que estoy loco." },
    { numero: "03 / 12", nombre: "Diciembre 2025", carpeta: "03-diciembre-2025", etiqueta: "Nuestro primer diciembre", historia: "Celebramos nuestra primera Navidad juntos. Con mi familia explotamos cohetes y descubrí el brillo en tus ojos." },
    { numero: "04 / 12", nombre: "Enero 2026", carpeta: "04-enero-2026", etiqueta: "Un nuevo año", historia: "Enero fue el mes en que comenzó nuestro nuevo año juntos. Incrementamos nuestra confianza, crecimos juntos y cumplimos 18 años." },
    { numero: "05 / 12", nombre: "Febrero 2026", carpeta: "05-febrero-2026", etiqueta: "Más de nosotros", historia: "Profundizamos en nuestra relación. También fue nuestro primer 14 de febrero como pareja." },
    { numero: "06 / 12", nombre: "Marzo 2026", carpeta: "06-marzo-2026", etiqueta: "Nuevos recuerdos", historia: "Empezamos a prepararnos para nuestra graduación y a crecer juntos." },
    { numero: "07 / 12", nombre: "Abril 2026", carpeta: "07-abril-2026", etiqueta: "Otro capítulo", historia: "Continuamos creando recuerdos juntos. Me dejaste entrar en tu corazón y en tu mundo." },
    { numero: "08 / 12", nombre: "Mayo 2026", carpeta: "08-mayo-2026", etiqueta: "Más momentos", historia: "Tuvimos nuestra primera pelea importante y la primera vez que te escuché hablar tímida." },
    { numero: "09 / 12", nombre: "Junio 2026", carpeta: "09-junio-2026", etiqueta: "Mitad de nuestra historia", historia: "Junio fue el mes más romántico. Me encanta y me enamora cada vez más la forma en que me miras." },
    { numero: "10 / 12", nombre: "Julio 2026", carpeta: "10-julio-2026", etiqueta: "Nuestro verano", historia: "Vivimos nuestro primer verano juntos. Además fue nuestra graduación." },
    { numero: "11 / 12", nombre: "Agosto 2026", carpeta: "11-agosto-2026", etiqueta: "Ya casi un año", historia: "Celebramos nuestras últimas vacaciones, recordando todos los momentos que hemos compartido." },
    { numero: "12 / 12", nombre: "Septiembre 2026", carpeta: "12-septiembre-2026", etiqueta: "El último capítulo", historia: "El último mes antes de nuestro primer aniversario. Ya estás en tu primer mes en la universidad y empezamos una nueva etapa." }
  ]
};

const $ = id => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  if ($("finalLetter")) $("finalLetter").textContent = MUSEO.cartaFinal;
  if ($("finalSignature")) $("finalSignature").textContent = MUSEO.firma;

  construirLineaDelTiempo();
  setupEventListeners();
});

function obtenerRutaFoto(mes, numero) {
  return `fotos/${mes.carpeta}/foto${numero}.jpg`;
}

function imagenExiste(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

async function construirLineaDelTiempo() {
  const timeline = $("timeline");
  if (!timeline) return;

  for (let index = 0; index < MUSEO.meses.length; index++) {
    const mes = MUSEO.meses[index];
    const item = document.createElement("article");
    item.className = `timeline-item ${index % 2 === 0 ? "left" : "right"}`;

    const portada = obtenerRutaFoto(mes, 1);
    const existe = await imagenExiste(portada);

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="month-card" ${existe ? `style="background-image:url('${portada}')"` : ""}>
        <div class="month-content">
          <div class="month-number">${mes.numero}</div>
          <h3 class="month-title">${mes.nombre}</h3>
          <div class="month-tag">${mes.etiqueta}</div>
          <div class="month-open">Entrar a la sala →</div>
        </div>
      </div>
    `;

    item.querySelector(".month-card").addEventListener("click", () => abrirSala(index));
    timeline.appendChild(item);
    observer.observe(item);
  }
}

function actualizarLinea() {
  const timeline = $("timeline");
  const progress = $("timelineProgress");
  if (!timeline || !progress) return;

  const rect = timeline.getBoundingClientRect();
  const totalHeight = rect.height;
  const currentScroll = window.innerHeight * 0.7 - rect.top;
  let porcentaje = Math.max(0, Math.min(1, currentScroll / totalHeight));

  progress.style.height = `${porcentaje * 100}%`;
}

window.addEventListener("scroll", actualizarLinea, { passive: true });

function entrarAlMuseo() {
  $("intro").classList.add("hide");
  $("app").style.display = "block";
  setTimeout(() => $("app").classList.add("visible"), 50);

  const music = $("music");
  if (music) {
    music.volume = 0.5;
    music.play().then(() => toggleBotonMusica(true)).catch(() => toggleBotonMusica(false));
  }
}

function toggleMusic() {
  const music = $("music");
  if (!music) return;

  if (music.paused) {
    music.play().then(() => toggleBotonMusica(true));
  } else {
    music.pause();
    toggleBotonMusica(false);
  }
}

function toggleBotonMusica(estaSonando) {
  const btn = $("musicButton");
  const text = $("musicText");
  if (!btn || !text) return;

  if (estaSonando) {
    btn.classList.add("playing");
    text.textContent = "Pausar";
  } else {
    btn.classList.remove("playing");
    text.textContent = "Reproducir";
  }
}

async function abrirSala(index) {
  const mes = MUSEO.meses[index];
  if (!mes) return;

  const portada = obtenerRutaFoto(mes, 1);
  const existe = await imagenExiste(portada);

  $("roomHeader").style.backgroundImage = existe ? `url("${portada}")` : "none";
  $("roomNumber").textContent = mes.numero;
  $("roomTitle").textContent = mes.nombre;
  $("roomTag").textContent = mes.etiqueta;
  $("roomStory").textContent = mes.historia;

  const gallery = $("roomGallery");
  gallery.innerHTML = "";

  let encontradas = 0;
  for (let i = 1; i <= MAX_FOTOS_POR_MES; i++) {
    const ruta = obtenerRutaFoto(mes, i);
    if (await imagenExiste(ruta)) {
      encontradas++;
      const img = document.createElement("img");
      img.className = "artwork-image";
      img.src = ruta;
      img.alt = `Foto ${mes.nombre}`;
      img.loading = "lazy";
      img.addEventListener("click", () => abrirFoto(ruta));
      gallery.appendChild(img);
    }
  }

  if (encontradas === 0) {
    gallery.innerHTML = `<p style="text-align:center; color: var(--muted-rose); grid-column: 1/-1;">Aún no hay fotografías en esta sala. ♡</p>`;
  }

  const room = $("room");
  room.classList.add("open");
  room.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}

function cerrarSala() {
  const room = $("room");
  room.style.opacity = "0";
  setTimeout(() => {
    room.classList.remove("open");
    room.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    room.style.opacity = "";
  }, 400);
}

function abrirFoto(src) {
  const lightbox = $("lightbox");
  $("lightboxImage").src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function cerrarFoto() {
  const lightbox = $("lightbox");
  lightbox.style.opacity = "0";
  setTimeout(() => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    $("lightboxImage").src = "";
    lightbox.style.opacity = "";
  }, 350);
}

function setupEventListeners() {
  $("enterButton")?.addEventListener("click", entrarAlMuseo);
  $("musicButton")?.addEventListener("click", toggleMusic);
  $("roomCloseBtn")?.addEventListener("click", cerrarSala);
  $("lightboxCloseBtn")?.addEventListener("click", cerrarFoto);
  $("lightbox")?.addEventListener("click", (e) => { if (e.target === $("lightbox")) cerrarFoto(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if ($("lightbox")?.classList.contains("open")) cerrarFoto();
      else if ($("room")?.classList.contains("open")) cerrarSala();
    }
  });
}