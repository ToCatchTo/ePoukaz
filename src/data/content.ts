import { PASTELS } from '../theme/theme'

// Navigace v hlavičce
export const NAV_LINKS = [
  { label: 'Jak to funguje?', to: '/#jak-to-funguje' },
  { label: 'Ceník', to: '/cenik' },
  { label: 'Kontakt', to: '/kontakt' },
]

// HERO sekce homepage
export const HERO = {
  title: 'Šetřete čas sobě i pacientům',
  paragraph:
    'Digitalizujte příjem a správu elektronických ePoukazů ve svých zdravotnických potřebách, ' +
    'lékárně nebo optice. Pacient odešle poukaz online, vy ho během vteřiny vidíte ve svém systému ' +
    '– bez telefonátů, papírů a nepříjemných zmatků.',
  cta: 'Vyzkoušejte',
}

// Recenzní bublinky v hero
export const TESTIMONIALS = [
  { name: 'Eliška', role: 'dcera seniora',
    quote: 'Pomůcky tátovi objednám z práce, doručí mu je domů. Ušetřím čas, on má klid.' },
  { name: 'Gábina', role: 'majitelka zdravotnických potřeb',
    quote: 'Konečně systém, který šetří čas nám i pacientům – objednají si pohodlně z domova.' },
  { name: 'Jarmila', role: 'seniorka 67 let',
    quote: 'Poukaz odešlu z domova, do provozovny jdu až si pomůcky vyzvednout. Dřív jsem musela dvakrát.' },
]

// 8 kroků „Jak to funguje" (texty z PDF)
export const HOW_STEPS = [
  { title: 'Nastavení za pár minut',
    text: 'Zaregistrujete se, nahrajete SÚKL a osobní certifikát a systém vám vygeneruje unikátní link. Ten jednoduše vložíte na svůj web a jste připraveni přijímat poukazy.' },
  { title: 'Pacient nahraje poukaz sám',
    text: 'Pacient nebo jeho blízký přes váš web jednoduše načte QR kód nebo zadá kód ručně. Bez front, bez telefonátů, kdykoliv z pohodlí domova nebo přímo z ordinace. Načíst můžete i vy přímo v systému.' },
  { title: 'Poukaz máte hned v systému',
    text: 'Jakmile pacient poukaz odešle, okamžitě se zobrazí ve vašem administračním rozhraní i s načtenými SÚKL daty. Nic nepřepisujete a nic neověřujete ručně.' },
  { title: 'Přehledná správa stavů',
    text: 'Každému poukazu můžete nastavit stav – od přijetí až po vyřízení. Váš tým má vždy jasno, co je potřeba udělat a co už je hotové.' },
  { title: 'Automatické upozornění pacienta',
    text: 'Jakmile je poukaz připraven k vyzvednutí, pacientovi automaticky přijde notifikace. Pokud nechcete, nemusíte mu volat ani psát – systém to udělá za vás.' },
  { title: 'Klienti pod kontrolou',
    text: 'Ke každému pacientovi vidíte historii objednávek a můžete ho snadno kontaktovat. Vše přehledně na jednom místě.' },
  { title: 'Kategorie a upomínky na míru',
    text: 'Stálým klientům přiřadíte kategorie podle toho, co objednávají, a nastavíte si upomínky na docházející pomůcky. Ozvete se jim přesně ve chvíli, kdy vás budou potřebovat.' },
  { title: 'Bezproblémové propojení se SÚKL',
    text: 'Data ze SÚKL se načtou automaticky a zůstávají provázaná po celou dobu vyřizování. Výdej nebo částečný výdej provedete klidně ve svém účetním programu – stav se sám promítne i do naší aplikace a poukaz se automaticky označí jako vydaný nebo částečně vydaný.' },
]

// 6 karet „problémů" (pořadí a barvy dle mřížky 3×2 v XD)
export const PROBLEMS = [
  { title: 'Ušetříte čas', color: PASTELS.teal,
    text: 'Poukazy vám chodí rovnou do administrace – nemusíte je přepisovat, skenovat ani telefonicky ověřovat. Co dřív trvalo minuty u každého pacienta, teď zvládnete jedním pohledem.' },
  { title: 'Zpřehledníte si správu', color: PASTELS.pink,
    text: 'Všechny poukazy na jednom místě, se stavy „nové", „rozpracováno", „vyřízeno". Váš tým vždy ví, co je potřeba udělat a co už je hotové.' },
  { title: 'Zorganizujete si vaše klienty', color: '#FFD5D5',
    text: 'Ke každému pacientovi si uložíte historii objednávek, kategorie i poznámky. Příště ho poznáte na první pohled a nabídnete mu přesně to, co potřebuje.' },
  { title: 'Zbavíte se telefonátů', color: PASTELS.yellow,
    text: 'Pacient dostane e-mailem (nebo SMS) info o stavu svého poukazu automaticky – bez toho, aby vám kvůli tomu musel volat nebo psát.' },
  { title: 'Propojíme vás se SÚKL', color: PASTELS.red,
    text: 'Data z SÚKL se načtou automaticky a zůstávají provázaná po celou dobu vyřizování. Výdej i částečný výdej klidně provedete ve svém účetním programu – stav se sám promítne i k nám.' },
  { title: 'Nezapomenete na vaše klienty', color: PASTELS.green,
    text: 'Nastavte si upomínky na vyzvednutí, opakované objednávky nebo termín kontroly. Nic vám a vašim pacientům neuteče.' },
]

