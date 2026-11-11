# Kiri 🌱

Kiri é uma app web gratuita para aprender línguas com lições curtas e divertidas: inglês, espanhol, francês, alemão e italiano, a partir de português.

**Experimenta:** https://sense01.github.io/Kiri/

## Funcionalidades

- **Percurso de aprendizagem**: unidades com lições, baús de recompensa, revisão de unidade e teste para saltar unidades
- **7 tipos de exercício**: escolher a imagem, pares, construir frases (nos dois sentidos), audição, escrever a tradução, completar a frase e pronúncia (microfone)
- **Dicionário ao toque**: toca numa palavra para veres a tradução e a ouvires
- **Vidas** que se regeneram com o tempo, **gemas**, **XP**, **meta diária** e **sequência de dias** com proteções
- **Ligas semanais** com promoção e despromoção
- **Missões diárias** e desafio mensal
- **Loja**: recarregar vidas, proteção de sequência, XP a dobrar, Kiri Super (demonstração)
- **Centro de prática**: rever erros, audição, pronúncia e lista de palavras
- **Perfil**: estatísticas, gráfico de XP, calendário da sequência e conquistas
- Modo escuro, efeitos sonoros, layout para telemóvel e computador, funciona offline
- **App no iPhone**: abre o site no Safari → Partilhar → *Adicionar ao ecrã principal*. Abre em ecrã inteiro, com ícone próprio

## Voz

Por omissão, o Kiri usa a melhor voz instalada no dispositivo. Dá prioridade às vozes «Premium» ou «Melhorada» da Apple, às vozes Google do Chrome e às vozes «Natural» do Edge. A voz pode ser escolhida nas Definições.

Para usar **áudio com voz humana** (ElevenLabs):

```bash
ELEVENLABS_API_KEY=a_tua_chave node tools/gerar-audio.mjs        # todas as línguas
ELEVENLABS_API_KEY=a_tua_chave node tools/gerar-audio.mjs de it  # só algumas
```

O script cria a pasta `audio/` com um MP3 por palavra e por frase, mais um `manifest.json`. Depois é só fazer commit dessa pasta: a app passa a usar o áudio gravado e recorre à voz do dispositivo quando não encontra um ficheiro. Para escolher outra voz, define `VOICE_ID` com o ID de uma voz da biblioteca da ElevenLabs.

## Tecnologia

HTML, CSS e JavaScript puros, sem dependências nem passo de build. A voz usa a Web Speech API do browser e o progresso fica guardado no `localStorage`.

Para correr localmente basta abrir o `index.html` ou servir a pasta (`python3 -m http.server`).

## Adicionar conteúdo

Os cursos estão em `js/data.js`. Cada unidade tem uma lista de palavras `[alvo, português, emoji]` e de frases `[alvo, português, [alternativas aceites]]`.
