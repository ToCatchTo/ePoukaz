import { PASTELS } from '../theme/theme'

// Cílový odkaz pro CTA tlačítka (vyzkoušet / registrace)
export const REGISTER_URL = 'https://admin.epoukazonline.cz/register'

// TODO: doplnit reálný odkaz na stažení aplikace (App Store / Google Play)
export const APP_DOWNLOAD_URL = 'https://epoukazonline.cz/aplikace'

// Navigační sady; Header vybírá podle aktuální cesty
export const NAV_MAIN = [
  { label: 'Jak to funguje?', to: '/jak-to-funguje' },
  { label: 'Vše o ePoukazu', to: '/vse-o-epoukazu' },
  { label: 'Pro výdejny', to: '/pro-vydejny' },
]
export const NAV_VYDEJNY = [
  // Label „Jak to funguje?", ale slug zůstává /pro-vydejny (prodejní stránka)
  { label: 'Jak to funguje?', to: '/pro-vydejny' },
  { label: 'Ceník', to: '/cenik' },
  { label: 'Kontakt', to: '/kontakt' },
]

// CTA v patičce zákaznických stránek (/, /jak-to-funguje, /vse-o-epoukazu)
export const VYDEJNA_CTA = {
  title: 'Jste výdejna ePoukazů?',
  perexBold: 'Nabídněte svým klientům moderní způsob uplatnění ePoukazu online',
  perexRest:
    ' — bez papírů, bez front, bez zbytečných telefonátů. Připojte se a ' +
    'zjednodušte provoz své prodejny i život svým klientům.',
  button: 'Zóna pro výdejny',
  provider: 'Provozovatel: epoukazonline s.r.o., IČ: 29645387',
}

// Vyhledávání provozoven na úvodní stránce
export const SEARCH = {
  h1: 'Najděte svou výdejnu a uplatněte ePoukaz online',
  perex:
    'Vyhledejte svou oblíbenou prodejnu, lékárnu nebo optiku podle názvu či města, ' +
    'nahrajte ePoukaz online a vyčkejte — výdejna se vám sama ozve s dalšími kroky. ' +
    'Jednoduché, rychlé a dostupné kdykoliv, 24 hodin denně, 7 dní v týdnu.',
  placeholder: 'Hledejte svou výdejnu dle názvu nebo města…',
  placeholderShort: 'Název nebo město…', // mobil (dlouhý placeholder se do úzkého pole nevejde)
  selectLabel: 'Vybrat',
  emptyTitle: 'Nic jsme nenašli',
  notFoundTitle: 'Vaši výdejnu jsme nenašli?',
  notFoundText:
    'Nevadí. Kontaktujte svou prodejnu přímo a řekněte jim o možnosti uplatnění ePoukazu ' +
    'online přes ePoukazOnline.cz. Čím více výdejen se připojí, tím snazší a pohodlnější ' +
    'to bude příště pro vás i ostatní pacienty.',
}

// Podstránka „Jak to funguje?" (6 kroků pacienta); těla označená /* draft */ dodá klient
export const JAK_TO_FUNGUJE = {
  title: 'Jak to funguje?',
  items: [
    { title: '1. Vyberete svou výdejnu', body: 'Najděte svou oblíbenou prodejnu, lékárnu nebo optiku podle názvu nebo města přímo na úvodní stránce.' /* draft */ },
    { title: '2. Načtete kód ePoukazu', body: 'Naskenujte QR kód z ePoukazu nebo zadejte jeho identifikátor ručně — stačí pár vteřin.' /* draft */ },
    { title: '3. Vyplníte kontaktní údaje', body: 'Zadejte jméno a kontakt, aby vás výdejna mohla informovat, jakmile budou pomůcky připravené.' /* draft */ },
    { title: '4. Odešlete', body: 'Poukaz jedním kliknutím odešlete přímo výdejně. Bez front, telefonátů a papírování.' /* draft */ },
    { title: '5. Výdejna se vám ozve', body: 'Výdejna vás sama kontaktuje s dalšími kroky a termínem vyzvednutí.' /* draft */ },
    { title: 'TIP – stáhněte si aplikaci', body: 'V aplikaci máte všechny své poukazy a jejich stav přehledně na jednom místě.' /* draft */ },
  ],
}

