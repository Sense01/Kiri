/* Kiri — app de aprendizagem de línguas (100% estática, guarda progresso no browser) */
(() => {
'use strict';
const C = window.KIRI_COURSES;
const KEY = 'kiri-state-v1';
const HEART_MS = 30 * 60 * 1000, MAX_HEARTS = 5, REFILL_COST = 350;
const UNIT_COLORS = [['#7B61FF','#5B41DF'],['#14B87A','#0D9563'],['#FF5FA2','#D93D80'],['#1EA4F0','#0B84C9'],['#FF8A3D','#DB6A1F'],['#11B5C4','#0A909C']];
const PATTERN = ['L','L','S','C','L','L','T'];
const LPN = 3; // lições por nível
const OFFSETS = [0, 44, 70, 44, 0, -44, -70, -44];
const LEAGUES = [['Bronze','#CD7F45'],['Prata','#A9B1C1'],['Ouro','#FFB020'],['Safira','#1E6FF0'],['Rubi','#E5304D'],['Esmeralda','#14B87A'],['Ametista','#9B4DFF'],['Pérola','#E9A3B6'],['Obsidiana','#4A4860'],['Diamante','#3CCFE0']];
const NAMES = ['Sofia','Tiago','Mariana','Rafael','Inês','Diogo','Beatriz','João','Leonor','Miguel','Carolina','Pedro','Matilde','Gonçalo','Lara','Rodrigo','Alice','Martim','Clara','Duarte','Lucas M.','Emma','Noah','Yuki','Amara','Mateo','Chloé','Luca','Aisha','Kenji','Olga','Ravi','Zoe','Hugo','Nina','Bruno','Helena','Simão','Maria J.','Afonso'];
const MONTHS = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const PRAISE = ['Excelente!','Muito bem!','Boa!','Perfeito!','Fantástico!','Incrível!'];
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const HAS_TTS = 'speechSynthesis' in window;

/* ---------- Ícones ---------- */
const I = {
  learn:'<svg viewBox="0 0 32 32"><path d="M5 15 16 5l11 10v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" fill="#FF8A3D"/><path d="M3 15.5 16 4l13 11.5" stroke="#DB6A1F" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="12.5" y="18" width="7" height="11" rx="2" fill="#fff"/></svg>',
  practice:'<svg viewBox="0 0 32 32"><rect x="2" y="11" width="5" height="10" rx="2" fill="#1EA4F0"/><rect x="25" y="11" width="5" height="10" rx="2" fill="#1EA4F0"/><rect x="6" y="7" width="6" height="18" rx="2" fill="#0B84C9"/><rect x="20" y="7" width="6" height="18" rx="2" fill="#0B84C9"/><rect x="12" y="14" width="8" height="4" fill="#A9B1C1"/></svg>',
  leagues:'<svg viewBox="0 0 32 32"><path d="M16 3 27 7v8c0 7-5 12-11 14C10 27 5 22 5 15V7z" fill="#FFB020"/><path d="M16 7l7 3v5c0 5-3 8-7 10z" fill="#FFD36B"/></svg>',
  quests:'<svg viewBox="0 0 32 32"><rect x="4" y="13" width="24" height="15" rx="3" fill="#C2773A"/><path d="M4 13a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6z" fill="#E08E4E"/><rect x="4" y="12" width="24" height="3" fill="#FFB020"/><rect x="13" y="11" width="6" height="9" rx="2" fill="#FFB020"/><circle cx="16" cy="16" r="1.6" fill="#8A4B1D"/></svg>',
  shop:'<svg viewBox="0 0 32 32"><path d="M11 12V8a5 5 0 0 1 10 0v4" stroke="#D93D80" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M5 11h22l-1.5 16a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2z" fill="#FF5FA2"/><circle cx="12" cy="16" r="1.6" fill="#fff"/><circle cx="20" cy="16" r="1.6" fill="#fff"/></svg>',
  profile:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#7B61FF"/><circle cx="16" cy="13" r="5" fill="#fff"/><path d="M7.5 24.5a10 8 0 0 1 17 0A13 13 0 0 1 16 29a13 13 0 0 1-8.5-4.5z" fill="#fff"/></svg>',
  more:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#A9B1C1"/><circle cx="10" cy="16" r="2.3" fill="#fff"/><circle cx="16" cy="16" r="2.3" fill="#fff"/><circle cx="22" cy="16" r="2.3" fill="#fff"/></svg>',
  flame:'<svg viewBox="0 0 32 32"><path d="M16 2c1 5 9 8 9 16a9 9 0 0 1-18 0c0-4 2-6.5 3.5-8.5 1 3 2 4 3 4 0-4-1-8 2.5-11.5z" fill="currentColor"/><path d="M16 16c3 2 4.5 4 4.5 6a4.5 4.5 0 0 1-9 0c0-2 2-3.5 4.5-6z" fill="rgba(255,255,255,.55)"/></svg>',
  gem:'<svg viewBox="0 0 32 32"><path d="M8 5h16l6 8-14 16L2 13z" fill="currentColor"/><path d="M2 13h28M12 5l-4 8 8 16 8-16-4-8" stroke="rgba(255,255,255,.5)" stroke-width="1.5" fill="none"/></svg>',
  heart:'<svg viewBox="0 0 32 32"><path d="M16 28S3 20 3 11a7 7 0 0 1 13-3.6A7 7 0 0 1 29 11c0 9-13 17-13 17z" fill="currentColor"/><ellipse cx="9.5" cy="11" rx="3" ry="2" fill="rgba(255,255,255,.5)" transform="rotate(-35 9.5 11)"/></svg>',
  star:'<svg viewBox="0 0 32 32"><path d="M16 3l3.9 8 8.6 1.2-6.3 6 1.6 8.6L16 22.7 8.2 26.8l1.6-8.6-6.3-6L12.1 11z" fill="currentColor"/></svg>',
  check:'<svg viewBox="0 0 32 32"><path d="M7 17l6 6L25 9" stroke="currentColor" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  lock:'<svg viewBox="0 0 32 32"><rect x="7" y="14" width="18" height="14" rx="3" fill="currentColor"/><path d="M11 14v-3a5 5 0 0 1 10 0v3" stroke="currentColor" stroke-width="3.5" fill="none"/></svg>',
  trophy:'<svg viewBox="0 0 32 32"><path d="M9 4h14v8a7 7 0 0 1-14 0z" fill="#FFB020"/><path d="M9 6H5.5a4 4 0 0 0 3.5 6M23 6h3.5a4 4 0 0 1-3.5 6" stroke="#E08E00" stroke-width="2.5" fill="none"/><rect x="14" y="18" width="4" height="5" fill="#E08E00"/><rect x="9" y="23" width="14" height="5" rx="2" fill="#C2773A"/></svg>',
  speaker:'<svg viewBox="0 0 32 32"><path d="M5 12h5l7-6v20l-7-6H5z" fill="currentColor"/><path d="M21 11a6 6 0 0 1 0 10M24.5 7a11 11 0 0 1 0 18" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>',
  turtle:'<svg viewBox="0 0 32 32"><ellipse cx="15" cy="17" rx="10" ry="7" fill="currentColor"/><circle cx="27" cy="15.5" r="3" fill="currentColor"/><rect x="7" y="21" width="4" height="6" rx="2" fill="currentColor"/><rect x="18" y="21" width="4" height="6" rx="2" fill="currentColor"/><path d="M8 15h14M15 10.5v12" stroke="rgba(0,0,0,.2)" stroke-width="2"/></svg>',
  mic:'<svg viewBox="0 0 32 32"><rect x="11" y="3" width="10" height="17" rx="5" fill="currentColor"/><path d="M7 15a9 9 0 0 0 18 0M16 24v5M11 29h10" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>',
  close:'<svg viewBox="0 0 32 32"><path d="M8 8l16 16M24 8 8 24" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/></svg>',
  book:'<svg viewBox="0 0 32 32"><path d="M4 6h9a3 3 0 0 1 3 3v18a3 3 0 0 0-3-3H4zM28 6h-9a3 3 0 0 0-3 3v18a3 3 0 0 1 3-3h9z" fill="currentColor"/></svg>',
  bolt:'<svg viewBox="0 0 32 32"><path d="M18 2 6 18h8l-2 12 12-16h-8z" fill="currentColor"/></svg>',
  clock:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M16 9v7l5 3" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linecap="round"/></svg>',
  target:'<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="16" cy="16" r="5" fill="currentColor"/></svg>',
  snow:'<svg viewBox="0 0 32 32"><path d="M16 3v26M5 9.5l22 13M27 9.5l-22 13" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  sparkle:'<svg viewBox="0 0 32 32"><path d="M16 3c1 7 6 12 13 13-7 1-12 6-13 13-1-7-6-12-13-13 7-1 12-6 13-13z" fill="currentColor"/></svg>',
  ear:'<svg viewBox="0 0 32 32"><path d="M10 13a7 7 0 0 1 14 0c0 5-5 6-5 11a4 4 0 0 1-7 2" stroke="currentColor" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M14 13a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  redo:'<svg viewBox="0 0 32 32"><path d="M25 10A11 11 0 1 0 27 18" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M26 3v8h-8" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chestBig:'<svg viewBox="0 0 64 64"><ellipse cx="32" cy="58" rx="22" ry="4" fill="rgba(0,0,0,.08)"/><rect x="8" y="26" width="48" height="30" rx="6" fill="#C2773A"/><path d="M8 27a13 13 0 0 1 13-13h22a13 13 0 0 1 13 13z" fill="#E08E4E"/><rect x="8" y="24" width="48" height="6" fill="#FFB020"/><rect x="26" y="22" width="12" height="17" rx="3" fill="#FFB020"/><circle cx="32" cy="31" r="3" fill="#8A4B1D"/><rect x="8" y="44" width="48" height="4" fill="#A9612C"/></svg>',
  trophyBig:'<svg viewBox="0 0 64 64"><ellipse cx="32" cy="59" rx="20" ry="4" fill="rgba(0,0,0,.08)"/><path d="M18 6h28v18a14 14 0 0 1-28 0z" fill="#FFB020"/><path d="M18 10h-7a8 8 0 0 0 7 12M46 10h7a8 8 0 0 1-7 12" stroke="#E08E00" stroke-width="5" fill="none"/><path d="M24 10h4v14a6 6 0 0 1-4-4z" fill="#FFD36B"/><rect x="28" y="37" width="8" height="10" fill="#E08E00"/><rect x="18" y="46" width="28" height="10" rx="4" fill="#C2773A"/></svg>'
};
const leagueBadge = (t, cls='') => `<svg viewBox="0 0 32 32" class="${cls}"><path d="M16 2 28 6.5v9C28 23 22 28 16 30 10 28 4 23 4 15.5v-9z" fill="${LEAGUES[t][1]}"/><path d="M16 6.5l8 3v6c0 5-3.5 8.5-8 10z" fill="rgba(255,255,255,.35)"/></svg>`;

const FLAGS = {
  en:'<svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0 0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0 0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="12"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/></svg>',
  es:'<svg viewBox="0 0 60 40"><rect width="60" height="40" fill="#C60B1E"/><rect y="10" width="60" height="20" fill="#FFC400"/></svg>',
  fr:'<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#002395"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#ED2939"/></svg>',
  de:'<svg viewBox="0 0 60 40"><rect width="60" height="14" fill="#000"/><rect y="13" width="60" height="14" fill="#DD0000"/><rect y="26.6" width="60" height="13.4" fill="#FFCE00"/></svg>',
  it:'<svg viewBox="0 0 60 40"><rect width="20" height="40" fill="#009246"/><rect x="20" width="20" height="40" fill="#fff"/><rect x="40" width="20" height="40" fill="#CE2B37"/></svg>'
};
const flag = (code, cls='') => `<span class="flag ${cls}">${FLAGS[code]}</span>`;

function mascot(mood = 'happy', cls = 'mascot') {
  const mouth = mood === 'sad' ? 'M88 128 Q100 117 112 128' : 'M86 117 Q100 134 114 117';
  const arms = mood === 'cheer'
    ? '<ellipse cx="40" cy="78" rx="11" ry="20" fill="#5B41DF" transform="rotate(-30 40 78)"/><ellipse cx="160" cy="78" rx="11" ry="20" fill="#5B41DF" transform="rotate(30 160 78)"/>'
    : '<ellipse cx="42" cy="122" rx="11" ry="20" fill="#5B41DF" transform="rotate(20 42 122)"/><ellipse cx="158" cy="122" rx="11" ry="20" fill="#5B41DF" transform="rotate(-20 158 122)"/>';
  const brows = mood === 'sad' ? '<path d="M64 66l22 6M136 66l-22 6" stroke="#2A2140" stroke-width="5" stroke-linecap="round"/>' : '';
  return `<svg class="${cls}" viewBox="0 0 200 200" aria-hidden="true"><ellipse cx="100" cy="190" rx="50" ry="7" fill="rgba(0,0,0,.08)"/>
  <path d="M100 38V18" stroke="#2BA36B" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="86" cy="16" rx="14" ry="7" fill="#3DD68C" transform="rotate(-25 86 16)"/><ellipse cx="114" cy="12" rx="15" ry="7.5" fill="#2BBF7A" transform="rotate(20 114 12)"/>
  ${arms}
  <path d="M100 36C58 36 40 70 40 110c0 44 26 72 60 72s60-28 60-72c0-40-18-74-60-74z" fill="#7B61FF"/>
  <ellipse cx="100" cy="140" rx="38" ry="34" fill="#A898FF"/>
  <circle cx="78" cy="92" r="19" fill="#fff"/><circle cx="122" cy="92" r="19" fill="#fff"/>
  <circle cx="81" cy="95" r="9.5" fill="#2A2140"/><circle cx="119" cy="95" r="9.5" fill="#2A2140"/>
  <circle cx="84" cy="91" r="3.2" fill="#fff"/><circle cx="122" cy="91" r="3.2" fill="#fff"/>
  ${brows}
  <ellipse cx="62" cy="114" rx="8" ry="5" fill="#FF8FC0" opacity=".7"/><ellipse cx="138" cy="114" rx="8" ry="5" fill="#FF8FC0" opacity=".7"/>
  <path d="${mouth}" stroke="#2A2140" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="80" cy="182" rx="15" ry="7" fill="#FF8A3D"/><ellipse cx="120" cy="182" rx="15" ry="7" fill="#FF8A3D"/></svg>`;
}

/* ---------- Utilitários ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const h = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const randInt = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => ymd(new Date());
const parseDay = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = parseDay(s); d.setDate(d.getDate() + n); return ymd(d); };
const diffDays = (a, b) => Math.round((parseDay(b) - parseDay(a)) / 864e5);
const weekStart = (d = new Date()) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
const hashStr = s => { let h = 1779033703; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } return h >>> 0; };
const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const fmtTime = ms => { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 60)}:${pad(s % 60)}`; };
const fmtNum = n => n.toLocaleString('pt-PT');
const clean = s => s.replace(/[’‘]/g, "'").replace(/[.,!?¿¡;:«»"()]/g, ' ');
const norm = s => clean(s).toLowerCase().replace(/\s+/g, ' ').trim();
const deaccent = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const tokens = s => clean(s).split(/\s+/).filter(Boolean);
const KEEP_CASE = /^(I|I'm|Ana|Tom|Tomás|Thomas|Tommaso|Paul|Marie|Léa|Anne|Hugo|Paris|Lyon|Lisbonne|Lisboa|France|França|Portugal|Italie|Itália|Espagne|Espanha|Italy|Spain|Lisbon|París|Francia|España|Italia|Lisboa|Frankreich|Italien|Spanien|Lissabon|Parigi|Lione|Lisbona|Portogallo|Spagna|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Wie|Was|Wer|Wo)$/;
const tileTokens = s => tokens(s).map((t, i) => (i === 0 && !KEEP_CASE.test(t)) ? t.charAt(0).toLowerCase() + t.slice(1) : t);
function lev(a, b) { const m = a.length, n = b.length; const d = Array.from({length: m + 1}, (_, i) => [i]); for (let j = 1; j <= n; j++) d[0][j] = j; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1)); return d[m][n]; }

/* ---------- Estado ---------- */
function defaults() {
  return { v: 1, name: '', course: null, courses: {}, xp: 0, gems: 500, hearts: MAX_HEARTS, heartsTs: Date.now(),
    streak: 0, bestStreak: 0, lastDay: null, freezes: 0, frozenDays: [], doubleUntil: 0, superUntil: 0, superTried: false,
    goal: 20, day: null, dayXp: 0, daily: {}, history: {}, lessons: 0, perfect: 0,
    quests: { day: null, list: [] }, questsMonth: { m: null, n: 0 },
    league: { tier: 0, week: null, xp: 0, top3: 0, pending: null },
    mistakes: [], settings: { sound: true, listen: true, speak: true, dark: false, listenOff: 0, speakOff: 0, voices: {} }, joined: Date.now() };
}
let state;
function load() {
  try { const raw = localStorage.getItem(KEY); state = raw ? Object.assign(defaults(), JSON.parse(raw)) : defaults(); }
  catch (e) { state = defaults(); }
  state.settings = Object.assign(defaults().settings, state.settings);
  state.league = Object.assign(defaults().league, state.league);
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
const course = () => C[state.course];
const cstate = (code = state.course) => (state.courses[code] ||= { done: {}, words: [], xp: 0 });
const unlimited = () => state.superUntil > Date.now();
const doubleOn = () => state.doubleUntil > Date.now();

function regenHearts() {
  if (state.hearts >= MAX_HEARTS) { state.heartsTs = Date.now(); return false; }
  const n = Math.floor((Date.now() - state.heartsTs) / HEART_MS);
  if (n <= 0) return false;
  state.hearts = Math.min(MAX_HEARTS, state.hearts + n);
  state.heartsTs += n * HEART_MS;
  if (state.hearts >= MAX_HEARTS) state.heartsTs = Date.now();
  return true;
}
const nextHeartIn = () => HEART_MS - (Date.now() - state.heartsTs);

function checkDay() {
  const t = today();
  regenHearts();
  if (state.day !== t) { state.day = t; state.dayXp = 0; state.daily = { lessons: 0, perfect: 0, combo: 0, accurate: 0, listen: 0 }; }
  if (state.lastDay && state.streak > 0) {
    const gap = diffDays(state.lastDay, t);
    if (gap >= 2) {
      const missed = gap - 1;
      if (state.freezes >= missed) {
        state.freezes -= missed;
        for (let i = 1; i <= missed; i++) state.frozenDays.push(addDays(state.lastDay, i));
        state.lastDay = addDays(t, -1);
        setTimeout(() => toast(`Proteção de sequência usada! A tua sequência de ${state.streak} dias está salva.`), 600);
      } else { state.streak = 0; }
    }
  }
  if (state.quests.day !== t) genQuests(t);
  const m = t.slice(0, 7);
  if (state.questsMonth.m !== m) state.questsMonth = { m, n: 0 };
  const wk = ymd(weekStart());
  const lg = state.league;
  if (lg.week !== wk) {
    if (lg.week && lg.xp > 0) {
      const board = leagueBoard(lg.week, lg.tier, 1);
      const rank = board.findIndex(p => p.me) + 1;
      const from = lg.tier;
      if (rank <= 7 && lg.tier < LEAGUES.length - 1) lg.tier++;
      else if (rank > 25 && lg.tier > 0) lg.tier--;
      if (rank <= 3) lg.top3++;
      lg.pending = { rank, from, to: lg.tier };
      if (rank <= 3) state.gems += [0, 100, 60, 40][rank];
    }
    lg.week = wk; lg.xp = 0;
  }
  save();
}

/* ---------- XP / ligas / missões ---------- */
function addXp(base) {
  const amt = base * (doubleOn() ? 2 : 1);
  state.xp += amt; state.dayXp += amt; state.league.xp += amt; cstate().xp += amt;
  state.history[today()] = (state.history[today()] || 0) + amt;
  return amt;
}
function leagueBoard(week, tier, fracOverride) {
  const r = rng(hashStr(week + ':' + tier));
  const ws = parseDay(week).getTime();
  const frac = fracOverride ?? Math.min(1, Math.max(0, (Date.now() - ws) / (7 * 864e5)));
  const names = NAMES.slice().sort(() => r() - 0.5);
  const bots = [];
  for (let i = 0; i < 29; i++) {
    const target = Math.round((30 + Math.pow(r(), 1.8) * 560) * (1 + tier * 0.35));
    const pace = 0.7 + r() * 0.6;
    const xp = Math.round(target * Math.pow(Math.min(1, frac * pace), 1.15));
    bots.push({ name: names[i % names.length], xp, color: UNIT_COLORS[i % UNIT_COLORS.length][0] });
  }
  const me = { name: state.name || 'Tu', xp: week === state.league.week ? state.league.xp : 0, color: '#7B61FF', me: true };
  return bots.concat(me).sort((a, b) => b.xp - a.xp || (b.me ? 1 : 0) - (a.me ? 1 : 0));
}
const QUESTS = {
  xp: { text: n => `Ganha ${n} XP`, ico: 'bolt', color: '#FFB020' },
  lessons: { text: n => `Completa ${n} lições`, ico: 'target', color: '#14B87A' },
  perfect: { text: n => `Completa ${n} lição sem erros`, ico: 'star', color: '#FF5FA2' },
  combo: { text: n => `Acerta ${n} respostas seguidas`, ico: 'flame', color: '#FF8A3D' },
  accurate: { text: n => `Obtém 80% ou mais em ${n} lições`, ico: 'check', color: '#1EA4F0' },
  listen: { text: n => `Completa ${n} exercícios de audição`, ico: 'ear', color: '#7B61FF' }
};
function genQuests(t) {
  const r = rng(hashStr('q' + t));
  const pool = [['lessons', [2, 3]], ['perfect', [1]], ['combo', [5, 10]], ['accurate', [1, 2]]];
  if (HAS_TTS && state.settings.listen) pool.push(['listen', [4, 6]]);
  pool.sort(() => r() - 0.5);
  const list = [{ id: 'xp', n: state.goal, reward: 20, claimed: false }];
  for (const [id, ns] of pool.slice(0, 2)) list.push({ id, n: ns[Math.floor(r() * ns.length)], reward: 10 + Math.floor(r() * 3) * 5, claimed: false });
  state.quests = { day: t, list };
}
const questVal = q => q.id === 'xp' ? state.dayXp : (state.daily[q.id] || 0);
const questDone = q => questVal(q) >= q.n;

/* ---------- Som e voz ---------- */
let actx;
function tone(f, dur, type = 'sine', when = 0, vol = 0.15) {
  if (!state.settings.sound) return;
  try {
    actx ||= new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + when;
    o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur);
  } catch (e) {}
}
const sfx = {
  ok: () => { tone(660, .12, 'sine', 0); tone(990, .25, 'sine', .1); },
  bad: () => { tone(200, .18, 'square', 0, .08); tone(150, .3, 'square', .14, .08); },
  done: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, .3, 'triangle', i * .11, .14)),
  tap: () => tone(520, .05, 'sine', 0, .06),
  pair: () => tone(880, .12, 'sine', 0, .1),
  coin: () => { tone(988, .08, 'square', 0, .06); tone(1319, .25, 'square', .08, .06); }
};
let voices = [];
if (HAS_TTS) { const lv = () => { voices = speechSynthesis.getVoices(); if (state && state.course && location.hash === '#settings' && !L) render(true); }; voices = speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = lv; }
// Vozes "de brincar" do macOS/iOS que soam mal: nunca as escolhemos automaticamente
const NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|wobble|zarvox|trinoids|whisper|jester|organ|superstar|good news|fred|junior|ralph|kathy|grandma|grandpa|rocko|shelley|flo\b|eddy|reed|sandy|eloquence/i;
const PREFERRED_REGION = { en: ['en-US', 'en-GB'], es: ['es-ES', 'es-MX', 'es-US'], fr: ['fr-FR', 'fr-CA'], de: ['de-DE', 'de-AT'], it: ['it-IT'] };
function voiceScore(v, code) {
  let sc = 0;
  if (/natural|neural|online/i.test(v.name)) sc += 60;          // Edge / Windows: vozes neurais
  if (/premium|enhanced|melhorad|aprimorad|siri/i.test(v.name)) sc += 50; // Apple: vozes premium
  if (/google/i.test(v.name)) sc += 35;                          // Chrome: vozes Google
  if (NOVELTY.test(v.name)) sc -= 200;
  const regions = PREFERRED_REGION[code] || [];
  const ri = regions.indexOf(v.lang.replace('_', '-'));
  if (ri >= 0) sc += 10 - ri * 3;
  return sc;
}
function voicesFor(code = state.course) {
  const pre = C[code].voice.slice(0, 2);
  return voices.filter(v => v.lang.replace('_', '-').toLowerCase().startsWith(pre)).sort((a, b) => voiceScore(b, code) - voiceScore(a, code));
}
function pickVoice(code = state.course) {
  const list = voicesFor(code); if (!list.length) return null;
  const chosen = (state.settings.voices || {})[code];
  return list.find(v => v.name === chosen) || list[0];
}
// Áudio gravado (opcional): audio/manifest.json → { "en": { "texto": "audio/en/xxxx.mp3" } }
let AUDIO = {};
fetch('audio/manifest.json').then(r => r.ok ? r.json() : {}).then(j => { AUDIO = j || {}; }).catch(() => {});
let player = null;
function speak(text, slow = false, code = state.course) {
  if (!text) return;
  const clip = AUDIO[code] && (AUDIO[code][text] || AUDIO[code][text.toLowerCase()]);
  if (clip) {
    try { if (HAS_TTS) speechSynthesis.cancel(); if (player) player.pause(); player = new Audio(clip); player.playbackRate = slow ? 0.7 : 1; player.play().catch(() => {}); return; } catch (e) {}
  }
  if (!HAS_TTS) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v = pickVoice(code);
  u.lang = v ? v.lang : C[code].voice;
  if (v) u.voice = v;
  u.rate = slow ? 0.6 : 0.95;
  u.pitch = 1;
  speechSynthesis.speak(u);
}

