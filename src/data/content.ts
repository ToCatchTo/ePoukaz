import { PASTELS } from '../theme/theme'

// Cílový odkaz pro CTA tlačítka (vyzkoušet / registrace)
export const REGISTER_URL = 'https://admin.epoukazonline.cz/register'

// Odkaz na stažení aplikace (App Store / Google Play)
export const APP_DOWNLOAD_URL = 'https://epoukazonline.cz/aplikace'

// Navigační sady; Header vybírá podle aktuální cesty
export const NAV_MAIN = [
  { label: 'Jak to funguje?', to: '/jak-to-funguje' },
  { label: 'Vše o ePoukazu', to: '/vse-o-epoukazu' },
  { label: 'Pro výdejny', to: '/pro-vydejny' },
]
export const NAV_DISTRIBUTORS = [
  // Label „Jak to funguje?", ale slug zůstává /pro-vydejny (prodejní stránka)
  { label: 'Jak to funguje?', to: '/pro-vydejny' },
  { label: 'Ceník', to: '/cenik' },
  { label: 'Kontakt', to: '/kontakt' },
]

// CTA v patičce zákaznických stránek (/, /jak-to-funguje, /vse-o-epoukazu)
export const DISTRIBUTOR_CTA = {
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

// Podstránka „Jak to funguje?" – 4 kroky pacientského procesu (accordion)
export const HOW_IT_WORKS = {
  title: 'Jak to funguje?',
  items: [
    {
      title: 'Krok 1 - Najděte svou výdejnu',
      body:
        'Na hlavní stránce ePoukazOnline.cz najdete vyhledávací pole, do kterého začněte psát název prodejny nebo město. Systém vám po několika písmenech sám nabídne výdejny, které jsou zapojeny do našeho systému. Vyberte tu svou — oblíbenou, nejbližší nebo ověřenou — a klikněte na tlačítko Vybrat. Budete přesměrováni na stránku vaší výdejny, kde pokračujete krokem 2.\n\n' +
        'Pokud vaši výdejnu nenajdete, kontaktujte ji přímo a řekněte jí o možnosti využívat ePoukazOnline.cz — třeba se brzy přidá.',
    },
    {
      title: 'Krok 2 - Nahrajte kód ePoukazu',
      body:
        'V horní části stránky vidíte název vaší vybrané výdejny. Nyní nahrajte kód z ePoukazu — zvládnete to z počítače i chytrého telefonu. Máte tři možnosti: naskenovat QR kód fotoaparátem (pouze na mobilu), nahrát již vyfocenou fotografii QR kódu z galerie, nebo kód jednoduše opsat ručně.\n\n' +
        'Po zadání klikněte na tlačítko Odeslat. Systém okamžitě ověří platnost vašeho ePoukazu. Pokud je vše v pořádku, pokračujete vyplněním kontaktních údajů v kroku 3. Pokud se kód nepodařilo ověřit, zkuste ho zadat znovu — mohlo dojít k překlepu. V případě opakovaného problému se obraťte na svého předepisujícího lékaře.',
    },
    {
      title: 'Krok 3 - Vyplňte kontaktní údaje a odešlete',
      body:
        'Váš ePoukaz jsme úspěšně ověřili. Nyní vyplňte své kontaktní údaje — telefonní číslo a e-mail. Tyto informace slouží výhradně k tomu, aby vás výdejna mohla informovat o stavu vyřízení vaší objednávky. Více o ochraně osobních údajů se dočtete zde.\n\n' +
        'Zvolte také preferovaný způsob předání pomůcek. Na výběr máte osobní vyzvednutí přímo ve výdejně — to proběhne až poté, co vás výdejna informuje, že má vše připraveno — nebo doručení na vámi zadanou adresu, které zajistí výdejna vlastní dopravou nebo prostřednictvím dopravce. Dostupné možnosti doručení a případné poplatky za dopravu se mohou u každé výdejny lišit — více se dozvíte přímo od ní.\n\n' +
        'Pro úspěšné odeslání je nutné udělit souhlas se zpracováním kontaktních údajů. Pokud chcete výdejně sdělit něco navíc — využijte poznámkové pole. Poté vše odešlete. Hotovo!',
    },
    {
      title: 'Krok 4 - Počkejte, výdejna se ozve',
      body:
        'To je vše z vaší strany. Výdejna obdrží váš ePoukaz a brzy se vám ozve — telefonicky nebo e-mailem — se stavem vyřízení. Může mít pomůcky skladem a připravené k vyzvednutí, nebo může být potřeba je nejprve objednat. V některých případech si výdejna může vyžádat doplňující informace. V každém případě se vám ozvou — nemusíte na nic myslet ani nikam volat. Mějte prosím na paměti, že výdejna potřebuje přiměřený čas na zpracování vaší objednávky.',
    },
  ],
}

// Podstránka „Vše o ePoukazu" – položky accordionu (časté dotazy k ePoukazu)
export const ABOUT_EPOUKAZ = {
  title: 'Vše o ePoukazu',
  items: [
    {
      title: 'Co je ePoukaz?',
      body:
        'ePoukaz je elektronický poukaz na zdravotnický prostředek. Lze na něj předepsat všechny typy zdravotnických prostředků — například brýle, kontaktní čočky, berle, invalidní vozík nebo inkontinenční pomůcky. Každý ePoukaz má přidělen jedinečný identifikátor (číselný kód nebo QR kód), který slouží k jeho jednoznačnému rozpoznání.\n\n' +
        'ePoukaz vzniká na základě požadavku předepisujícího lékaře. Součástí vystavení poukazu je vždy informace o tom, jakým způsobem bude pacientovi předán jeho identifikační kód (číselný kód nebo QR kód).\n\n' +
        'Standardní platnost ePoukazu je 30 dní. Ve výjimečných případech může lékař platnost prodloužit až na 1 rok.',
    },
    {
      title: 'Co je identifikátor (kód) ePoukazu?',
      body:
        'Identifikátor je devítimístný alfanumerický kód, který slouží k výdeji zdravotnického prostředku. Může vypadat například takto: Z3P641PR7. Tento kód obdržíte buď v textové podobě, nebo jako QR kód — obě varianty lze jednoduše nahrát v našem systému ePoukazOnline.cz, ať už fotoaparátem, nahráním fotografie z galerie nebo ručním opisem.',
    },
    {
      title: 'Jak dlouho ePoukaz platí?',
      body:
        'Standardní platnost ePoukazu je 30 dní od jeho vystavení. Lékař může při vystavení nastavit delší dobu platnosti, a to až na 1 rok.\n\n' +
        'Pokud platnost ePoukazu vyprší, nelze ji dodatečně prodloužit. V takovém případě je nutné požádat lékaře o vystavení nového ePoukazu.',
    },
    {
      title: 'Jak zjistím, že mi lékař ePoukaz vystavil?',
      body:
        'Po vystavení vám lékař obvykle zašle identifikátor ePoukazu — QR kód i textový kód — prostřednictvím SMS nebo e-mailu. V některých případech vám může vytisknout průvodku s potřebnými údaji přímo v ordinaci.',
    },
    {
      title: 'Lze uplatnit ePoukaz online?',
      body:
        'Ano. Například prostřednictvím systému epoukazonline.cz si jednoduše vyhledáte svou výdejnu (výdejna musí být registrována v našem systému), nahrajete kód ePoukazu a počkáte, až se vám výdejna ozve se stavem vyřízení vaší objednávky. Bez front, bez zbytečného cestování.',
    },
    {
      title: 'Co když svou výdejnu na epoukazonline.cz nenajdu?',
      body:
        'Nevadí. Kontaktujte svou výdejnu přímo a dejte jí vědět o možnosti využívat náš systém epoukazonline.cz. Čím více výdejen se připojí, tím pohodlnější to bude příště pro vás i ostatní pacienty. Budeme rádi, pokud jim o nás řeknete — společně uděláme uplatnění ePoukazu jednodušší pro každého.',
    },
    {
      title: 'Proč uplatnit ePoukaz online?',
      body:
        'Objednávku vyřídíte kdykoliv a odkudkoliv — 24 hodin denně, 7 dní v týdnu. Online uplatnění zvládnete sami nebo s pomocí svého blízkého. Pomůcky vám pak mohou být doručeny přímo domů — možnost a podmínky dopravy se mohou u jednotlivých výdejen lišit a může být zpoplatněna.\n\n' +
        '• Vyřídíte pohodlně z domova, z mobilu nebo odkudkoliv\n' +
        '• QR kód načtete fotoaparátem nebo jej jednoduše opíšete ručně\n' +
        '• Ušetříte cestu i čas — bez zbytečné návštěvy prodejny jen kvůli objednávce\n' +
        '• Dostupné 24 hodin denně, 7 dní v týdnu\n' +
        '• O průběhu vyřízení vás bude výdejna průběžně informovat\n' +
        '• Zvolíte si způsob předání — osobní vyzvednutí nebo doručení až domů (u vybraných výdejen)',
    },
    {
      title: 'Vyřizuje ePoukazOnline.cz můj ePoukaz?',
      body:
        'Ne. ePoukazOnline.cz slouží výhradně jako prostředník pro předání vašeho ePoukazu do vámi vybrané výdejny — nic víc, nic méně. Samotné vyřízení, uplatnění i veškerá komunikace ohledně stavu objednávky probíhá přímo mezi vámi a vaší výdejnou. Do tohoto procesu nijak nevstupujeme a nemáme o něm žádné informace.\n\n' +
        'Dotazy ohledně stavu vašeho ePoukazu proto směřujte přímo na svou výdejnu.',
    },
    {
      title: 'Jak zjistím stav vyřízení mého ePoukazu?',
      body:
        'Stav vyřízení vašeho ePoukazu vám sdělí výhradně vaše výdejna, do které jste ePoukaz odeslali. Ta vás bude kontaktovat na telefonní číslo nebo e-mail, které jste uvedli při odesílání. Mějte prosím na paměti, že výdejna potřebuje přiměřený čas na zpracování vaší objednávky.\n\n' +
        'Zkontrolujte proto svou e-mailovou schránku včetně složky nevyžádané pošty (SPAM) — zpráva od výdejny může někdy skončit tam.\n\n' +
        'V případě, že jste se stále nedočkali odpovědi, kontaktujte svou výdejnu přímo — její kontaktní údaje najdete v potvrzujícím e-mailu nebo sms.',
    },
  ],
}

// Hero sekce homepage
export const HERO = {
  title: 'ePoukazy rychle, přehledně, bez stresu',
  paragraph:
    'Ušetřete čas sobě i pacientům — zapomeňte na zbytečné telefonáty, papíry a zmatky na přepážce. ' +
    'Pacient odešle ePoukaz online odkudkoliv, vy ho máte okamžitě ve svém systému a můžete se ' +
    'věnovat tomu, co je skutečně důležité.',
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
    text: 'Zaregistrujete se, nahrajete SÚKL a osobní certifikát a systém vám vygeneruje unikátní link. Ten jednoduše vložíte na svůj web a jste připraveni přijímat ePoukazy.',
    img: '/images/howitworks-setup.webp'
  },
  {
    title: 'Pacient nahraje ePoukaz sám',
    text: 'Pacient nebo jeho blízký přes váš web jednoduše načte QR kód nebo zadá kód ručně. Bez front, bez telefonátů, kdykoliv z pohodlí domova nebo přímo z ordinace. Načíst můžete i vy přímo v systému.',
    img: '/images/howitworks-patient-upload.webp'
  },
  {
    title: 'ePoukaz máte hned v systému',
    text: 'Jakmile pacient ePoukaz odešle, okamžitě se zobrazí ve vašem administračním rozhraní i s načtenými SÚKL daty. Nic nepřepisujete a nic neověřujete ručně.',
    img: '/images/howitworks-in-system.webp'
  },
  {
    title: 'Přehledná správa stavů',
    text: 'Každému ePoukazu můžete nastavit stav – od přijetí až po vyřízení. Váš tým má vždy jasno, co je potřeba udělat a co už je hotové.',
    img: '/images/howitworks-status-management.webp'
  },
  {
    title: 'Automatické upozornění pacienta',
    text: 'Jakmile je ePoukaz připraven k vyzvednutí, pacientovi automaticky přijde notifikace. Pokud nechcete, nemusíte mu volat ani psát – systém to udělá za vás.',
    img: '/images/howitworks-notification.webp'
  },
  {
    title: 'Klienti pod kontrolou',
    text: 'Ke každému pacientovi vidíte historii objednávek a můžete ho snadno kontaktovat. Vše přehledně na jednom místě.',
    img: '/images/howitworks-clients.webp'
  },
  {
    title: 'Kategorie a upomínky na míru',
    text: 'Stálým klientům přiřadíte kategorie podle toho, co objednávají, a nastavíte si upomínky na docházející pomůcky. Ozvete se jim přesně ve chvíli, kdy vás budou potřebovat.',
    img: '/images/howitworks-categories-reminders.webp'
  },
  {
    title: 'Bezproblémové propojení se SÚKL',
    text: 'Data ze SÚKL se načtou automaticky a zůstávají provázaná po celou dobu vyřizování. Výdej nebo částečný výdej provedete ve svém účetním programu – stav se sám promítne i do naší aplikace a ePoukaz se automaticky označí jako vydaný nebo částečně vydaný.',
    img: '/images/howitworks-sukl.webp'
  },
  {
    title: 'Mějte správu ePoukázů vždy po ruce',
    text: 'Náš administrátorský systém můžete přidat přímo na plochu svého telefonu jako aplikaci — stačí otevřít web v prohlížeči a přidat stránku na plochu. Zapněte si také push notifikace a buďte okamžitě upozorněni na každý nový příchozí ePoukaz. Žádná zmeškaná objednávka, žádné zpoždění.',
    img: '/images/howitworks-mobile-app.webp'
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

// Sekce „Vše co váš provoz potřebuje": nadpis, podtitul a mřížka 9 dlaždic.
// Ikona je zatím placeholder (stopky) u všech; pořadí je „po sloupcích" – tři skupiny z PDF
// tvoří tři svislé sloupce (mřížka se plní po řádcích, proto se zdroj prokládá po trojicích).
export const MAIN_FEATURES = {
  title: 'Vše co váš provoz potřebuje',
  subtitle:
    '<span style="font-weight: 700;">Představte si přehlednou správu všech ePoukazů na jednom místě</span>' +
    '<span style="font-family: Poppins; font-weight: 300;"> — žádné hledání, žádné omyly, ' +
    'žádný chaos u přepážky. Automatické notifikace, kompletní přehled klientů, přístup z počítače i ' +
    'telefonu kdykoliv a odkudkoliv. Systém, který pracuje za vás — i když vy už dávno jdete domů. ' +
    'Jednou se přihlásíte a řeknete si: proč to ještě nemám?</span>',
  items: [
    // řádek 1 (vrcholy sloupců)
    { icon: '/static-icons/stopwatch-light-full.svg', title: 'Šetříte</br> čas sobě' },
    { icon: '/static-icons/head-side-brain-light-full.svg', title: 'Konec</br> chaosu' },
    { icon: '/static-icons/bell-light-full.svg', title: 'Automatické</br> notifikace' },
    // řádek 2
    { icon: '/static-icons/shoe-prints-duotone-solid-full.svg', title: 'Ušetříte kroky</br> pacientům' },
    { icon: '/static-icons/clock-light-full.svg', title: 'Dostupné</br> 24/7' },
    { icon: '/static-icons/wifi-duotone-light-full.svg', title: 'Stačí Wi-Fi</br> nebo data' },
    // řádek 3
    { icon: '/static-icons/face-smile-beam-light-full.svg', title: 'Šetříte</br> zaměstnance' },
    { icon: '/static-icons/tree-palm-light-full.svg', title: 'Správa</br> odkudkoliv' },
    { icon: '/static-icons/user-group-light-full.svg', title: 'Přehled</br> všech klientů' },
  ],
}

// Spodní CTA banner
export const CTA_BANNER = {
  title: 'Vyzkoušejte na 30 dní ZDARMA a přesvědčte se sami, co udělá s vaším provozem, časem i nervy.',
  titleMobile: 'Vyzkoušejte na 30 dní ZDARMA – co udělá s vaším provozem, časem i nervy.',
  button: 'Vyzkoušejte',
}

// Banner „2 měsíce ZDARMA"
export const TWO_MONTHS = {
  title: '2 měsíce ZDARMA',
  text: 'Zvolte si roční platbu a získejte tak 2 měsíce naší služby ePoukazonline, která vám šetří čas a stres ZDARMA.',
}

// Kontaktní blok
export const CONTACT = {
  heading: 'Máte dotaz?\nOzvěte se nám.',
  email: 'info@epoukazonline.cz',
  phone: '+420 800 000 000',
  phoneNote: 'Volejte Po-Pá 9.00-15.00',
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
export const PRICING_HEAD = {
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