// Podstránka „Vše o ePoukazu"; položka 1 je finální text ze specu, zbytek /* draft */
export const VSE_O_EPOUKAZU = {
  title: 'Vše o ePoukazu',
  items: [
    {
      title: 'Co je ePoukaz?',
      body:
        'ePoukaz je elektronický poukaz na zdravotnický prostředek. Na ePoukaz je možné předepsat všechny typy zdravotnických prostředků (např. brýle, kontaktní čočky, berle, invalidní vozík, inkontinenční pomůcky). Každému eReceptu je přidělen unikátní identifikátor.\n\n' +
        'Elektronický poukaz je vytvářen, měněn nebo rušen v systému eRecept na základě požadavku předepisujícího, který obsahuje údaje potřebné pro vytvoření, změnu nebo zrušení elektronického poukazu. Součástí požadavku na vytvoření elektronického poukazu je dále vždy informace o pacientem zvoleném způsobu předání identifikačního znaku, kterým je elektronický poukaz označen.\n\n' +
        'Doba platnosti ePoukazu je 30 dnů, tedy stejná jako v případě listinné podoby. Ve výjimečných případech ji lékař může prodloužit až na 1 rok.\n\n' +
        'Od 1. 1. 2026 je pro zdravotnické pracovníky i výdejny ePoukaz povinný.',
    },
    { title: 'Co je identifikátor ePoukazu?', body: 'Identifikátor je unikátní kód, kterým je každý ePoukaz označen. Podle něj výdejna poukaz jednoznačně dohledá.' /* draft */ },
    { title: 'Kde ePoukaz získám?', body: 'ePoukaz vám vystaví lékař. Podle zvoleného způsobu ho dostanete SMS, e-mailem nebo vytištěný.' /* draft */ },
    { title: 'Jak dlouho ePoukaz platí?', body: 'Standardní platnost je 30 dnů. Ve výjimečných případech ji lékař může prodloužit až na jeden rok.' /* draft */ },
    { title: 'Musím ePoukaz používat povinně?', body: 'Od 1. 1. 2026 je ePoukaz povinný pro zdravotnické pracovníky i výdejny.' /* draft */ },
    { title: 'Jak ePoukaz uplatním online?', body: 'Vyhledejte svou výdejnu, nahrajte ePoukaz online a vyčkejte, až se vám ozve s dalšími kroky.' /* draft */ },
  ],
}

// Hero sekce homepage
export const HERO = {
  title: 'Šetřete čas sobě i pacientům',
  paragraph:
    'Digitalizujte příjem a správu elektronických ePoukazů ve svých zdravotnických potřebách, ' +
    'lékárně nebo optice. Pacient odešle poukaz online, vy ho během vteřiny vidíte ve svém systému ' +
    '– bez telefonátů, papírů a nepříjemných zmatků.',
  cta: 'Vyzkoušejte',
}

// Recenzní bublinky v hero sekci
export const TESTIMONIALS = [
  {
    name: 'Eliška', role: 'dcera seniora',
    quote: 'Pomůcky tátovi objednám z práce, doručí mu je domů. Ušetřím čas, on má klid.'
  },
  {
    name: 'Gábina', role: 'majitelka zdravotnických potřeb',
    quote: 'Konečně systém, který šetří čas nám i pacientům – objednají si pohodlně z domova.'
  },
  {
    name: 'Jarmila', role: 'seniorka 67 let',
    quote: 'Poukaz odešlu z domova, do provozovny jdu až si pomůcky vyzvednout. Dřív jsem musela dvakrát.'
  },
]

