// ============================================================
// DATA.JS — Unidad 1 · Español con Historia
// Editável pela Andréa: só mexer aqui, nunca no app.js
// ============================================================

const UNIDAD = {
  numero: 1,
  titulo: "Unidad 1",
  subtitulo: "Laura & Martín · El Match",
  abas: ["Início", "Palabras", "Verbos", "Juegos", "Texto", "Comprensión", "Música"]
};

const AUDIOS = {
  martin_whatsapp:      "",
  texto_argentina:      "",
  texto_espana:         "",
  comparacion_espana:   "",
  comparacion_argentina:"",
  musica_cafe_tacuba:   ""
};

const EMBEDS = {
  ordena_dialogo:   "https://learningapps.org/watch?app=8000225",
  saludo_despedida: "https://learningapps.org/watch?app=14342398",
  profesiones:      "https://learningapps.org/watch?v=pjdf0qrc320",
  actividad_extra:  "https://learningapps.org/watch?app=30563258"
};

const PALABRAS_LOCAS = [
  { palabra: "azafata",   pista: "Trabaja en aviones ✈️" },
  { palabra: "juez",      pista: "Trabaja en el juzgado ⚖️" },
  { palabra: "camarero",  pista: "Trabaja en un restaurante 🍽️" },
  { palabra: "albañil",   pista: "Construye casas 🏗️" },
  { palabra: "sastre",    pista: "Hace ropa 🧵" },
  { palabra: "carnicero", pista: "Vende carne 🥩" }
];

const SER_EJERCICIO = [
  { frase: "Yo ___ brasileña.",                respuestas: ["soy"] },
  { frase: "Martín ___ español.",              respuestas: ["es"] },
  { frase: "Tú ___ muy simpático.",            respuestas: ["eres"] },
  { frase: "Él ___ abogado.",                  respuestas: ["es"] },
  { frase: "Laura y Martín ___ nuevos amigos.", respuestas: ["son"] },
  { frase: "Vosotros ___ españoles.",          respuestas: ["sois"] },
  { frase: "Ignacio ___ arquitecto.",          respuestas: ["es"] },
  { frase: "Giuseppe ___ italiano.",           respuestas: ["es"] },
  { frase: "Diego y Frida ___ mexicanos.",     respuestas: ["son"] },
  { frase: "Usted ___ analista.",              respuestas: ["es"] }
];

const LLAMARSE_EJERCICIO = [
  { frase: "¿Cómo ___ tú?",               respuestas: ["te llamas"] },
  { frase: "Yo ___ Laura.",               respuestas: ["me llamo"] },
  { frase: "Mi amiga ___ Carolina.",      respuestas: ["se llama"] },
  { frase: "¿Cómo ___ él?",              respuestas: ["se llama"] },
  { frase: "Nosotros ___ Martín y Laura.", respuestas: ["nos llamamos"] }
];

const REGULAR_EJERCICIO = [
  { frase: "Martín ___ (trabajar) en un bufete.",     respuestas: ["trabaja"] },
  { frase: "Laura ___ (vivir) en São Paulo.",         respuestas: ["vive"] },
  { frase: "Ellos ___ (hablar) todos los días.",      respuestas: ["hablan"] },
  { frase: "Nosotros ___ (aprender) español juntos.", respuestas: ["aprendemos"] },
  { frase: "Yo ___ (escribir) mensajes cada noche.",  respuestas: ["escribo"] },
  { frase: "Tú ___ (leer) rápido.",                   respuestas: ["lees"] },
  { frase: "Martín y su perro ___ (mirar) la tele.",  respuestas: ["miran"] },
  { frase: "Vosotros ___ (comer) en casa hoy.",       respuestas: ["comeis","coméis"] }
];

const QUIZ = [
  {
    pregunta: "¿Cuál afirmación sobre Laura es INCORRECTA?",
    opciones: [
      "Laura era publicista",
      "Soñaba con amores imposibles",
      "Dibujaba amores imposibles",
      "Laura tenía ojos de estrella"
    ],
    correcta: "Soñaba con amores imposibles",
    explicacion: "Laura dibujaba amores imposibles — no los soñaba. ¡Ojo con los detalles del texto!"
  },
  {
    pregunta: "¿Cuál afirmación sobre Martín es CORRECTA?",
    opciones: [
      "Martín siempre perdía causas en su trabajo",
      "Le escribió a Laura con pocas esperanzas",
      "Su primera novia lo bloqueó y desapareció",
      "Su última novia ignoró todos sus mensajes"
    ],
    correcta: "Su primera novia lo bloqueó y desapareció",
    explicacion: "Correcto. Su primera novia desapareció bloqueándolo. La última lo traicionó — son dos historias distintas."
  }
];
