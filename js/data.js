/* ============================================================
   ⚙️  DATOS DEL CUMPLEAÑOS DE ANA — EDITÁ SOLO ESTE ARCHIVO
   ============================================================
   Acá va todo el contenido personal: recuerdos, fotos,
   nombres de canciones y la frase que se arma en el pueblo.
   El código (app.js) no necesita tocarse para cambiar esto.
   ============================================================ */

const CONFIG = {
  targetDate: new Date(Date.now() + 50000), // 21/07/2026 00:00  (mes en JS arranca en 0 => 6 = julio)
  name: "Ana",
  signature: "Pirulinchis y Polarinchis",
  // ⚙️ Nombre para mostrar de cada canción (solo texto, el archivo real se pone arriba en los <audio>)
  songBeforeName: "TODO: nombre de su canción favorita",
  songAfterName: "TODO: nombre de la canción especial de cumpleaños"
};

// ⚙️ LAS DOS CARTAS FINALES — se muestran grandes, cada una por separado, el día de su cumple real.
const FINAL_LETTERS = [
  {
    from: "Pirulinchis",
    emoji: "💛",
    text: `Ana, no sabés las ganas que tenía de que llegara este día para poder mostrarte todo esto. Arrancamos esta paginita con la excusa del cumple, pero terminó siendo una excusa para acordarme de mil cosas lindas juntas. Gracias por ser exactamente como sos: la persona que hace que cualquier plan, por más pavo que sea, se convierta en el mejor recuerdo del año. Ojalá este año te traiga todo lo que te merecés, que es mucho. Te quiero un montón, feliz cumple 🤠💛`
  },
  {
    from: "Polarinchis",
    emoji: "💙",
    text: `Feliz cumple, Ana. Armar esto me hizo dar cuenta de la cantidad de recuerdos que tenemos dando vueltas — y eso que seguro me olvidé de la mitad. Sos de esas personas que hacen que todo sea mejor con solo estar ahí, y este año quiero devolverte un poquito de todo lo que nos das siempre. Que lo festejes como se merece, que te rías mucho y que este sea el primero de muchos cumples más para celebrar juntos. Te quiero muchísimo 💙`
  }
];

// ⚙️ EDITÁ TUS RECUERDOS ACÁ (se muestran en la misión "Recuerdos")
// El campo "photo" es opcional — si lo dejás vacío, se ve un espacio marcado en su lugar.
const MEMORIES = [
  { date: "Hace mucho", text: "Nuestra primer foto juntos de chiquitos", photo: "assets/photos/foto-de-chicos.jpeg" },
  { date: "Dentro de poco", text: "Cuando probaron el mate en Argentina", photo: "assets/photos/mate.jpeg" },
  { date: "En un futuro", text: "De viejos viendo nuestras fotos", photo: "assets/photos/viejos.jpeg" },
];

// ⚙️ EDITÁ TUS FOTOS ACÁ. Dejá src:"" para que quede el espacio marcado, y después reemplazá
// por ejemplo: src:"assets/photos/foto1.jpg" (subiendo el archivo a la carpeta assets/photos/)
// Cada foto se desbloquea al ganar el minijuego indicado en "game" (memo/heart/puzzle/stars/safe),
// así se arma una especie de historia a medida que juega.
const PHOTOS = [
  { src:"assets/photos/disney.jpeg", caption:"Ese viaje a Disney que no vamos a olvidar nunca ✨", game:"memo" },
  { src:"assets/photos/francia.jpeg", caption:"Perdidas por las calles de Francia 🇫🇷", game:"heart" },
  { src:"assets/photos/egipto.jpeg", caption:"Aventureras en Egipto 🐫", game:"puzzle" },
  { src:"assets/photos/italia.jpeg", caption:"Sol, pizza y risas en Italia 🍕", game:"stars" },
  { src:"assets/photos/metgala.jpeg", caption:"La foto bonus, la más glamorosa de todas ✨", game:"safe" },
];
const GAME_LABELS = { memo:'Memotest', heart:'Encontrá el corazón', puzzle:'Rompecabezas', stars:'Atrapa estrellas', safe:'Tiro al pato' };

// ⚙️ FOTO DEL ROMPECABEZAS: el juego "Rompecabezas" arma esta foto en vez de números.
// Elegí una donde se vea bien recortada en cuadrado (una selfie o foto de las dos, por ejemplo).
const PUZZLE_PHOTO = "assets/photos/gauchos.jpeg"; // TODO: ej. "assets/photos/rompecabezas.jpg"

// ⚙️ FOTO ESPECIAL DE CIERRE: en la pantalla final, antes de mostrar las cartas,
// se pasan todas las fotos del álbum una por una y terminan en esta — recién ahí
// se desbloquean los botones de las cartas. Pensada para una foto con marco/dedicatoria.
const FINAL_SPECIAL_PHOTO = "assets/photos/fotoparalacarta.jpeg";

// ⚙️ Frase que se va revelando a medida que completa misiones (sin tildes para simplificar, mayúsculas)
const PHRASE = "FELIZ CUMPLE ANA";

const INTRO_LINES = [
  "Hay personas que llegan sin avisar...",
  "...y terminan cambiando todo.",
  `Hoy queremos regalarte algo diferente, ${CONFIG.name}.`,
  "Feliz cumpleaños 🤠"
];
// ⚙️ Fotos que se muestran durante la intro cinematográfica (pantalla 3).
// A propósito son DISTINTAS a las de PHOTOS (esas se desbloquean jugando en el Álbum),
// así la sorpresa del álbum no se arruina viéndolas antes en la intro.
const INTRO_PHOTOS = [
  { src:"assets/photos/portada.jpeg" },
  { src:"assets/photos/vaqueros.jpeg" },
  { src:"assets/photos/juego1.jpeg" },
  { src:"assets/photos/messi.jpeg" },
];
// posiciones donde van apareciendo las fotos, alternando esquinas para no tapar el texto central
const INTRO_PHOTO_SPOTS = [
  { top:'8%',  left:'6%',  rot:-8 },
  { top:'10%', left:'72%', rot:6 },
  { top:'68%', left:'8%',  rot:5 },
  { top:'66%', left:'70%', rot:-6 },
];

const STOPS = [
  { key:'recuerdos', label:'Recuerdos', icon:'📅' },
  { key:'album', label:'Álbum', icon:'📸' },
  { key:'juegos', label:'Juegos', icon:'🎮' },
];