/* ---------- Modal / toast / confetti ---------- */
function modal(inner, { cls = '', dismiss = true } = {}) {
  const bg = h(`<div class="modal-bg"><div class="modal ${cls}">${inner}</div></div>`);
  if (dismiss) bg.addEventListener('click', e => { if (e.target === bg) bg.remove(); });
  document.body.appendChild(bg);
  return bg;
}
const closeModal = () => { const m = $$('.modal-bg').pop(); if (m) m.remove(); };
function toast(msg) { $$('.toast').forEach(t => t.remove()); const t = h(`<div class="toast">${esc(msg)}</div>`); document.body.appendChild(t); setTimeout(() => t.remove(), 2700); }
function confetti() {
  const c = h('<canvas class="confetti"></canvas>'); document.body.appendChild(c);
  const ctx = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
  const cols = ['#7B61FF', '#14B87A', '#FFB020', '#FF5FA2', '#1EA4F0', '#FF8A3D'];
  const ps = Array.from({ length: 140 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * .5, vx: (Math.random() - .5) * 4, vy: 2 + Math.random() * 4, r: Math.random() * 6.28, vr: (Math.random() - .5) * .3, s: 6 + Math.random() * 6, col: pick(cols) }));
  let f = 0;
  (function step() {
    ctx.clearRect(0, 0, c.width, c.height);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .05; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.col; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
    if (++f < 200) requestAnimationFrame(step); else c.remove();
  })();
}

