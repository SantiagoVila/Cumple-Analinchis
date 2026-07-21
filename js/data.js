/* ============================================================
   ⚙️  DATOS DEL CUMPLEAÑOS DE ANA — EDITÁ SOLO ESTE ARCHIVO
   ============================================================
   Acá va todo el contenido personal: recuerdos, fotos,
   nombres de canciones y la frase que se arma en el pueblo.
   El código (app.js) no necesita tocarse para cambiar esto.
   ============================================================ */

const CONFIG = {
  targetDate: new Date(2026, 6, 21, 0, 0, 0), // 21/07/2026 00:00  (mes en JS arranca en 0 => 6 = julio)
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
    text: `Bueno llego el dia, Feliz cumpleaños

La verdad que si hace un tiempo me decian que ibamos a hablar todos los dias asi hubiera dicho naaa ni empedo
nunca imagine que en tan poco tiempo ibamos a volvernos tan cercanos, y que ahora se me haga raro si no hacemos 
llamada o no hablamos un dia de cualquier boludes, creo que eso es lo mas lindo de todo, como sin darnos cuenta
empezamos a ser parte de la rutina del otro y alegrandonos el dia a dia o ayudandonos hasta con lo mas minimo 

gracias por siempre aguantarme cuando me pongo esquizo o digo boludeces y por hacer que un dia normal o que quiza
no era el mejor sea mucho mas divertido, realmente pasa el tiempo volando cuando hablamos

espero que en este cumpleaños la pases super bien seas muy feliz te llenen de caramelos y comida, y nada espero
que todos puedan conocer a una analinchis en su vida para que les alegre los dias, pero nada espero esto sea
el arranque de la amistad y que podamos seguir haciendo llamadas, chismosear, molestarnos y hacer boludeces juntos
y quiza quien dice en un futuro conocernos!! y reirnos y comer mucho mucho 

pero bueno nada, Feliz cumple analinchis, espero disfrutes mucho que te lo super mereces y gracias por aparecer asi
en mi vida de nuevo y por convertirte en tan poco tiempo en una persona tan importante para mi 

Te quiero muchisimooo analinchiiiiiiisssss (POR MAS QUE VOS ME ODIES)🤠💛`
  },
  {
    from: "Polarinchis",
    emoji: "💙",
    text: `Holis analinchis,
Sinceramente te mentiría que se cómo iniciar esta carta, pero lo intentaré. 
La verdad me siento demasiado agradecida contigo por todo lo que has hecho por mí, aunque por más insignificante que parezca, todo ello me ah demostrado lo muy bella persona que eres. Y no estoy hablando sobre lo físico (aunque también estas guapísima amiga😚). Fuiste y eres una gran persona Ana. 

Sé muy bien que nos conocíamos más de un año. Pero conectamos en el momento más indicado.

Hay una palabra que me gusta mucho, es lúmina. Significa luz. La capacidad de irradiar luz propia: inspiración, verdad y sensibilidad. Una forma de iluminar el mundo a través de lo que se crea y se siente.

Para mí eres lúmina que elunara a todo aquel que se le atraviese.
•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•

Lúmina: La capacidad de irradiar luz propia: inspiración, verdad y sensibilidad. Una forma de iluminar el mundo a través de lo que se crea y se siente.
Elunara: Aprender a sanar con tu propia luz.

•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•~•

Y cómo obviamente amo expresarme en poemas, este es para ti.



No se muy bien a donde me lleva la vida.

A veces me cruza con quienes menos lo espero, pero contigo, la sintonía no falla.
Nos conocíamos de antes, es verdad,
pero la vida nos unió en el momento exacto.
Y en cada pequeño detalle que has tenido,
dejaste una huella inmensa en nuestro impacto.
Tu belleza se nota a simple vista,
eres guapa, radiante y llena de encanto;
pero es lo que llevas dentro de la alma
lo que verdaderamente me conmueve tanto.
Eres Lúmina, 
una chispa que irradia luz, verdad y sensibilidad.
Inspiras con cada cosa que creas y sientes,
iluminando el mundo con pura autenticidad.
Y en ese camino aprendiste a ser Elunara,
a sanar tus heridas con tu propio resplandor,
para iluminar de paso a cualquiera que te cruce,
regalando siempre tu calma y tu calor.
Gracias por ser una persona tan bella,
por cada gesto, por estar y por coincidir.

Ly u analinchis🤍🐽`
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