// 8 kroků „Jak to funguje"
export const HOW_STEPS = [
  {
    title: 'Nastavení za pár minut',
    text: 'Zaregistrujete se, nahrajete SÚKL a osobní certifikát a systém vám vygeneruje unikátní link. Ten jednoduše vložíte na svůj web a jste připraveni přijímat poukazy.'
  },
  {
    title: 'Pacient nahraje poukaz sám',
    text: 'Pacient nebo jeho blízký přes váš web jednoduše načte QR kód nebo zadá kód ručně. Bez front, bez telefonátů, kdykoliv z pohodlí domova nebo přímo z ordinace. Načíst můžete i vy přímo v systému.'
  },
  {
    title: 'ePoukaz máte hned v systému',
    text: 'Jakmile pacient poukaz odešle, okamžitě se zobrazí ve vašem administračním rozhraní i s načtenými SÚKL daty. Nic nepřepisujete a nic neověřujete ručně.'
  },
  {
    title: 'Přehledná správa stavů',
    text: 'Každému poukazu můžete nastavit stav – od přijetí až po vyřízení. Váš tým má vždy jasno, co je potřeba udělat a co už je hotové.'
  },
  {
    title: 'Automatické upozornění pacienta',
    text: 'Jakmile je poukaz připraven k vyzvednutí, pacientovi automaticky přijde notifikace. Pokud nechcete, nemusíte mu volat ani psát – systém to udělá za vás.'
  },
  {
    title: 'Klienti pod kontrolou',
    text: 'Ke každému pacientovi vidíte historii objednávek a můžete ho snadno kontaktovat. Vše přehledně na jednom místě.'
  },
  {
    title: 'Kategorie a upomínky na míru',
    text: 'Stálým klientům přiřadíte kategorie podle toho, co objednávají, a nastavíte si upomínky na docházející pomůcky. Ozvete se jim přesně ve chvíli, kdy vás budou potřebovat.'
  },
  {
    title: 'Bezproblémové propojení se SÚKL',
    text: 'Data ze SÚKL se načtou automaticky a zůstávají provázaná po celou dobu vyřizování. Výdej nebo částečný výdej provedete klidně ve svém účetním programu – stav se sám promítne i do naší aplikace a poukaz se automaticky označí jako vydaný nebo částečně vydaný.'
  },
]

// 6 karet „problémů"; pořadí a barvy dle mřížky 3×2 (XD)
export const PROBLEMS = [
  {
    title: 'Ušetříte čas', color: PASTELS.teal,
    text: 'Poukazy vám chodí rovnou do administrace – nemusíte je přepisovat, skenovat ani telefonicky ověřovat. Co dřív trvalo minuty u každého pacienta, teď zvládnete jedním pohledem.'
  },
  {
    title: 'Zpřehledníte si správu', color: PASTELS.pink,
    text: 'Všechny poukazy na jednom místě, se stavy „nové", „rozpracováno", „vyřízeno". Váš tým vždy ví, co je potřeba udělat a co už je hotové.'
  },
  {
    title: 'Zorganizujete si vaše klienty', color: '#FFD5D5',
    text: 'Ke každému pacientovi si uložíte historii objednávek, kategorie i poznámky. Příště ho poznáte na první pohled a nabídnete mu přesně to, co potřebuje.'
  },
  {
    title: 'Zbavíte se telefonátů', color: PASTELS.yellow,
    text: 'Pacient dostane e-mailem (nebo SMS) info o stavu svého poukazu automaticky – bez toho, aby vám kvůli tomu musel volat nebo psát.'
  },
  {
    title: 'Propojíme vás se SÚKL', color: PASTELS.red,
    text: 'Data z SÚKL se načtou automaticky a zůstávají provázaná po celou dobu vyřizování. Výdej i částečný výdej klidně provedete ve svém účetním programu – stav se sám promítne i k nám.'
  },
  {
    title: 'Nezapomenete na vaše klienty', color: PASTELS.green,
    text: 'Nastavte si upomínky na vyzvednutí, opakované objednávky nebo termín kontroly. Nic vám a vašim pacientům neuteče.'
  },
]

// Sekce „Hlavní funkce": nadpis, podtitul a mřížka 9 dlaždic.
// items jsou placeholder (stopky + „Šetři čas a peníze"); reálné texty a ikony se doplní později.
export const MAIN_FEATURES = {
  title: 'Hlavní funkce',
  subtitle:
    '<span style="font-weight: 600; font-family: Google Sans;">Zadejte pár údajů a my se vám ozveme s bezplatným přístupem na 30 dní.</span><span style="font-family: Poppins; font-weight: 300;"> Žádný závazek, žádná platební ' +
    'karta – jen zjistíte, kolik času vám a vašemu týmu ePoukaz online ušetří.',
  items: Array.from({ length: 9 }, () => ({ icon: '/icons/stopwatch.svg', title: 'Šetři čas a peníze' })),
}

