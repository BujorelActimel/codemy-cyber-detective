const caseDetails = {
    "INV-2024-001": {
        id: "INV-2024-001",
        title: "INTERCEPTAREA MESAJELOR",
        priority: "SCĂZUT",
        difficulty: "ÎNCEPĂTOR",
        brief: `RAPORT INCIDENT:
Am interceptat o serie de mesaje suspecte din rețea. Toate par să fie codate folosind 
aceeași metodă de criptare:

MESAJE INTERCEPTATE:
"XKYAXK YK YGZBKXK"
"VKBK JO KMMOC: 15.03.2024"
"CODEBIXEX KMBKDKB: 127.0.0.1"
"ZYBE: 8080"

Se pare că atacatorul folosește o metodă simplă de criptare:
• Fiecare literă este deplasată cu un număr constant de poziții
• Semnele de punctuație și cifrele rămân neschimbate
• Spațiile rămân neschimbate

OBSERVAȚIE: Am observat că litera 'K' apare foarte des în text. 
În limba română, 'A' este una dintre cele mai comune litere.`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Scrie un script Python care:
   • Determină deplasarea folosită (folosind frecvența literelor)
   • Decriptează toate mesajele
   • Calculează suma valorilor ASCII ale tuturor literelor decriptate
     (doar litere, fără spații, punctuație sau cifre)

2. Folosește suma calculată ca și cod de acces.

HINT: Litera 'K' din textul criptat ar putea fi 'A' în textul original.`,
        technicalData: `INFORMAȚII TEHNICE:
• Deplasarea este constantă pentru toate mesajele
• Doar literele sunt criptate (A-Z)
• Spațiile și caracterele speciale rămân neschimbate
• Textul decriptat este în română

EXEMPLU DEPLASARE:
Pentru deplasare = 5:
A -> F
B -> G
Z -> E
`,
        solution: "3577", // Suma ASCII pentru toate literele decriptate
        successMessage: `🔓 ACCES AUTORIZAT! Ai spart codul! 🔓

DETALII DECRIPTARE:
Deplasare identificată: 10 poziții
Mesaje decriptate:
"PORNIT IN TESTARE"
"DATA DE ACCES: 15.03.2024"
"SERVERUL ACTIVAT: 127.0.0.1"
"PORT: 8080"

Suma ASCII: 3577

AI ÎNVĂȚAT:
• Criptare prin deplasare (Caesar cipher)
• Analiza frecvenței caracterelor
• Procesare de string-uri în Python
• Manipulare de caractere ASCII

URMĂTOAREA MISIUNE: Network Traffic Analysis`,
        failureMessage: `🚫 ACCES RESPINS! Verifică următoarele:

DEBUGGING HINTS:
• Verifică dacă ai identificat corect deplasarea (K->A)
• Asigură-te că procesezi toate mesajele
• Include doar literele în suma ASCII (nu cifre/spații)
• Double-check algoritmul de decriptare

TOOLS NECESARE:
• Loop pentru testarea deplasărilor
• Counter pentru frecvența literelor
• Funcții pentru procesarea string-urilor

Mai încearcă! Securitatea sistemului depinde de tine!`
    },

    "INV-2024-002": {
        id: "INV-2024-002",
        title: "NETWORK TRAFFIC ANOMALY",
        priority: "MEDIU",
        difficulty: "INTERMEDIAR",
        brief: `RAPORT INCIDENT:
Am detectat un pattern suspect în traficul de rețea. 
Sistemul de monitorizare a capturat următoarea secvență de pachete:

TIMESTAMP  |  SIZE (bytes)  |  PORT
--------------------------------------
09:00:15   |  1337         |  4444
09:00:30   |  2674         |  4444
09:00:45   |  4011         |  4444
09:01:00   |  5348         |  4444
...

Pattern-ul continuă, dar un malware a corupt ultimele 10 înregistrări.
Trebuie să reconstruim secvența pentru a identifica următorul pachet suspect.`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Analizează pattern-ul din datele disponibile:
   • Identifică relația dintre timestamp-uri
   • Identifică relația dintre dimensiunile pachetelor
   • Observă portul constant

2. Scrie un script care:
   • Reconstruiește ultimele 10 înregistrări
   • Calculează suma dimensiunilor pentru aceste 10 pachete
   • Aplică operația: (suma % 10000) pentru codul final

3. Folosește rezultatul ca și cod de acces.`,
        technicalData: `INFORMAȚII TEHNICE:
• Timestamps: incrementare cu 15 secunde
• Port: constant 4444
• Dimensiune: urmează un pattern matematic
• Ultimele 10 înregistrări sunt corupte

`,
        solution: "8152", // (Suma ultimelor 10 pachete) % 10000
        successMessage: `🎯 PATTERN IDENTIFICAT! Secvență reconstruită! 🎯

DETALII ANALIZĂ:
Pattern identificat:
• Incrementare timestamp: 15 secunde
• Incrementare size: 1337 bytes
• Port constant: 4444

Ultimele 10 pachete:
09:05:15 | 13370 | 4444
09:05:30 | 14707 | 4444
...și așa mai departe

Suma % 10000 = 8152

AI ÎNVĂȚAT:
• Analiza pattern-urilor în date
• Progresii aritmetice
• Manipularea listelor în Python
• Operații modulo

URMĂTOAREA MISIUNE: Decoding Binary Patterns`,
        failureMessage: `❌ PATTERN INCORECT! Revizuiește analiza:

DEBUGGING STEPS:
• Verifică calculul diferențelor între pachete
• Asigură-te că reconstruiești exact 10 pachete
• Verifică operația modulo finală
• Double-check suma dimensiunilor

HINT:
• Dimensiunea crește cu o valoare constantă
• Folosește liste pentru a stoca secvența
• Verifică dacă pattern-ul este consistent

Continuă investigația! Ești pe drumul cel bun!`
    },

    "INV-2024-003": {
        id: "INV-2024-003",
        title: "BINARY INTRUSION DETECTION",
        priority: "URGENT",
        difficulty: "AVANSAT",
        brief: `RAPORT INCIDENT:
Sistemul IDS a detectat o serie de pachete suspecte. 
Datele par să fie codificate în șabloane binare:

PACKET_1 = "101010110101"
PACKET_2 = "110101011010"
PACKET_3 = "011010101101"
...și așa mai departe (50 pachete în total)

Fiecare pachet:
• Are exact 12 biți
• Este generat folosind un algoritm specific
• Conține un pattern ascuns`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Analizează cele 50 de pachete pentru a:
   • Identifica biții care nu se schimbă niciodată (biți ficși)
   • Găsi poziția bitului care se schimbă cel mai des
   • Calcula numărul total de biți de 1 din toate pachetele

2. Calculează codul final:
   (nr_biți_ficși * poziția_bit_frecvent * total_biți_1) % 1000

3. Folosește rezultatul ca și cod de acces.

NOTĂ: Vei avea nevoie de un script pentru a procesa 
eficient toate cele 50 de pachete.`,
        technicalData: `INFORMAȚII TEHNICE:
• 50 pachete a câte 12 biți fiecare
• Pozițiile biților încep de la 1
• Un bit este considerat fix dacă are aceeași valoare în toate pachetele
`,
        solution: "640", // Rezultatul calculului conform formulei
        successMessage: `🔍 PATTERN IDENTIFICAT! Analiza completă! 🔍

REZULTATE ANALIZĂ:
• Biți ficși găsiți: 4 poziții
• Bit cu cele mai multe schimbări: poziția 8
• Total biți de 1: 400

Calcul cod:
4 * 8 * 400 = 12800
12800 % 1000 = 640

AI ÎNVĂȚAT:
• Procesarea datelor binare
• Analiza pattern-urilor complexe
• Manipularea matricelor
• Operații pe biți

URMĂTOAREA MISIUNE: Hash Cracking Challenge`,
        failureMessage: `⚠️ ANALIZĂ INCOMPLETĂ! Verifică:

DEBUGGING GUIDE:
• Asigură-te că procesezi toate cele 50 de pachete
• Verifică algoritmul pentru biții ficși
• Double-check numărul total de biți de 1
• Verifică indexarea pozițiilor (1-based)

SUGESTII:
• Folosește numpy pentru operații pe matrici
• Convertește string-urile în arrays
• Optimizează căutarea pattern-urilor

Nu renunța! Siguranța rețelei depinde de tine!`
    },

    "INV-2024-004": {
        id: "INV-2024-004",
        title: "HASH CRACKING CHALLENGE",
        priority: "URGENT",
        difficulty: "EXPERT",
        brief: `RAPORT INCIDENT:
Am interceptat o serie de hash-uri generate de un algoritm custom.
Algoritmul folosește următoarele reguli pentru a genera hash-uri:

1. Ia un număr între 1000-9999
2. Aplică următoarele transformări în ordine:
   • Ridică la pătrat fiecare cifră
   • Concatenează rezultatele
   • Împarte în grupuri de 2 cifre
   • Convertește fiecare grup în caractere ASCII

Exemplu pentru 1234:
1. Cifre la pătrat: 1,4,9,16
2. Concatenare: 14916
3. Grupuri: 14,91,6
4. ASCII: "N{6"

Am interceptat hash-ul: "Py@K" 
Trebuie să găsim numărul original!`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Scrie un script care:
   • Implementează algoritmul de hashing descris
   • Generează hash-uri pentru numerele 1000-9999
   • Găsește numărul care generează hash-ul "Py@K"

2. Folosește numărul găsit ca și cod de acces.

IMPORTANT: 
• Trebuie să testezi toate numerele posibile
• Verifică cu atenție fiecare pas al algoritmului
• Optimizează căutarea pentru performanță`,
        technicalData: `INFORMAȚII TEHNICE:
• Range numere: 1000-9999
• Fiecare cifră este ridicată la pătrat individual
• Grupurile de 2 cifre sunt convertite în ASCII
• Hash-ul țintă: "Py@K"
`,
        solution: "2458", // Numărul care generează hash-ul "Py@K"
        successMessage: `🔑 HASH SPART! Număr original găsit! 🔑

DETALII REZOLVARE:
Număr original: 2458

Verificare:
1. Pătrate: 4,25,16,64
2. Concatenare: 4251664
3. Grupuri: 42,51,66,4
4. ASCII: "Py@K"

AI ÎNVĂȚAT:
• Implementarea algoritmilor de hashing
• Brute force optimizat
• Manipularea string-urilor și ASCII
• Tehnici de căutare eficientă

FELICITĂRI! Ai completat toate provocările! 🏆`,
        failureMessage: `⚠️ HASH INCORECT! Verifică:

DEBUGGING STEPS:
• Verifică implementarea fiecărui pas al algoritmului
• Asigură-te că procesezi corect numerele mari
• Verifică conversia în ASCII
• Optimizează pentru performanță

HINT:
• Folosește ord() și chr() pentru ASCII
• Verifică boundary cases
• Implementează early exit când găsești match-ul

Continuă căutarea! Ești aproape de soluție!`
    },
    "INV-2024-005": {
        id: "INV-2024-005",
        title: "LOGICA CUANTICĂ",
        priority: "MEDIU",
        difficulty: "EXPERT",
        brief: `RAPORT INCIDENT:
Am interceptat un nou tip de atac care folosește principii cuantice pentru 
criptare. Atacatorul a lăsat următorul mesaj:

"Eu sunt și nu sunt aici în același timp. Starea mea depinde de observator.
Pentru a mă găsi, trebuie să rezolvi următoarea problemă cuantică:

Ai 3 qubiți: |q0⟩, |q1⟩, și |q2⟩
Inițial, toți sunt în starea |0⟩

Aplică următoarele operații:
1. Poarta Hadamard pe q0
2. CNOT cu q0 ca control și q1 ca țintă
3. Poarta Toffoli cu q0,q1 ca control și q2 ca țintă
4. Măsoară q2

Care este probabilitatea de a măsura |1⟩ în q2?"

NOTĂ: Atacatorul folosește acest rezultat ca seed pentru generarea 
cheilor de criptare.`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Simulează circuitul cuantic descris:
   • Inițializează 3 qubiți în starea |0⟩
   • Aplică transformările în ordine
   • Calculează probabilitatea de a măsura |1⟩ în q2

2. Convertește probabilitatea în procent întreg
   (ex: 0.25 -> 25)

3. Folosește acest număr ca și cod de acces.

HINT: Poarta Hadamard pune un qubit în superpoziție cu 
probabilități egale pentru |0⟩ și |1⟩`,
        technicalData: `INFORMAȚII TEHNICE:

MATRICI PENTRU PORȚI CUANTICE:
Hadamard (H):
[1  1]
[1 -1] / √2

CNOT:
[1 0 0 0]
[0 1 0 0]
[0 0 0 1]
[0 0 1 0]

Toffoli:
Matrice 8x8 care schimbă ultimul bit doar când
primii doi biți sunt 1

FORMULE UTILE:
• Probabilitatea de măsurare = |amplitudine|²
• Stare superpozitie: |ψ⟩ = α|0⟩ + β|1⟩
• |α|² + |β|² = 1`,
        solution: "25", // Probabilitatea de 25%
        successMessage: `🌟 CIRCUIT CUANTIC REZOLVAT! 🌟

ANALIZA CIRCUITULUI:
1. După H pe q0: 
   |ψ₀⟩ = (|0⟩ + |1⟩)/√2

2. După CNOT:
   |ψ₁⟩ = (|00⟩ + |11⟩)|0⟩/√2

3. După Toffoli:
   |ψ₂⟩ = (|000⟩ + |111⟩)/√2

Probabilitate |1⟩ în q2 = 25%

AI ÎNVĂȚAT:
• Bazele computației cuantice
• Porți cuantice fundamentale
• Superpoziție și entanglement
• Probabilități cuantice

URMĂTORUL NIVEL: Quantum Key Distribution`,
        failureMessage: `⚫ COLAPS CUANTIC NEDORIT! ⚫

DEBUGGING CUANTIC:
• Verifică ordinea operațiilor
• Urmărește propagarea stărilor
• Calculează corect probabilitățile
• Atenție la normalizare

REMINDER:
• Hadamard creează superpoziție
• CNOT creează entanglement
• Toffoli afectează q2 doar când q0,q1 = |1⟩

Recalculează și mai încearcă!`
    },

    "INV-2024-006": {
        id: "INV-2024-006",
        title: "PATTERN STEGANOGRAFIC",
        priority: "URGENT",
        difficulty: "AVANSAT",
        brief: `RAPORT INCIDENT:
Am descoperit un pattern bizar în traficul de rețea. Pachetele par normale,
dar timing-ul lor formează un model neobișnuit:

Timestamp   Diferență (ms)   Suma ASCII
----------------------------------------
12:00:01    -               4352
12:00:02    1000            4356
12:00:04    2000            4358
12:00:07    3000            4362
12:00:11    4000            4368
12:00:16    5000            4376
...

Observăm că:
1. Diferențele între timestamp-uri cresc linear
2. Valorile ASCII urmează un pattern matematic
3. Există o corelație între timing și ASCII

IPOTEZĂ: Atacatorul ascunde un mesaj în aceste patterns.`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Analizează ambele serii de numere:
   • Pattern-ul diferențelor (timing)
   • Pattern-ul sumelor ASCII

2. Pentru fiecare serie:
   • Găsește următorul termen
   • Calculează diferența dintre termeni
   • Identifică regula de construcție

3. Codul final este produsul dintre:
   • Următoarea diferență de timp (ms)
   • Următoarea sumă ASCII
   % 10000

HINT: Ambele serii sunt bazate pe funcții pătratice.`,
        technicalData: `INFORMAȚII TEHNICE:

TIMING PATTERN:
• Diferențele formează o secvență aritmetică
• Fiecare termen = timpul de la începutul secvenței
• Se măsoară în milisecunde

ASCII PATTERN:
• Începe de la 4352
• Crește după o regulă specifică
• Diferențele dintre termeni urmează un pattern

FORMULE UTILE:
• Secvență aritmetică: an = a1 + (n-1)d
• Sumă termeni: Sn = n(a1 + an)/2
• Funcție pătratică: f(n) = an² + bn + c

EXEMPLU PYTHON:
def analyze_sequence(terms):
    differences = []
    for i in range(len(terms)-1):
        differences.append(terms[i+1] - terms[i])
    return differences`,
        solution: "6384", // (6000 * 4386) % 10000
        successMessage: `🔍 PATTERN DECODAT! 🔍

ANALIZA COMPLETĂ:
Timing pattern:
• Diferențe: 1000, 2000, 3000, 4000, 5000
• Următorul termen: 6000ms
• Formula: d(n) = 1000n

ASCII pattern:
• Diferențe: 4, 2, 4, 6, 8
• Următorul termen: 4386
• Formula: a(n) = 4352 + n(n+3)

Cod final: (6000 * 4386) % 10000 = 6384

AI ÎNVĂȚAT:
• Analiza secvențelor matematice
• Steganografie în timing
• Corelații între pattern-uri
• Funcții pătratice

URMĂTORUL NIVEL: Time-Based Attacks`,
        failureMessage: `❌ PATTERN INCORECT! ❌

DEBUGGING STEPS:
• Verifică diferențele în ambele serii
• Confirmă formulele de calcul
• Asigură-te că folosești termenii corecți
• Verifică operația modulo

HINT:
• Timing: următorul termen = 6000
• ASCII: creșterea este pătratică
• Înmulțește apoi aplică modulo

Analizează din nou pattern-urile!`
    },

    "INV-2024-007": {
        id: "INV-2024-007",
        title: "LABIRINTUL NEURAL",
        priority: "MEDIU",
        difficulty: "EXPERT",
        brief: `RAPORT INCIDENT:
Am detectat o rețea neurală adversarială care generează
labirinturi procedurale. Fiecare labirint ascunde un cod,
dar trebuie să urmezi reguli specifice:

LABIRINT CURENT:
⬛⬜⬛⬛⬛⬛⬛
⬛⬜⬜⬜⬜⬜⬛
⬛⬛⬛⬜⬛⬜⬛
⬛⬜⬜⬜⬛⬜⬛
⬛⬜⬛⬛⬛⬜⬛
⬛⬜⬜⬜⬜⬜⬛
⬛⬛⬛⬛⬛⬜⬛

REGULI:
• Start: primul ⬜ de sus
• Finish: ultimul ⬜ de jos
• La fiecare intersecție:
  - Calculează entropia Shannon pentru vecinii posibili
  - Alege direcția cu entropia minimă
• Adună valorile ASCII ale caracterelor întâlnite`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Implementează un algoritm care:
   • Găsește calea prin labirint
   • Calculează entropia la fiecare intersecție
   • Urmărește regulile de deplasare
   • Sumează valorile ASCII

2. Folosește suma finală ca și cod de acces.

HINT: Entropia Shannon = -Σ p(x) * log₂(p(x))
unde p(x) = probabilitatea de a merge în direcția x`,
        technicalData: `INFORMAȚII TEHNICE:

CALCUL ENTROPIE:
Pentru o intersecție cu N direcții posibile:
• p(x) = 1/N pentru fiecare direcție
• H = -Σ (1/N * log₂(1/N))

EXEMPLE:
• 2 direcții: H = 1
• 3 direcții: H ≈ 1.58
• 4 direcții: H = 2
`,
        solution: "5792", // Suma ASCII a caracterelor pe calea corectă
        successMessage: `🧠 LABIRINT NEURAL REZOLVAT! 🧠

ANALIZA TRASEULUI:
• Început: (0,1)
• Intersecții găsite: 4
• Entropii calculate: [1.58, 1.0, 1.58, 1.0]
• Traseu final: ↓→↓←↓→↓
• Suma ASCII: 5792

AI ÎNVĂȚAT:
• Teoria informației
• Entropia Shannon
• Algoritmi de pathfinding
• Rețele neurale adversariale

URMĂTORUL NIVEL: Neural Cryptography`,
        failureMessage: `🌀 ENTROPIE INCORECTĂ! 🌀

DEBUGGING NEURAL:
• Verifică calculul entropiei
• Confirmă vecinii la fiecare intersecție
• Validează decizia la fiecare pas
• Verifică suma ASCII finală

HINT:
• Entropia minimă indică calea
• Numără toate intersecțiile
• Verifică valorile ASCII

Recalculează entropia și încearcă din nou!`
    },
    "INV-2024-008": {
        id: "INV-2024-008",
        title: "NUMERE PERFECTE",
        priority: "SCĂZUT",
        difficulty: "ÎNCEPĂTOR",
        brief: `RAPORT INCIDENT:
Sistemul de securitate folosește numere perfecte pentru
generarea cheilor. Un număr perfect este egal cu suma
divizorilor săi proprii (inclusiv 1, exclusiv numărul).

EXEMPLU:
6 este număr perfect pentru că:
• Divizorii proprii sunt: 1, 2, 3
• Suma lor este: 1 + 2 + 3 = 6

Am interceptat o serie de numere suspecte:
28, 31, 33, 496, 42, 8128

IPOTEZĂ: Suma numerelor perfecte din listă este folosită 
în generarea cheilor.`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Pentru fiecare număr din listă:
   • Găsește toți divizorii proprii
   • Calculează suma divizorilor
   • Verifică dacă e număr perfect

2. Identifică toate numerele perfecte din listă.

3. Calculează suma numerelor perfecte găsite
   și folosește-o ca și cod de acces.
`,
        technicalData: `INFORMAȚII TEHNICE:

VERIFICARE NUMĂR PERFECT:
1. Găsește toți divizorii proprii
2. Calculează suma lor
3. Compară cu numărul original
`,
        solution: "8652", // 28 + 496 + 8128
        successMessage: `🎯 NUMERE PERFECTE IDENTIFICATE! 🎯

ANALIZA NUMERELOR:
Numere perfecte găsite:
• 28 = 1 + 2 + 4 + 7 + 14
• 496 = 1 + 2 + 4 + 8 + 16 + 31 + 62 + 124 + 248
• 8128 = 1 + 2 + 4 + 8 + 16 + 32 + 64 + 127 + 254 + 508 + 1016 + 2032 + 4064

Suma lor: 28 + 496 + 8128 = 8652

AI ÎNVĂȚAT:
• Conceptul de număr perfect
• Găsirea divizorilor
• Calcule cu sume
• Verificarea proprietăților numerelor

URMĂTORUL NIVEL: Prime Factorization`,
        failureMessage: `❌ CALCUL INCOMPLET! ❌

DEBUGGING HELP:
• Verifică toți divizorii proprii
• Nu include numărul însuși ca divizor
• Confirmă suma pentru fiecare număr
• Verifică dacă ai identificat toate numerele perfecte

REMINDER:
• Divizorii trebuie să împartă exact numărul
• Suma trebuie să fie egală cu numărul
• Include doar numerele perfecte din listă

Mai încearcă o dată!`
    },

    "INV-2024-009": {
        id: "INV-2024-009",
        title: "PALINDROMURI BINARE",
        priority: "SCĂZUT",
        difficulty: "ÎNCEPĂTOR",
        brief: `RAPORT INCIDENT:
Am descoperit că sistemul folosește palindromuri binare
pentru verificări. Un palindrom binar este un număr care
arată la fel citit de la stânga la dreapta în binar.

EXEMPLU:
Numărul 9 în binar este 1001, care este palindrom.
5 în binar este 101, tot palindrom.

NUMERE INTERCEPTATE:
12, 5, 9, 10, 3, 7, 15, 20

IPOTEZĂ: Produsul numerelor care sunt palindromuri
în binar este folosit în sistem.`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Pentru fiecare număr:
   • Convertește în binar
   • Verifică dacă e palindrom
   • Păstrează numerele valide

2. Calculează produsul numerelor găsite.

3. Folosește produsul modulo 1000 ca cod de acces.

HINT: Un palindrom se citește la fel în ambele direcții.`,
        technicalData: `INFORMAȚII TEHNICE:

CONVERSIE ÎN BINAR:
• Python: bin(num)[2:]  # Elimină prefixul '0b'
• 9 -> '1001'
• 5 -> '101'
`,
        solution: "945", // (3 * 5 * 7 * 9 * 15) % 1000
        successMessage: `🔄 PALINDROMURI BINARE GĂSITE! 🔄

ANALIZA NUMERELOR:
Palindromuri identificate:
• 3  = 11
• 5  = 101
• 7  = 111
• 9  = 1001
• 15 = 1111

Calcul:
3 * 5 * 7 * 9 * 15 = 14175
14175 % 1000 = 945

AI ÎNVĂȚAT:
• Conversii în binar
• Verificare palindromuri
• Operații cu numere
• Modulo arithmetic

URMĂTORUL NIVEL: Binary Patterns`,
        failureMessage: `⚠️ VERIFICARE EȘUATĂ! ⚠️

DEBUGGING TIPS:
• Verifică conversia în binar
• Confirmă palindromurile găsite
• Asigură-te că folosești toate numerele valide
• Verifică calculul final și operația modulo

HINT:
• Nu uita să elimini prefixul '0b'
• Verifică ambele direcții de citire
• Aplică modulo 1000 la final

Încearcă din nou!`
    },

    "INV-2024-010": {
        id: "INV-2024-010",
        title: "VERIFICARE PARITATE",
        priority: "SCĂZUT",
        difficulty: "ÎNCEPĂTOR",
        brief: `RAPORT INCIDENT:
Sistemul folosește verificări de paritate pentru validare.
Am interceptat o serie de numere și trebuie să verificăm
proprietățile lor legate de paritate.

NUMERE INTERCEPTATE:
1234, 8765, 2468, 1357, 9999

REGULI:
• Un număr e "alternant" dacă cifrele alternează
  între par și impar
• Ordinea poate începe fie cu par, fie cu impar
• Toate cifrele trebuie să respecte pattern-ul

EXEMPLU:
2468 - nu alterneaza (par-par-par-par)
1234 - alternant (impar-par-impar-par)`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Pentru fiecare număr:
   • Verifică dacă cifrele sunt toate pare sau toate impare
   • Numără câte astfel de numere există

2. Calculează:
   • Suma numerelor care au toate cifrele pare
   • Suma numerelor care au toate cifrele impare

3. Adună cele două sume și folosește
   rezultatul ca și cod de acces.

HINT: O cifră e pară dacă este divizibilă cu 2.`,
        technicalData: `INFORMAȚII TEHNICE:

VERIFICARE PARITATE:
• Cifră pară: cifră % 2 == 0
• Cifră impară: cifră % 2 == 1
`,
        solution: "9999", // 1234 + 8765
        successMessage: `✅ PARITATE VERIFICATĂ! ✅

Calcul final:
1234 + 8765 = 9999

AI ÎNVĂȚAT:
• Verificarea parității
• Procesarea cifrelor
• Filtrare condiționată
• Operații cu liste

URMĂTORUL NIVEL: Pattern Matching`,
        failureMessage: `❌ VERIFICARE INCORECTĂ! ❌

DEBUGGING STEPS:
• Verifică identificarea cifrelor
• Confirmă testele de paritate
• Asigură-te că numeri corect
• Verifică suma finală

REMINDER:
• Cifrele pare sunt: 0,2,4,6,8
• Cifrele impare sunt: 1,3,5,7,9
• Toate cifrele trebuie să respecte regula

Mai încearcă o dată!`
    },

    "INV-2024-011": {
        id: "INV-2024-011",
        title: "SECVENȚE MAGICE",
        priority: "MEDIU",
        difficulty: "INTERMEDIAR",
        brief: `RAPORT INCIDENT:
Am descoperit o secvență de numere care pare să urmeze
o regulă specială. Fiecare număr este format conform
unui pattern specific.

SECVENȚA INTERCEPTATĂ:
[4, 16, 37, 58, 89, 145, 42, 20, 4, ...]

OBSERVAȚII:
• Secvența pare să se repete
• Fiecare termen este generat folosind cifrele
  termenului anterior
• Pattern-ul implică suma pătratelor cifrelor

EXEMPLU:
145 → 1² + 4² + 5² = 1 + 16 + 25 = 42
42 → 4² + 2² = 16 + 4 = 20`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Analizează secvența pentru a:
   • Identifica regula de generare
   • Găsi lungimea ciclului
   • Determina toți termenii unici

2. Calculează:
   • Suma termenilor unici din ciclu
   • Produsul dintre această sumă și lungimea ciclului

3. Folosește rezultatul ca și cod de acces.

HINT: Secvența se va repeta eventual.`,
        technicalData: `INFORMAȚII TEHNICE:

GENERARE TERMEN NOU:
1. Separă numărul în cifre
2. Ridică fiecare cifră la pătrat
3. Calculează suma pătratelor
`,
        solution: "568", // 8 * 71 = 568 (lungime ciclu * suma termenilor)
        successMessage: `🔄 SECVENȚĂ DECODATĂ! 🔄

ANALIZA PATTERN-ULUI:
Ciclu găsit:
4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4

Statistici:
• Lungime ciclu: 8 termeni
• Suma termenilor: 71
• Rezultat final: 8 * 71 = 568

AI ÎNVĂȚAT:
• Identificarea ciclurilor
• Generarea secvențelor
• Manipularea cifrelor
• Detectarea pattern-urilor

URMĂTORUL NIVEL: Advanced Sequences`,
        failureMessage: `⚠️ PATTERN INCORECT! ⚠️

DEBUGGING GUIDE:
• Verifică generarea termenilor
• Confirmă detecția ciclului
• Asigură-te că ai toți termenii unici
• Verifică calculele finale

HINT:
• Urmărește secvența până se repetă
• Numără termenii din ciclu
• Verifică suma pătratelor
• Nu uita de termenii intermediari

Reîncearcă analiza!`
    },

    "INV-2024-012": {
        id: "INV-2024-012",
        title: "ROTAȚII CIRCULARE",
        priority: "MEDIU",
        difficulty: "INTERMEDIAR",
        brief: `RAPORT INCIDENT:
Am interceptat un sistem care folosește rotații circulare
ale numerelor. O rotație circulară păstrează numărul de
cifre dar le mută circular la dreapta sau stânga.

EXEMPLU ROTAȚII pentru 123:
• O poziție la dreapta: 312
• Două poziții la dreapta: 231
• O poziție la stânga: 231
• Două poziții la stânga: 312

NUMERE INTERCEPTATE:
1234, 5678, 1111, 2468

IPOTEZĂ: Sistemul folosește cea mai mare valoare 
posibilă obținută prin rotație pentru fiecare număr.`,
        objective: `OBIECTIV INVESTIGAȚIE:

1. Pentru fiecare număr din listă:
   • Generează toate rotațiile posibile
   • Identifică valoarea maximă obținută
   • Păstrează această valoare maximă

2. Calculează:
   • Diferența dintre cea mai mare și cea mai mică
     valoare maximă găsită
   • Numărul total de rotații unice generate

3. Înmulțește cele două numere și folosește
   rezultatul ca și cod de acces.

HINT: Unele numere pot genera rotații identice 
(ex: 1111 generează doar o valoare unică).`,
        technicalData: `INFORMAȚII TEHNICE:

GENERARE ROTAȚII:
1. Convertește numărul în string
2. Generează toate rotațiile posibile
3. Convertește înapoi în numere
4. Identifică maximul
`,
        solution: "7854", // (8765 - 1111) * 14 rotații unice
        successMessage: `🔄 ROTAȚII ANALIZATE! 🔄

ANALIZA NUMERELOR:
Maxime pentru fiecare număr:
• 1234 -> 4123, 3412, 2341, 1234 (max: 4123)
• 5678 -> 8567, 7856, 6785, 5678 (max: 8567)
• 1111 -> 1111 (o singură valoare)
• 2468 -> 8246, 6824, 4682, 2468 (max: 8246)

Calcul final:
• Diferență max-min: 8567 - 1111 = 7456
• Rotații unice totale: 13
• Rezultat: 7456 * 13 = 96928 % 10000 = 6928

AI ÎNVĂȚAT:
• Rotații circulare
• Identificarea valorilor unice
• Manipularea string-urilor și numerelor
• Optimizarea căutării

URMĂTORUL NIVEL: Pattern Recognition`,
        failureMessage: `❌ ROTAȚII INCORECTE! ❌

DEBUGGING STEPS:
• Verifică toate rotațiile posibile
• Confirmă valorile maxime
• Asigură-te că numeri rotațiile unice
• Verifică diferența max-min

REMINDER:
• Păstrează același număr de cifre
• Verifică conversia string-număr
• Elimină duplicatele
• Verifică toate numerele din listă

Mai încearcă o dată!`
    }
};

export default caseDetails
