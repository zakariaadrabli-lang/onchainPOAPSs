// ============================================
// i18n — EN / FR Translations
// ============================================

const translations = {
  en: {
    // Nav
    'nav.create': 'Create POAP',
    'nav.mint': 'Mint Hub',
    'nav.gallery': 'Gallery',
    'nav.allowlist': 'Allowlist Tools',
    'nav.qr': 'QR Signature',
    'nav.docs': 'Documentation',
    'nav.home': 'Home',

    // Header
    'header.connect': 'Connect Wallet',
    'header.connected': 'Connected',
    'header.standalone': 'Standalone',
    'header.farcaster': 'Farcaster',
    'header.network': 'Network',

    // Hero
    'hero.badge': 'Onchain POAPs on Base Sepolia',
    'hero.title.1': 'Mint Memories,',
    'hero.title.2': 'Forever Onchain',
    'hero.desc': 'Create, mint, and distribute soulbound POAP badges on the Base network. Secure, verifiable, and beautifully crafted for your events.',
    'hero.cta.create': 'Create a POAP',
    'hero.cta.gallery': 'Browse Gallery',
    'hero.stats.poaps': 'POAPs Minted',
    'hero.stats.events': 'Events Created',
    'hero.stats.holders': 'Unique Holders',
    'hero.features': 'Everything you need to run onchain events',

    // Feature cards
    'feature.create.title': 'Create POAP',
    'feature.create.desc': 'Design custom SVG artwork and register soulbound event badges in minutes.',
    'feature.mint.title': 'Mint Hub',
    'feature.mint.desc': 'Public, allowlist, and signature minting with real-time transaction tracking.',
    'feature.gallery.title': 'Gallery',
    'feature.gallery.desc': 'Browse your collected POAPs with onchain verification and metadata.',
    'feature.allowlist.title': 'Allowlist Tools',
    'feature.allowlist.desc': 'Generate Merkle roots and proofs for gated allowlist minting.',
    'feature.qr.title': 'QR Signature Generator',
    'feature.qr.desc': 'Create mint URLs and QR codes for physical posters at live events.',
    'feature.docs.title': 'Documentation',
    'feature.docs.desc': 'Learn about soulbound tokens, Merkle trees, and signature mints.',

    // Create POAP
    'create.title': 'Create a POAP',
    'create.subtitle': 'Design and register your onchain event badge',
    'create.section.basic': 'Basic Information',
    'create.section.artwork': 'Artwork',
    'create.section.settings': 'Mint Settings',
    'create.section.optional': 'Optional Details',
    'create.name': 'POAP Name',
    'create.name.ph': 'e.g. Devcon 2026 Attendee',
    'create.name.hint': 'The display name for your event badge',
    'create.svglbl': 'SVG Image',
    'create.svg.hint': 'Upload an SVG file or paste SVG code below',
    'create.svg.paste': 'Or paste SVG code directly',
    'create.svg.ph': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">...</svg>',
    'create.soulbound': 'Soulbound',
    'create.soulbound.desc': 'Token cannot be transferred after minting',
    'create.public': 'Public Mint',
    'create.public.desc': 'Anyone can mint this POAP',
    'create.desc': 'Description',
    'create.desc.ph': 'Describe your event or achievement...',
    'create.location': 'Location',
    'create.location.ph': 'e.g. Paris, France',
    'create.date': 'Event Date',
    'create.url': 'External URL',
    'create.url.ph': 'https://your-event.com',
    'create.submit': 'Register POAP',
    'create.preview': 'Live Preview',
    'create.preview.empty': 'Your POAP preview will appear here',
    'create.preview.empty.desc': 'Upload SVG artwork and fill in the form',
    'create.upload': 'Click to upload SVG',
    'create.upload.hint': 'SVG files only — max 100KB',
    'create.registering': 'Registering onchain...',
    'create.success': 'POAP registered successfully!',
    'create.id': 'POAP ID',
    'create.tx': 'Transaction',

    // Mint Hub
    'mint.title': 'Minting Hub',
    'mint.subtitle': 'Mint your POAP badges on Base Sepolia',
    'mint.public': 'Public Mint',
    'mint.allowlist': 'Allowlist Mint',
    'mint.signature': 'Signature Mint',
    'mint.poapid': 'POAP ID',
    'mint.poapid.ph': 'Enter the POAP ID to mint',
    'mint.recipient': 'Recipient Address',
    'mint.recipient.ph': '0x... (defaults to your wallet)',
    'mint.proof': 'Merkle Proof',
    'mint.proof.ph': 'Paste your Merkle proof (comma-separated hex)',
    'mint.signature.v': 'Signature',
    'mint.signature.ph': '0x... (EIP-191 signature from creator)',
    'mint.deadline': 'Deadline',
    'mint.deadline.ph': 'Unix timestamp deadline',
    'mint.btn.public': 'Mint Now',
    'mint.btn.allowlist': 'Mint with Proof',
    'mint.btn.signature': 'Mint with Signature',
    'mint.info.public': 'Public mints are open to everyone. Simply enter the POAP ID and confirm the transaction.',
    'mint.info.allowlist': 'Allowlist mints require a Merkle proof. Use the Allowlist Tools tab to generate proofs for your address.',
    'mint.info.signature': 'Signature mints allow creators to authorize specific wallets via signed messages. Mints must occur before the deadline (up to 37 days).',
    'mint.warn.deadline': 'Signature mints have a time window of up to 37 days from creation. After the deadline, the signature becomes invalid.',
    'mint.success': 'POAP minted successfully!',
    'mint.minting': 'Minting...',
    'mint.view.basescan': 'View on BaseScan',
    'mint.view.opensea': 'View on OpenSea',

    // Allowlist
    'allowlist.title': 'Allowlist & Merkle Tree Generator',
    'allowlist.subtitle': 'Generate Merkle roots and proofs for gated minting',
    'allowlist.input': 'Allowed Addresses',
    'allowlist.input.ph': 'Paste addresses here, one per line or comma-separated\n0x1234...\n0x5678...\n0x9abc...',
    'allowlist.generate': 'Generate Merkle Tree',
    'allowlist.root': 'Merkle Root',
    'allowlist.root.empty': 'Root will appear here after generation',
    'allowlist.proofs': 'Generated Proofs',
    'allowlist.proofs.empty': 'Proofs will appear here after generation',
    'allowlist.copy': 'Copy',
    'allowlist.copied': 'Copied to clipboard!',
    'allowlist.count': 'addresses included',
    'allowlist.error': 'Please enter at least one valid address',

    // QR Generator
    'qr.title': 'Signature & QR Code Generator',
    'qr.subtitle': 'Create mint URLs and QR codes for live events',
    'qr.url': 'Mint URL',
    'qr.url.ph': 'https://yourapp.com/mint?poapId=1&sig=0x...',
    'qr.generate': 'Generate QR Code',
    'qr.download': 'Download QR',
    'qr.preview': 'QR Preview',
    'qr.preview.empty': 'Enter a URL and generate to see the QR code',
    'qr.size': 'QR Size',
    'qr.color': 'Foreground Color',
    'qr.info': 'Print this QR code on physical posters at your event. Attendees scan it to open the mint page directly.',
    'qr.sign.gen': 'Generate Signature Data',
    'qr.sign.poapid': 'POAP ID',
    'qr.sign.recipient': 'Recipient Address',
    'qr.sign.deadline': 'Deadline (days from now)',
    'qr.sign.output': 'Signature Output',
    'qr.sign.output.empty': 'Signature data will appear here',

    // Gallery
    'gallery.title': 'My POAP Gallery',
    'gallery.subtitle': 'Your collected onchain event badges',
    'gallery.empty': 'No POAPs found',
    'gallery.empty.desc': 'Connect your wallet and mint some POAPs to see them here',
    'gallery.load': 'Load Gallery',
    'gallery.loading': 'Loading...',
    'gallery.verified': 'Verified Onchain',
    'gallery.tokenid': 'Token ID',
    'gallery.soulbound': 'Soulbound',

    // Modal
    'modal.details': 'POAP Details',
    'modal.name': 'Name',
    'modal.id': 'Token ID',
    'modal.poapid': 'POAP ID',
    'modal.desc': 'Description',
    'modal.location': 'Location',
    'modal.date': 'Event Date',
    'modal.url': 'External URL',
    'modal.soulbound': 'Soulbound',
    'modal.owner': 'Owner',
    'modal.tx': 'Mint Transaction',
    'modal.basescan': 'BaseScan',
    'modal.opensea': 'OpenSea',

    // Docs
    'docs.title': 'Documentation',
    'docs.subtitle': 'Learn how Onchain POAPs work',
    'docs.nav.overview': 'Overview',
    'docs.nav.soulbound': 'Soulbound POAPs',
    'docs.nav.merkle': 'Merkle Trees',
    'docs.nav.signature': 'Signature Mints',
    'docs.nav.svg': 'SVG Rules',
    'docs.nav.farcaster': 'Farcaster Mini App',

    // Toast
    'toast.wallet.connected': 'Wallet connected successfully',
    'toast.wallet.disconnected': 'Wallet disconnected',
    'toast.wallet.notfound': 'No wallet found. Please install MetaMask.',
    'toast.wrong.network': 'Wrong network. Please switch to Base Sepolia.',
    'toast.tx.sent': 'Transaction sent. Waiting for confirmation...',
    'toast.tx.success': 'Transaction confirmed!',
    'toast.tx.failed': 'Transaction failed',
    'toast.copied': 'Copied to clipboard!',
    'toast.error': 'An error occurred',

    // Farcaster
    'farcaster.banner': 'Farcaster Mini App mode active — optimized for frame display',

    // Common
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.yes.short': 'Yes',
    'common.no.short': 'No',
    'common.copy': 'Copy',
    'common.network.base': 'Base Sepolia',
  },

  fr: {
    // Nav
    'nav.create': 'Creer POAP',
    'nav.mint': 'Hub de Mint',
    'nav.gallery': 'Galerie',
    'nav.allowlist': 'Outils Allowlist',
    'nav.qr': 'Signature QR',
    'nav.docs': 'Documentation',
    'nav.home': 'Accueil',

    // Header
    'header.connect': 'Connecter Wallet',
    'header.connected': 'Connecte',
    'header.standalone': 'Autonome',
    'header.farcaster': 'Farcaster',
    'header.network': 'Reseau',

    // Hero
    'hero.badge': 'POAPs Onchain sur Base Sepolia',
    'hero.title.1': 'Gravez vos Souvenirs,',
    'hero.title.2': 'Eternellement Onchain',
    'hero.desc': 'Creez, mintez et distribuez des badges POAP soulbound sur le reseau Base. Securises, verifiables et magnifiquement conus pour vos evenements.',
    'hero.cta.create': 'Creer un POAP',
    'hero.cta.gallery': 'Parcourir la Galerie',
    'hero.stats.poaps': 'POAPs Mintes',
    'hero.stats.events': 'Evenements Cres',
    'hero.stats.holders': 'Detenteurs Uniques',
    'hero.features': 'Tout ce qu il faut pour des evenements onchain',

    // Feature cards
    'feature.create.title': 'Creer POAP',
    'feature.create.desc': 'Concevez des illustrations SVG personnalisees et enregistrez des badges d evenement soulbound en quelques minutes.',
    'feature.mint.title': 'Hub de Mint',
    'feature.mint.desc': 'Mint public, allowlist et par signature avec suivi des transactions en temps reel.',
    'feature.gallery.title': 'Galerie',
    'feature.gallery.desc': 'Parcourez vos POAPs collectes avec verification onchain et metadonnees.',
    'feature.allowlist.title': 'Outils Allowlist',
    'feature.allowlist.desc': 'Gerez les racines Merkle et les preuves pour le mint avec allowlist.',
    'feature.qr.title': 'Generateur de Signature QR',
    'feature.qr.desc': 'Creez des URLs de mint et des codes QR pour les affichages physiques en evenement.',
    'feature.docs.title': 'Documentation',
    'feature.docs.desc': 'Apprenez les tokens soulbound, les arbres de Merkle et les mints par signature.',

    // Create POAP
    'create.title': 'Creer un POAP',
    'create.subtitle': 'Concevez et enregistrez votre badge d evenement onchain',
    'create.section.basic': 'Informations de Base',
    'create.section.artwork': 'Illustration',
    'create.section.settings': 'Parametres de Mint',
    'create.section.optional': 'Details Optionnels',
    'create.name': 'Nom du POAP',
    'create.name.ph': 'ex. Participant Devcon 2026',
    'create.name.hint': 'Le nom d affichage de votre badge d evenement',
    'create.svglbl': 'Image SVG',
    'create.svg.hint': 'Telechargez un fichier SVG ou collez du code SVG ci-dessous',
    'create.svg.paste': 'Ou collez du code SVG directement',
    'create.svg.ph': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">...</svg>',
    'create.soulbound': 'Soulbound',
    'create.soulbound.desc': 'Le token ne peut pas etre transfere apres le mint',
    'create.public': 'Mint Public',
    'create.public.desc': 'N importe qui peut minter ce POAP',
    'create.desc': 'Description',
    'create.desc.ph': 'Decrivez votre evenement ou realisation...',
    'create.location': 'Lieu',
    'create.location.ph': 'ex. Paris, France',
    'create.date': 'Date de l Evenement',
    'create.url': 'URL Externe',
    'create.url.ph': 'https://votre-evenement.com',
    'create.submit': 'Enregistrer le POAP',
    'create.preview': 'Apercu en Direct',
    'create.preview.empty': 'Votre apercu POAP apparaitra ici',
    'create.preview.empty.desc': 'Telechargez une illustration SVG et remplissez le formulaire',
    'create.upload': 'Cliquer pour telecharger SVG',
    'create.upload.hint': 'Fichiers SVG uniquement — max 100 Ko',
    'create.registering': 'Enregistrement onchain...',
    'create.success': 'POAP enregistre avec succes !',
    'create.id': 'ID POAP',
    'create.tx': 'Transaction',

    // Mint Hub
    'mint.title': 'Hub de Mint',
    'mint.subtitle': 'Mintez vos badges POAP sur Base Sepolia',
    'mint.public': 'Mint Public',
    'mint.allowlist': 'Mint Allowlist',
    'mint.signature': 'Mint par Signature',
    'mint.poapid': 'ID POAP',
    'mint.poapid.ph': 'Entrez l ID POAP a minter',
    'mint.recipient': 'Adresse du Destinataire',
    'mint.recipient.ph': '0x... (votre wallet par defaut)',
    'mint.proof': 'Preuve de Merkle',
    'mint.proof.ph': 'Collez votre preuve Merkle (hex separe par virgules)',
    'mint.signature.v': 'Signature',
    'mint.signature.ph': '0x... (signature EIP-191 du createur)',
    'mint.deadline': 'Echeance',
    'mint.deadline.ph': "Timestamp d echeance Unix",
    'mint.btn.public': 'Minter Maintenant',
    'mint.btn.allowlist': 'Minter avec Preuve',
    'mint.btn.signature': 'Minter avec Signature',
    'mint.info.public': 'Les mints publics sont ouverts a tous. Entrez simplement l ID POAP et confirmez la transaction.',
    'mint.info.allowlist': 'Les mints allowlist necessitent une preuve de Merkle. Utilisez l onglet Outils Allowlist pour generer des preuves pour votre adresse.',
    'mint.info.signature': 'Les mints par signature permettent aux createurs d autoriser des wallets specifiques via des messages signes. Les mints doivent avoir lieu avant l echeance (jusqu a 37 jours).',
    'mint.warn.deadline': 'Les mints par signature ont une fenetre de temps jusqu a 37 jours a partir de la creation. Apres l echeance, la signature devient invalide.',
    'mint.success': 'POAP minte avec succes !',
    'mint.minting': 'Mint en cours...',
    'mint.view.basescan': 'Voir sur BaseScan',
    'mint.view.opensea': 'Voir sur OpenSea',

    // Allowlist
    'allowlist.title': 'Generateur d Allowlist et Arbre de Merkle',
    'allowlist.subtitle': 'Gerez les racines Merkle et les preuves pour le mint controle',
    'allowlist.input': 'Adresses Autorisees',
    'allowlist.input.ph': 'Collez les adresses ici, une par ligne ou separees par virgules\n0x1234...\n0x5678...\n0x9abc...',
    'allowlist.generate': 'Generer l Arbre de Merkle',
    'allowlist.root': 'Racine de Merkle',
    'allowlist.root.empty': 'La racine apparaitra ici apres generation',
    'allowlist.proofs': 'Preuves Generees',
    'allowlist.proofs.empty': 'Les preuves apparaitront ici apres generation',
    'allowlist.copy': 'Copier',
    'allowlist.copied': 'Copie dans le presse-papiers !',
    'allowlist.count': 'adresses incluses',
    'allowlist.error': 'Veuillez entrer au moins une adresse valide',

    // QR Generator
    'qr.title': 'Generateur de Signature et Code QR',
    'qr.subtitle': 'Creez des URLs de mint et des codes QR pour les evenements en direct',
    'qr.url': 'URL de Mint',
    'qr.url.ph': 'https://votreapp.com/mint?poapId=1&sig=0x...',
    'qr.generate': 'Generer le Code QR',
    'qr.download': 'Telecharger le QR',
    'qr.preview': 'Apercu QR',
    'qr.preview.empty': 'Entrez une URL et generez pour voir le code QR',
    'qr.size': 'Taille du QR',
    'qr.color': 'Couleur de Premier Plan',
    'qr.info': 'Imprimez ce code QR sur les affiches physiques de votre evenement. Les participants le scannent pour ouvrir la page de mint directement.',
    'qr.sign.gen': 'Generer les Donnees de Signature',
    'qr.sign.poapid': 'ID POAP',
    'qr.sign.recipient': 'Adresse du Destinataire',
    'qr.sign.deadline': 'Echeance (jours a partir de maintenant)',
    'qr.sign.output': 'Sortie de Signature',
    'qr.sign.output.empty': 'Les donnees de signature apparaitront ici',

    // Gallery
    'gallery.title': 'Ma Galerie POAP',
    'gallery.subtitle': 'Vos badges d evenement onchain collectes',
    'gallery.empty': 'Aucun POAP trouve',
    'gallery.empty.desc': 'Connectez votre wallet et mintez des POAPs pour les voir ici',
    'gallery.load': 'Charger la Galerie',
    'gallery.loading': 'Chargement...',
    'gallery.verified': 'Verifie Onchain',
    'gallery.tokenid': 'ID Token',
    'gallery.soulbound': 'Soulbound',

    // Modal
    'modal.details': 'Details du POAP',
    'modal.name': 'Nom',
    'modal.id': 'ID Token',
    'modal.poapid': 'ID POAP',
    'modal.desc': 'Description',
    'modal.location': 'Lieu',
    'modal.date': 'Date de l Evenement',
    'modal.url': 'URL Externe',
    'modal.soulbound': 'Soulbound',
    'modal.owner': 'Proprietaire',
    'modal.tx': 'Transaction de Mint',
    'modal.basescan': 'BaseScan',
    'modal.opensea': 'OpenSea',

    // Docs
    'docs.title': 'Documentation',
    'docs.subtitle': 'Apprenez comment les POAPs Onchain fonctionnent',
    'docs.nav.overview': 'Apercu',
    'docs.nav.soulbound': 'POAPs Soulbound',
    'docs.nav.merkle': 'Arbres de Merkle',
    'docs.nav.signature': 'Mints par Signature',
    'docs.nav.svg': 'Regles SVG',
    'docs.nav.farcaster': 'Mini App Farcaster',

    // Toast
    'toast.wallet.connected': 'Wallet connecte avec succes',
    'toast.wallet.disconnected': 'Wallet deconnecte',
    'toast.wallet.notfound': 'Aucun wallet trouve. Veuillez installer MetaMask.',
    'toast.wrong.network': 'Mauvais reseau. Veuillez passer sur Base Sepolia.',
    'toast.tx.sent': 'Transaction envoyee. En attente de confirmation...',
    'toast.tx.success': 'Transaction confirmee !',
    'toast.tx.failed': 'Transaction echouee',
    'toast.copied': 'Copie dans le presse-papiers !',
    'toast.error': 'Une erreur est survenue',

    // Farcaster
    'farcaster.banner': 'Mode Mini App Farcaster actif — optimise pour l affichage frame',

    // Common
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.close': 'Fermer',
    'common.loading': 'Chargement...',
    'common.none': 'Aucun',
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.yes.short': 'Oui',
    'common.no.short': 'Non',
    'common.copy': 'Copier',
    'common.network.base': 'Base Sepolia',
  },
};

// Current language state
let currentLang = 'en';

export function t(key) {
  const dict = translations[currentLang] || translations.en;
  return dict[key] || translations.en[key] || key;
}

export function setLang(lang) {
  currentLang = lang;
}

export function getLang() {
  return currentLang;
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (el.hasAttribute('data-i18n-ph')) {
        el.placeholder = val;
      } else {
        el.value = val;
      }
    } else {
      el.textContent = val;
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const key = el.getAttribute('data-i18n-ph');
    el.placeholder = t(key);
  });

  document.documentElement.lang = currentLang;
}