// Spodní CTA banner
export const CTA_BANNER = {
  title: 'A to není vše! Přesvědčte se sami a vyzkoušejte na 30 dní ZDARMA',
  titleMobile: 'Vyzkoušejte to sami – 30 dní zdarma',
  button: 'Vyzkoušejte',
}

// Banner „2 měsíce ZDARMA"
export const TWO_MONTHS = {
  title: '2 měsíce ZDARMA',
  text: 'Zvolte si roční platbu a získejte tak 2 měsíce naší služby ePoukazonline, která vám šetří čas a stres ZDARMA.',
}

// Kontaktní blok
export const CONTACT = {
  formHeading: 'Zeptejte se na cokoliv',
  email: 'info@epoukazonline.cz',
  phone: '+420 800 000 000',
  phoneNote: 'Volejte Po-Pá 9.00-15.00',
  messageLabel: 'Zanechte nám zprávu a my se vám z pravidla do druhého pracovního dne ozveme',
}

// Ceník – 3 tarify
export const PRICING = [
  {
    name: 'Start', price: '1 490 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Začněte zdarma', accent: 'black' as const, highlighted: false
  },
  {
    name: 'Pro', price: '2 490 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Začněte zdarma', accent: 'purple' as const, highlighted: true
  },
  {
    name: 'Premium', price: '3 990 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Kontaktovat', accent: 'teal' as const, highlighted: false
  },
]

// Srovnávací tabulka „Nástroje"; rozložení fajfek odpovídá renderu _navrh/ (960px)
export const COMPARE_ROWS = [
  { label: 'Klientské rozhraní', start: true, pro: true, premium: true },
  { label: 'Administrátorské rozhraní', start: true, pro: true, premium: true },
  { label: 'Správa a změna stavu ePoukazů', start: true, pro: true, premium: true },
  { label: 'Archivace ePoukazů', start: true, pro: true, premium: true },
  { label: 'Security - GDPR a ochrana osobních údajů', start: true, pro: true, premium: true },
  { label: 'Profil Mojí firmy', start: true, pro: true, premium: true },
  { label: 'Notifikace zákazníka e-mailem', start: true, pro: true, premium: true },
  { label: 'Notifikace zákazníka SMS*', start: false, pro: true, premium: true },
  { label: 'Měsíční reporty', start: false, pro: true, premium: true },
  { label: 'Profil, historie a interval objednávek klienta', start: false, pro: true, premium: true },
  { label: 'Sleva 50% na tvorbu webu (detail)', start: false, pro: true, premium: true },
  { label: 'Online platby', start: false, pro: false, premium: true },
  { label: 'Více uživatelů a štítků', start: false, pro: false, premium: true },
  { label: 'Export kontaktních údajů (csv, excel)', start: false, pro: false, premium: true },
  { label: 'Napojení dopravní společnosti (DPD, PPL a další)', start: false, pro: false, premium: true },
]

// Poznámka k SMS pod tabulkou
export const SMS_NOTE =
  '*Informace k SMS notifikacím:</br> Služba umožňuje zasílání SMS notifikací zákazníkům (např. informace ' +
  'o ePoukazu nebo stavu objednávky). Tyto SMS jsou realizovány prostřednictvím externího poskytovatele ' +
  'komunikačních služeb a nejsou zahrnuty v měsíčním poplatku za využívání služby.</br> Cena za odeslané SMS ' +
  'je účtována samostatně dle skutečného počtu odeslaných zpráv a aktuálního ceníku poskytovatele. ' +
  'Náklady na tyto SMS budou připočteny k pravidelnému měsíčnímu vyúčtování služby.'

// Nadpis a podtitul ceníku
export const CENIK_HEAD = {
  title: 'Vyberte si svůj tarif dle vašich preferencí a potřeb',
  subtitle:
    'Při registraci se vám automaticky zapne 30 dní ZDARMA v tarifu Pro. ' +
    'Výběr tarifu můžete kdykoliv změnit ve svém uživatelském účtu.',
}