/* ---------- Percurso ---------- */
const nodeId = (u, n) => `${u}-${n}`;
const isDone = (u, n) => !!cstate().done[nodeId(u, n)];
const hasContent = u => { const x = course().units[u]; return !!(x && x.words.length && x.sentences.length); };
const sectionsOf = () => course().sections || [{ title: 'Fundamentos', cefr: 'A1', desc: 'O essencial para começares a falar' }];
const secOf = u => course().units[u].s || 0;
const unitsOfSection = s => course().units.map((x, u) => u).filter(u => secOf(u) === s);
const lessonsDone = id => (cstate().lp || {})[id] || 0;
function currentNode() {
  const units = course().units;
  for (let u = 0; u < units.length; u++) { if (!hasContent(u)) return null; for (let n = 0; n < PATTERN.length; n++) if (!isDone(u, n)) return { u, n }; }
  return null;
}
const order = (u, n) => u * PATTERN.length + n;
function isUnlocked(u, n) { if (!hasContent(u)) return false; const cur = currentNode(); return !cur || order(u, n) <= order(cur.u, cur.n); }
function sectionProgress(sec) {
  const us = unitsOfSection(sec).filter(hasContent); if (!us.length) return 0;
  let d = 0; us.forEach(u => PATTERN.forEach((_, n) => { if (isDone(u, n)) d++; }));
  return d / (us.length * PATTERN.length);
}
function activeSection() {
  const cs = cstate(); if (typeof cs.view === 'number' && cs.view < sectionsOf().length) return cs.view;
  const cur = currentNode(); if (cur) return secOf(cur.u);
  let last = 0; course().units.forEach((x, u) => { if (hasContent(u)) last = secOf(u); }); return last;
}
const lessonIndex = n => PATTERN.slice(0, n).filter(x => x === 'L').length;
const LESSONS_PER_UNIT = PATTERN.filter(x => x === 'L').length;

/* ---------- Geração de exercícios ---------- */
function dictFor(code) {
  const d = Object.assign({}, C[code].extra);
  C[code].units.forEach(u => u.words.forEach(([t, p]) => d[norm(t)] = p));
  return d;
}
function poolFor(opts) {
  const units = course().units; const W = [], S = [];
  const addUnit = (u, wr, sr) => {
    const unit = units[u];
    unit.words.forEach((w, i) => { if (!wr || (i >= wr[0] && i < wr[1])) W.push({ u, i, w }); });
    unit.sentences.forEach((s, i) => { if (!sr || (i >= sr[0] && i < sr[1])) S.push({ u, i, s }); });
  };
  if (opts.mode === 'lesson') {
    const li = opts.li;
    const wr = [[0, 4], [2, 6], [4, 8]][li] || null, sr = [[0, 3], [2, 5], [4, 7]][li] || null;
    addUnit(opts.u, wr, sr);
  } else if (opts.mode === 'unit' || opts.mode === 'legend' || opts.mode === 'story') addUnit(opts.u);
  else if (opts.mode === 'jump') for (let u = 0; u < opts.u; u++) addUnit(u);
  else {
    const cur = currentNode(); const maxU = cur ? (cur.n === 0 && cur.u > 0 ? cur.u - 1 : cur.u) : units.length - 1;
    for (let u = 0; u <= maxU; u++) addUnit(u);
  }
  return { W, S };
}
const RECIPES = {
  lesson: ['select', 'select', 'match', 'bank_tg', 'bank_pt', 'listen', 'fill', 'bank_tg', 'type', 'meaning', 'bank_pt', 'speak'],
  unit: ['match', 'bank_tg', 'bank_pt', 'listen', 'type', 'fill', 'bank_tg', 'speak', 'type', 'bank_pt', 'listen', 'match', 'bank_tg', 'type'],
  practice: ['bank_tg', 'select', 'bank_pt', 'listen', 'meaning', 'fill', 'type', 'match', 'bank_tg', 'speak', 'bank_pt'],
  legend: ['bank_pt', 'type', 'listen', 'bank_tg', 'meaning', 'type', 'bank_pt', 'listen', 'fill', 'type', 'bank_tg', 'speak', 'bank_pt', 'type', 'match'],
  blitz: ['match', 'match', 'match', 'match', 'match'],
  listen: ['listen', 'listen', 'listen', 'listen', 'listen', 'listen', 'listen', 'listen'],
  speak: ['speak', 'speak', 'speak', 'speak', 'speak', 'speak']
};
const canListen = () => HAS_TTS && state.settings.listen && state.settings.listenOff < Date.now();
const canSpeak = () => !!SR && state.settings.speak && state.settings.speakOff < Date.now();
function bagger(arr) { let b = []; return () => { if (!b.length) b = shuffle(arr.slice()); return b.pop(); }; }

function buildItems(opts) {
  const code = state.course, units = course().units;
  if (opts.mode === 'mistakes') {
    return state.mistakes.filter(m => m.c === code).slice(0, 10).map(m => {
      if (m.k === 'w') { const W = units[m.u].words.map((w, i) => ({ u: m.u, i, w })); return genSelect(W[m.i], units, m); }
      const s = { u: m.u, i: m.i, s: units[m.u].sentences[m.i] };
      return pick([genBank('tg', s, units), genBank('pt', s, units), genType(s)]);
    });
  }
  const { W, S } = poolFor(opts);
  if (!W.length || !S.length) return [];
  if (opts.mode === 'story') {
    const ss = shuffle(S.slice()).slice(0, 4); const who = shuffle(['Léa', 'Hugo', 'Kiri', 'Inès']).slice(0, 2);
    const line = (x, i) => ({ t: 'line', s: x, who: who[i % 2], side: i % 2 });
    return [line(ss[0], 0), line(ss[1], 1), genMeaning(ss[1], units), line(ss[2], 0), line(ss[3], 1), genMeaning(ss[3], units), genBank('tg', ss[2], units)];
  }
  const recipe = (opts.mode === 'jump' ? RECIPES.unit : RECIPES[opts.mode] || RECIPES.lesson).map(t =>
    t === 'listen' && !canListen() ? 'bank_tg' : t === 'speak' && !canSpeak() ? 'bank_pt' : t);
  const nw = bagger(W), ns = bagger(S);
  return recipe.map(t => {
    switch (t) {
      case 'select': return genSelect(nw(), units);
      case 'match': return genMatch(W, units);
      case 'bank_tg': return genBank('tg', ns(), units);
      case 'bank_pt': return genBank('pt', ns(), units);
      case 'listen': return { t: 'listen', s: ns(), ...distract('tg', null, units) };
      case 'type': return genType(ns());
      case 'speak': return { t: 'speak', s: ns() };
      case 'fill': return genFill(S, units) || genSelect(nw(), units);
      case 'meaning': return genMeaning(ns(), units);
    }
  }).map(it => {
    if (it.t === 'listen') { const d = distract('tg', it.s, units); it.distract = d.distract; }
    return it;
  });
}
function genSelect(w, units, ref) {
  const others = shuffle(units[w.u].words.filter((x, i) => i !== w.i)).slice(0, 2);
  const options = shuffle([w.w, ...others]);
  return { t: 'select', w, options, answer: options.indexOf(w.w), ref: ref || { u: w.u, k: 'w', i: w.i } };
}
function genMatch(W, units) {
  const seen = new Set(); const pairs = [];
  for (const x of shuffle(W.slice())) { if (!seen.has(x.w[0]) && pairs.length < 5) { seen.add(x.w[0]); pairs.push(x.w); } }
  for (const x of shuffle(units[W[0].u].words.slice())) { if (!seen.has(x[0]) && pairs.length < 5) { seen.add(x[0]); pairs.push(x); } }
  return { t: 'match', pairs };
}
function distract(lang, s, units) {
  if (!s) return { distract: [] };
  const answer = new Set(tokens(lang === 'tg' ? s.s[0] : s.s[1]).map(norm));
  const pool = [];
  units[s.u].sentences.forEach(x => tileTokens(lang === 'tg' ? x[0] : x[1]).forEach(t => { const n = norm(t); if (!answer.has(n) && !KEEP_CASE.test(t)) pool.push(t); }));
  return { distract: shuffle([...new Set(pool)]).slice(0, 3) };
}
// bank 'tg' = vê frase na língua-alvo e constrói em português; 'pt' = vê português e constrói na língua-alvo
function genBank(dir, s, units) {
  const outLang = dir === 'tg' ? 'pt' : 'tg';
  return { t: 'bank', dir, s, distract: distract(outLang, s, units).distract, ref: { u: s.u, k: 's', i: s.i } };
}
const genType = s => ({ t: 'type', s, ref: { u: s.u, k: 's', i: s.i } });
function genMeaning(s, units) {
  const others = shuffle(units[s.u].sentences.filter((x, i) => i !== s.i).map(x => x[1])).slice(0, 2);
  const options = shuffle([s.s[1], ...others]);
  return { t: 'meaning', s, options, answer: options.indexOf(s.s[1]), ref: { u: s.u, k: 's', i: s.i } };
}
function genFill(S, units) {
  for (const s of shuffle(S.slice()).slice(0, 7)) {
    const words = units[s.u].words; const toks = tokens(s.s[0]);
    const idx = toks.findIndex(tk => words.some(w => norm(w[0]) === norm(tk)));
    if (idx < 0) continue;
    const ans = toks[idx];
    const opts = shuffle(words.filter(w => norm(w[0]) !== norm(ans))).slice(0, 2).map(w => w[0]);
    return { t: 'fill', s, idx, toks, options: shuffle([ans.toLowerCase() === ans ? ans : ans, ...opts]), answer: ans, ref: { u: s.u, k: 's', i: s.i } };
  }
  return null;
}

/* ---------- Lição ---------- */
let L = null;
function sentenceHtml(text) {
  const d = dictFor(state.course);
  return text.split(/(\s+)/).map(part => {
    if (/^\s+$/.test(part) || !part) return part;
    const key = norm(part);
    const m = d[key];
    return m ? `<span class="tok" data-act="tip" data-m="${esc(m)}" data-w="${esc(part.replace(/[.,!?¿¡]/g, ''))}">${esc(part)}</span>` : esc(part);
  }).join('');
}

function startLesson(opts) {
  checkDay();
  const costs = ['lesson', 'unit', 'jump'].includes(opts.mode);
  if (costs && !unlimited() && state.hearts <= 0) return heartsModal();
  const items = buildItems(opts);
  if (!items.length) return toast('Ainda não há nada para praticar aqui.');
  $$('.pop').forEach(p => p.remove());
  L = { opts, items, idx: 0, total: items.filter(x => x.t !== 'line').length + items.filter(x => x.t === 'line').length, correct: 0, wrong: 0, combo: 0, maxCombo: 0, start: Date.now(), costs, requeued: new Set(), ex: null, phase: 'check', dead: false, failed: false, listenOk: 0 };
  if (opts.mode === 'blitz') L.deadline = Date.now() + 75000;
  const el = h(`<div class="lesson" id="lesson">
    <div class="lesson-top"><button class="icon-btn" data-act="quitLesson" aria-label="Sair">${I.close}</button>
      <div style="flex:1;position:relative"><span class="combo-tag"></span><div class="progress"><i style="width:0%"></i></div></div>
      <div class="lesson-hearts">${I.heart}<span></span></div></div>
    <div class="lesson-body"></div>
    <div class="lesson-foot"><div class="foot-inner"><button class="btn ghost plain skip">Saltar</button><div class="fb hidden"></div><button class="btn go" disabled>Verificar</button></div></div></div>`);
  document.body.appendChild(el);
  $('.skip', el).onclick = onSkip;
  $('.go', el).onclick = onMain;
  updateLessonTop();
  nextEx();
}
function updateLessonTop() {
  const el = $('#lesson'); if (!el) return;
  $('.progress i', el).style.width = (L.correct / L.total * 100) + '%';
  const lh = $('.lesson-hearts', el);
  if (L.deadline) { lh.style.color = 'var(--blue)'; lh.innerHTML = `${I.clock}<span>${fmtTime(L.deadline - Date.now())}</span>`; lh.style.visibility = 'visible'; }
  else if (L.opts.mode === 'legend') { lh.style.color = 'var(--gold)'; lh.innerHTML = `${I.star}<span>${Math.max(0, 3 - L.wrong)}</span>`; lh.style.visibility = 'visible'; }
  else { $('span', lh).textContent = unlimited() ? '∞' : state.hearts; lh.style.visibility = L.costs ? 'visible' : 'hidden'; }
  $('.combo-tag', el).textContent = L.combo >= 3 ? `${L.combo} seguidas!` : '';
}
function setReady(v) { const b = $('#lesson .go'); if (b && L.phase === 'check') b.disabled = !v; }
function nextEx() {
  if (L.idx >= L.items.length) return finishLesson();
  const it = L.items[L.idx];
  const body = $('#lesson .lesson-body');
  L.ex = makeEx(it);
  body.innerHTML = ''; body.appendChild(L.ex.el); body.scrollTop = 0;
  const foot = $('#lesson .lesson-foot'); foot.className = 'lesson-foot';
  $('.fb', foot).classList.add('hidden');
  const skip = $('.skip', foot); skip.classList.remove('hidden');
  skip.textContent = it.t === 'listen' ? 'Não posso ouvir agora' : it.t === 'speak' ? 'Não posso falar agora' : 'Saltar';
  skip.classList.toggle('hidden', it.t === 'match' || it.t === 'line');
  const main = $('.go', foot); main.className = 'btn go'; main.textContent = 'Verificar'; main.disabled = true;
  L.phase = 'check';
  if (L.ex.mount) L.ex.mount();
}
function onSkip() {
  if (L.phase !== 'check') return;
  const it = L.items[L.idx];
  if (it.t === 'listen' || it.t === 'speak') {
    state.settings[it.t === 'listen' ? 'listenOff' : 'speakOff'] = Date.now() + 3600e3; save();
    toast(it.t === 'listen' ? 'Exercícios de audição desativados durante 1 hora.' : 'Exercícios de fala desativados durante 1 hora.');
    L.items.splice(L.idx, 1); L.total--;
    for (let j = L.idx; j < L.items.length; j++) {
      const x = L.items[j];
      if ((x.t === 'listen' && it.t === 'listen') || (x.t === 'speak' && it.t === 'speak')) L.items[j] = genBank(x.t === 'listen' ? 'pt' : 'tg', x.s, course().units);
    }
    updateLessonTop(); return nextEx();
  }
  result(false, L.ex.answerText());
}
function onMain() {
  if (L.phase === 'check') {
    const r = L.ex.check(); if (!r) return;
    if (r.silent) { L.correct++; L.idx++; updateLessonTop(); return nextEx(); }
    result(r.ok, r.correct, r.note);
  } else {
    if (L.failed) return failScreen(L.opts.mode === 'legend' ? 'O nível Lendário só permite 2 erros. Tenta outra vez!' : 'Não foi desta. Tenta outra vez!');
    if (L.dead) return outOfHeartsModal();
    L.idx++; nextEx();
  }
}
function result(ok, correctText, note) {
  const it = L.items[L.idx];
  L.phase = 'continue';
  L.ex.el.style.pointerEvents = 'none';
  const foot = $('#lesson .lesson-foot'); const fb = $('.fb', foot);
  $('.skip', foot).classList.add('hidden'); fb.classList.remove('hidden');
  const main = $('.go', foot); main.disabled = false; main.textContent = 'Continuar';
  if (ok) {
    L.correct++; L.combo++; L.maxCombo = Math.max(L.maxCombo, L.combo);
    state.daily.combo = Math.max(state.daily.combo || 0, L.combo);
    if (it.t === 'listen') L.listenOk++;
    if (L.opts.mode === 'mistakes' && it.ref) state.mistakes = state.mistakes.filter(m => !(m.c === state.course && m.u === it.ref.u && m.k === it.ref.k && m.i === it.ref.i));
    sfx.ok(); foot.classList.add('ok'); main.classList.add('ok');
    fb.innerHTML = `<div class="fb-ico">${I.check}</div><div><h3>${pick(PRAISE)}</h3>${note ? `<p>${esc(note)}</p>` : ''}</div>`;
  } else {
    L.wrong++; L.combo = 0;
    if (!L.requeued.has(L.idx) && it.t !== 'match') { L.requeued.add(L.items.length); L.items.push(it); }
    if (it.ref) {
      const m = { c: state.course, ...it.ref };
      if (!state.mistakes.some(x => x.c === m.c && x.u === m.u && x.k === m.k && x.i === m.i)) state.mistakes.unshift(m);
      state.mistakes = state.mistakes.slice(0, 40);
    }
    if (L.costs && !unlimited()) {
      if (state.hearts === MAX_HEARTS) state.heartsTs = Date.now();
      state.hearts = Math.max(0, state.hearts - 1);
      if (state.hearts === 0) L.dead = true;
    }
    if (L.opts.mode === 'legend' && L.wrong >= 3) L.failed = true;
    sfx.bad(); foot.classList.add('bad'); main.classList.add('bad');
    fb.innerHTML = `<div class="fb-ico">${I.close}</div><div><h3>Resposta correta:</h3><p>${esc(correctText)}</p></div>`;
    main.textContent = L.dead ? 'Continuar' : 'Percebi';
  }
  save(); updateLessonTop();
}

