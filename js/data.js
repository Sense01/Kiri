// Conteúdo dos cursos do Kiri (a partir de Português)
// words: [alvo, português, emoji]
// sentences: [alvo, português, [traduções alternativas aceites]]
window.KIRI_COURSES = {
  en: {
    name: 'Inglês', voice: 'en-US', learners: '24,1 M',
    units: [
      { title: 'Primeiros passos', desc: 'Cumprimentar e apresentar-te',
        words: [['hello','olá','👋'],['goodbye','adeus','🙋'],['man','homem','👨'],['woman','mulher','👩'],['boy','rapaz','👦'],['girl','rapariga','👧'],['yes','sim','✅'],['thanks','obrigado','🙏']],
        sentences: [
          ['Hello, I am Ana.','Olá, eu sou a Ana.',['Olá, sou a Ana.','Olá, eu sou Ana.','Olá, sou Ana.']],
          ['I am a man.','Eu sou um homem.',['Sou um homem.']],
          ['She is a woman.','Ela é uma mulher.',[]],
          ['The boy says hello.','O rapaz diz olá.',['O menino diz olá.']],
          ['Yes, thank you.','Sim, obrigado.',['Sim, obrigada.']],
          ['Goodbye, Tom!','Adeus, Tom!',[]],
          ['You are a girl.','Tu és uma rapariga.',['És uma rapariga.','Tu és uma menina.','És uma menina.','Você é uma menina.']]
        ]},
      { title: 'Comida e bebida', desc: 'Pedir comida e falar de gostos',
        words: [['water','água','💧'],['bread','pão','🍞'],['apple','maçã','🍎'],['coffee','café','☕'],['milk','leite','🥛'],['cheese','queijo','🧀'],['egg','ovo','🥚'],['rice','arroz','🍚']],
        sentences: [
          ['I eat bread.','Eu como pão.',['Como pão.']],
          ['She drinks water.','Ela bebe água.',[]],
          ['The apple is red.','A maçã é vermelha.',[]],
          ['I want a coffee.','Eu quero um café.',['Quero um café.']],
          ['We eat rice and eggs.','Nós comemos arroz e ovos.',['Comemos arroz e ovos.']],
          ['The milk is cold.','O leite está frio.',['O leite é frio.']],
          ['He likes cheese.','Ele gosta de queijo.',[]]
        ]},
      { title: 'Família', desc: 'Falar da tua família e da tua casa',
        words: [['mother','mãe','👩‍👧'],['father','pai','👨‍👦'],['sister','irmã','👭'],['brother','irmão','👬'],['dog','cão','🐕'],['cat','gato','🐈'],['house','casa','🏠'],['family','família','👪']],
        sentences: [
          ['My mother is here.','A minha mãe está aqui.',['Minha mãe está aqui.']],
          ['His father is tall.','O pai dele é alto.',[]],
          ['I have a brother.','Eu tenho um irmão.',['Tenho um irmão.']],
          ['The cat is in the house.','O gato está na casa.',['O gato está em casa.']],
          ['We have a dog.','Nós temos um cão.',['Temos um cão.','Nós temos um cachorro.','Temos um cachorro.']],
          ['Her sister is a student.','A irmã dela é estudante.',[]],
          ['This is my family.','Esta é a minha família.',['Esta é minha família.','Isto é a minha família.']]
        ]},
      { title: 'Na cidade', desc: 'Orientar-te e viajar',
        words: [['train','comboio','🚆'],['street','rua','🛣️'],['hotel','hotel','🏨'],['ticket','bilhete','🎟️'],['map','mapa','🗺️'],['car','carro','🚗'],['airport','aeroporto','✈️'],['bus','autocarro','🚌']],
        sentences: [
          ['Where is the hotel?','Onde é o hotel?',['Onde fica o hotel?','Onde está o hotel?']],
          ['The train is late.','O comboio está atrasado.',[]],
          ['I need a ticket.','Eu preciso de um bilhete.',['Preciso de um bilhete.']],
          ['The bus is here.','O autocarro está aqui.',[]],
          ['We go to the airport.','Nós vamos para o aeroporto.',['Vamos para o aeroporto.','Nós vamos ao aeroporto.','Vamos ao aeroporto.']],
          ['Do you have a map?','Tens um mapa?',['Tu tens um mapa?','Você tem um mapa?']],
          ['The car is new.','O carro é novo.',[]]
        ]}
    ],
    extra: { i:'eu', am:'sou', a:'um', an:'um', the:'o / a', is:'é / está', she:'ela', he:'ele', you:'tu', we:'nós', are:'és / são', says:'diz', thank:'obrigado', my:'meu / minha', his:'dele', her:'dela', have:'ter', this:'isto / este', in:'em', where:'onde', need:'preciso', go:'vamos / ir', to:'para', do:'(auxiliar)', eat:'comer', drinks:'bebe', want:'quero', likes:'gosta', red:'vermelho', cold:'frio', and:'e', eggs:'ovos', tall:'alto', student:'estudante', late:'atrasado', here:'aqui', new:'novo' }
  },
  es: {
    name: 'Espanhol', voice: 'es-ES', learners: '15,8 M',
    units: [
      { title: 'Primeiros passos', desc: 'Cumprimentar e apresentar-te',
        words: [['hola','olá','👋'],['adiós','adeus','🙋'],['hombre','homem','👨'],['mujer','mulher','👩'],['niño','menino','👦'],['niña','menina','👧'],['sí','sim','✅'],['gracias','obrigado','🙏']],
        sentences: [
          ['Hola, soy Ana.','Olá, eu sou a Ana.',['Olá, sou a Ana.','Olá, eu sou Ana.','Olá, sou Ana.']],
          ['Yo soy un hombre.','Eu sou um homem.',['Sou um homem.']],
          ['Ella es una mujer.','Ela é uma mulher.',[]],
          ['El niño dice hola.','O menino diz olá.',['O rapaz diz olá.']],
          ['Sí, gracias.','Sim, obrigado.',['Sim, obrigada.']],
          ['¡Adiós, Tomás!','Adeus, Tomás!',[]],
          ['Tú eres una niña.','Tu és uma menina.',['És uma menina.','Tu és uma rapariga.','És uma rapariga.','Você é uma menina.']]
        ]},
      { title: 'Comida e bebida', desc: 'Pedir comida e falar de gostos',
        words: [['agua','água','💧'],['pan','pão','🍞'],['manzana','maçã','🍎'],['café','café','☕'],['leche','leite','🥛'],['queso','queijo','🧀'],['huevo','ovo','🥚'],['arroz','arroz','🍚']],
        sentences: [
          ['Yo como pan.','Eu como pão.',['Como pão.']],
          ['Ella bebe agua.','Ela bebe água.',[]],
          ['La manzana es roja.','A maçã é vermelha.',[]],
          ['Quiero un café.','Eu quero um café.',['Quero um café.']],
          ['Comemos arroz y huevos.','Nós comemos arroz e ovos.',['Comemos arroz e ovos.']],
          ['La leche está fría.','O leite está frio.',[]],
          ['A él le gusta el queso.','Ele gosta de queijo.',[]]
        ]},
      { title: 'Família', desc: 'Falar da tua família e da tua casa',
        words: [['madre','mãe','👩‍👧'],['padre','pai','👨‍👦'],['hermana','irmã','👭'],['hermano','irmão','👬'],['perro','cão','🐕'],['gato','gato','🐈'],['casa','casa','🏠'],['familia','família','👪']],
        sentences: [
          ['Mi madre está aquí.','A minha mãe está aqui.',['Minha mãe está aqui.']],
          ['Su padre es alto.','O pai dele é alto.',['O pai dela é alto.','O seu pai é alto.']],
          ['Tengo un hermano.','Eu tenho um irmão.',['Tenho um irmão.']],
          ['El gato está en la casa.','O gato está na casa.',['O gato está em casa.']],
          ['Tenemos un perro.','Nós temos um cão.',['Temos um cão.','Nós temos um cachorro.','Temos um cachorro.']],
          ['Su hermana es estudiante.','A irmã dela é estudante.',['A irmã dele é estudante.','A sua irmã é estudante.']],
          ['Esta es mi familia.','Esta é a minha família.',['Esta é minha família.']]
        ]},
      { title: 'Na cidade', desc: 'Orientar-te e viajar',
        words: [['tren','comboio','🚆'],['calle','rua','🛣️'],['hotel','hotel','🏨'],['billete','bilhete','🎟️'],['mapa','mapa','🗺️'],['coche','carro','🚗'],['aeropuerto','aeroporto','✈️'],['autobús','autocarro','🚌']],
        sentences: [
          ['¿Dónde está el hotel?','Onde é o hotel?',['Onde fica o hotel?','Onde está o hotel?']],
          ['El tren llega tarde.','O comboio chega tarde.',['O comboio está atrasado.']],
          ['Necesito un billete.','Eu preciso de um bilhete.',['Preciso de um bilhete.']],
          ['El autobús está aquí.','O autocarro está aqui.',[]],
          ['Vamos al aeropuerto.','Nós vamos para o aeroporto.',['Vamos para o aeroporto.','Nós vamos ao aeroporto.','Vamos ao aeroporto.']],
          ['¿Tienes un mapa?','Tens um mapa?',['Tu tens um mapa?','Você tem um mapa?']],
          ['El coche es nuevo.','O carro é novo.',[]]
        ]}
    ],
    extra: { yo:'eu', soy:'sou', un:'um', una:'uma', el:'o', la:'a', es:'é', está:'está', ella:'ela', 'él':'ele', 'tú':'tu', eres:'és', dice:'diz', mi:'minha / meu', su:'seu / sua', tengo:'tenho', tenemos:'temos', esta:'esta', en:'em', 'dónde':'onde', necesito:'preciso', vamos:'vamos', al:'ao', tienes:'tens', como:'como', bebe:'bebe', roja:'vermelha', quiero:'quero', comemos:'comemos', y:'e', huevos:'ovos', 'fría':'fria', a:'a', le:'lhe', gusta:'gosta', alto:'alto', estudiante:'estudante', llega:'chega', tarde:'tarde', 'aquí':'aqui', nuevo:'novo' }
  },
  fr: {
    name: 'Francês', voice: 'fr-FR', learners: '10,9 M',
    units: [
      { title: 'Primeiros passos', desc: 'Cumprimentar e apresentar-te',
        words: [['bonjour','olá','👋'],['merci','obrigado','🙏'],['homme','homem','👨'],['femme','mulher','👩'],['garçon','rapaz','👦'],['fille','rapariga','👧'],['oui','sim','✅'],['non','não','❌']],
        sentences: [
          ['Bonjour, je suis Ana.','Olá, eu sou a Ana.',['Olá, sou a Ana.','Olá, eu sou Ana.','Olá, sou Ana.','Bom dia, eu sou a Ana.','Bom dia, sou a Ana.']],
          ['Je suis un homme.','Eu sou um homem.',['Sou um homem.']],
          ['Je suis une femme.','Eu sou uma mulher.',['Sou uma mulher.']],
          ['Le garçon dit bonjour.','O rapaz diz olá.',['O menino diz olá.','O rapaz diz bom dia.','O menino diz bom dia.']],
          ['Oui, merci.','Sim, obrigado.',['Sim, obrigada.']],
          ['Au revoir, Thomas !','Adeus, Thomas!',[]],
          ['Non, tu es une fille.','Não, tu és uma rapariga.',['Não, és uma rapariga.','Não, tu és uma menina.','Não, és uma menina.']]
        ]},
      { title: 'Comida e bebida', desc: 'Pedir comida e falar de gostos',
        words: [['eau','água','💧'],['pain','pão','🍞'],['pomme','maçã','🍎'],['café','café','☕'],['lait','leite','🥛'],['fromage','queijo','🧀'],['œuf','ovo','🥚'],['riz','arroz','🍚']],
        sentences: [
          ['Je mange du pain.','Eu como pão.',['Como pão.']],
          ["Elle boit de l'eau.",'Ela bebe água.',[]],
          ['La pomme est rouge.','A maçã é vermelha.',[]],
          ['Je veux un café.','Eu quero um café.',['Quero um café.']],
          ['Nous mangeons du riz et des œufs.','Nós comemos arroz e ovos.',['Comemos arroz e ovos.']],
          ['Le lait est froid.','O leite está frio.',['O leite é frio.']],
          ['Il aime le fromage.','Ele gosta de queijo.',['Ele adora queijo.']]
        ]},
      { title: 'Família', desc: 'Falar da tua família e da tua casa',
        words: [['mère','mãe','👩‍👧'],['père','pai','👨‍👦'],['sœur','irmã','👭'],['frère','irmão','👬'],['chien','cão','🐕'],['chat','gato','🐈'],['maison','casa','🏠'],['famille','família','👪']],
        sentences: [
          ['Ma mère est ici.','A minha mãe está aqui.',['Minha mãe está aqui.']],
          ['Son père est grand.','O pai dele é alto.',['O pai dela é alto.','O seu pai é alto.']],
          ["J'ai un frère.",'Eu tenho um irmão.',['Tenho um irmão.']],
          ['Le chat est dans la maison.','O gato está na casa.',['O gato está em casa.']],
          ['Nous avons un chien.','Nós temos um cão.',['Temos um cão.','Nós temos um cachorro.','Temos um cachorro.']],
          ['Sa sœur est étudiante.','A irmã dela é estudante.',['A irmã dele é estudante.','A sua irmã é estudante.']],
          ["C'est ma famille.",'Esta é a minha família.',['Esta é minha família.','É a minha família.']]
        ]},
      { title: 'Na cidade', desc: 'Orientar-te e viajar',
        words: [['train','comboio','🚆'],['rue','rua','🛣️'],['hôtel','hotel','🏨'],['billet','bilhete','🎟️'],['carte','mapa','🗺️'],['voiture','carro','🚗'],['aéroport','aeroporto','✈️'],['bus','autocarro','🚌']],
        sentences: [
          ["Où est l'hôtel ?",'Onde é o hotel?',['Onde fica o hotel?','Onde está o hotel?']],
          ['Le train est en retard.','O comboio está atrasado.',[]],
          ["J'ai besoin d'un billet.",'Eu preciso de um bilhete.',['Preciso de um bilhete.']],
          ['Le bus est ici.','O autocarro está aqui.',[]],
          ["Nous allons à l'aéroport.",'Nós vamos para o aeroporto.',['Vamos para o aeroporto.','Nós vamos ao aeroporto.','Vamos ao aeroporto.']],
          ['Tu as une carte ?','Tens um mapa?',['Tu tens um mapa?','Você tem um mapa?']],
          ['La voiture est neuve.','O carro é novo.',[]]
        ]}
    ],
    extra: { je:'eu', suis:'sou', un:'um', une:'uma', le:'o', la:'a', est:'é / está', elle:'ela', il:'ele', tu:'tu', es:'és', dit:'diz', ma:'minha', son:'seu / dele', sa:'sua / dela', "j'ai":'eu tenho', avons:'temos', nous:'nós', "c'est":'é / isto é', dans:'em', 'où':'onde', "l'hôtel":'o hotel', besoin:'necessidade', "d'un":'de um', allons:'vamos', 'à':'a / para', "l'aéroport":'o aeroporto', as:'tens', mange:'como', du:'(algum)', boit:'bebe', de:'de', "l'eau":'a água', rouge:'vermelho', veux:'quero', mangeons:'comemos', et:'e', des:'uns / umas', 'œufs':'ovos', froid:'frio', aime:'gosta', grand:'alto / grande', 'étudiante':'estudante', en:'em', retard:'atraso', ici:'aqui', neuve:'nova', au:'ao', revoir:'(adeus)' }
  }
  ,
  de: {
    name: 'Alemão', voice: 'de-DE', learners: '7,2 M',
    units: [
      { title: 'Primeiros passos', desc: 'Cumprimentar e apresentar-te',
        words: [['hallo','olá','👋'],['tschüss','adeus','🙋'],['Mann','homem','👨'],['Frau','mulher','👩'],['Junge','rapaz','👦'],['Mädchen','rapariga','👧'],['ja','sim','✅'],['danke','obrigado','🙏']],
        sentences: [
          ['Hallo, ich bin Ana.','Olá, eu sou a Ana.',['Olá, sou a Ana.','Olá, eu sou Ana.','Olá, sou Ana.']],
          ['Ich bin ein Mann.','Eu sou um homem.',['Sou um homem.']],
          ['Sie ist eine Frau.','Ela é uma mulher.',[]],
          ['Der Junge sagt hallo.','O rapaz diz olá.',['O menino diz olá.']],
          ['Ja, danke.','Sim, obrigado.',['Sim, obrigada.']],
          ['Tschüss, Tom!','Adeus, Tom!',[]],
          ['Du bist ein Mädchen.','Tu és uma rapariga.',['És uma rapariga.','Tu és uma menina.','És uma menina.','Você é uma menina.']]
        ]},
      { title: 'Comida e bebida', desc: 'Pedir comida e falar de gostos',
        words: [['Wasser','água','💧'],['Brot','pão','🍞'],['Apfel','maçã','🍎'],['Kaffee','café','☕'],['Milch','leite','🥛'],['Käse','queijo','🧀'],['Ei','ovo','🥚'],['Reis','arroz','🍚']],
        sentences: [
          ['Ich esse Brot.','Eu como pão.',['Como pão.']],
          ['Sie trinkt Wasser.','Ela bebe água.',[]],
          ['Der Apfel ist rot.','A maçã é vermelha.',[]],
          ['Ich möchte einen Kaffee.','Eu quero um café.',['Quero um café.','Eu queria um café.','Queria um café.']],
          ['Wir essen Reis und Eier.','Nós comemos arroz e ovos.',['Comemos arroz e ovos.']],
          ['Die Milch ist kalt.','O leite está frio.',['O leite é frio.']],
          ['Er mag Käse.','Ele gosta de queijo.',[]]
        ]},
      { title: 'Família', desc: 'Falar da tua família e da tua casa',
        words: [['Mutter','mãe','👩‍👧'],['Vater','pai','👨‍👦'],['Schwester','irmã','👭'],['Bruder','irmão','👬'],['Hund','cão','🐕'],['Katze','gato','🐈'],['Haus','casa','🏠'],['Familie','família','👪']],
        sentences: [
          ['Meine Mutter ist hier.','A minha mãe está aqui.',['Minha mãe está aqui.']],
          ['Sein Vater ist groß.','O pai dele é alto.',['O seu pai é alto.']],
          ['Ich habe einen Bruder.','Eu tenho um irmão.',['Tenho um irmão.']],
          ['Die Katze ist im Haus.','O gato está na casa.',['O gato está em casa.','A gata está na casa.','A gata está em casa.']],
          ['Wir haben einen Hund.','Nós temos um cão.',['Temos um cão.','Nós temos um cachorro.','Temos um cachorro.']],
          ['Ihre Schwester ist Studentin.','A irmã dela é estudante.',['A sua irmã é estudante.']],
          ['Das ist meine Familie.','Esta é a minha família.',['Esta é minha família.','Isto é a minha família.']]
        ]},
      { title: 'Na cidade', desc: 'Orientar-te e viajar',
        words: [['Zug','comboio','🚆'],['Straße','rua','🛣️'],['Hotel','hotel','🏨'],['Fahrkarte','bilhete','🎟️'],['Karte','mapa','🗺️'],['Auto','carro','🚗'],['Flughafen','aeroporto','✈️'],['Bus','autocarro','🚌']],
        sentences: [
          ['Wo ist das Hotel?','Onde é o hotel?',['Onde fica o hotel?','Onde está o hotel?']],
          ['Der Zug hat Verspätung.','O comboio está atrasado.',['O comboio tem atraso.']],
          ['Ich brauche eine Fahrkarte.','Eu preciso de um bilhete.',['Preciso de um bilhete.']],
          ['Der Bus ist hier.','O autocarro está aqui.',[]],
          ['Wir fahren zum Flughafen.','Nós vamos para o aeroporto.',['Vamos para o aeroporto.','Nós vamos ao aeroporto.','Vamos ao aeroporto.']],
          ['Hast du eine Karte?','Tens um mapa?',['Tu tens um mapa?','Você tem um mapa?']],
          ['Das Auto ist neu.','O carro é novo.',[]]
        ]}
    ],
    extra: { ich:'eu', bin:'sou', ein:'um', eine:'uma', einen:'um', der:'o', die:'a', das:'o / isto', sie:'ela', er:'ele', du:'tu', bist:'és', ist:'é / está', sagt:'diz', esse:'como', trinkt:'bebe', rot:'vermelho', 'möchte':'queria', wir:'nós', essen:'comemos', und:'e', eier:'ovos', kalt:'frio', mag:'gosta de', meine:'minha', sein:'seu / dele', 'groß':'alto / grande', habe:'tenho', im:'no / na', haben:'temos', ihre:'sua / dela', studentin:'estudante', wo:'onde', hat:'tem', 'verspätung':'atraso', brauche:'preciso', hier:'aqui', fahren:'vamos', zum:'para o', hast:'tens', neu:'novo' }
  },
  it: {
    name: 'Italiano', voice: 'it-IT', learners: '6,4 M',
    units: [
      { title: 'Primeiros passos', desc: 'Cumprimentar e apresentar-te',
        words: [['ciao','olá','👋'],['arrivederci','adeus','🙋'],['uomo','homem','👨'],['donna','mulher','👩'],['ragazzo','rapaz','👦'],['ragazza','rapariga','👧'],['sì','sim','✅'],['grazie','obrigado','🙏']],
        sentences: [
          ['Ciao, sono Ana.','Olá, eu sou a Ana.',['Olá, sou a Ana.','Olá, eu sou Ana.','Olá, sou Ana.']],
          ['Io sono un uomo.','Eu sou um homem.',['Sou um homem.']],
          ['Lei è una donna.','Ela é uma mulher.',[]],
          ['Il ragazzo dice ciao.','O rapaz diz olá.',['O menino diz olá.']],
          ['Sì, grazie.','Sim, obrigado.',['Sim, obrigada.']],
          ['Arrivederci, Tommaso!','Adeus, Tommaso!',[]],
          ['Tu sei una ragazza.','Tu és uma rapariga.',['És uma rapariga.','Tu és uma menina.','És uma menina.','Você é uma menina.']]
        ]},
      { title: 'Comida e bebida', desc: 'Pedir comida e falar de gostos',
        words: [['acqua','água','💧'],['pane','pão','🍞'],['mela','maçã','🍎'],['caffè','café','☕'],['latte','leite','🥛'],['formaggio','queijo','🧀'],['uovo','ovo','🥚'],['riso','arroz','🍚']],
        sentences: [
          ['Io mangio il pane.','Eu como pão.',['Como pão.','Eu como o pão.','Como o pão.']],
          ['Lei beve acqua.','Ela bebe água.',[]],
          ['La mela è rossa.','A maçã é vermelha.',[]],
          ['Voglio un caffè.','Eu quero um café.',['Quero um café.']],
          ['Mangiamo riso e uova.','Nós comemos arroz e ovos.',['Comemos arroz e ovos.']],
          ['Il latte è freddo.','O leite está frio.',['O leite é frio.']],
          ['A lui piace il formaggio.','Ele gosta de queijo.',[]]
        ]},
      { title: 'Família', desc: 'Falar da tua família e da tua casa',
        words: [['madre','mãe','👩‍👧'],['padre','pai','👨‍👦'],['sorella','irmã','👭'],['fratello','irmão','👬'],['cane','cão','🐕'],['gatto','gato','🐈'],['casa','casa','🏠'],['famiglia','família','👪']],
        sentences: [
          ['Mia madre è qui.','A minha mãe está aqui.',['Minha mãe está aqui.']],
          ['Suo padre è alto.','O pai dele é alto.',['O pai dela é alto.','O seu pai é alto.']],
          ['Ho un fratello.','Eu tenho um irmão.',['Tenho um irmão.']],
          ['Il gatto è in casa.','O gato está em casa.',['O gato está na casa.']],
          ['Abbiamo un cane.','Nós temos um cão.',['Temos um cão.','Nós temos um cachorro.','Temos um cachorro.']],
          ['Sua sorella è studentessa.','A irmã dela é estudante.',['A irmã dele é estudante.','A sua irmã é estudante.']],
          ['Questa è la mia famiglia.','Esta é a minha família.',['Esta é minha família.']]
        ]},
      { title: 'Na cidade', desc: 'Orientar-te e viajar',
        words: [['treno','comboio','🚆'],['strada','rua','🛣️'],['albergo','hotel','🏨'],['biglietto','bilhete','🎟️'],['mappa','mapa','🗺️'],['macchina','carro','🚗'],['aeroporto','aeroporto','✈️'],['autobus','autocarro','🚌']],
        sentences: [
          ["Dov'è l'albergo?",'Onde é o hotel?',['Onde fica o hotel?','Onde está o hotel?']],
          ['Il treno è in ritardo.','O comboio está atrasado.',[]],
          ['Ho bisogno di un biglietto.','Eu preciso de um bilhete.',['Preciso de um bilhete.']],
          ["L'autobus è qui.",'O autocarro está aqui.',[]],
          ["Andiamo all'aeroporto.",'Nós vamos para o aeroporto.',['Vamos para o aeroporto.','Nós vamos ao aeroporto.','Vamos ao aeroporto.']],
          ['Hai una mappa?','Tens um mapa?',['Tu tens um mapa?','Você tem um mapa?']],
          ['La macchina è nuova.','O carro é novo.',[]]
        ]}
    ],
    extra: { io:'eu', sono:'sou', un:'um', una:'uma', il:'o', la:'a', lei:'ela', lui:'ele', 'è':'é / está', tu:'tu', sei:'és', dice:'diz', mangio:'como', beve:'bebe', rossa:'vermelha', voglio:'quero', mangiamo:'comemos', e:'e', uova:'ovos', freddo:'frio', a:'a', piace:'agrada', mia:'minha', suo:'seu / dele', sua:'sua / dela', ho:'tenho', in:'em', abbiamo:'temos', studentessa:'estudante', questa:'esta', "dov'è":'onde é', "l'albergo":'o hotel', ritardo:'atraso', bisogno:'necessidade', di:'de', "l'autobus":'o autocarro', andiamo:'vamos', "all'aeroporto":'ao aeroporto', hai:'tens', nuova:'nova', qui:'aqui', alto:'alto' }
  }
};