// Patička
export const FOOTER = {
  company: [
    'epoukazonline s.r.o.',
    'Kaprova 42/14, Staré Město, 110 00 Praha 1',
    'IČ: 29645387, DIČ: CZ29645387',
    'Společnost zapsána pod značkou',
    'C 450020/MSPH Městským soudem v Praze',
  ],
  // Shodné odkazy ve sloupcích „Obecné" a „Doplňkové služby" jsou záměr dle XD, ne překlep
  columns: [
    { title: 'Jak na to?', links: ['Jak implementovat', 'Jak to funguje?', 'Video tutorial', 'FAQ'] },
    { title: 'Obecné', links: ['Obchodní podmínky', 'Ochrana osobních údajů', 'Zpracovatelská smlouva', 'Informace k nezákonnému obsahu', 'Newslettery'] },
    { title: 'Doplňkové služby', links: ['Rozšíření aplikace na míru', 'Tvorba webu se SLEVOU', 'Tvorba loga se SLEVOU'] },
  ],
  copyright: '2026, epoukazonline.cz',
  credit: 'Tvoříme weby s radostí',
}

// Univerzální podstránka (Desktop_UNI): nadpis a obchodní podmínky (varianta B, úvodní odstavce).
// Řetězce psané velkými písmeny jsou mezinadpisy, které ContentPage vysází tučně.
export const UNI = {
  title: 'Nadpis univerzální podstránky, může být až dvouřádkový',
  paragraphs: [
    'OBCHODNÍ PODMÍNKY (VARIANTA B)',
    '\nobchodní společnosti {{companyName}}\n\n' +
    'se sídlem {{address}}\n' +
    'identifikační číslo: {{ico}}\n' +
    'zapsané v obchodním rejstříku vedeném , oddíl , vložka\n' +
    'pro prodej zboží prostřednictvím on-line obchodu umístěného na internetové adrese {{orderUrl}}',
    'ÚVODNÍ USTANOVENÍ',
    'Tyto obchodní podmínky (dále jen „obchodní podmínky“) obchodní společnosti {{companyName}}, se sídlem {{address}}, identifikační ' +
    'číslo: {{ico}}, zapsané v obchodním rejstříku vedeném , oddíl , vložka (dále jen „prodávající“) upravují v souladu ' +
    's ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník, ve znění pozdějších předpisů ' +
    '(dále jen „občanský zákoník“) vzájemná práva a povinnosti smluvních stran vzniklé v souvislosti nebo na ' +
    'základě kupní smlouvy (dále jen „kupní smlouva“) uzavírané mezi prodávajícím a jinou fyzickou osobou ' +
    '(dále jen „kupující“) prostřednictvím internetového obchodu prodávajícího. Internetový obchod je ' +
    'prodávajícím provozován na webové stránce umístěné na internetové adrese (dále jen „webová stránka“), ' +
    'a to prostřednictvím rozhraní webové stránky (dále jen „webové rozhraní obchodu“).',
    'Obchodní podmínky se nevztahují na případy, kdy osoba, která má v úmyslu nakoupit zboží od prodávajícího, ' +
    'je právnickou osobou či osobou, jež jedná při objednávání zboží v rámci své podnikatelské činnosti nebo ' +
    'v rámci svého samostatného výkonu povolání.',
    'Ustanovení odchylná od obchodních podmínek je možné sjednat v kupní smlouvě. Odchylná ujednání v kupní ' +
    'smlouvě mají přednost před ustanoveními obchodních podmínek.',
    'Ustanovení obchodních podmínek jsou nedílnou součástí kupní smlouvy. Kupní smlouva a obchodní podmínky ' +
    'jsou vyhotoveny v českém jazyce. Kupní smlouvu lze uzavřít v českém jazyce.',
    'Znění obchodních podmínek může prodávající měnit či doplňovat. Tímto ustanovením nejsou dotčena práva ' +
    'a povinnosti vzniklá po dobu účinnosti předchozího znění obchodních podmínek.',
    'UŽIVATELSKÝ ÚČET',
    'Na základě registrace kupujícího provedené na webové stránce může kupující přistupovat do svého ' +
    'uživatelského rozhraní. Ze svého uživatelského rozhraní může kupující provádět objednávání zboží ' +
    '(dále jen „uživatelský účet“). V případě, že to webové rozhraní obchodu umožňuje, může kupující provádět ' +
    'objednávání zboží též bez registrace přímo z webového rozhraní obchodu.',
  ],
}