function makeEx(it) {
  const lang = course().name;
  const ex = { el: null, check: null, answerText: () => '' };
  const sentencePrompt = (text, withSpeak = true) => `<div class="prompt-row">${mascot('happy')}<div class="bubble">${withSpeak && HAS_TTS ? `<button class="speak-btn small" data-act="say" data-arg="${esc(text)}">${I.speaker}</button>` : ''}<span>${sentenceHtml(text)}</span></div></div>`;
  const bankUi = () => `<div class="answer-zone"></div><div class="bank"></div>`;
  function wireBank(words, speakTiles) {
    const zone = $('.answer-zone', ex.el), bank = $('.bank', ex.el);
    words.forEach((w, i) => {
      const b = h(`<button class="tile">${esc(w)}</button>`);
      b.onclick = () => {
        if (b.classList.contains('used')) return;
        sfx.tap(); if (speakTiles) speak(w);
        b.classList.add('used');
        const z = h(`<button class="tile">${esc(w)}</button>`);
        z.onclick = () => { z.remove(); b.classList.remove('used'); setReady(zone.children.length > 0); };
        zone.appendChild(z); setReady(true);
      };
      bank.appendChild(b);
    });
    return () => $$('.tile', zone).map(t => t.textContent).join(' ');
  }
  switch (it.t) {
    case 'select': {
      const [tg, pt] = it.w.w;
      ex.el = h(`<div class="ex"><div class="ex-badge">${I.sparkle} Nova palavra</div><h2 class="ex-title">Qual destes é «${esc(pt)}»?</h2>
        <div class="choices">${it.options.map((o, i) => `<button class="choice" data-i="${i}"><span class="key">${i + 1}</span><span class="emo">${o[2]}</span><span>${esc(o[0])}</span></button>`).join('')}</div></div>`);
      let sel = -1;
      const choose = i => { sel = i; $$('.choice', ex.el).forEach((c, j) => c.classList.toggle('sel', j === i)); speak(it.options[i][0]); sfx.tap(); setReady(true); };
      $$('.choice', ex.el).forEach((c, i) => c.onclick = () => choose(i));
      ex.key = k => { const n = +k - 1; if (n >= 0 && n < it.options.length) choose(n); };
      ex.answerText = () => tg;
      ex.check = () => sel < 0 ? null : { ok: sel === it.answer, correct: tg };
      break;
    }
    case 'bank': {
      const [tg, pt] = it.s.s;
      const toPt = it.dir === 'tg';
      const answer = toPt ? pt : tg;
      const words = shuffle([...tileTokens(answer), ...it.distract]);
      ex.el = h(`<div class="ex"><h2 class="ex-title">${toPt ? 'Traduz esta frase' : 'Escreve isto em ' + lang.toLowerCase()}</h2>
        ${toPt ? sentencePrompt(tg) : `<div class="prompt-row">${mascot('happy')}<div class="bubble"><span>${esc(pt)}</span></div></div>`}${bankUi()}</div>`);
      const get = wireBank(words, !toPt);
      const accept = toPt ? [pt, ...it.s.s[2]] : [tg];
      ex.answerText = () => answer;
      ex.mount = () => { if (toPt) speak(tg); };
      ex.check = () => { const a = norm(get()); if (!a) return null; return { ok: accept.some(x => norm(x) === a), correct: answer }; };
      break;
    }
    case 'listen': {
      const tg = it.s.s[0];
      const words = shuffle([...tileTokens(tg), ...it.distract]);
      ex.el = h(`<div class="ex"><h2 class="ex-title">Escreve o que ouves</h2>
        <div class="big-speakers"><button class="speak-btn" data-act="say" data-arg="${esc(tg)}">${I.speaker}</button><button class="speak-btn slow" data-act="saySlow" data-arg="${esc(tg)}">${I.turtle}</button></div>${bankUi()}</div>`);
      const get = wireBank(words, true);
      ex.mount = () => setTimeout(() => speak(tg), 250);
      ex.answerText = () => tg;
      ex.check = () => { const a = norm(get()); if (!a) return null; return { ok: a === norm(tg), correct: `${tg} — ${it.s.s[1]}` }; };
      break;
    }
    case 'type': {
      const [tg, pt, alts] = it.s.s;
      ex.el = h(`<div class="ex"><h2 class="ex-title">Traduz esta frase</h2>${sentencePrompt(tg)}
        <textarea class="type-area" placeholder="Escreve em português" autocapitalize="off" autocomplete="off" spellcheck="false"></textarea></div>`);
      const ta = $('textarea', ex.el);
      ta.oninput = () => setReady(ta.value.trim().length > 0);
      ta.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); if (ta.value.trim()) onMain(); } };
      ex.mount = () => { speak(tg); setTimeout(() => ta.focus(), 60); };
      ex.answerText = () => pt;
      ex.check = () => {
        const a = norm(ta.value); if (!a) return null;
        const acc = [pt, ...alts].map(norm);
        if (acc.includes(a)) return { ok: true, correct: pt };
        if (acc.some(x => deaccent(x) === deaccent(a))) return { ok: true, correct: pt, note: `Atenção aos acentos: ${pt}` };
        if (acc.some(x => x.length > 6 && lev(x, a) <= 1)) return { ok: true, correct: pt, note: `Tens um erro de digitação: ${pt}` };
        return { ok: false, correct: pt };
      };
      break;
    }
    case 'line': {
      const tg = it.s.s[0];
      const av = it.who === 'Kiri' ? mascot('happy', 'mascot').replace('class="mascot"', 'class="mascot" style="width:80px;flex:none"') : `<span class="avatar" style="background:${it.side ? 'var(--pink)' : 'var(--teal)'};width:64px;height:64px;font-size:26px">${esc(it.who.charAt(0))}</span>`;
      ex.el = h(`<div class="ex"><div class="ex-badge" style="color:var(--primary)">${I.book} História</div>
        <div class="prompt-row" style="${it.side ? 'flex-direction:row-reverse' : ''}">${av}<div class="bubble" style="flex-direction:column;align-items:flex-start"><small class="muted" style="font-size:13px;font-weight:900">${esc(it.who)}</small><div style="display:flex;gap:10px;align-items:center">${HAS_TTS ? `<button class="speak-btn small" data-act="say" data-arg="${esc(tg)}">${I.speaker}</button>` : ''}<span>${sentenceHtml(tg)}</span></div></div></div>
        <p class="muted" style="text-align:center;margin:0">Toca nas palavras sublinhadas para veres o significado.</p></div>`);
      ex.mount = () => { speak(tg); const b = $('#lesson .go'); b.disabled = false; b.textContent = 'Continuar'; };
      ex.check = () => ({ ok: true, silent: true });
      break;
    }
    case 'meaning': {
      const tg = it.s.s[0];
      ex.el = h(`<div class="ex"><h2 class="ex-title">O que significa esta frase?</h2>${sentencePrompt(tg)}
        <div class="list-choices">${it.options.map((o, i) => `<button class="choice"><span class="key">${i + 1}</span>${esc(o)}</button>`).join('')}</div></div>`);
      let sel = -1;
      const choose = i => { sel = i; $$('.choice', ex.el).forEach((c, j) => c.classList.toggle('sel', j === i)); sfx.tap(); setReady(true); };
      $$('.choice', ex.el).forEach((c, i) => c.onclick = () => choose(i));
      ex.key = k => { const n = +k - 1; if (n >= 0 && n < it.options.length) choose(n); };
      ex.mount = () => speak(tg);
      ex.answerText = () => it.s.s[1];
      ex.check = () => sel < 0 ? null : { ok: sel === it.answer, correct: it.s.s[1] };
      break;
    }
    case 'fill': {
      const [tg, pt] = it.s.s;
      const sent = it.toks.map((t, i) => i === it.idx ? '<span class="blank">&nbsp;</span>' : `<span>${esc(t)}</span>`).join(' ');
      ex.el = h(`<div class="ex"><h2 class="ex-title">Completa a frase</h2><div class="fill-sentence">${sent}</div><p class="muted" style="margin:-8px 0 0;font-size:17px">${esc(pt)}</p>
        <div class="list-choices">${it.options.map((o, i) => `<button class="choice"><span class="key">${i + 1}</span>${esc(o)}</button>`).join('')}</div></div>`);
      let sel = -1;
      const choose = i => { sel = i; $$('.choice', ex.el).forEach((c, j) => c.classList.toggle('sel', j === i)); $('.blank', ex.el).textContent = it.options[i]; speak(it.options[i]); setReady(true); };
      $$('.choice', ex.el).forEach((c, i) => c.onclick = () => choose(i));
      ex.key = k => { const n = +k - 1; if (n >= 0 && n < it.options.length) choose(n); };
      ex.answerText = () => tg;
      ex.check = () => sel < 0 ? null : { ok: norm(it.options[sel]) === norm(it.answer), correct: tg };
      break;
    }
    case 'match': {
      const left = shuffle(it.pairs.slice()), right = shuffle(it.pairs.slice());
      ex.el = h(`<div class="ex"><h2 class="ex-title">Toca nos pares correspondentes</h2><div class="match">
        <div class="col">${left.map((p, i) => `<button class="choice" data-side="l" data-k="${esc(p[0])}"><span class="key">${i + 1}</span>${esc(p[0])}</button>`).join('')}</div>
        <div class="col">${right.map((p, i) => `<button class="choice" data-side="r" data-k="${esc(p[0])}"><span class="key">${(i + 6) % 10}</span>${esc(p[1])}</button>`).join('')}</div></div></div>`);
      let selL = null, selR = null, done = 0, busy = false;
      const tryPair = () => {
        if (!selL || !selR) return;
        busy = true;
        const a = selL, b = selR; selL = selR = null;
        a.classList.remove('sel'); b.classList.remove('sel');
        if (a.dataset.k === b.dataset.k) {
          a.classList.add('right'); b.classList.add('right'); sfx.pair();
          setTimeout(() => { a.classList.add('done'); b.classList.add('done'); a.classList.remove('right'); b.classList.remove('right'); busy = false;
            if (++done === it.pairs.length) { setReady(true); result(true, ''); } }, 300);
        } else {
          a.classList.add('wrong'); b.classList.add('wrong'); sfx.bad();
          setTimeout(() => { a.classList.remove('wrong'); b.classList.remove('wrong'); busy = false; }, 500);
        }
      };
      const click = c => {
        if (busy || c.classList.contains('done')) return;
        if (c.dataset.side === 'l') { if (selL) selL.classList.remove('sel'); selL = c; speak(c.dataset.k); }
        else { if (selR) selR.classList.remove('sel'); selR = c; sfx.tap(); }
        c.classList.add('sel'); tryPair();
      };
      $$('.choice', ex.el).forEach(c => c.onclick = () => click(c));
      ex.key = k => { const n = k === '0' ? 9 : +k - 1; const all = [...$$('.col:first-child .choice', ex.el), ...$$('.col:last-child .choice', ex.el)]; if (all[n]) click(all[n]); };
      ex.check = () => ({ ok: true, correct: '' });
      break;
    }
    case 'speak': {
      const tg = it.s.s[0];
      ex.el = h(`<div class="ex"><h2 class="ex-title">Lê em voz alta</h2>${sentencePrompt(tg)}
        <button class="mic-btn">${I.mic}<span>Carrega para falar</span></button><div class="heard"></div></div>`);
      let score = null; const btn = $('.mic-btn', ex.el), heard = $('.heard', ex.el);
      btn.onclick = () => {
        let rec;
        try { rec = new SR(); } catch (e) { toast('O reconhecimento de voz não está disponível.'); return; }
        rec.lang = course().voice; rec.interimResults = true; rec.maxAlternatives = 3;
        btn.classList.add('rec'); $('span', btn).textContent = 'A ouvir…';
        let best = '';
        rec.onresult = e => { best = Array.from(e.results).map(r => r[0].transcript).join(' '); heard.textContent = best; };
        rec.onerror = e => { if (e.error === 'not-allowed') toast('Permite o acesso ao microfone para fazeres este exercício.'); };
        rec.onend = () => {
          btn.classList.remove('rec'); $('span', btn).textContent = 'Tentar outra vez';
          if (!best) return;
          const want = norm(tg).split(' '), got = new Set(norm(best).split(' ').map(deaccent));
          score = want.filter(w => got.has(deaccent(w))).length / want.length;
          setReady(true);
        };
        rec.start();
      };
      ex.answerText = () => tg;
      ex.check = () => score === null ? null : { ok: score >= 0.7, correct: tg, note: score >= 0.7 && score < 1 ? 'Quase perfeito!' : '' };
      break;
    }
  }
  return ex;
}

