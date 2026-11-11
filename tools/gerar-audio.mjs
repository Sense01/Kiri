// Gera áudio com voz humana (ElevenLabs) para todas as palavras e frases do Kiri.
// Uso:  ELEVENLABS_API_KEY=xxxx node tools/gerar-audio.mjs [en es fr de it]
// Opcional: VOICE_ID=<id da voz>  (por omissão usa uma voz multilíngue da biblioteca)
// Cria audio/<língua>/<hash>.mp3 e audio/manifest.json, que a app usa automaticamente.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import vm from 'node:vm';

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.error('Falta a variável ELEVENLABS_API_KEY.'); process.exit(1); }
const VOICE = process.env.VOICE_ID || 'EXAVITQu4vr4xnSDxMaL';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'js/data.js'), 'utf8'), ctx);
const COURSES = ctx.window.KIRI_COURSES;
const langs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(COURSES);
const manPath = path.join(root, 'audio/manifest.json');
const manifest = fs.existsSync(manPath) ? JSON.parse(fs.readFileSync(manPath, 'utf8')) : {};

for (const code of langs) {
  const c = COURSES[code]; if (!c) { console.warn('Língua desconhecida:', code); continue; }
  const texts = new Set();
  c.units.forEach(u => { u.words.forEach(w => texts.add(w[0])); u.sentences.forEach(s => texts.add(s[0])); });
  manifest[code] ||= {};
  fs.mkdirSync(path.join(root, 'audio', code), { recursive: true });
  let n = 0;
  for (const text of texts) {
    const file = `audio/${code}/${crypto.createHash('sha1').update(text).digest('hex').slice(0, 12)}.mp3`;
    if (fs.existsSync(path.join(root, file))) { manifest[code][text] = file; continue; }
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE}?output_format=mp3_44100_64`, {
      method: 'POST',
      headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2', voice_settings: { stability: 0.5, similarity_boost: 0.75 } })
    });
    if (!res.ok) { console.error(`Erro em "${text}":`, res.status, await res.text()); continue; }
    fs.writeFileSync(path.join(root, file), Buffer.from(await res.arrayBuffer()));
    manifest[code][text] = file; n++;
    process.stdout.write(`\r${code}: ${n} ficheiros novos`);
  }
  console.log(`\n${code}: ${Object.keys(manifest[code]).length} áudios no total`);
}
fs.mkdirSync(path.join(root, 'audio'), { recursive: true });
fs.writeFileSync(manPath, JSON.stringify(manifest, null, 1));
console.log('Feito! Faz commit da pasta audio/ para a publicar.');
