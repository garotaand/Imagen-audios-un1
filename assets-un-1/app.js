// ============================================================
// APP.JS — Engine de gamificação · Español con Historia
// Não editar este arquivo. Todo o conteúdo fica em data.js
// ============================================================

// --- Score global ---
let score = 0;
let answered = {};  // controla itens já respondidos para não dar ponto duplo

function addScore(n, key) {
  if (answered[key]) return;
  answered[key] = true;
  score += n;
  document.getElementById('score').textContent = score + ' pts';
  showToast('+' + n + ' pts 🌟');
}

// --- Toast de recompensa ---
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// --- Navegação por abas ---
function go(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.nav-btn[data-target="${id}"]`);
  if (btn) btn.classList.add('active');
}

// --- Normalize para comparação (ignora acentos, maiúsculas, espaços) ---
function normalize(s) {
  return (s || '').toString().trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

// ============================================================
// FILL-IN — exercícios de completar lacunas
// ============================================================
function buildFill(containerId, dados) {
  const box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = '';
  dados.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'fill-item';
    div.innerHTML = item.frase.replace('___',
      `<input type="text" data-idx="${idx}" placeholder="…" autocomplete="off" autocorrect="off" spellcheck="false">`
    );
    box.appendChild(div);
  });
}

function checkFill(containerId, dados, scoreKey) {
  const box = document.getElementById(containerId);
  const fb  = document.getElementById(containerId + 'Fb');
  const inputs = box.querySelectorAll('input');
  let ok = 0;

  inputs.forEach(inp => {
    const idx = parseInt(inp.dataset.idx);
    const val = normalize(inp.value);
    const respostas = dados[idx].respuestas.map(normalize);
    if (respostas.includes(val)) {
      inp.classList.remove('wrong'); inp.classList.add('correct'); ok++;
    } else {
      inp.classList.remove('correct'); inp.classList.add('wrong');
    }
  });

  updateProgress(containerId + 'Bar', ok, inputs.length);

  if (ok === inputs.length) {
    fb.className = 'feedback good';
    fb.textContent = '✅ ¡Todo correcto! Muy bien.';
    addScore(10, scoreKey);
  } else {
    fb.className = 'feedback bad';
    fb.textContent = `❌ Revisa. Correctas: ${ok}/${inputs.length}. ¡Inténtalo de nuevo!`;
  }
}

function resetFill(containerId, dados) {
  buildFill(containerId, dados);
  const fb = document.getElementById(containerId + 'Fb');
  if (fb) { fb.className = 'feedback'; fb.textContent = ''; }
  updateProgress(containerId + 'Bar', 0, dados.length);
}

// ============================================================
// PROGRESSO por atividade
// ============================================================
function updateProgress(barId, ok, total) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  bar.style.width = Math.round((ok / total) * 100) + '%';
}

// ============================================================
// PALABRAS LOCAS — anagrama
// ============================================================
let targetWord = '', builtWord = '', wordIndex = 0;

function initWordGame() {
  wordIndex = Math.floor(Math.random() * PALABRAS_LOCAS.length);
  loadWord(wordIndex);
}

function loadWord(idx) {
  const item = PALABRAS_LOCAS[idx];
  targetWord = item.palabra;
  builtWord  = '';

  const letters = item.palabra.split('').sort(() => Math.random() - 0.5);
  const box = document.getElementById('wordGame');
  box.innerHTML = `
    <div class="pista-tag">💡 ${item.pista}</div>
    <div class="letras-pool" id="letrasPool">
      ${letters.map((l, i) => `<button class="letra-btn" data-i="${i}" onclick="pickLetra(this,'${l}')">${l.toUpperCase()}</button>`).join('')}
    </div>
    <p style="font-size:12px;font-weight:700;color:var(--texto2);margin-bottom:6px;">Tu respuesta:</p>
    <div class="answer-box" id="answerBox">&nbsp;</div>
  `;
  const fb = document.getElementById('wordFb');
  if (fb) { fb.className = 'feedback'; fb.textContent = ''; }
}

function pickLetra(btn, l) {
  builtWord += l;
  btn.disabled = true;
  btn.style.opacity = '.25';
  document.getElementById('answerBox').textContent = builtWord.toUpperCase();
}

function checkWord() {
  const fb = document.getElementById('wordFb');
  if (normalize(builtWord) === normalize(targetWord)) {
    fb.className = 'feedback good';
    fb.textContent = '✅ ¡Correcto! La palabra es: ' + targetWord;
    addScore(5, 'word_' + targetWord);
  } else {
    fb.className = 'feedback bad';
    fb.textContent = '❌ No es correcto. La palabra era: ' + targetWord + '. ¡Intenta otra!';
  }
}

function nextWord() {
  wordIndex = (wordIndex + 1) % PALABRAS_LOCAS.length;
  loadWord(wordIndex);
}

function clearWord() {
  builtWord = '';
  loadWord(wordIndex);
}

// ============================================================
// QUIZ — múltipla escolha
// ============================================================
function buildQuiz(containerId, dados) {
  const box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = '';

  dados.forEach((item, qi) => {
    const div = document.createElement('div');
    div.className = 'quiz-item';

    const p = document.createElement('div');
    p.className = 'quiz-pergunta';
    p.textContent = item.pregunta;
    div.appendChild(p);

    item.opciones.forEach(op => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opcao';
      btn.textContent = op;
      btn.onclick = () => {
        // desabilita todas as opções do bloco
        div.querySelectorAll('.quiz-opcao').forEach(b => b.disabled = true);
        const correct = normalize(op) === normalize(item.correcta);
        btn.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) {
          div.querySelectorAll('.quiz-opcao').forEach(b => {
            if (normalize(b.textContent) === normalize(item.correcta)) b.classList.add('correct');
          });
        }
        const exp = div.querySelector('.quiz-explicacao');
        if (exp) exp.style.display = 'block';
        if (correct) addScore(5, 'quiz_' + qi);
      };
      div.appendChild(btn);
    });

    if (item.explicacion) {
      const exp = document.createElement('div');
      exp.className = 'quiz-explicacao';
      exp.textContent = '💡 ' + item.explicacion;
      div.appendChild(exp);
    }

    box.appendChild(div);
  });
}

// ============================================================
// ÁUDIOS — insere src nos elementos
// ============================================================
function loadAudios(mapa) {
  Object.entries(mapa).forEach(([key, src]) => {
    const el = document.getElementById('audio_' + key);
    if (el && src) el.src = src;
  });
}

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Fill-in exercises
  buildFill('serBox',       SER_EJERCICIO);
  buildFill('llamarseBox',  LLAMARSE_EJERCICIO);
  buildFill('regularBox',   REGULAR_EJERCICIO);

  // Quiz
  buildQuiz('quizBox', QUIZ);

  // Palabras locas
  initWordGame();

  // Áudios
  loadAudios(AUDIOS);

  // Primeira aba ativa
  const firstBtn = document.querySelector('.nav-btn');
  if (firstBtn) firstBtn.classList.add('active');
});