function finishLesson() {
  const o = L.opts; const cs = cstate();
  const secs = Date.now() - L.start;
  const acc = Math.round(L.correct / (L.correct + L.wrong || 1) * 100);
  const perfect = L.wrong === 0;
  const questsBefore = state.quests.list.filter(questDone).length;
  let base = 10;
  if (o.mode === 'lesson' && o.redo) base = 5;
  if (o.mode === 'unit' || o.mode === 'jump') base = 20;
  if (o.mode === 'unit' && isDone(o.u, o.n)) base = 10;
  if (o.mode === 'story') base = 15;
  if (o.mode === 'legend') base = 40;
  if (o.mode === 'blitz') base = 10;
  if (['practice', 'listen', 'speak', 'mistakes'].includes(o.mode)) base = 5;
  if (perfect && o.mode !== 'mistakes') base += 5;
  const xp = addXp(base);
  state.lessons++; state.daily.lessons++;
  if (perfect) { state.perfect++; state.daily.perfect++; }
  if (acc >= 80) state.daily.accurate++;
  state.daily.listen = (state.daily.listen || 0) + L.listenOk;
  if (['practice', 'listen', 'speak'].includes(o.mode) && state.hearts < MAX_HEARTS) state.hearts++;
  const units = course().units;
  const learn = u => units[u].words.forEach(w => { if (!cs.words.includes(w[0])) cs.words.push(w[0]); });
  const id = o.u !== undefined ? nodeId(o.u, o.n) : null;
  if (o.mode === 'lesson' && !cs.done[id]) { cs.lp ||= {}; cs.lp[id] = (cs.lp[id] || 0) + 1; if (cs.lp[id] >= LPN) cs.done[id] = true; learn(o.u); }
  if (o.mode === 'unit' || o.mode === 'story') { cs.done[id] = true; learn(o.u); }
  if (o.mode === 'legend') { cs.legend ||= {}; cs.legend[o.u] = true; }
  if (o.mode === 'jump') { for (let u = 0; u < o.u; u++) { if (!hasContent(u)) continue; PATTERN.forEach((_, n) => cs.done[nodeId(u, n)] = true); learn(u); } cs.view = secOf(o.u); }
  if (o.mode === 'unit' && o.u + 1 < units.length && secOf(o.u + 1) !== secOf(o.u) && typeof cs.view === 'number') cs.view = secOf(o.u + 1);
  let streakUp = false;
  const t = today();
  if (state.lastDay !== t) {
    state.streak = state.lastDay === addDays(t, -1) ? state.streak + 1 : 1;
    state.lastDay = t; state.bestStreak = Math.max(state.bestStreak, state.streak); streakUp = true;
  }
  const questsAfter = state.quests.list.filter(questDone).length;
  save();
  sfx.done(); confetti();
  const el = $('#lesson');
  const title = { jump: 'Salto concluído!', story: 'História concluída!', legend: 'Nível Lendário!', blitz: 'Todos os pares!', unit: 'Unidade dominada!' }[o.mode] || (perfect ? 'Lição perfeita!' : 'Lição concluída!');
  const lpNote = o.mode === 'lesson' && !o.redo && id ? (cs.done[id] ? 'Nível concluído! 🎉' : `Lição ${cs.lp[id]} de ${LPN} deste nível`) : '';
  el.innerHTML = `<div class="end">${mascot('cheer')}<h1 ${o.mode === 'legend' ? 'style="color:#9B4DFF"' : ''}>${title}</h1>${lpNote ? `<p class="muted" style="margin:-8px 0 0;font-size:18px">${lpNote}</p>` : ''}
    <div class="end-cards">
      <div class="end-card" style="--c:var(--gold)"><small>XP total${doubleOn() ? ' (x2)' : ''}</small><div>${I.bolt}${xp}</div></div>
      <div class="end-card" style="--c:var(--blue)"><small>${secs < 120000 ? 'Rapidíssimo' : 'Tempo'}</small><div>${I.clock}${fmtTime(secs)}</div></div>
      <div class="end-card" style="--c:var(--ok)"><small>${acc >= 90 ? 'Fantástico' : 'Precisão'}</small><div>${I.target}${acc}%</div></div>
    </div>${['practice', 'listen', 'speak'].includes(o.mode) ? `<p class="muted" style="margin:0">Ganhaste uma vida por praticares! ❤️</p>` : ''}</div>
    <div class="lesson-foot"><div class="foot-inner" style="justify-content:flex-end"><button class="btn ok go">Continuar</button></div></div>`;
  $('.go', el).onclick = () => {
    if (streakUp) return streakScreen(() => closeLesson(questsAfter > questsBefore));
    closeLesson(questsAfter > questsBefore);
  };
}
function failScreen(msg) {
  L.deadline = 0; sfx.bad();
  const el = $('#lesson');
  el.innerHTML = `<div class="end">${mascot('sad')}<h1 style="color:var(--bad)">${L.opts.mode === 'blitz' ? 'O tempo acabou!' : 'Quase!'}</h1><p class="muted" style="max-width:380px;margin:0;font-size:18px">${esc(msg)}</p></div>
    <div class="lesson-foot"><div class="foot-inner"><button class="btn ghost plain" id="fail-quit">Sair</button><button class="btn go" id="fail-retry">Tentar outra vez</button></div></div>`;
  const opts = L.opts;
  $('#fail-quit', el).onclick = () => closeLesson();
  $('#fail-retry', el).onclick = () => { el.remove(); L = null; startLesson(opts); };
}
function weekRow() {
  const t = today(); const ws = ymd(weekStart());
  return `<div class="week">${['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => {
    const day = addDays(ws, i); const on = !!state.history[day]; const frz = state.frozenDays.includes(day);
    return `<div>${d}<i class="${on ? 'on' : frz ? 'frz' : ''}">${on ? I.check : frz ? I.snow : ''}</i></div>`;
  }).join('')}</div>`;
}
function streakScreen(next) {
  const el = $('#lesson');
  tone(523, .2, 'triangle'); tone(784, .4, 'triangle', .15);
  el.innerHTML = `<div class="end"><div class="flame-big" style="color:var(--orange)">${I.flame}</div><div class="streak-big">${state.streak}</div>
    <h1 style="color:var(--orange)">${state.streak === 1 ? 'dia de sequência!' : 'dias de sequência!'}</h1>${weekRow()}
    <p class="muted" style="max-width:380px;margin:0">${state.streak === 1 ? 'Começaste uma sequência! Volta amanhã para a manteres.' : 'Pratica todos os dias para não perderes a tua sequência.'}</p></div>
    <div class="lesson-foot"><div class="foot-inner" style="justify-content:flex-end"><button class="btn go" style="background:var(--orange);box-shadow:0 4px 0 var(--orange-d)">Continuar</button></div></div>`;
  $('.go', el).onclick = next;
}
function closeLesson(questMsg) {
  if (HAS_TTS) speechSynthesis.cancel();
  $('#lesson')?.remove(); L = null;
  if (location.hash && location.hash !== '#learn' && !['#practice'].includes(location.hash)) location.hash = 'learn';
  render(true);
  if (questMsg) setTimeout(() => toast('Missão diária concluída! Vai às Missões buscar a recompensa.'), 400);
}
function quitLesson() {
  const m = modal(`${mascot('sad', 'mascot')}<h2>Espera, não vás!</h2><p>Se saíres agora, perdes o progresso desta lição.</p>
    <button class="btn full" data-act="closeModal">Continuar a aprender</button><button class="btn link" id="really-quit" style="color:var(--bad)">Sair da lição</button>`);
  $('.mascot', m).style.cssText = 'width:120px;margin:0 auto';
  $('#really-quit', m).onclick = () => { m.remove(); closeLesson(); };
}
function outOfHeartsModal() {
  const m = modal(`<div class="hearts-row" style="color:var(--line)">${I.heart.repeat(5)}</div><h2>Ficaste sem vidas!</h2>
    <p>Recarrega as vidas para continuares esta lição, ou pratica para ganhares vidas.</p>
    <button class="btn full blue" id="oh-refill" ${state.gems < REFILL_COST ? 'disabled' : ''}>Recarregar · ${I.gem.replace('<svg', '<svg width="20" height="20"')} ${REFILL_COST}</button>
    ${!state.superTried ? '<button class="btn full" id="oh-super">Experimentar Kiri Super grátis</button>' : ''}
    <button class="btn link" id="oh-quit" style="color:var(--muted)">Sair da lição</button>`, { dismiss: false });
  $('#oh-refill', m).onclick = () => { state.gems -= REFILL_COST; state.hearts = MAX_HEARTS; L.dead = false; save(); m.remove(); sfx.coin(); updateLessonTop(); L.idx++; nextEx(); };
  const sp = $('#oh-super', m); if (sp) sp.onclick = () => { activateSuper(); L.dead = false; m.remove(); updateLessonTop(); L.idx++; nextEx(); };
  $('#oh-quit', m).onclick = () => { m.remove(); closeLesson(); };
}
function activateSuper() { state.superUntil = Date.now() + 7 * 864e5; state.superTried = true; state.hearts = MAX_HEARTS; save(); toast('Kiri Super ativado: vidas ilimitadas durante 7 dias!'); }

/* ---------- Modais da app ---------- */
function heartsModal() {
  checkDay();
  const full = state.hearts >= MAX_HEARTS;
  modal(`<div class="hearts-row" style="color:var(--bad)">${Array.from({ length: 5 }, (_, i) => `<span style="color:${i < state.hearts || unlimited() ? 'var(--bad)' : 'var(--line)'}">${I.heart}</span>`).join('')}</div>
    <h2>${unlimited() ? 'Vidas ilimitadas' : full ? 'Tens as vidas todas' : `Tens ${state.hearts} vida${state.hearts === 1 ? '' : 's'}`}</h2>
    <p>${unlimited() ? 'O Kiri Super está ativo. Aprende sem limites!' : full ? 'Continua a aprender! Perdes uma vida por cada erro numa lição.' : `Próxima vida em <b id="next-heart">${fmtTime(nextHeartIn())}</b>`}</p>
    ${!unlimited() ? `<button class="btn full blue" data-act="buy" data-arg="refill" ${full || state.gems < REFILL_COST ? 'disabled' : ''}>Recarregar vidas · ${REFILL_COST} gemas</button>
    <button class="btn full ghost" data-act="practiceNow">Praticar para ganhar vidas</button>
    ${!state.superTried ? '<button class="btn full" data-act="buy" data-arg="super">Vidas ilimitadas com Kiri Super</button>' : ''}` : ''}
    <button class="btn link" data-act="closeModal">Fechar</button>`);
}
function streakModal() {
  modal(`<div class="flame-big" style="color:${state.streak ? 'var(--orange)' : 'var(--line)'}">${I.flame}</div>
    <h2>${state.streak} dia${state.streak === 1 ? '' : 's'} de sequência</h2>
    <p>${state.lastDay === today() ? 'Já praticaste hoje. Boa!' : state.streak ? 'Faz uma lição hoje para estenderes a tua sequência!' : 'Faz uma lição para começares uma sequência!'}</p>
    ${weekRow()}<p>${I.snow.replace('<svg', '<svg width="18" height="18" style="color:var(--blue);vertical-align:-3px"')} Proteções de sequência: <b>${state.freezes}</b>/2</p>
    <button class="btn full" data-act="closeModal">Continuar</button>`);
}
function coursesModal() {
  modal(`<h2>Os meus cursos</h2><p>Todos os cursos a partir de português.</p><div class="course-grid">${Object.entries(C).map(([code, c]) =>
    `<button class="course-card ${code === state.course ? 'on' : ''}" data-act="setCourse" data-arg="${code}">${flag(code, 'lg')}${c.name}<small>${state.courses[code] ? fmtNum(state.courses[code].xp) + ' XP' : c.units.length + ' unidades'}</small></button>`).join('')}</div>`, { cls: 'wide' });
}
function guideModal(u) {
  const unit = course().units[u];
  modal(`<h2>Unidade ${u + 1}: ${esc(unit.title)}</h2><p>${esc(unit.desc)}</p>
    <h3 style="margin-top:8px">Palavras-chave</h3><div class="words">${unit.words.map(w => wordCard(w)).join('')}</div>
    <h3 style="margin-top:8px">Frases-chave</h3><div class="list">${unit.sentences.slice(0, 5).map(s => `<div class="list-item">${HAS_TTS ? `<button class="speak-btn small" data-act="say" data-arg="${esc(s[0])}">${I.speaker}</button>` : ''}<div class="grow"><h4>${esc(s[0])}</h4><p>${esc(s[1])}</p></div></div>`).join('')}</div>
    <button class="btn full" data-act="closeModal">Entendido</button>`, { cls: 'wide' });
}
const wordCard = w => `<div class="word"><span class="emo">${w[2]}</span><div><b>${esc(w[0])}</b><span>${esc(w[1])}</span></div>${HAS_TTS ? `<button class="speak-btn small" data-act="say" data-arg="${esc(w[0])}">${I.speaker}</button>` : ''}</div>`;
function leagueResultModal() {
  const p = state.league.pending; state.league.pending = null; save();
  const up = p.to > p.from, down = p.to < p.from;
  modal(`<div style="margin:0 auto">${leagueBadge(p.to, '').replace('<svg', '<svg width="110" height="110"')}</div>
    <h2>${up ? `Subiste para a Liga ${LEAGUES[p.to][0]}!` : down ? `Desceste para a Liga ${LEAGUES[p.to][0]}` : `Ficaste na Liga ${LEAGUES[p.to][0]}`}</h2>
    <p>Terminaste a semana passada em ${p.rank}.º lugar.${p.rank <= 3 ? ` Ganhaste ${[0, 100, 60, 40][p.rank]} gemas!` : ''}</p>
    <button class="btn full" data-act="closeModal">Continuar</button>`);
}