// Formulář „30 dní zdarma" – jen vizuál, 6 polí
export const TRY_FORM = {
  title: 'Vyzkoušejte to sami – 30 dní zdarma',
  subtitle:
    'Zadejte pár údajů a my se vám ozveme s bezplatným přístupem na 30 dní. Žádný závazek, žádná platební ' +
    'karta – jen zjistíte, kolik času vám a vašemu týmu ePoukaz online ušetří.',
  fieldsCount: 6,
  submit: 'Odeslat',
}

// Spodní CTA banner
export const CTA_BANNER = {
  title: 'A to není vše! Přesvědčte se sami a vyzkoušejte na 30 dní ZDARMA',
  button: 'Vyzkoušejte',
}

// Růžový banner „2 měsíce ZDARMA"
export const TWO_MONTHS = {
  title: '2 měsíce ZDARMA',
  text: 'Zvolte si roční platbu a získejte tak 2 měsíce naší služby ePoukazonline, která vám šetří čas a stres ZDARMA.',
}

// Kontaktní blok
export const CONTACT = {
  email: 'info@epoukazonline.cz',
  phone: '+420 800 000 000',
  messageLabel: 'Zanechte nám zprávu a my se vám ozveme',
}

// Ceník – 3 tarify
export const PRICING = [
  { name: 'Start', price: '1 490 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Začněte zdarma', accent: 'black' as const, highlighted: false },
  { name: 'Pro', price: '2 490 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Začněte zdarma', accent: 'purple' as const, highlighted: true },
  { name: 'Premium', price: '3 990 Kč', note: 'MĚSÍČNÍ BALÍČEK BEZ DPH',
    features: ['ePoukaz online', 'Správa ePoukazů', 'Notifikace e-mailem', 'Security'],
    cta: 'Kontaktovat', accent: 'teal' as const, highlighted: false },
]

// Srovnávací tabulka „Nástroje". POZOR: rozložení fajfek ověř proti _navrh/ (960px render).
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
  '*Informace k SMS notifikacím: Služba umožňuje zasílání SMS notifikací zákazníkům (např. informace ' +
  'o ePoukazu nebo stavu objednávky). Tyto SMS jsou realizovány prostřednictvím externího poskytovatele ' +
  'komunikačních služeb a nejsou zahrnuty v měsíčním poplatku za využívání služby. Cena za odeslané SMS ' +
  'je účtována samostatně dle skutečného počtu odeslaných zpráv a aktuálního ceníku poskytovatele. ' +
  'Náklady na tyto SMS budou připočteny k pravidelnému měsíčnímu vyúčtování služby.'

// Nadpis a podtitul ceníku (opraven překlep „prefenrencí" → „preferencí")
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
  // Pozn.: sloupce „Obecné" a „Doplňkové služby" mají dle XD návrhu shodné odkazy (záměr, ne překlep).
  columns: [
    { title: 'Jak na to?', links: ['Jak implementovat', 'Jak to funguje?', 'Video tutorial', 'FAQ'] },
    { title: 'Obecné', links: ['Rozšíření aplikace na míru', 'Tvorba webu se SLEVOU', 'Tvorba loga se SLEVOU'] },
    { title: 'Doplňkové služby', links: ['Rozšíření aplikace na míru', 'Tvorba webu se SLEVOU', 'Tvorba loga se SLEVOU'] },
  ],
  copyright: '2026, epoukazonline.cz',
  credit: 'Tvoříme weby s radostí',
}

// Univerzální podstránka (obchodní podmínky – varianta B, zkráceno na úvodní odstavce)
export const UNI = {
  title: 'Nadpis univerzální podstránky, může být až dvouřádkový',
  paragraphs: [
    'OBCHODNÍ PODMÍNKY (VARIANTA B)',
    'Tyto obchodní podmínky (dále jen „obchodní podmínky") obchodní společnosti … upravují v souladu ' +
      's ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník, vzájemná práva a povinnosti ' +
      'smluvních stran vzniklé v souvislosti nebo na základě kupní smlouvy uzavírané mezi prodávajícím ' +
      'a kupujícím prostřednictvím internetového obchodu prodávajícího.',
    'ÚVODNÍ USTANOVENÍ',
    'Obchodní podmínky se nevztahují na případy, kdy osoba, která má v úmyslu nakoupit zboží od prodávajícího, ' +
      'je právnickou osobou či osobou, jež jedná při objednávání zboží v rámci své podnikatelské činnosti.',
    'UŽIVATELSKÝ ÚČET',
    'Na základě registrace kupujícího provedené na webové stránce může kupující přistupovat do svého ' +
      'uživatelského rozhraní. Přístup k uživatelskému účtu je zabezpečen uživatelským jménem a heslem.',
  ],
}
