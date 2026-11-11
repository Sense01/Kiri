// Curso completo de Francês do Kiri: 8 secções (Introdução → B2), 272 unidades.
// Conteúdo original. Unidades sem palavras/frases aparecem como «Em breve».
(() => {
const W = s => s.split('|').map(x => x.split('~').map(y => y.trim()));
const U = (s, title, words, sentences) => ({ s, title, desc: title, words: words ? W(words) : [], sentences: sentences || [], soon: !words });

const SECTIONS = [
  { title: 'Primeiros passos', cefr: 'Intro', desc: 'Frases essenciais e gramática simples' },
  { title: 'Fundamentos', cefr: 'A1', desc: 'Palavras, frases e gramática para interações básicas' },
  { title: 'Conversas básicas', cefr: 'A1', desc: 'Conceitos e frases para conversas simples' },
  { title: 'Dia a dia', cefr: 'A2', desc: 'Conversas sobre temas do quotidiano' },
  { title: 'Mais horizontes', cefr: 'B1', desc: 'Frases sobre uma maior variedade de temas' },
  { title: 'Ideias complexas', cefr: 'B1', desc: 'Ideias mais elaboradas em conversa' },
  { title: 'Opiniões abstratas', cefr: 'B2', desc: 'Sentimentos e opiniões abstratas' },
  { title: 'Fluência', cefr: 'B2', desc: 'Conversar com confiança, incluindo temas especializados' }
];

const units = [
// ---------------- Secção 1 · Introdução ----------------
U(0, 'Usar frases básicas', 'bonjour~bom dia~☀️|salut~olá~👋|merci~obrigado~🙏|oui~sim~✅|non~não~❌|pardon~desculpe~🙇|café~café~☕|thé~chá~🍵', [
  ['Bonjour !','Bom dia!',['Olá!']],
  ['Salut, merci !','Olá, obrigado!',['Olá, obrigada!']],
  ['Oui, un café.','Sim, um café.',[]],
  ['Non, merci.','Não, obrigado.',['Não, obrigada.']],
  ["Un thé, s'il vous plaît.",'Um chá, por favor.',[]],
  ['Pardon, monsieur.','Desculpe, senhor.',['Desculpa, senhor.','Peço desculpa, senhor.']],
  ['Oui, un thé, merci.','Sim, um chá, obrigado.',['Sim, um chá, obrigada.']]
]),
U(0, 'Cumprimentar pessoas', 'bonsoir~boa noite~🌙|madame~senhora~👩|monsieur~senhor~👨|bien~bem~👍|très~muito~➕|toi~tu~👉|nuit~noite~🌃|demain~amanhã~📅', [
  ['Bonsoir, madame.','Boa noite, senhora.',['Boa noite, minha senhora.']],
  ['Ça va ?','Tudo bem?',['Está tudo bem?','Como estás?']],
  ['Ça va très bien, merci.','Está tudo muito bem, obrigado.',['Tudo muito bem, obrigado.','Muito bem, obrigado.','Muito bem, obrigada.','Tudo muito bem, obrigada.']],
  ['Et toi ?','E tu?',[]],
  ['Bonne nuit !','Boa noite!',[]],
  ['À demain, monsieur !','Até amanhã, senhor!',[]],
  ['Bonjour, monsieur.','Bom dia, senhor.',[]]
]),
U(0, 'Apresentar-te', "je~eu~🙋|suis~sou~🟰|m'appelle~chamo-me~🏷️|ami~amigo~🧑‍🤝‍🧑|amie~amiga~👭|étudiant~estudante~🎓|enchanté~muito prazer~🤝|français~francês~🇫🇷", [
  ["Je m'appelle Paul.",'Chamo-me Paul.',['Eu chamo-me Paul.','O meu nome é Paul.','Eu me chamo Paul.','Me chamo Paul.']],
  ['Je suis étudiant.','Eu sou estudante.',['Sou estudante.']],
  ['Enchanté, Marie !','Muito prazer, Marie!',['Prazer, Marie!','Encantado, Marie!']],
  ['Tu es mon ami.','Tu és o meu amigo.',['És o meu amigo.','Tu és meu amigo.','Você é meu amigo.']],
  ['Elle est mon amie.','Ela é a minha amiga.',['Ela é minha amiga.']],
  ['Je suis français.','Eu sou francês.',['Sou francês.']],
  ['Bonjour, je suis Léa.','Bom dia, eu sou a Léa.',['Olá, eu sou a Léa.','Bom dia, sou a Léa.','Olá, sou a Léa.','Bom dia, eu sou Léa.']]
]),
U(0, 'Usar o presente', 'mange~come~🍽️|bois~bebo~🥤|parle~fala~🗣️|aime~gosta~💜|lis~lês~📖|écoute~ouço~🎧|pomme~maçã~🍎|eau~água~💧', [
  ['Je mange une pomme.','Eu como uma maçã.',['Como uma maçã.']],
  ["Je bois de l'eau.",'Eu bebo água.',['Bebo água.']],
  ['Il parle français.','Ele fala francês.',[]],
  ['Elle aime le café.','Ela gosta de café.',['Ela gosta do café.','Ela adora café.']],
  ['Tu lis un livre.','Tu lês um livro.',['Lês um livro.','Você lê um livro.']],
  ["J'écoute la radio.",'Eu ouço a rádio.',['Ouço a rádio.','Eu oiço a rádio.','Oiço a rádio.','Eu ouço rádio.','Ouço rádio.']],
  ['Il mange et il boit.','Ele come e bebe.',['Ele come e ele bebe.']]
]),
U(0, 'Deslocar-te na cidade', 'gare~estação~🚉|rue~rua~🛣️|musée~museu~🏛️|parc~parque~🌳|hôtel~hotel~🏨|où~onde~📍|ici~aqui~👇|là-bas~ali~➡️', [
  ['Où est la gare ?','Onde é a estação?',['Onde fica a estação?','Onde está a estação?']],
  ['Le musée est ici.','O museu é aqui.',['O museu fica aqui.','O museu está aqui.']],
  ['Le parc est là-bas.','O parque é ali.',['O parque fica ali.','O parque está ali.','O parque é lá.','O parque fica lá.']],
  ["L'hôtel est dans la rue.",'O hotel é na rua.',['O hotel fica na rua.','O hotel está na rua.']],
  ['Pardon, où est le musée ?','Desculpe, onde é o museu?',['Desculpa, onde é o museu?','Desculpe, onde fica o museu?','Desculpa, onde fica o museu?']],
  ["La gare est près d'ici.",'A estação é perto daqui.',['A estação fica perto daqui.','A estação está perto daqui.']],
  ['Je cherche un hôtel.','Eu procuro um hotel.',['Procuro um hotel.','Estou à procura de um hotel.']]
]),
U(0, 'Falar da família', 'mère~mãe~👩|père~pai~👨|frère~irmão~👦|sœur~irmã~👧|fils~filho~👶|fille~filha~🧒|mari~marido~🤵|femme~mulher~👰', [
  ["C'est ma mère.",'É a minha mãe.',['Esta é a minha mãe.','É minha mãe.']],
  ['Mon père est ici.','O meu pai está aqui.',['Meu pai está aqui.']],
  ["J'ai un frère.",'Eu tenho um irmão.',['Tenho um irmão.']],
  ["Ma sœur s'appelle Anne.",'A minha irmã chama-se Anne.',['Minha irmã chama-se Anne.','A minha irmã se chama Anne.']],
  ['Il a un fils et une fille.','Ele tem um filho e uma filha.',[]],
  ['Voici mon mari.','Este é o meu marido.',['Aqui está o meu marido.','Este é meu marido.']],
  ['Sa femme est française.','A mulher dele é francesa.',['A esposa dele é francesa.','A sua mulher é francesa.']]
]),
U(0, 'Falar do que fazes', 'travaille~trabalho~💼|cuisines~cozinhas~🍳|joue~joga~⚽|danse~dança~💃|chante~canta~🎤|nage~nado~🏊|regardons~vemos~📺|dort~dorme~😴', [
  ['Je travaille à Paris.','Eu trabalho em Paris.',['Trabalho em Paris.']],
  ['Tu cuisines bien.','Tu cozinhas bem.',['Cozinhas bem.','Você cozinha bem.']],
  ['Il joue au foot.','Ele joga futebol.',['Ele joga à bola.']],
  ['Elle danse et elle chante.','Ela dança e canta.',['Ela dança e ela canta.']],
  ['Je nage le matin.','Eu nado de manhã.',['Nado de manhã.','Eu nado pela manhã.']],
  ['Nous regardons la télé.','Nós vemos televisão.',['Vemos televisão.','Nós vemos a televisão.','Nós assistimos à televisão.']],
  ['Le bébé dort.','O bebé dorme.',['O bebé está a dormir.','O bebê dorme.']]
]),
U(0, 'O plural e o presente', 'chats~gatos~🐈|chiens~cães~🐕|enfants~crianças~🧒|livres~livros~📚|fleurs~flores~💐|amis~amigos~👫|nous~nós~👥|ils~eles~👬', [
  ['Les chats dorment.','Os gatos dormem.',[]],
  ['Nous avons deux chiens.','Nós temos dois cães.',['Temos dois cães.']],
  ['Les enfants jouent.','As crianças brincam.',['As crianças jogam.','As crianças estão a brincar.']],
  ['Ils lisent des livres.','Eles leem livros.',['Eles lêem livros.']],
  ["J'aime les fleurs.",'Eu gosto das flores.',['Gosto das flores.','Eu gosto de flores.','Gosto de flores.','Adoro flores.']],
  ['Vous êtes mes amis.','Vocês são os meus amigos.',['Vocês são meus amigos.','Sois os meus amigos.']],
  ['Elles mangent des pommes.','Elas comem maçãs.',[]]
]),
U(0, 'Descrever a família', 'grand~alto~📏|petite~pequena~🤏|jeune~jovem~🧑|âgée~idosa~👵|gentils~simpáticos~😊|drôle~engraçado~😂|parents~pais~👪|grand-mère~avó~👵', [
  ['Mon père est grand.','O meu pai é alto.',['Meu pai é alto.']],
  ['Ma sœur est petite.','A minha irmã é pequena.',['A minha irmã é baixa.','Minha irmã é pequena.','Minha irmã é baixa.']],
  ['Mes parents sont gentils.','Os meus pais são simpáticos.',['Os meus pais são gentis.','Meus pais são simpáticos.','Meus pais são gentis.']],
  ['Mon frère est drôle.','O meu irmão é engraçado.',['Meu irmão é engraçado.']],
  ['Ma grand-mère est âgée.','A minha avó é idosa.',['A minha avó é velha.','Minha avó é idosa.']],
  ['Ta mère est jeune.','A tua mãe é jovem.',['Tua mãe é jovem.','A sua mãe é jovem.']],
  ['Nous sommes une grande famille.','Nós somos uma família grande.',['Somos uma família grande.','Somos uma grande família.','Nós somos uma grande família.']]
]),
U(0, 'Pedir comida e bebida', 'croissant~croissant~🥐|salade~salada~🥗|vin~vinho~🍷|bière~cerveja~🍺|jus~sumo~🧃|addition~conta~🧾|menu~ementa~📋|verre~copo~🥛', [
  ["Un croissant, s'il vous plaît.",'Um croissant, por favor.',[]],
  ['Je voudrais une salade.','Eu queria uma salada.',['Queria uma salada.','Eu gostaria de uma salada.','Gostaria de uma salada.']],
  ['Un verre de vin rouge.','Um copo de vinho tinto.',[]],
  ['Une bière, merci.','Uma cerveja, obrigado.',['Uma cerveja, obrigada.']],
  ["Tu veux un jus d'orange ?",'Queres um sumo de laranja?',['Tu queres um sumo de laranja?','Você quer um suco de laranja?']],
  ["L'addition, s'il vous plaît.",'A conta, por favor.',[]],
  ["Le menu, s'il vous plaît.",'A ementa, por favor.',['O menu, por favor.','O cardápio, por favor.']]
]),
// ---------------- Secção 2 · A1 ----------------
U(1, 'Género e número', 'noir~preto~⚫|blanche~branca~⚪|rouge~vermelho~🔴|verts~verdes~🟢|bleue~azul~🔵|jaunes~amarelas~🟡|voiture~carro~🚗|maison~casa~🏠', [
  ['La voiture est rouge.','O carro é vermelho.',[]],
  ["J'ai une maison blanche.",'Eu tenho uma casa branca.',['Tenho uma casa branca.']],
  ['Le chat est noir.','O gato é preto.',[]],
  ['Les fleurs sont jaunes.','As flores são amarelas.',[]],
  ['Ma robe est bleue.','O meu vestido é azul.',['Meu vestido é azul.']],
  ['Les arbres sont verts.','As árvores são verdes.',[]]
]),
U(1, 'Falar de destinos', 'France~França~🇫🇷|Portugal~Portugal~🇵🇹|Italie~Itália~🇮🇹|Espagne~Espanha~🇪🇸|ville~cidade~🏙️|pays~país~🌍|plage~praia~🏖️|montagne~montanha~⛰️', [
  ['Je vais en France.','Eu vou para França.',['Vou para França.','Eu vou à França.','Vou à França.','Eu vou para a França.']],
  ['Nous allons au Portugal.','Nós vamos para Portugal.',['Vamos para Portugal.','Nós vamos a Portugal.','Vamos a Portugal.']],
  ['Elle habite en Italie.','Ela mora em Itália.',['Ela vive em Itália.','Ela mora na Itália.','Ela vive na Itália.']],
  ['Paris est une grande ville.','Paris é uma cidade grande.',['Paris é uma grande cidade.']],
  ['Tu vas à la plage ?','Vais à praia?',['Tu vais à praia?','Você vai à praia?','Vais para a praia?']],
  ['Ils aiment la montagne.','Eles gostam da montanha.',['Eles adoram a montanha.']]
]),
U(1, 'Descrever a tua casa', 'chambre~quarto~🛏️|cuisine~cozinha~🍳|salon~sala~🛋️|table~mesa~🍽️|chaise~cadeira~🪑|lit~cama~🛌|porte~porta~🚪|fenêtre~janela~🪟', [
  ['La cuisine est petite.','A cozinha é pequena.',[]],
  ['Ma chambre est à droite.','O meu quarto é à direita.',['O meu quarto fica à direita.','Meu quarto é à direita.']],
  ['Il y a une table dans le salon.','Há uma mesa na sala.',['Tem uma mesa na sala.','Existe uma mesa na sala.']],
  ['Le lit est confortable.','A cama é confortável.',[]],
  ["Ferme la porte, s'il te plaît.",'Fecha a porta, por favor.',[]],
  ['La fenêtre est ouverte.','A janela está aberta.',[]]
]),
U(1, 'Onde trabalhas', 'bureau~escritório~🏢|hôpital~hospital~🏥|école~escola~🏫|magasin~loja~🏬|médecin~médico~🩺|professeur~professor~🧑‍🏫|ingénieur~engenheiro~👷|travail~trabalho~💼', [
  ['Je travaille dans un bureau.','Eu trabalho num escritório.',['Trabalho num escritório.','Eu trabalho em um escritório.']],
  ['Ma mère est médecin.','A minha mãe é médica.',['Minha mãe é médica.']],
  ["Il travaille à l'hôpital.",'Ele trabalha no hospital.',[]],
  ["Le professeur est à l'école.",'O professor está na escola.',[]],
  ['Elle est ingénieur.','Ela é engenheira.',[]],
  ['Le magasin ouvre à neuf heures.','A loja abre às nove horas.',['A loja abre às nove.']]
]),
U(1, 'Comida e concordância', 'pain~pão~🍞|fromage~queijo~🧀|viande~carne~🥩|poisson~peixe~🐟|légumes~legumes~🥦|fruits~frutas~🍇|chocolat~chocolate~🍫|délicieux~delicioso~😋', [
  ['Le fromage est délicieux.','O queijo é delicioso.',[]],
  ['La viande est froide.','A carne está fria.',['A carne é fria.']],
  ['Je mange des légumes.','Eu como legumes.',['Como legumes.']],
  ['Les fruits sont frais.','As frutas são frescas.',['A fruta é fresca.']],
  ["Il n'aime pas le poisson.",'Ele não gosta de peixe.',['Ele não gosta do peixe.']],
  ['Le chocolat est très bon.','O chocolate é muito bom.',[]]
]),
U(1, 'Mais verbos no presente', 'finis~acabo~🏁|choisis~escolhes~👆|arrivons~chegamos~🛬|commence~começa~▶️|habitent~moram~🏠|étudie~estudo~📚|gâteau~bolo~🎂|maintenant~agora~⏱️', [
  ['Je finis à cinq heures.','Eu acabo às cinco horas.',['Acabo às cinco horas.','Eu termino às cinco horas.','Termino às cinco horas.','Acabo às cinco.']],
  ['Tu choisis le gâteau.','Tu escolhes o bolo.',['Escolhes o bolo.','Você escolhe o bolo.']],
  ['Nous arrivons demain.','Nós chegamos amanhã.',['Chegamos amanhã.']],
  ['Le film commence maintenant.','O filme começa agora.',[]],
  ['Ils habitent à Lyon.','Eles moram em Lyon.',['Eles vivem em Lyon.']],
  ["J'étudie le français.",'Eu estudo francês.',['Estudo francês.','Eu estudo o francês.']]
]),
U(1, 'Comprar roupa', 'chemise~camisa~👔|pantalon~calças~👖|robe~vestido~👗|chaussures~sapatos~👞|manteau~casaco~🧥|chapeau~chapéu~🎩|taille~tamanho~📏|euros~euros~💶', [
  ['Je cherche une chemise.','Eu procuro uma camisa.',['Procuro uma camisa.','Estou à procura de uma camisa.']],
  ['Ce pantalon est trop grand.','Estas calças são demasiado grandes.',['Estas calças são grandes demais.','Estas calças são muito grandes.']],
  ['La robe coûte trente euros.','O vestido custa trinta euros.',[]],
  ["J'aime tes chaussures.",'Eu gosto dos teus sapatos.',['Gosto dos teus sapatos.','Eu gosto dos seus sapatos.']],
  ['Quelle est votre taille ?','Qual é o seu tamanho?',['Qual é o vosso tamanho?']],
  ['Le manteau est noir.','O casaco é preto.',[]]
]),
U(1, 'Informação pessoal', 'nom~nome~🏷️|adresse~morada~📮|téléphone~telefone~📞|numéro~número~🔢|ans~anos~🎂|né~nascido~👶|courriel~email~📧|vingt~vinte~2️⃣', [
  ['Quel est ton nom ?','Qual é o teu nome?',['Qual é o seu nome?','Como te chamas?']],
  ["J'ai vingt ans.",'Eu tenho vinte anos.',['Tenho vinte anos.']],
  ['Voici mon numéro de téléphone.','Aqui está o meu número de telefone.',['Este é o meu número de telefone.','Aqui está meu número de telefone.']],
  ['Quelle est ton adresse ?','Qual é a tua morada?',['Qual é o teu endereço?','Qual é a sua morada?','Qual é o seu endereço?']],
  ['Je suis né à Lisbonne.','Eu nasci em Lisboa.',['Nasci em Lisboa.']],
  ['Mon courriel est simple.','O meu email é simples.',['O meu e-mail é simples.','Meu email é simples.']]
]),
U(1, 'Usar o infinitivo', 'voyager~viajar~✈️|lire~ler~📖|danser~dançar~💃|apprendre~aprender~🧠|dormir~dormir~😴|sortir~sair~🚶|manger~comer~🍽️|préfère~prefere~⭐', [
  ["J'aime voyager.",'Eu gosto de viajar.',['Gosto de viajar.','Adoro viajar.']],
  ['Elle veut apprendre le français.','Ela quer aprender francês.',['Ela quer aprender o francês.']],
  ['Nous allons manger.','Nós vamos comer.',['Vamos comer.']],
  ['Tu peux sortir ce soir ?','Podes sair esta noite?',['Tu podes sair esta noite?','Você pode sair esta noite?','Podes sair hoje à noite?']],
  ['Il préfère dormir.','Ele prefere dormir.',[]],
  ["J'adore lire et danser.",'Eu adoro ler e dançar.',['Adoro ler e dançar.']]
]),
U(1, 'Perguntar sobre a pessoa', 'comment~como~❓|pourquoi~porque~❔|qui~quem~👤|aimes~gostas~💜|fais~fazes~🛠️|sport~desporto~🏅|apprends~aprendes~🧠|ton~teu~👉', [
  ["Comment tu t'appelles ?",'Como te chamas?',['Como é que te chamas?','Qual é o teu nome?']],
  ["D'où viens-tu ?",'De onde és?',['De onde vens?','Donde és?','De onde você é?']],
  ["Qu'est-ce que tu fais ?",'O que fazes?',['O que é que fazes?','O que estás a fazer?','O que tu fazes?']],
  ['Tu aimes le sport ?','Gostas de desporto?',['Tu gostas de desporto?','Você gosta de esporte?']],
  ['Qui est ton ami ?','Quem é o teu amigo?',['Quem é teu amigo?']],
  ['Pourquoi tu apprends le français ?','Porque aprendes francês?',['Porque é que aprendes francês?','Por que você aprende francês?','Porque estás a aprender francês?']]
]),
U(1, 'Fazer perguntas', 'combien~quanto~💶|coûte~custa~💰|ouvert~aberto~🔓|fermé~fechada~🔒|toilettes~casa de banho~🚻|heure~hora~🕐|faim~fome~🍔|musée~museu~🏛️', [
  ['Combien coûte le pain ?','Quanto custa o pão?',[]],
  ['Est-ce que le musée est ouvert ?','O museu está aberto?',['O museu é aberto?','É que o museu está aberto?']],
  ['Où sont les toilettes ?','Onde é a casa de banho?',['Onde fica a casa de banho?','Onde ficam os sanitários?','Onde é o banheiro?']],
  ['Quelle heure est-il ?','Que horas são?',[]],
  ['Le magasin est fermé ?','A loja está fechada?',[]],
  ['Est-ce que tu as faim ?','Tens fome?',['Tu tens fome?','Estás com fome?','Você está com fome?']]
]),
U(1, 'Dizer as horas', 'heures~horas~🕐|midi~meio-dia~🕛|minuit~meia-noite~🌙|demie~meia~🕧|quart~quarto~🕒|soir~noite~🌆|huit~oito~8️⃣|neuf~nove~9️⃣', [
  ['Il est huit heures.','São oito horas.',['São oito.']],
  ['Il est midi.','É meio-dia.',[]],
  ['Je me lève à sept heures et demie.','Eu levanto-me às sete e meia.',['Levanto-me às sete e meia.','Eu me levanto às sete e meia.']],
  ['Le train part à minuit.','O comboio parte à meia-noite.',['O comboio sai à meia-noite.']],
  ['Il est neuf heures et quart.','São nove e um quarto.',['São nove e quinze.','São nove horas e um quarto.']],
  ['Nous mangeons à huit heures du soir.','Nós jantamos às oito da noite.',['Comemos às oito da noite.','Nós comemos às oito da noite.','Jantamos às oito da noite.']]
]),
U(1, 'Falar formalmente', 'vous~o senhor~🎩|pouvez~pode~🙏|répéter~repetir~🔁|avez~tem~🤲|désolé~lamento~😔|bienvenue~bem-vindo~🎉|voulez~quer~❓|madame~senhora~👩', [
  ['Vous êtes français ?','O senhor é francês?',['É francês?','Você é francês?','Vocês são franceses?']],
  ["Pouvez-vous répéter, s'il vous plaît ?",'Pode repetir, por favor?',['Podem repetir, por favor?','Pode repetir?']],
  ['Avez-vous une chambre ?','Tem um quarto?',['O senhor tem um quarto?','Têm um quarto?']],
  ['Je suis désolé, madame.','Peço desculpa, minha senhora.',['Desculpe, senhora.','Lamento, senhora.','Peço desculpa, senhora.','Desculpe, minha senhora.']],
  ['Bienvenue à Paris !','Bem-vindo a Paris!',['Bem-vinda a Paris!','Bem-vindos a Paris!']],
  ['Vous voulez un café ?','Quer um café?',['O senhor quer um café?','A senhora quer um café?','Querem um café?','Você quer um café?']]
]),
U(1, 'Passatempos', 'musique~música~🎵|guitare~guitarra~🎸|cinéma~cinema~🎬|peinture~pintura~🎨|piano~piano~🎹|photo~fotografia~📷|jeux~jogos~🎮|sport~desporto~🏅', [
  ["J'aime la musique.",'Eu gosto de música.',['Gosto de música.','Eu gosto da música.','Adoro música.']],
  ['Il joue de la guitare.','Ele toca guitarra.',['Ele toca viola.']],
  ['Nous allons au cinéma.','Nós vamos ao cinema.',['Vamos ao cinema.']],
  ['Elle fait de la peinture.','Ela pinta.',['Ela faz pintura.']],
  ['Tu fais du sport ?','Fazes desporto?',['Tu fazes desporto?','Praticas desporto?','Você faz esporte?']],
  ['Mon frère adore les jeux vidéo.','O meu irmão adora videojogos.',['O meu irmão adora jogos de vídeo.','Meu irmão adora videogames.']]
]),
U(1, 'O pequeno-almoço', 'beurre~manteiga~🧈|confiture~compota~🍓|lait~leite~🥛|céréales~cereais~🥣|tartine~torrada~🍞|sucre~açúcar~🍬|orange~laranja~🍊|café~café~☕', [
  ['Je prends un café au lait.','Eu tomo um café com leite.',['Tomo um café com leite.','Eu bebo um café com leite.']],
  ['Il mange une tartine avec du beurre.','Ele come uma torrada com manteiga.',[]],
  ['Tu veux de la confiture ?','Queres compota?',['Tu queres compota?','Queres doce?','Você quer geleia?']],
  ['Les enfants mangent des céréales.','As crianças comem cereais.',[]],
  ["Je bois du jus d'orange.",'Eu bebo sumo de laranja.',['Bebo sumo de laranja.']],
  ['Sans sucre, merci.','Sem açúcar, obrigado.',['Sem açúcar, obrigada.']]
]),
U(1, 'Planos de viagem', 'valise~mala~🧳|avion~avião~✈️|billet~bilhete~🎟️|passeport~passaporte~🛂|vacances~férias~🌴|semaine~semana~📅|réserver~reservar~📝|voyage~viagem~🗺️', [
  ['Je pars en vacances.','Eu vou de férias.',['Vou de férias.','Eu parto de férias.']],
  ["Nous prenons l'avion lundi.",'Nós apanhamos o avião na segunda-feira.',['Apanhamos o avião na segunda-feira.','Vamos de avião na segunda-feira.','Nós pegamos o avião na segunda-feira.']],
  ['Où est mon passeport ?','Onde está o meu passaporte?',['Onde está meu passaporte?']],
  ['Ta valise est lourde.','A tua mala é pesada.',['A tua mala está pesada.']],
  ['Je voudrais réserver un billet.','Eu queria reservar um bilhete.',['Queria reservar um bilhete.','Gostaria de reservar um bilhete.']],
  ['Le voyage dure une semaine.','A viagem dura uma semana.',[]]
]),
U(1, 'Falar da escola', 'élève~aluno~🧑‍🎓|cahier~caderno~📓|stylo~caneta~🖊️|crayon~lápis~✏️|devoirs~trabalhos de casa~📝|examen~exame~📄|maths~matemática~➗|cours~aula~🏫', [
  ["L'élève écrit avec un stylo.",'O aluno escreve com uma caneta.',[]],
  ["J'ai un examen demain.",'Eu tenho um exame amanhã.',['Tenho um exame amanhã.']],
  ['Le cours de maths commence.','A aula de matemática começa.',[]],
  ['Tu as fait tes devoirs ?','Fizeste os trabalhos de casa?',['Tu fizeste os trabalhos de casa?','Fizeste os teus trabalhos de casa?','Você fez a lição de casa?']],
  ['Mon cahier est dans mon sac.','O meu caderno está na minha mochila.',['O meu caderno está no meu saco.','Meu caderno está na minha mochila.','O meu caderno está na minha mala.']],
  ["Prête-moi un crayon, s'il te plaît.",'Empresta-me um lápis, por favor.',[]]
]),
U(1, 'Horários de trabalho', 'lundi~segunda-feira~1️⃣|mardi~terça-feira~2️⃣|mercredi~quarta-feira~3️⃣|jeudi~quinta-feira~4️⃣|vendredi~sexta-feira~5️⃣|samedi~sábado~6️⃣|dimanche~domingo~7️⃣|réunion~reunião~🤝', [
  ['Je travaille du lundi au vendredi.','Eu trabalho de segunda a sexta.',['Trabalho de segunda a sexta.','Eu trabalho de segunda-feira a sexta-feira.']],
  ['La réunion est mardi.','A reunião é na terça-feira.',['A reunião é terça-feira.','A reunião é na terça.']],
  ['Il ne travaille pas le dimanche.','Ele não trabalha ao domingo.',['Ele não trabalha aos domingos.','Ele não trabalha no domingo.']],
  ['Mercredi, je commence à dix heures.','Na quarta-feira, começo às dez horas.',['Na quarta, começo às dez.','Quarta-feira eu começo às dez horas.','Na quarta-feira, eu começo às dez horas.']],
  ['Nous avons une réunion jeudi.','Nós temos uma reunião na quinta-feira.',['Temos uma reunião na quinta-feira.','Temos uma reunião na quinta.']],
  ['Le samedi, je suis libre.','Ao sábado, estou livre.',['Aos sábados, estou livre.','No sábado, estou livre.','Ao sábado eu estou livre.']]
]),
U(1, 'Reservar um hotel', 'clé~chave~🔑|nuits~noites~🌙|réception~receção~🛎️|petit-déjeuner~pequeno-almoço~🥐|douche~duche~🚿|ascenseur~elevador~🛗|étage~andar~🏢|chambre~quarto~🛏️', [
  ['Je voudrais une chambre pour deux nuits.','Eu queria um quarto para duas noites.',['Queria um quarto para duas noites.','Gostaria de um quarto para duas noites.']],
  ['Voici la clé de la chambre.','Aqui está a chave do quarto.',[]],
  ['Le petit-déjeuner est inclus ?','O pequeno-almoço está incluído?',['O café da manhã está incluído?']],
  ['La chambre est au troisième étage.','O quarto é no terceiro andar.',['O quarto fica no terceiro andar.']],
  ["L'ascenseur est à gauche.",'O elevador é à esquerda.',['O elevador fica à esquerda.']],
  ['Il y a une douche dans la chambre.','Há um duche no quarto.',['Tem um chuveiro no quarto.','Há um chuveiro no quarto.']]
]),
U(1, 'A tua rotina', 'lève~levanto~⏰|brosse~escova~🪥|habille~veste~👕|couchons~deitamos~🛌|toujours~sempre~🔁|vite~depressa~⚡|tard~tarde~🌙|dents~dentes~🦷', [
  ['Je me lève à six heures.','Eu levanto-me às seis horas.',['Levanto-me às seis horas.','Levanto-me às seis.','Eu me levanto às seis horas.']],
  ["D'abord, je prends une douche.",'Primeiro, tomo um duche.',['Primeiro, eu tomo um duche.','Primeiro, tomo banho.','Primeiro, tomo um banho.']],
  ['Il se brosse les dents.','Ele escova os dentes.',['Ele lava os dentes.']],
  ["Elle s'habille vite.",'Ela veste-se depressa.',['Ela veste-se rapidamente.','Ela se veste rápido.']],
  ['Nous nous couchons tard.','Nós deitamo-nos tarde.',['Deitamo-nos tarde.','Nós nos deitamos tarde.','Vamos para a cama tarde.']],
  ['Je prends toujours un café.','Eu tomo sempre um café.',['Tomo sempre um café.','Eu sempre tomo um café.']]
]),
U(1, 'O tempo', 'soleil~sol~☀️|pleut~chove~🌧️|neige~neva~❄️|vent~vento~💨|nuage~nuvem~☁️|chaud~calor~🔥|froid~frio~🥶|hiver~inverno~⛄', [
  ["Il fait beau aujourd'hui.",'Está bom tempo hoje.',['Hoje está bom tempo.','Faz bom tempo hoje.']],
  ['Il pleut beaucoup.','Chove muito.',['Está a chover muito.']],
  ['Il fait froid en hiver.','Faz frio no inverno.',['Está frio no inverno.']],
  ['Il neige à la montagne.','Neva na montanha.',['Está a nevar na montanha.']],
  ['Il y a du vent.','Está vento.',['Há vento.','Faz vento.']],
  ['Quel temps fait-il ?','Que tempo faz?',['Como está o tempo?','Como está o tempo hoje?']]
]),
U(1, 'Descrever pessoas', 'blond~loiro~👱|yeux~olhos~👀|cheveux~cabelo~💇|mince~magro~🧍|belle~bonita~😍|intelligente~inteligente~🧠|bleus~azuis~🔵|bruns~castanhos~🟤', [
  ['Elle a les yeux bleus.','Ela tem olhos azuis.',['Ela tem os olhos azuis.']],
  ['Il a les cheveux bruns.','Ele tem cabelo castanho.',['Ele tem o cabelo castanho.','Ele tem cabelos castanhos.','Ele tem o cabelo escuro.']],
  ['Mon ami est blond.','O meu amigo é loiro.',['O meu amigo é louro.','Meu amigo é loiro.']],
  ['Ta sœur est très belle.','A tua irmã é muito bonita.',['Tua irmã é muito bonita.','A sua irmã é muito bonita.']],
  ['Il est grand et mince.','Ele é alto e magro.',[]],
  ['Elle est intelligente et drôle.','Ela é inteligente e engraçada.',[]]
])
];

// Temas das secções 3 a 8 (conteúdo em preparação)
const LATER = [
  [2, 'Exprimir sentimentos|Compras no supermercado|Comprar roupa|Pedir direções|Dias, horas e verbos reflexos|Tempos livres|Dar opiniões|Pronomes de complemento direto|Falar da natureza|Descrever a família|Comunicar na escola|Falar de cozinha|Horários, savoir e connaître|Planear férias|Falar de saúde|Descrever habitação|Comunicar com colegas|Usar o imperfeito|Acontecimentos recentes|Ofertas, pedidos e imperativo|Uma viagem recente'],
  [3, 'Usar o presente|O fim de semana no passado|Pessoas que conheces|Falar das aulas|A família alargada|Falar de Paris|Comentar roupa|Fazer pedidos|Comprar no mercado|Usar o passado|Pronomes de complemento indireto|Comunicar num hotel|Gastar dinheiro|Reuniões de família|Experiências de viagem|Tecnologia e imperfeito|Jogos e media|Falar de exercício|Falar de dinheiro|Comentar comida|Combinar sair|Falar do teu passado|Planear transportes|Imperativo e passado com être|O que há em tua casa|Falar de arte|Numa emergência|Usar o futuro|Falar com o médico|O tempo e o futuro|Objetos pessoais|Falar do futuro|Um mau dia|Falar de carreiras|Exprimir-te com delicadeza|Comprar em saldos|Usar o gerúndio|Condicional e reflexos no passado|Fazer pedidos educados|Falar de manifestações|Pedir num restaurante|Comentar desporto|Comunicar na aula|Viagens de carro|Falar de emergências|Conhecer pessoas'],
  [4, 'Pedir num bistrô|Festas e pronomes|Usar rien e personne|Falar de presentes|Falar da escola|Relações|Planos de carreira|Dar opiniões|Ar livre e futuro|Pronomes relativos|Atletismo|Falar do passado|O ambiente|A tua saúde|O teu trabalho|Usar y e en|Irmãos e pronomes|Seguir receitas|Ler uma entrevista|Descrever um casamento|Comunicar numa viagem|Tarefas domésticas|Viajar para o estrangeiro|A internet|Comentar comida|Mais pronomes relativos|Comer e imperativo|Relações passadas|Tecnologia|Descrever colegas|A lida da casa|Narrar no passado|Voz passiva|Desporto|Seguir uma receita|Vida de estudante|Ao telefone e gerúndio|Particípios passados|A tua infância|Sentimentos|Acontecimentos infelizes|Exprimir obrigação|Um problema de saúde|Na aula e concordância|Questões sociais|Usar o condicional|Um novo emprego|Fazer sugestões|Numa festa|Estudar no estrangeiro|Condicional e conjuntivo'],
  [5, 'Os teus vizinhos|Arranjar-se para sair|Usar a imaginação|Problemas no trabalho|Reparações em casa|Filmes e condicional|Falar das aulas|Jardinagem|Transportes|Narrar acontecimentos passados|Crime|Dar conselhos médicos|Vida urbana|Conjuntivo e passado distante|Descrever um bairro|Comunicação|Comida francesa|Política|Usar o condicional|Exprimir uma reação|Comentar roupa|Opiniões e conjuntivo|Ar livre|A tua família|Obras em casa|O que dá na televisão|Eventos desportivos|Tarefas|Recuperar de uma doença|Viagem a Paris no passado|Férias que correram mal|Exprimir necessidades|Usar o conjuntivo|Desastres na cozinha|Comunicar num avião|Comentar arte|Feriados|Notícias do mundo e conjuntivo|Recordar o passado|Discurso indireto|Num set de filmagens|O que poderia ter sido|Transportes públicos|Culpar os outros e condicional passado|Exprimir arrependimento|Quintas e hortas|Falar de trabalho|Férias de verão|Vida académica'],
  [6, 'Pedir autorização|Defender uma ideia|Criticar comida|Mau comportamento|Reparações em casa|Dar opiniões|Prós e contras|O futuro|Crime e justiça|Exprimir probabilidade|Avisar alguém|Responsabilidades|Desafiar clichés|Arrependimento e voz passiva|Problemas em viagem|Preferências alimentares|Memórias|Falar informalmente|Descrever sintomas|Exprimir preocupações|Comunicar requisitos|Partilhar opiniões|Tempos passados, à e de|Exprimir surpresa|Mudanças ao longo do tempo|Tecnologia|Vida escolar|Ler textos literários|Uma mudança de casa|Exprimir empatia|Vida profissional|A tua cidade ontem e hoje|Atribuir culpas|Pedidos formais|Imaginar e se…|Contrastar opiniões'],
  [7, 'Pedidos educados|Negociar|Dar explicações|Contar um acontecimento recente|O mundo do cinema|Tendências sociais|Proezas culinárias|Exprimir frustração|Pedir um reembolso|Um assunto delicado|Uma experiência desagradável|Resolver um crime|Design de roupa e condições|Encorajar e dar os parabéns|Alterar planos de viagem|Fazer sugestões|Certeza e incerteza|Exprimir desilusão|Cuidar de animais|Preferências de viagem|Atividades físicas|Conversa de circunstância|Transações|Dar e responder a ordens|Especular sobre uma ausência|Natureza|Exprimir irritação|História|Limites e alternativas|Eleições|Exprimir incredulidade|Compras|Lançar uma discussão|Exprimir exasperação|O passado literário|Comunicar poeticamente|Falar de progresso']
];
LATER.forEach(([s, list]) => list.split('|').forEach(t => units.push(U(s, t))));

window.KIRI_COURSES.fr = {
  name: 'Francês', voice: 'fr-FR', sections: SECTIONS, units,
  extra: { je:'eu', suis:'sou', un:'um', une:'uma', le:'o', la:'a', les:'os / as', est:'é / está', elle:'ela', il:'ele', tu:'tu', es:'és', ma:'minha', mon:'meu', mes:'meus / minhas', ta:'tua', tes:'teus / tuas', son:'seu / dele', sa:'sua / dela', "j'ai":'eu tenho', avons:'temos', nous:'nós', vous:'vocês / o senhor', "c'est":'é / isto é', dans:'em', de:'de', du:'do / algum', des:'uns / umas', et:'e', avec:'com', sans:'sem', pour:'para', 'à':'a / em', au:'ao', en:'em', ici:'aqui', très:'muito', pas:'não (negação)', "n'aime":'não gosta', ne:'não', "s'il":'se ele', plaît:'agrada', 'ça':'isso', va:'vai', bonne:'boa', sont:'são', ont:'têm', a:'tem', ai:'tenho', voici:'aqui está', fait:'faz', y:'lá', veux:'queres', voudrais:'queria', prends:'tomo', vais:'vais', allons:'vamos', "aujourd'hui":'hoje', beaucoup:'muito', trop:'demasiado', ce:'este', quel:'qual', quelle:'qual', "est-ce":'é que', que:'que', "qu'est-ce":'o que é que', "d'où":'de onde', "d'abord":'primeiro', me:'me', se:'se', te:'te', "s'appelle":'chama-se', "t'appelles":'te chamas' }
};
})();
// manter a ordem dos cursos no ecrã de escolha
(() => { const C = window.KIRI_COURSES, o = {}; ['en', 'es', 'fr', 'de', 'it'].forEach(k => { if (C[k]) o[k] = C[k]; }); Object.keys(C).forEach(k => { o[k] ||= C[k]; }); window.KIRI_COURSES = o; })();
// Outras línguas reutilizam a estrutura do francês: mesmas secções, temas e lado português.
// T = [[palavras 'alvo|alvo[=pt[=emoji]]|…', [frases alvo na mesma ordem]], …] para cada unidade com conteúdo.
const FR_ONLY = { 'Horários, savoir e connaître': 'Horários e verbos de conhecer', 'Imperativo e passado com être': 'Imperativo e passado composto', 'Pedir num bistrô': 'Pedir num café', 'Usar rien e personne': 'Usar «nada» e «ninguém»', 'Usar y e en': 'Pronomes de lugar e quantidade', 'Tempos passados, à e de': 'Tempos passados e preposições' };
window.KIRI_FROM_FR = (code, T, add, local) => {
  const C = window.KIRI_COURSES, old = C[code] || {}, fr = C.fr, ren = Object.assign({}, FR_ONLY, local); let i = 0;
  C[code] = { name: old.name, voice: old.voice, sections: fr.sections, extra: Object.assign({}, old.extra, add),
    units: fr.units.map(u => {
      if (u.soon) { const t = ren[u.title] || u.title; return { ...u, title: t, desc: t }; }
      const [ws, ss] = T[i++], tw = ws.split('|');
      return { ...u, words: u.words.map((w, j) => { const o = tw[j].split('='); return [o[0], o[1] || w[1], o[2] || w[2]]; }),
        sentences: u.sentences.map((s, j) => [ss[j], s[1], s[2]]) };
    }) };
};