/* ---------- Páginas ---------- */
const NAV = [['learn', 'Aprender'], ['practice', 'Praticar'], ['leagues', 'Ligas'], ['quests', 'Missões'], ['shop', 'Loja'], ['profile', 'Perfil'], ['settings', 'Mais']];
const navHtml = (page, items) => items.map(([k, l]) => `<a class="nav-item ${page === k ? 'active' : ''}" href="#${k}"><span class="ico">${I[k === 'settings' ? 'more' : k]}</span><span class="lbl">${l}</span></a>`).join('');
function statsHtml() {
  return `<div class="stats">
    <button class="stat" data-act="courses" title="Mudar de curso">${flag(state.course)}</button>
    <button class="stat streak ${state.lastDay === today() ? '' : 'off'}" data-act="streak" title="Sequência">${I.flame}${state.streak}</button>
    <button class="stat gems" data-act="go" data-arg="shop" title="Gemas">${I.gem}${fmtNum(state.gems)}</button>
    <button class="stat hearts" data-act="hearts" title="Vidas">${I.heart}${unlimited() ? '∞' : state.hearts}</button></div>`;
}
function questsCard(compact) {
  const list = state.quests.list;
  return `<div class="card"><h3>Missões diárias ${compact ? '<a href="#quests">Ver todas</a>' : ''}</h3>${list.map((q, i) => {
    const v = Math.min(questVal(q), q.n), Q = QUESTS[q.id];
    return `<div class="list-item"><div class="big-ico" style="color:${Q.color};width:44px;height:44px">${I[Q.ico].replace('<svg', '<svg style="width:38px;height:38px"')}</div><div class="grow"><h4 style="font-size:16px">${Q.text(q.n)}</h4>
      <div class="bar"><i style="width:${v / q.n * 100}%"></i><span>${v} / ${q.n}</span></div></div>
      ${q.claimed ? `<span style="color:var(--ok)">${I.check.replace('<svg', '<svg width="28" height="28"')}</span>` : questDone(q) ? `<button class="btn gold" style="padding:8px 12px;font-size:13px" data-act="claim" data-arg="${i}">Abrir</button>` : `<span style="width:38px">${I.quests.replace('<svg', '<svg width="38" height="38" style="opacity:.5"')}</span>`}</div>`;
  }).join('')}</div>`;
}
function leagueCard() {
  const lg = state.league; const board = leagueBoard(lg.week, lg.tier); const rank = board.findIndex(p => p.me) + 1;
  return `<div class="card"><h3>Liga ${LEAGUES[lg.tier][0]} <a href="#leagues">Ver liga</a></h3><div class="row">${leagueBadge(lg.tier).replace('<svg', '<svg width="56" height="56"')}
    <div><b style="font-size:17px">${lg.xp > 0 ? `Estás em ${rank}.º lugar` : 'Ainda não entraste'}</b><p class="muted" style="margin:4px 0 0">${lg.xp > 0 ? `Ganhaste ${lg.xp} XP esta semana` : 'Completa uma lição para entrares na tabela desta semana.'}</p></div></div></div>`;
}
function rightbar(page) {
  const goalPct = Math.min(100, state.dayXp / state.goal * 100);
  return `<aside class="rightbar">${statsHtml()}
    ${!unlimited() && page !== 'shop' ? `<div class="card" style="background:linear-gradient(135deg,#7B61FF,#FF5FA2);color:#fff;border:none"><h3 style="color:#fff">Kiri Super</h3><p style="margin:0 0 14px;opacity:.95">Vidas ilimitadas, sem pausas. Experimenta grátis!</p><a class="btn full" href="#shop" style="background:#fff;color:#7B61FF;box-shadow:0 4px 0 rgba(0,0,0,.15);text-decoration:none">Experimentar</a></div>` : ''}
    ${page !== 'leagues' ? leagueCard() : ''}
    ${page !== 'quests' ? questsCard(true) : ''}
    <div class="card"><h3>Meta diária <a href="#settings">Editar</a></h3><div class="row"><span style="color:var(--gold)">${I.bolt.replace('<svg', '<svg width="40" height="40"')}</span><div style="flex:1"><b>${state.dayXp} / ${state.goal} XP</b><div class="bar"><i style="width:${goalPct}%"></i></div></div></div></div>
    <p class="muted" style="text-align:center;font-size:13px;margin:0">Kiri · feito para aprender a brincar</p></aside>`;
}

function iosHint() {
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  let hidden = false; try { hidden = !!localStorage.getItem('kiri-ios-hint'); } catch (e) {}
  if (!ios || navigator.standalone || hidden) return '';
  return `<div class="card ios-hint" style="margin-bottom:22px;display:flex;gap:14px;align-items:center"><img src="icons/icon-192.png" alt="" style="width:56px;height:56px;border-radius:14px;flex:none">
    <div style="flex:1"><b>Instala o Kiri no teu iPhone</b><p class="muted" style="margin:4px 0 0">Toca em <b>Partilhar</b> <svg viewBox="0 0 24 24" width="18" height="18" style="vertical-align:-3px"><path d="M12 3v12M7 8l5-5 5 5M5 12v8h14v-8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg> e depois em <b>Adicionar ao ecrã principal</b>.</p></div>
    <button class="icon-btn" data-act="iosHide" aria-label="Fechar">${I.close}</button></div>`;
}
function sectionHead(sec) {
  const S = sectionsOf()[sec]; const many = sectionsOf().length > 1; const pct = Math.round(sectionProgress(sec) * 100);
  return `<div class="sec-head"><div style="flex:1;min-width:0"><small>Secção ${sec + 1} · ${esc(S.cefr)}</small><h2>${esc(S.title)}</h2><p>${esc(S.desc)}</p>
    <div class="bar"><i style="width:${pct}%;background:var(--ok)"></i><span>${pct}%</span></div></div>${many ? `<button class="btn ghost" data-act="sections">Secções</button>` : ''}</div>`;
}
function learnPage() {
  const units = course().units; const cur = currentNode(); const cs = cstate();
  const sec = activeSection(); const secUnits = unitsOfSection(sec);
  let html = iosHint() + sectionHead(sec);
  secUnits.forEach((u, k) => {
    const unit = units[u];
    const [col, dark] = UNIT_COLORS[u % UNIT_COLORS.length];
    const soon = !hasContent(u);
    const unitLocked = !isUnlocked(u, 0);
    if (k > 0) html += `<div class="unit-divider">${esc(unit.title)}${unitLocked && !soon ? `<button class="btn ghost" style="padding:6px 12px;font-size:12px" data-act="jump" data-arg="${u}">Saltar para aqui?</button>` : ''}</div>`;
    html += `<section class="unit" style="--nc:${col};--nd:${dark}"><div class="unit-head" style="background:${unitLocked ? 'var(--lock-d)' : col}">
      <div><small>Secção ${sec + 1}, unidade ${k + 1}${cs.legend && cs.legend[u] ? ' · 👑 Lendário' : ''}</small><h2>${esc(unit.desc)}</h2></div>
      ${soon ? '<span class="soon-pill">Em breve</span>' : `<button class="guide" data-act="guide" data-arg="${u}">${I.book}<span class="lbl">Guia</span></button>`}</div><div class="path">`;
    PATTERN.forEach((type, n) => {
      if (soon && n > 2) return;
      const id = nodeId(u, n); const done = isDone(u, n); const unlocked = isUnlocked(u, n);
      const isCur = cur && cur.u === u && cur.n === n;
      const off = OFFSETS[(n + (u % 2) * 4) % OFFSETS.length];
      let inner, cls = 'node';
      if (type === 'C') { cls += ' chest'; inner = I.chestBig; }
      else if (type === 'T') { cls += ' trophy'; inner = I.trophyBig; if (cs.legend && cs.legend[u]) cls += ' legend'; }
      else if (type === 'S') { cls += ' story'; inner = done ? I.check : unlocked ? I.book : I.lock; }
      else inner = done ? I.check : unlocked ? I.star : I.lock;
      if (!unlocked) cls += ' locked';
      if (done && type !== 'L' && type !== 'S') cls += ' done';
      const ring = isCur && type === 'L' ? `<svg class="node-ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="var(--line)" stroke-width="7"/><circle cx="50" cy="50" r="45" fill="none" stroke="var(--nc)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(lessonsDone(id) / LPN) * 283} 283" transform="rotate(-90 50 50)"/></svg>` : '';
      html += `<div class="node-wrap" style="transform:translateX(${off}px)">${isCur ? `<div class="start-bubble">${type === 'C' ? 'Abrir' : lessonsDone(id) ? 'Continuar' : 'Começar'}</div>` : ''}${ring}
        <button class="${cls}" data-act="node" data-arg="${id}" ${done && type === 'C' ? 'style="opacity:.6"' : ''}>${inner}</button></div>`;
      if (n === 2) html += `<div style="position:relative;width:100%;height:0">${mascot(u % 2 ? 'happy' : 'cheer', 'path-mascot')}</div>`;
    });
    html += '</div></section>';
  });
  const next = sec + 1;
  if (next < sectionsOf().length) {
    const S = sectionsOf()[next]; const first = unitsOfSection(next)[0]; const ready = hasContent(first);
    const open = isUnlocked(first, 0);
    html += `<div class="sec-next"><small>A seguir · Secção ${next + 1} · ${esc(S.cefr)}</small><h3>${esc(S.title)}</h3><p class="muted">${esc(S.desc)}</p>
      ${!ready ? '<button class="btn" disabled>Em breve</button>' : open ? `<button class="btn" data-act="viewSection" data-arg="${next}">Continuar</button>` : `<button class="btn" data-act="jump" data-arg="${first}">Saltar para aqui</button>`}</div>`;
  }
  return html;
}
function sectionsModal() {
  const cur = currentNode(); const curSec = cur ? secOf(cur.u) : -1;
  modal(`<h2>Secções do curso</h2><p>${course().name} · ${course().units.length} unidades</p><div class="list">${sectionsOf().map((S, i) => {
    const us = unitsOfSection(i); const first = us[0]; const ready = hasContent(first); const pct = Math.round(sectionProgress(i) * 100);
    const open = ready && isUnlocked(first, 0);
    const btn = !ready ? '<button class="btn" disabled>Em breve</button>' : open ? `<button class="btn ${i === curSec ? '' : 'ghost'}" data-act="viewSection" data-arg="${i}">${pct === 100 ? 'Rever' : i === curSec ? 'Continuar' : 'Ver'}</button>` : `<button class="btn ghost" data-act="jump" data-arg="${first}">Saltar</button>`;
    return `<div class="list-item"><div class="cefr">${esc(S.cefr)}</div><div class="grow"><h4>Secção ${i + 1}: ${esc(S.title)}</h4><p>${us.length} unidades · ${esc(S.desc)}</p>${ready ? `<div class="bar"><i style="width:${pct}%;background:var(--ok)"></i><span>${pct}%</span></div>` : ''}</div>${btn}</div>`;
  }).join('')}</div><button class="btn link" data-act="closeModal">Fechar</button>`, { cls: 'wide' });
}
function nodePopover(id) {
  const [u, n] = id.split('-').map(Number); const unit = course().units[u];
  const type = PATTERN[n]; const done = isDone(u, n); const unlocked = isUnlocked(u, n); const cs = cstate();
  const legend = cs.legend && cs.legend[u];
  if (!hasContent(u)) return `<div class="pop locked"><h4>${esc(unit.title)}</h4><p>Esta unidade está em construção. Volta em breve!</p><button class="btn full" disabled>Em breve</button></div>`;
  if (!unlocked) return `<div class="pop locked"><h4>${type === 'T' ? 'Revisão da unidade' : type === 'C' ? 'Baú de recompensas' : type === 'S' ? 'História' : esc(unit.title)}</h4><p>Completa todos os níveis acima para desbloqueares este!</p><button class="btn full" disabled>Bloqueado</button></div>`;
  if (type === 'C') return `<div class="pop"><h4>Baú de recompensas</h4><p>${done ? 'Já abriste este baú.' : 'Abre o baú para ganhares gemas!'}</p>${done ? '' : `<button class="btn" data-act="openChest" data-arg="${id}">Abrir</button>`}</div>`;
  if (type === 'S') return `<div class="pop"><h4>História: ${esc(unit.title)}</h4><p>${done ? 'Já leste esta história. Lê outra vez!' : 'Lê e ouve um pequeno diálogo e responde às perguntas.'}</p><button class="btn" data-act="startNode" data-arg="${id}">${done ? 'Ler outra vez +15 XP' : 'Começar +15 XP'}</button></div>`;
  if (type === 'T') return `<div class="pop"><h4>Revisão da unidade</h4><p>${done ? (legend ? 'Unidade Lendária! 👑' : 'Unidade dominada! Chega ao nível Lendário: só podes dar 2 erros.') : 'Prova que dominas esta unidade.'}</p><button class="btn" data-act="startNode" data-arg="${id}">${done ? 'Praticar +10 XP' : 'Começar +20 XP'}</button>${done && !legend ? `<button class="btn" style="margin-top:10px;background:#FFD36B;color:#7A4B00" data-act="legend" data-arg="${u}">👑 Lendário +40 XP</button>` : ''}</div>`;
  const li = lessonIndex(n); const lp = lessonsDone(id);
  return `<div class="pop"><h4>${esc(unit.title)}</h4><p>${done ? 'Nível concluído! Pratica outra vez para reforçar.' : `Nível ${li + 1} de ${LESSONS_PER_UNIT} · Lição ${lp + 1} de ${LPN}`}</p><button class="btn" data-act="startNode" data-arg="${id}">${done ? 'Praticar +5 XP' : lp ? 'Continuar +10 XP' : 'Começar +10 XP'}</button></div>`;
}

