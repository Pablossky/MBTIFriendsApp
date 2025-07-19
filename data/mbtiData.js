export const mbtiTypes = [
  {
    type: 'ISTJ',
    shortDesc: 'Logistyk, odpowiedzialny i praktyczny.',
    fullDesc:
      'ISTJ to osoba zorganizowana, odpowiedzialna i sumienna. Ceni tradycję, porządek i praktyczne rozwiązania. ' +
      'Lubi planować, przestrzegać zasad i dba o szczegóły. Doskonale sprawdza się w zadaniach wymagających dokładności i konsekwencji.',
    strengths: ['Odpowiedzialny', 'Sumienny', 'Zorganizowany'],
    weaknesses: ['Sztywny', 'Niechętny zmianom', 'Zbyt krytyczny'],
    backgroundColor: '#A7C7FF', // Strażnik - jasny błękit
    communicationRole: 'Finalizujący',
    communicationStyle: 'Odpowiadający Ruch Bezpośredni',
    communicationGroup: 'Strażnicy (SJ)',
    stats: { ie: 0.85, ns: 0.2, tf: 0.75, jp: 0.8 },
    functions: ['si', 'te'],
  },
  {
    type: 'ISFJ',
    shortDesc: 'Obrońca, lojalny i opiekuńczy.',
    fullDesc:
      'ISFJ to ciepła i lojalna osoba, która dba o potrzeby innych. Jest odpowiedzialna i praktyczna, ' +
      'zwraca uwagę na detale i potrafi tworzyć stabilne środowisko dla bliskich. Często stawia innych na pierwszym miejscu.',
    strengths: ['Lojalny', 'Opiekuńczy', 'Praktyczny'],
    weaknesses: ['Nadmiernie samokrytyczny', 'Nieśmiały', 'Unika konfliktów'],
    backgroundColor: '#A7C7FF', // Strażnik - jasny błękit
    communicationRole: 'Tło',
    communicationStyle: 'Odpowiadający Kontrola Informujący',
    communicationGroup: 'Strażnicy (SJ)',
    stats: { ie: 0.85, ns: 0.2, tf: 0.25, jp: 0.8 },
    functions: ['si', 'fe'],
  },
  {
    type: 'INFJ',
    shortDesc: 'Doradca, wizjonerski i empatyczny.',
    fullDesc:
      'INFJ to osoba pełna pasji i empatii, z silnym poczuciem misji. Jest wizjonerem, który dąży do zrozumienia świata ' +
      'i pomagania innym. Ceni autentyczność i głębokie relacje, często angażuje się w działalność społeczną.',
    strengths: ['Empatyczny', 'Wizjonerski', 'Intuicyjny'],
    weaknesses: ['Zbyt idealistyczny', 'Przesadnie wrażliwy', 'Zamknięty w sobie'],
    backgroundColor: '#C9E4AA', // Dyplomata - jasna mięta
    communicationRole: 'Finalizujący',
    communicationStyle: 'Odpowiadający Ruch Bezpośredni',
    communicationGroup: 'Dyplomaci (NF)',
    stats: { ie: 0.85, ns: 0.8, tf: 0.25, jp: 0.8 },
     functions: ['ni', 'fe'],
  },
  {
    type: 'INTJ',
    shortDesc: 'Architekt, niezależny i analityczny.',
    fullDesc:
      'INTJ to strategiczny i logiczny myśliciel. Lubi planować z wyprzedzeniem i rozwiązywać złożone problemy. ' +
      'Jest niezależny, ceni efektywność i intelektualne wyzwania. Często ma jasno określone cele i dąży do ich realizacji.',
    strengths: ['Strategiczny', 'Logiczny', 'Niezależny'],
    weaknesses: ['Zbyt krytyczny', 'Introwertyczny', 'Perfekcjonista'],
    backgroundColor: '#C4B7E6', // Analityk - jasny lawendowy
    communicationRole: 'Finalizujący',
    communicationStyle: 'Odpowiadający Ruch Bezpośredni',
    communicationGroup: 'Analitycy (NT)',
    stats: { ie: 0.85, ns: 0.8, tf: 0.75, jp: 0.8 },
    functions: ['ni', 'te'],
  },
  {
    type: 'ISTP',
    shortDesc: 'Rzemieślnik, praktyczny i spokojny.',
    fullDesc:
      'ISTP to osoba praktyczna i niezależna, która lubi działać i eksperymentować. ' +
      'Jest spokojna, szybka w działaniu i dobrze radzi sobie z problemami technicznymi. Często ma zmysł do mechaniki i narzędzi.',
    strengths: ['Praktyczny', 'Spokojny', 'Zręczny'],
    weaknesses: ['Niecierpliwy', 'Zamknięty w sobie', 'Niechętny planowaniu'],
    backgroundColor: '#FFF3B0', // Eksplorator - kremowy żółty
    communicationRole: 'Finalizujący',
    communicationStyle: 'Odpowiadający Ruch Bezpośredni',
    communicationGroup: 'Rzemieślnicy (SP)',
    stats: { ie: 0.85, ns: 0.2, tf: 0.75, jp: 0.2 },
    functions: ['ti', 'se'],
  },
  {
    type: 'ISFP',
    shortDesc: 'Artysta, cichy i wrażliwy.',
    fullDesc:
      'ISFP to ciepła i wrażliwa osoba, która ceni estetykę i emocje. Lubi wyrażać siebie poprzez sztukę i twórczość. ' +
      'Jest spokojna, lubi żyć chwilą i unika konfliktów. Ma silne poczucie wartości osobistych.',
    strengths: ['Wrażliwy', 'Kreatywny', 'Empatyczny'],
    weaknesses: ['Unika konfliktów', 'Niezdecydowany', 'Łatwo się zniechęca'],
    backgroundColor: '#FFF3B0', // Eksplorator - kremowy żółty
    communicationRole: 'Tło',
    communicationStyle: 'Odpowiadający Kontrola Informujący',
    communicationGroup: 'Rzemieślnicy (SP)',
    stats: { ie: 0.85, ns: 0.2, tf: 0.25, jp: 0.2 },
    functions: ['fi', 'se'],
  },
  {
    type: 'INFP',
    shortDesc: 'Idealista, kreatywny i empatyczny.',
    fullDesc:
      'INFP to marzyciel i idealista, który wierzy w dobroć i sens życia. ' +
      'Jest kreatywny, empatyczny i ma głębokie wartości. Często angażuje się w projekty, które mają znaczenie społeczne lub artystyczne.',
    strengths: ['Kreatywny', 'Empatyczny', 'Lojalny'],
    weaknesses: ['Idealistyczny', 'Nieśmiały', 'Zamknięty w sobie'],
    backgroundColor: '#C9E4AA', // Dyplomata - jasna mięta
    communicationRole: 'Tło',
    communicationStyle: 'Odpowiadający Kontrola Informujący',
    communicationGroup: 'Dyplomaci (NF)',
    stats: { ie: 0.85, ns: 0.8, tf: 0.25, jp: 0.2 },
    functions: ['fi', 'ne'],
  },
  {
    type: 'INTP',
    shortDesc: 'Myśliciel, logiczny i niezależny.',
    fullDesc:
      'INTP to analityczny i dociekliwy intelektualista. Uwielbia badać idee i koncepcje, jest niezależny w myśleniu. ' +
      'Ceni logikę i racjonalność, często fascynuje się nauką i technologią.',
    strengths: ['Logiczny', 'Dociekliwy', 'Kreatywny'],
    weaknesses: ['Zamknięty w sobie', 'Niecierpliwy', 'Trudny do zrozumienia'],
    backgroundColor: '#C4B7E6', // Analityk - jasny lawendowy
    communicationRole: 'Tło',
    communicationStyle: 'Odpowiadający Kontrola Informujący',
    communicationGroup: 'Analitycy (NT)',
    stats: { ie: 0.85, ns: 0.8, tf: 0.75, jp: 0.2 },
    functions: ['ti', 'ne'],
  },
  {
    type: 'ESTP',
    shortDesc: 'Działacz, energiczny i odważny.',
    fullDesc:
      'ESTP to osoba energiczna, odważna i towarzyska. Lubi działać, podejmować ryzyko i żyć na pełnych obrotach. ' +
      'Jest praktyczna, szybka w reagowaniu i potrafi dobrze radzić sobie w dynamicznych sytuacjach.',
    strengths: ['Energetyczny', 'Odważny', 'Towarzyski'],
    weaknesses: ['Impulsywny', 'Niecierpliwy', 'Niekonsekwentny'],
    backgroundColor: '#FFF3B0', // Eksplorator - kremowy żółty
    communicationRole: 'Zarządzający',
    communicationStyle: 'Inicjujący Kontrola Bezpośredni',
    communicationGroup: 'Rzemieślnicy (SP)',
    stats: { ie: 0.15, ns: 0.2, tf: 0.75, jp: 0.2 },
    functions: ['se', 'ti'],
  },
  {
    type: 'ESFP',
    shortDesc: 'Animator, towarzyski i spontaniczny.',
    fullDesc:
      'ESFP to dusza towarzystwa, która kocha zabawę i spontaniczność. ' +
      'Jest otwarta, żywiołowa i lubi być w centrum uwagi. Ceni relacje i lubi sprawiać innym radość.',
    strengths: ['Towarzyski', 'Spontaniczny', 'Optymistyczny'],
    weaknesses: ['Impulsywny', 'Łatwo się nudzi', 'Nieplanowany'],
    backgroundColor: '#FFF3B0', // Eksplorator - kremowy żółty
    communicationRole: 'Zaczynający',
    communicationStyle: 'Inicjujący Ruch Informujący',
    communicationGroup: 'Rzemieślnicy (SP)',
    stats: { ie: 0.15, ns: 0.2, tf: 0.25, jp: 0.2 },
    functions: ['se', 'fi'],
  },
  {
    type: 'ENFP',
    shortDesc: 'Działacz społeczny, entuzjastyczny i kreatywny.',
    fullDesc:
      'ENFP to entuzjasta, pełen energii i pomysłów. Lubi inspirować innych, jest kreatywny i otwarty na nowe doświadczenia. ' +
      'Ceni autentyczność i lubi nawiązywać głębokie relacje.',
    strengths: ['Kreatywny', 'Entuzjastyczny', 'Empatyczny'],
    weaknesses: ['Roztrzepany', 'Niecierpliwy', 'Nadmiernie emocjonalny'],
    backgroundColor: '#C9E4AA', // Dyplomata - jasna mięta
    communicationRole: 'Zaczynający',
    communicationStyle: 'Inicjujący Ruch Informujący',
    communicationGroup: 'Dyplomaci (NF)',
    stats: { ie: 0.15, ns: 0.8, tf: 0.25, jp: 0.2 },
    functions: ['ne', 'fi'],
  },
  {
    type: 'ENTP',
    shortDesc: 'Innowator, błyskotliwy i kreatywny.',
    fullDesc:
      'ENTP to pomysłowy i błyskotliwy innowator. Uwielbia dyskusje, wymyślanie nowych koncepcji i rozwiązywanie problemów. ' +
      'Jest elastyczny i otwarty na zmiany, lubi przełamywać schematy.',
    strengths: ['Błyskotliwy', 'Elastyczny', 'Kreatywny'],
    weaknesses: ['Niecierpliwy', 'Nie lubi rutyny', 'Może być kłótliwy'],
    backgroundColor: '#C4B7E6', // Analityk - jasny lawendowy
    communicationRole: 'Zaczynający',
    communicationStyle: 'Inicjujący Ruch Informujący',
    communicationGroup: 'Analitycy (NT)',
    stats: { ie: 0.15, ns: 0.8, tf: 0.75, jp: 0.2 },
    functions: ['ne', 'ti'],
  },
  {
    type: 'ESTJ',
    shortDesc: 'Organizator, zdecydowany i praktyczny.',
    fullDesc:
      'ESTJ to osoba zdecydowana i praktyczna, która lubi porządek i jasne zasady. ' +
      'Jest naturalnym liderem, ceni tradycję i efektywność. Dba o realizację celów i dobrze zarządza zasobami.',
    strengths: ['Zdecydowany', 'Praktyczny', 'Zorganizowany'],
    weaknesses: ['Uparty', 'Sztywny', 'Może być zbyt krytyczny'],
    backgroundColor: '#A7C7FF', // Strażnik - jasny błękit
    communicationRole: 'Zarządzający',
    communicationStyle: 'Inicjujący Kontrola Bezpośredni',
    communicationGroup: 'Strażnicy (SJ)',
    stats: { ie: 0.15, ns: 0.2, tf: 0.75, jp: 0.8 },
    functions: ['te', 'si'],
  },
  {
    type: 'ESFJ',
    shortDesc: 'Opiekun, troskliwy i społeczny.',
    fullDesc:
      'ESFJ to osoba opiekuńcza i towarzyska, która dba o dobro innych. ' +
      'Jest lojalna, odpowiedzialna i lubi pomagać. Ceni harmonię i dobre relacje w grupie.',
    strengths: ['Troskliwy', 'Lojalny', 'Towarzyski'],
    weaknesses: ['Nadmiernie zależny od opinii innych', 'Unika konfliktów', 'Czasem zbyt emocjonalny'],
    backgroundColor: '#A7C7FF', // Strażnik - jasny błękit
    communicationRole: 'Zaczynający',
    communicationStyle: 'Inicjujący Ruch Informujący',
    communicationGroup: 'Strażnicy (SJ)',
    stats: { ie: 0.15, ns: 0.2, tf: 0.25, jp: 0.8 },
    functions: ['fe', 'si'],
  },
  {
    type: 'ENFJ',
    shortDesc: 'Protagonista, charyzmatyczny i inspirujący.',
    fullDesc:
      'ENFJ to charyzmatyczny lider i inspirator. Lubi wspierać innych, motywować i budować wspólnotę. ' +
      'Jest empatyczny, komunikatywny i ma wizję lepszego świata.',
    strengths: ['Charyzmatyczny', 'Empatyczny', 'Inspirujący'],
    weaknesses: ['Zbyt zaangażowany emocjonalnie', 'Może być nadmiernie wymagający', 'Czasem zbyt idealistyczny'],
    backgroundColor: '#C9E4AA', // Dyplomata - jasna mięta
    communicationRole: 'Zarządzający',
    communicationStyle: 'Inicjujący Kontrola Bezpośredni',
    communicationGroup: 'Dyplomaci (NF)',
    stats: { ie: 0.15, ns: 0.8, tf: 0.25, jp: 0.8 },
    functions: ['fe', 'ni'],
  },
  {
    type: 'ENTJ',
    shortDesc: 'Dowódca, ambitny i skuteczny.',
    fullDesc:
      'ENTJ to ambitny i zdecydowany lider, który dąży do realizacji celów. ' +
      'Jest logiczny, efektywny i świetnie organizuje pracę zespołu. Ceni wyzwania i rozwój.',
    strengths: ['Ambitny', 'Logiczny', 'Skuteczny'],
    weaknesses: ['Zbyt dominujący', 'Niecierpliwy', 'Czasem nieuważny na uczucia innych'],
    backgroundColor: '#C4B7E6', // Analityk - jasny lawendowy
    communicationRole: 'Zarządzający',
    communicationStyle: 'Inicjujący Kontrola Bezpośredni',
    communicationGroup: 'Analitycy (NT)',
    stats: { ie: 0.15, ns: 0.8, tf: 0.75, jp: 0.8 },
    functions: ['te', 'ni'],
  },
];