function practicePage() {
  const cs = cstate(); const nm = state.mistakes.filter(m => m.c === state.course).length;
  const words = []; course().units.forEach(u => u.words.forEach(w => { if (cs.words.includes(w[0])) words.push(w); }));
  const item = (act, color, ico, title, desc, disabled) => `<div class="list-item"><div class="big-ico" style="color:${color}">${ico}</div><div class="grow"><h4>${title}</h4><p>${desc}</p></div><button class="btn ${disabled ? '' : 'ghost'}" data-act="practice" data-arg="${act}" ${disabled ? 'disabled' : ''}>Começar</button></div>`;
  return `<h1 class="page-title">Centro de prática</h1>
    <div class="hero" style="background:var(--blue)"><div><h2>Prática perfeita</h2><p>Revê o que já aprendeste. Cada sessão dá-te +1 vida e não gasta vidas.</p><button class="btn" style="background:#fff;color:var(--blue-d);box-shadow:0 4px 0 rgba(0,0,0,.15);margin-top:14px" data-act="practice" data-arg="practice">Praticar +5 XP</button></div>${mascot('cheer')}</div>
    <div class="list">
      ${item('mistakes', 'var(--bad)', I.redo, 'Rever erros', nm ? `${nm} exercício${nm === 1 ? '' : 's'} para rever` : 'Ainda não tens erros para rever. Boa!', !nm)}
      ${item('blitz', 'var(--gold)', I.clock, 'Pares relâmpago', 'Combina 25 pares em 75 segundos. Consegues?', false)}
      ${item('listen', 'var(--primary)', I.ear, 'Audição', HAS_TTS ? 'Treina o ouvido com frases que já conheces' : 'O teu browser não suporta voz', !HAS_TTS)}
      ${item('speak', 'var(--pink)', I.mic, 'Pronúncia', SR ? 'Lê frases em voz alta e melhora o sotaque' : 'Disponível no Chrome e no Edge', !SR)}
    </div>
    <h2 class="section-title">Palavras (${words.length})</h2>
    ${words.length ? `<div class="words">${words.map(wordCard).join('')}</div>` : '<p class="muted">Completa lições para ires juntando palavras aqui.</p>'}`;
}
function leaguesPage() {
  const lg = state.league; const board = leagueBoard(lg.week, lg.tier);
  const end = new Date(weekStart().getTime() + 7 * 864e5); const left = end - Date.now();
  const d = Math.floor(left / 864e5), hh = Math.floor(left % 864e5 / 36e5);
  let rows = '';
  board.forEach((p, i) => {
    const r = i + 1;
    if (r === 8 && lg.tier < LEAGUES.length - 1) rows += '<div class="zone up">Zona de promoção</div>';
    if (r === 26 && lg.tier > 0) rows += '<div class="zone down">Zona de despromoção</div>';
    rows += `<div class="lb-row ${p.me ? 'me' : ''}"><span class="lb-rank ${r <= 3 ? 'g' + r : ''}">${r}</span><span class="avatar" style="background:${p.color}">${esc(p.name.charAt(0).toUpperCase())}</span><span class="lb-name">${esc(p.me ? (state.name || 'Tu') + ' (tu)' : p.name)}</span><span class="lb-xp">${p.xp} XP</span></div>`;
  });
  return `<div style="text-align:center"><div class="league-badges">${LEAGUES.map((_, t) => Math.abs(t - lg.tier) <= 2 ? leagueBadge(t, t === lg.tier ? 'cur' : '') : '').join('')}</div>
    <h1 class="page-title" style="margin-bottom:6px">Liga ${LEAGUES[lg.tier][0]}</h1>
    <p class="muted" style="margin:0 0 18px">${lg.tier < LEAGUES.length - 1 ? 'Os 7 primeiros sobem para a liga seguinte.' : 'Estás na liga mais alta!'} · <b style="color:var(--gold)">${d} dias ${hh} h</b></p></div>
    ${lg.xp === 0 ? `<div class="card" style="margin-bottom:16px;text-align:center"><b>Completa uma lição para entrares na tabela desta semana!</b></div>` : ''}
    <div>${rows}</div>`;
}
function questsPage() {
  const now = new Date(); const mid = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); const left = mid - now;
  const qm = state.questsMonth.n;
  return `<div class="hero" style="background:var(--orange)"><div><small style="font-weight:900;letter-spacing:.6px;text-transform:uppercase;opacity:.9">${MONTHS[now.getMonth()]}</small><h2>Desafio do mês</h2><p>Completa 30 missões este mês para ganhares um emblema exclusivo.</p>
    <div class="bar" style="background:rgba(255,255,255,.3)"><i style="width:${Math.min(100, qm / 30 * 100)}%;background:#fff"></i><span style="color:var(--orange-d)">${qm} / 30</span></div></div>${mascot('cheer')}</div>
    <h2 class="section-title" style="display:flex;justify-content:space-between">Missões diárias <span class="muted" style="font-size:15px">${I.clock.replace('<svg', '<svg width="18" height="18" style="vertical-align:-3px"')} ${Math.floor(left / 36e5)} h ${Math.floor(left % 36e5 / 6e4)} min</span></h2>
    ${questsCard(false)}
    <h2 class="section-title">Missões de amigos</h2><div class="card" style="text-align:center"><p class="muted" style="margin:0">Em breve: completa missões com amigos e ganhem recompensas juntos.</p></div>`;
}
function shopPage() {
  const it = (id, color, ico, title, desc, price, disabled, label) => `<div class="shop-item"><div class="big-ico" style="color:${color}">${ico}</div><div class="grow"><h4>${title}</h4><p>${desc}</p></div>
    <button class="btn ghost" data-act="buy" data-arg="${id}" ${disabled ? 'disabled' : ''}>${label || `<span class="price">${I.gem}${price}</span>`}</button></div>`;
  return `<h1 class="page-title">Loja</h1>
    <div class="hero" style="background:linear-gradient(135deg,#7B61FF,#FF5FA2)"><div><h2>Kiri Super</h2><p>${unlimited() ? `Ativo até ${new Date(state.superUntil).toLocaleDateString('pt-PT')}. Vidas ilimitadas!` : 'Vidas ilimitadas e prática sem pausas. Experimenta 7 dias grátis (versão de demonstração, sem pagamentos).'}</p>
    ${!unlimited() && !state.superTried ? `<button class="btn" style="background:#fff;color:#7B61FF;box-shadow:0 4px 0 rgba(0,0,0,.15);margin-top:14px" data-act="buy" data-arg="super">Experimentar grátis</button>` : ''}</div>${mascot('cheer')}</div>
    <h2 class="section-title">Vidas</h2>
    ${it('refill', 'var(--bad)', I.heart, 'Recarregar vidas', unlimited() ? 'Tens vidas ilimitadas.' : `Fica com ${MAX_HEARTS} vidas para continuares a aprender.`, REFILL_COST, unlimited() || state.hearts >= MAX_HEARTS || state.gems < REFILL_COST, state.hearts >= MAX_HEARTS ? 'Cheio' : null)}
    <h2 class="section-title">Power-ups</h2>
    ${it('freeze', 'var(--blue)', I.snow, 'Proteção de sequência', `Protege a tua sequência se falhares um dia. Tens ${state.freezes}/2.`, 200, state.freezes >= 2 || state.gems < 200, state.freezes >= 2 ? 'Máximo' : null)}
    ${it('double', 'var(--gold)', I.bolt, 'XP a dobrar', doubleOn() ? `Ativo! Faltam ${fmtTime(state.doubleUntil - Date.now())}.` : 'Ganha o dobro do XP durante 15 minutos.', 100, doubleOn() || state.gems < 100, doubleOn() ? 'Ativo' : null)}
    <p class="muted" style="margin-top:20px">Ganha gemas a completar missões, abrir baús no percurso e a terminar no top 3 das ligas.</p>`;
}
function achievements() {
  const words = Object.values(state.courses).reduce((a, c) => a + c.words.length, 0);
  return [
    ['Fogo', '🔥', '#FF8A3D', 'Atinge uma sequência de {n} dias', [3, 7, 14, 30, 100], state.bestStreak],
    ['Sábio', '🧠', '#14B87A', 'Ganha {n} XP', [100, 500, 1000, 5000, 10000], state.xp],
    ['Estudioso', '📚', '#1EA4F0', 'Completa {n} lições', [5, 25, 50, 100, 250], state.lessons],
    ['Perfeccionista', '💎', '#FF5FA2', 'Completa {n} lições sem erros', [1, 5, 20, 50, 100], state.perfect],
    ['Poliglota', '🌍', '#7B61FF', 'Aprende {n} palavras', [10, 30, 60, 90], words],
    ['Campeão', '🏆', '#FFB020', 'Fica no top 3 de uma liga {n} vezes', [1, 3, 10], state.league.top3]
  ].map(([name, emo, color, desc, levels, val]) => {
    const lvl = levels.filter(n => val >= n).length; const next = levels[Math.min(lvl, levels.length - 1)];
    return { name, emo, color, desc: desc.replace('{n}', next), lvl, max: levels.length, val: Math.min(val, next), next };
  });
}
function profilePage() {
  const name = state.name || 'Aluno Kiri'; const joined = new Date(state.joined);
  const days = Array.from({ length: 7 }, (_, i) => addDays(today(), i - 6));
  const maxXp = Math.max(10, ...days.map(d => state.history[d] || 0));
  const now = new Date(); const first = new Date(now.getFullYear(), now.getMonth(), 1); const nd = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  let cal = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map(d => `<span>${d}</span>`).join('') + '<i></i>'.repeat((first.getDay() + 6) % 7);
  for (let d = 1; d <= nd; d++) { const k = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(d)}`; cal += `<i class="${state.history[k] ? 'on' : state.frozenDays.includes(k) ? 'frz' : ''} ${k === today() ? 'today' : ''}">${d}</i>`; }
  return `<div class="profile-head"><span class="avatar" style="background:#7B61FF">${esc(name.charAt(0).toUpperCase())}</span><div style="flex:1"><h2>${esc(name)}</h2>
    <p class="muted" style="margin:4px 0 10px">Entrou em ${MONTHS[joined.getMonth()]} de ${joined.getFullYear()}</p><div class="row">${Object.keys(state.courses).map(c => flag(c)).join('')}</div></div>
    <a class="icon-btn" href="#settings" title="Definições">${I.more.replace('<svg', '<svg style="width:36px;height:36px"')}</a></div>
    <h2 class="section-title">Estatísticas</h2><div class="stat-grid">
      <div class="stat-box" style="color:var(--orange)">${I.flame}<div><b style="color:var(--text)">${state.streak}</b><span>Dias de sequência</span></div></div>
      <div class="stat-box" style="color:var(--gold)">${I.bolt}<div><b style="color:var(--text)">${fmtNum(state.xp)}</b><span>XP total</span></div></div>
      <div class="stat-box">${leagueBadge(state.league.tier).replace('<svg', '<svg style="width:28px;height:28px"')}<div><b>${LEAGUES[state.league.tier][0]}</b><span>Liga atual</span></div></div>
      <div class="stat-box" style="color:var(--gold)">${I.trophy}<div><b style="color:var(--text)">${state.league.top3}</b><span>Vezes no top 3</span></div></div></div>
    <h2 class="section-title">XP nos últimos 7 dias</h2><div class="card"><div class="chart">${days.map(d => `<div><small class="muted" style="font-size:12px">${state.history[d] || ''}</small><b style="height:${(state.history[d] || 0) / maxXp * 100}%"></b><span>${['D', 'S', 'T', 'Q', 'Q', 'S', 'S'][parseDay(d).getDay()]}</span></div>`).join('')}</div></div>
    <h2 class="section-title">Sequência de ${MONTHS[now.getMonth()]}</h2><div class="card"><div class="cal">${cal}</div></div>
    <h2 class="section-title">Conquistas</h2><div>${achievements().map(a => `<div class="ach"><div class="ach-badge ${a.lvl ? '' : 'off'}" style="background:${a.color}">${a.emo}<small>NÍVEL ${Math.max(1, a.lvl)}</small></div>
      <div style="flex:1"><h4 style="margin:0 0 4px;font-size:18px">${a.name}</h4><div class="bar"><i style="width:${a.val / a.next * 100}%"></i><span>${a.val} / ${a.next}</span></div><p class="muted" style="margin:8px 0 0">${a.lvl >= a.max ? 'Nível máximo atingido!' : a.desc}</p></div></div>`).join('')}</div>`;
}
function voiceSetting() {
  if (!HAS_TTS) return '';
  const list = voicesFor(); const cur = pickVoice();
  if (!list.length) return `<div class="setting"><label>Voz</label><span class="muted">Sem vozes de ${course().name.toLowerCase()} neste dispositivo</span></div>`;
  return `<div class="setting" style="flex-wrap:wrap"><div><label>Voz (${course().name.toLowerCase()})</label><div class="muted" style="font-size:14px">${voiceScore(cur, state.course) >= 35 ? 'Voz natural ✓' : 'Para uma voz mais humana, instala uma voz «Premium» ou «Melhorada» nas definições do sistema.'}</div></div>
    <div class="row"><select class="text-input" id="voice-select" style="width:auto;max-width:260px;padding:8px 10px">${list.map(v => `<option ${v === cur ? 'selected' : ''} value="${esc(v.name)}">${esc(v.name.replace(/\s*\(.*\)$/, ''))} · ${esc(v.lang)}</option>`).join('')}</select>
    <button class="speak-btn small" data-act="testVoice">${I.speaker}</button></div></div>`;
}
function settingsPage() {
  const sw = (k, label, note) => `<div class="setting"><div><label>${label}</label>${note ? `<div class="muted" style="font-size:14px">${note}</div>` : ''}</div><button class="switch ${state.settings[k] ? 'on' : ''}" data-act="toggle" data-arg="${k}" aria-label="${label}"></button></div>`;
  const goals = [[10, 'Casual'], [20, 'Normal'], [30, 'Sério'], [50, 'Intenso']];
  return `<h1 class="page-title">Definições</h1>
    <h2 class="section-title">Perfil</h2><input class="text-input" id="name-input" maxlength="24" placeholder="O teu nome" value="${esc(state.name)}">
    <h2 class="section-title">Meta diária</h2><div class="seg">${goals.map(([n, l]) => `<button class="${state.goal === n ? 'on' : ''}" data-act="goal" data-arg="${n}">${l} · ${n} XP</button>`).join('')}</div>
    <h2 class="section-title">Curso</h2><div class="setting"><div class="row">${flag(state.course)}<label>${course().name}</label></div><button class="btn ghost" data-act="courses">Mudar</button></div>
    <h2 class="section-title">Preferências</h2>
    ${voiceSetting()}
    ${sw('sound', 'Efeitos sonoros')}${sw('listen', 'Exercícios de audição', HAS_TTS ? '' : 'O teu browser não suporta voz')}${sw('speak', 'Exercícios de fala', SR ? '' : 'Disponível no Chrome e no Edge')}${sw('dark', 'Modo escuro')}
    <h2 class="section-title">Dados</h2><p class="muted">O teu progresso fica guardado neste browser.</p><button class="btn bad" data-act="resetAsk">Apagar progresso</button>
    <p class="muted" style="margin-top:30px;font-size:14px">Kiri v1.0 · Projeto independente, sem ligação a outras plataformas de línguas.</p>`;
}

/* ---------- Boas-vindas ---------- */
let W = { step: 0, course: null, goal: 20 };
function renderWelcome() {
  const root = $('#root');
  let inner = '';
  if (W.step === 0) inner = `${mascot('cheer')}<h1>Olá! Eu sou o Kiri.</h1><p>A forma gratuita, divertida e eficaz de aprenderes uma língua.</p><button class="btn" style="min-width:300px" data-act="w" data-arg="1">Começar</button>`;
  if (W.step === 1) inner = `<h1>O que queres aprender?</h1><div class="course-grid" style="width:100%">${Object.entries(C).map(([code, c]) => `<button class="course-card" data-act="wCourse" data-arg="${code}">${flag(code, 'lg')}${c.name}<small>${c.units.length} unidades</small></button>`).join('')}</div>`;
  if (W.step === 2) inner = `${mascot('happy')}<h1>Qual é a tua meta diária?</h1><div class="list-choices" style="width:100%;max-width:440px">${[[10, 'Casual', '5 min/dia'], [20, 'Normal', '10 min/dia'], [30, 'Sério', '15 min/dia'], [50, 'Intenso', '20 min/dia']].map(([n, l, t]) => `<button class="choice ${W.goal === n ? 'sel' : ''}" data-act="wGoal" data-arg="${n}" style="justify-content:space-between;padding-left:18px"><span>${l}</span><span class="muted">${t}</span></button>`).join('')}</div><button class="btn" style="min-width:300px" data-act="w" data-arg="3">Continuar</button>`;
  if (W.step === 3) inner = `${mascot('cheer')}<h1>Como te chamas?</h1><input class="text-input" id="w-name" maxlength="24" placeholder="O teu nome" style="max-width:380px;text-align:center"><button class="btn" style="min-width:300px" data-act="wDone">Começar a aprender</button>`;
  root.innerHTML = `<div class="welcome"><div class="inner">${inner}</div></div>`;
  const ni = $('#w-name'); if (ni) { ni.focus(); ni.onkeydown = e => { if (e.key === 'Enter') ACT.wDone(); }; }
}

/* ---------- Render ---------- */
const PAGES = { learn: learnPage, practice: practicePage, leagues: leaguesPage, quests: questsPage, shop: shopPage, profile: profilePage, settings: settingsPage };
let lastPage = null;
function render(keepScroll) {
  checkDay();
  document.documentElement.dataset.theme = state.settings.dark ? 'dark' : '';
  const tc = $('meta[name=theme-color]'); if (tc) tc.content = state.settings.dark ? '#15141F' : '#FFFFFF';
  if (!state.course) return renderWelcome();
  let page = location.hash.slice(1); if (!PAGES[page]) page = 'learn';
  const y = scrollY;
  $('#root').innerHTML = `<div class="app"><nav class="sidebar"><div class="logo">${mascot('happy', '')}<span>kiri</span></div>${navHtml(page, NAV)}</nav>
    <header class="topbar">${statsHtml()}</header>
    <div class="main"><main class="content">${PAGES[page]()}</main>${rightbar(page)}</div>
    <nav class="bottomnav">${navHtml(page, NAV.slice(0, 6))}</nav></div>`;
  $('.logo svg').setAttribute('width', 40);
  const vs = $('#voice-select'); if (vs) vs.onchange = () => { state.settings.voices = Object.assign({}, state.settings.voices, { [state.course]: vs.value }); save(); ACT.testVoice(); render(true); };
  const ni = $('#name-input'); if (ni) ni.onchange = () => { state.name = ni.value.trim().slice(0, 24); save(); toast('Nome guardado.'); };
  $$('.path-mascot').forEach((m, i) => { m.style.cssText = `top:-200px;${i % 2 ? 'right' : 'left'}:2%`; });
  if (page === 'learn' && lastPage !== 'learn' && !keepScroll) { const c = $('.start-bubble'); if (c) setTimeout(() => c.parentElement.scrollIntoView({ block: 'center' }), 30); }
  else if (keepScroll) scrollTo(0, y);
  else if (lastPage !== page) scrollTo(0, 0);
  lastPage = page;
  if (state.league.pending) leagueResultModal();
}

/* ---------- Ações ---------- */
const ACT = {
  closeModal, quitLesson,
  go: p => location.hash = p,
  courses: coursesModal, hearts: heartsModal, streak: streakModal, guide: u => hasContent(+u) ? guideModal(+u) : toast('Esta unidade ainda está em construção.'),
  setCourse: code => { state.course = code; delete cstate(code).view; save(); closeModal(); render(); toast(`Agora estás a aprender ${C[code].name.toLowerCase()}!`); },
  say: t => speak(t), saySlow: t => speak(t, true),
  testVoice: () => speak(course().units[0].sentences[0][0]),
  iosHide: () => { try { localStorage.setItem('kiri-ios-hint', '1'); } catch (e) {} $('.ios-hint')?.remove(); },
  tip: (a, el) => {
    const had = $('.tip', el); $$('.tip').forEach(t => t.remove());
    if (had) return;
    el.appendChild(h(`<span class="tip">${esc(el.dataset.m)}</span>`)); speak(el.dataset.w);
  },
  node: (id, el) => {
    const wrap = el.parentElement; const open = $('.pop', wrap);
    $$('.pop').forEach(p => p.remove()); $$('.node-wrap').forEach(w => w.style.zIndex = '');
    if (open) return;
    sfx.tap(); wrap.style.zIndex = 30; wrap.appendChild(h(nodePopover(id)));
  },
  sections: () => sectionsModal(),
  viewSection: sec => { cstate().view = +sec; save(); closeModal(); lastPage = null; render(); scrollTo(0, 0); },
  legend: u => startLesson({ mode: 'legend', u: +u, n: PATTERN.length - 1 }),
  startNode: id => {
    const [u, n] = id.split('-').map(Number);
    if (PATTERN[n] === 'T') startLesson({ mode: 'unit', u, n });
    else if (PATTERN[n] === 'S') startLesson({ mode: 'story', u, n });
    else startLesson({ mode: 'lesson', u, n, li: lessonIndex(n), redo: isDone(u, n) });
  },
  openChest: id => {
    const g = randInt(15, 40); state.gems += g; cstate().done[id] = true; save(); sfx.coin(); confetti();
    modal(`<div class="big-ico">${I.chestBig}</div><h2>Ganhaste ${g} gemas!</h2><p>Continua assim para encontrares mais baús.</p><button class="btn full" data-act="closeModal">Boa!</button>`);
    render(true);
  },
  jump: u => {
    u = +u;
    $$('.modal-bg').forEach(x => x.remove());
    const isSec = u > 0 && secOf(u) !== secOf(u - 1);
    const m = modal(`${mascot('happy')}<h2>${isSec ? `Saltar para a secção ${secOf(u) + 1}?` : `Saltar para a unidade ${u - unitsOfSection(secOf(u))[0] + 1}?`}</h2><p>Faz um teste com o conteúdo das unidades anteriores. Se o terminares, desbloqueias tudo até aqui.</p><button class="btn full" id="jump-go">Fazer o teste</button><button class="btn link" data-act="closeModal">Agora não</button>`);
    $('.mascot', m).style.cssText = 'width:110px;margin:0 auto';
    $('#jump-go', m).onclick = () => { m.remove(); startLesson({ mode: 'jump', u }); };
  },
  claim: i => {
    const q = state.quests.list[+i]; if (!q || q.claimed || !questDone(q)) return;
    q.claimed = true; state.gems += q.reward; state.questsMonth.n++; save(); sfx.coin(); confetti();
    modal(`<div class="big-ico">${I.chestBig}</div><h2>+${q.reward} gemas</h2><p>Missão concluída: ${QUESTS[q.id].text(q.n)}</p><button class="btn full" data-act="closeModal">Continuar</button>`);
    render(true);
  },
  practice: m => startLesson({ mode: m }),
  practiceNow: () => { closeModal(); startLesson({ mode: 'practice' }); },
  buy: id => {
    if (id === 'super') { if (state.superTried) return; activateSuper(); closeModal(); return render(true); }
    const prices = { refill: REFILL_COST, freeze: 200, double: 100 };
    if (state.gems < prices[id]) return toast('Não tens gemas suficientes.');
    if (id === 'refill') { if (state.hearts >= MAX_HEARTS) return; state.hearts = MAX_HEARTS; toast('Vidas recarregadas!'); }
    if (id === 'freeze') { if (state.freezes >= 2) return; state.freezes++; toast('Proteção de sequência equipada!'); }
    if (id === 'double') { state.doubleUntil = Date.now() + 15 * 60e3; toast('XP a dobrar durante 15 minutos!'); }
    state.gems -= prices[id]; save(); sfx.coin(); closeModal(); render(true);
  },
  toggle: k => { state.settings[k] = !state.settings[k]; if (k === 'listen') state.settings.listenOff = 0; if (k === 'speak') state.settings.speakOff = 0; save(); render(true); },
  goal: n => { state.goal = +n; const q = state.quests.list.find(q => q.id === 'xp'); if (q && !q.claimed) q.n = state.goal; save(); render(true); },
  resetAsk: () => {
    const m = modal(`<h2>Apagar todo o progresso?</h2><p>Perdes XP, sequência, gemas e lições concluídas. Não dá para desfazer.</p><button class="btn full bad" id="do-reset">Apagar tudo</button><button class="btn link" data-act="closeModal">Cancelar</button>`);
    $('#do-reset', m).onclick = () => { try { localStorage.removeItem(KEY); } catch (e) {} state = defaults(); W = { step: 0, course: null, goal: 20 }; m.remove(); location.hash = ''; render(); };
  },
  w: s => { W.step = +s; renderWelcome(); },
  wCourse: c => { W.course = c; W.step = 2; renderWelcome(); },
  wGoal: n => { W.goal = +n; renderWelcome(); },
  wDone: () => {
    const ni = $('#w-name'); state.name = (ni && ni.value.trim().slice(0, 24)) || '';
    state.course = W.course || 'en'; state.goal = W.goal; cstate(); genQuests(today()); save();
    location.hash = 'learn'; render();
    setTimeout(() => startLesson({ mode: 'lesson', u: 0, n: 0, li: 0 }), 350);
  }
};
document.addEventListener('click', e => {
  const a = e.target.closest('[data-act]');
  if (!e.target.closest('.node-wrap')) $$('.pop').forEach(p => p.remove());
  if (!e.target.closest('.tok')) $$('.tip').forEach(t => t.remove());
  if (a && ACT[a.dataset.act]) { e.preventDefault(); ACT[a.dataset.act](a.dataset.arg, a, e); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if ($('.modal-bg')) return closeModal(); if (L) return quitLesson(); }
  if (!L || $('.modal-bg')) return;
  if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
  if (e.key === 'Enter') { e.preventDefault(); const b = $('#lesson .go'); if (b && !b.disabled) b.click(); return; }
  if (L.phase === 'check' && L.ex && L.ex.key && /^[0-9]$/.test(e.key)) L.ex.key(e.key);
});
window.addEventListener('hashchange', () => { if (!L) render(); });
setInterval(() => {
  if (!state.course) return;
  if (regenHearts()) { save(); if (!L) render(true); }
  const nh = $('#next-heart'); if (nh) nh.textContent = fmtTime(nextHeartIn());
  if (L && L.deadline && $('#lesson .lesson-top')) { if (Date.now() >= L.deadline) failScreen('Combina os pares mais depressa da próxima vez!'); else updateLessonTop(); }
}, 1000);

load();
render();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
