export interface MilestoneItem {
  id: string;
  chapterCode: string;
  era: string;
  titleEn: string;
  titleId: string;
  mathSymbol: string;
  equationLabel: string;
  narrative: string;
  highlightQuote: string;
  isPlayful?: boolean;
}

export interface ConstellationNode {
  id: string;
  starName: string;
  coordinates: string;
  title: string;
  subtitle: string;
  reflection: string;
  scriptureOrNote: string;
  image?: string;
  imageAlt?: string;
}

export interface AdorationQuality {
  id: string;
  badge: string;
  title: string;
  nicknameTag: 'Boss' | 'Sayang';
  description: string;
  detailNote: string;
}

export interface SacredPromise {
  id: string;
  numberRoman: string;
  title: string;
  promise: string;
}

export interface StoryContentConfig {
  recipient: {
    fullName: string;
    firstName: string;
    nicknames: {
      primary: string; // 'Boss' (60%)
      secondary: string; // 'Sayang' (40%)
    };
    birthdayDateDisplay: string;
    birthdayISO: string;
    turningAge: number;
    favoriteColorName: string;
    almaMater: string;
  };
  husband: {
    fullName: string;
    shortName: string;
    weddingDateDisplay: string;
    weddingISO: string;
  };
  portraits: {
    heroCandlelightRose: string;
    closeUpRose: string;
    warmSmile: string;
  };
  act1Invitation: {
    eyebrowEn: string;
    greetingLines: string[];
    subtext: string;
    ctaButtonLabel: string;
    audioHint: string;
  };
  act2Sanctuary: {
    eyebrowEn: string;
    headlineEn: string;
    subtitleId: string;
    dedicationBadge: string;
    mathematicalPoeticNote: string;
    portraitCaption: string;
  };
  act3LoveStory: {
    eyebrowEn: string;
    headlineEn: string;
    introId: string;
    milestones: MilestoneItem[];
  };
  act4Constellation: {
    eyebrowEn: string;
    headlineEn: string;
    instructionId: string;
    nodes: ConstellationNode[];
  };
  act5Adoration: {
    eyebrowEn: string;
    headlineEn: string;
    subtitleId: string;
    qualities: AdorationQuality[];
  };
  act6Letter: {
    eyebrowEn: string;
    headlineEn: string;
    salutation: string;
    paragraphs: string[];
    scripture: {
      reference: string;
      verseText: string;
      reflectionNote: string;
    };
    closingGreeting: string;
    signatureName: string;
    signatureRole: string;
  };
  act7Wish: {
    eyebrowEn: string;
    headlineEn: string;
    guidanceSteps: string[];
    buttonPrompt: string;
    micPromptOptional: string;
    afterWishHeadline: string;
    afterWishBlessing: string;
  };
  act8Surprise: {
    eyebrowEn: string;
    headlineEn: string;
    envelopeLabel: string;
    introText: string;
    promises: SacredPromise[];
    specialPrayer: string;
  };
  act9Finale: {
    eyebrowEn: string;
    closingLines: string[];
    finalTimestamp: string;
  };
}

export const STORY_CONTENT: StoryContentConfig = {
  recipient: {
    fullName: 'Natasha Rosaline',
    firstName: 'Natasha',
    nicknames: {
      primary: 'Boss',
      secondary: 'Sayang',
    },
    birthdayDateDisplay: '23 Oktober 2026',
    birthdayISO: '2026-10-23',
    turningAge: 29,
    favoriteColorName: 'Velvet Maroon',
    almaMater: 'Matematika Universitas Indonesia',
  },
  husband: {
    fullName: 'Robertus Agung Pradana',
    shortName: 'Robert',
    weddingDateDisplay: '10 Agustus 2024',
    weddingISO: '2024-08-10',
  },
  portraits: {
    heroCandlelightRose: '/images/natasha-rose.jpg',
    closeUpRose: '/images/natasha-closeup.jpg',
    warmSmile: '/images/natasha-smile.jpg',
  },
  act1Invitation: {
    eyebrowEn: 'ACT I — THE INVITATION • XXIII.X.MMXXVI',
    greetingLines: [
      'Halo, Boss...',
      'Halo, Sayang...',
      'Ada sebuah ruang kecil yang kusiapkan khusus untukmu hari ini.',
    ],
    subtext:
      'Bukan sekadar ucapan ulang tahun biasa, melainkan perjalanan tentang kita, doa-doa yang kita langitkan, dan betapa bersyukurnya aku memiliki istri sepertimu.',
    ctaButtonLabel: 'Begin Our Story',
    audioHint: 'Nyalakan suara (Grand Piano & Cello) untuk pengalaman penuh',
  },
  act2Sanctuary: {
    eyebrowEn: 'ACT II — THE VELVET ROSE SANCTUARY',
    headlineEn: 'Twenty-Nine Years of Grace',
    subtitleId:
      'Di antara jutaan kemungkinan dan angka yang pernah kita pelajari, Tuhan merancang satu titik temu paling indah: menghadirkanmu ke dunia ini, dan mempercayakanmu menjadi pendamping hidupku.',
    dedicationBadge: '23 OKTOBER 2026 • HAPPY 29TH BIRTHDAY, MY BOSS',
    mathematicalPoeticNote: '∀ t ∈ Hidupku : Syukurku(Natasha) → ∞',
    portraitCaption:
      'Sosok wanita mandiri, cerdas, lembut hati, dan takut akan Tuhan yang selalu menjadi terang di rumah kita.',
  },
  act3LoveStory: {
    eyebrowEn: 'ACT III — WHEN OUR WORLDS MET',
    headlineEn: 'The Sacred Equation of Us',
    introId:
      'Siapa yang menyangka perjalanan dari bangku sekolah dan lembar-lembar soal matematika akan bermuara pada altar pernikahan yang kudus?',
    milestones: [
      {
        id: 'sman4-bekasi',
        chapterCode: 'CHAPTER 01',
        era: 'Masa Putih Abu-Abu',
        titleEn: 'Where Two Lines First Crossed',
        titleId: 'Awal Pertemuan di SMAN 4 Bekasi',
        mathSymbol: '∩',
        equationLabel: 'Titik Perpotongan Pertama',
        narrative:
          'Semuanya bermula di SMAN 4 Bekasi. Di masa remaja itu, langkah kita pertama kali dipertemukan. Sejak awal, ada sesuatu yang berbeda dari caramu berpikir, ketenanganmu, dan senyummu yang selalu tulus.',
        highlightQuote: 'Dari satu sekolah yang sama, Tuhan mulai menulis bab pertama cerita kita.',
      },
      {
        id: 'osn-matematika',
        chapterCode: 'CHAPTER 02',
        era: 'Perjuangan Olimpiade',
        titleEn: 'Minds in Harmony',
        titleId: 'Berjuang Bersama di OSN Matematika',
        mathSymbol: '∑',
        equationLabel: 'Deret Perjuangan & Logika',
        narrative:
          'Kita tidak hanya sekadar teman sekolah—kita berjuang bersama di Olimpiade Sains Nasional (OSN) Matematika. Di tengah rumitnya pembuktian teorema dan barisan angka, aku semakin mengagumi betapa cerdas, tekun, dan luar biasanya dirimu, Boss.',
        highlightQuote: 'Ketika dua pemikir matematika belajar bahwa harmoni terindah tidak bisa dihitung dengan rumus.',
      },
      {
        id: 'ui-matematika',
        chapterCode: 'CHAPTER 03',
        era: 'Kampus Perjuangan',
        titleEn: 'Growing & Graduating Side by Side',
        titleId: 'Matematika Universitas Indonesia & Lulus Bersama',
        mathSymbol: '∫',
        equationLabel: 'Integral Perjalanan Kampus UI',
        narrative:
          'Langkah kita berlanjut ke Jurusan Matematika Universitas Indonesia. Kita belajar bersama, bertumbuh dewasa bersama, melewati tugas-tugas kuliah yang berat, hingga akhirnya mengenakan toga dan lulus bersama.',
        highlightQuote: 'Tumbuh dari rekan seperjuangan menjadi belahan jiwa yang saling menguatkan.',
      },
      {
        id: 'insiden-ui',
        chapterCode: 'CHAPTER 04 • MOST UNFORGETTABLE LAUGH',
        era: 'Momen Paling Lucu di UI',
        titleEn: 'The Gravitational Collision',
        titleId: 'Lari Mengejar Kelas & Insiden Tersandung Legendaris',
        mathSymbol: 'Δv',
        equationLabel: 'Hukum Gravitasi Tak Terduga',
        narrative:
          'Kalau bicara kenangan paling lucu waktu kuliah di UI, aku tidak akan pernah lupa hari ketika aku berlari kencang karena hampir terlambat masuk kelas... lalu tiba-tiba tersandung dan akhirnya malah menabrak pantatmu, Sayang! Hahaha. Momen paling konyol sekaligus paling berkesan yang selalu berhasil bikin kita ketawa setiap kali diingat.',
        highlightQuote: '"Dari sekian banyak tempat untuk jatuh, takdir memastikan aku jatuhnya tetap ke arah Boss!"',
        isPlayful: true,
      },
      {
        id: 'wedding-covenant',
        chapterCode: 'CHAPTER 05 • 10 AGUSTUS 2024',
        era: 'Janji Suci Pernikahan',
        titleEn: 'United in Christ Forever',
        titleId: '10 Agustus 2024 — Satu di Dalam Tuhan Yesus',
        mathSymbol: '∞',
        equationLabel: '1 + 1 = 1 Dalam Kasih Kristus',
        narrative:
          'Pada 10 Agustus 2024, di hadapan Tuhan Yesus, kita mengikat janji suci pernikahan. Sejak hari itu dan selamanya, kamu bukan lagi sekadar teman seperjuangan dari SMAN 4 Bekasi atau Matematika UI, melainkan istriku tercinta—partner seumur hidupku melewati segala musim kehidupan.',
        highlightQuote: 'Dipilih, dipersatukan, dan diberkati oleh Tuhan Yesus untuk berjalan bersama selamanya.',
      },
    ],
  },
  act4Constellation: {
    eyebrowEn: 'ACT IV — THE MEMORY CONSTELLATION',
    headlineEn: 'Fragments of Light & Grace',
    instructionId:
      'Sentuh setiap bintang di konstelasi ini untuk membuka potret dan renungan kecil tentang perjalanan kita, Boss.',
    nodes: [
      {
        id: 'node-rose-candle',
        starName: 'STELLA ROSA • I',
        coordinates: 'RA 23h 10m • DEC +29°',
        title: 'Keanggunan di Bawah Cahaya Lilin',
        subtitle: 'Wanita dengan Mawar Merah & Hati yang Teduh',
        reflection:
          'Melihatmu tersenyum memegang mawar merah di dekat nyala lilin ini selalu mengingatkanku betapa anggun dan tenangnya pribadimu. Kalung salib kecil yang kau kenakan adalah cerminan nyata dari hidupmu yang selalu bersandar pada Tuhan.',
        scriptureOrNote: 'Keindahan yang lahir dari hati yang dekat dengan Tuhan tidak pernah pudar oleh waktu.',
        image: '/images/natasha-rose.jpg',
        imageAlt: 'Natasha Rosaline tersenyum anggun memegang setangkai mawar merah di dekat cahaya lilin',
      },
      {
        id: 'node-closeup-grace',
        starName: 'STELLA VERITAS • II',
        coordinates: 'SMAN 4 → OSN → FMIPA UI',
        title: 'Senyum yang Menenangkan Badai',
        subtitle: 'My Smart, Independent & Kind-Hearted Boss',
        reflection:
          'Di balik ketegasanmu sebagai wanita yang mandiri dan sangat cerdas, tersimpan ketulusan hati yang luar biasa lembut. Senyummu ini adalah hal pertama yang selalu ingin kulihat setelah hari yang panjang.',
        scriptureOrNote: 'Terima kasih telah menjadi tempat paling teduh bagi hatiku untuk pulang, Sayang.',
        image: '/images/natasha-closeup.jpg',
        imageAlt: 'Potret jarak dekat Natasha Rosaline dengan mawar merah',
      },
      {
        id: 'node-joyful-heart',
        starName: 'STELLA FIDELIS • III',
        coordinates: '10.08.2024 → SELAMANYA',
        title: 'Teman Setia di Lembah & Puncak',
        subtitle: 'Melewati Up & Down Bersama dalam Nama Tuhan Yesus',
        reflection:
          'Hidup tidak selalu berjalan di atas garis lurus yang mudah. Namun bersamamu, setiap lembah duka cita terasa lebih ringan karena doa-doamu, dan setiap puncak suka cita terasa dua kali lebih indah karena kita merayakannya di dalam Tuhan Yesus.',
        scriptureOrNote: '60% kupanggil "Boss", 40% kupanggil "Sayang", dan 100% kucintai seumur hidupku.',
        image: '/images/natasha-smile.jpg',
        imageAlt: 'Potret senyum hangat Natasha Rosaline',
      },
    ],
  },
  act5Adoration: {
    eyebrowEn: 'ACT V — THE LITTLE THINGS I LOVE ABOUT YOU',
    headlineEn: 'Why You Are Extraordinary to Me',
    subtitleId:
      'Babak ini bukan hanya tentang hubungan kita, melainkan perayaan atas siapa dirimu sebenarnya di mataku setiap hari.',
    qualities: [
      {
        id: 'spiritual-anchor',
        badge: '01 • SPIRITUALITAS',
        title: 'Hatimu yang Takut akan Tuhan',
        nicknameTag: 'Sayang',
        description:
          'Kamu adalah wanita yang sangat rohani—tidak pernah lelah berdoa dan rajin membaca Alkitab. Melihatmu berlutut mendoakan keluarga kita adalah pemandangan paling indah yang membuatku merasa sangat diberkati.',
        detailNote: 'Doa-doamu adalah penjaga tak terlihat bagi pernikahan kita.',
      },
      {
        id: 'independent-boss',
        badge: '02 • KEMANDIRIAN',
        title: 'Wanita Mandiri — My Favorite "Boss"',
        nicknameTag: 'Boss',
        description:
          'Ada alasan mengapa 60% waktu aku memanggilmu "Boss". Kamu mandiri, tegas dalam prinsip yang benar, bisa diandalkan, dan punya wibawa yang anggun—namun tetap penuh hormat dan kasih sebagai seorang istri.',
        detailNote: 'Tangguh di luar, begitu lembut dan hangat di dalam.',
      },
      {
        id: 'brilliant-mind',
        badge: '03 • KECERDASAN',
        title: 'Otak Cemerlang & Hati yang Rendah Hati',
        nicknameTag: 'Boss',
        description:
          'Dari pejuang OSN Matematika hingga lulusan Matematika UI, kecerdasanmu selalu membuatku kagum. Kamu mampu mengurai hal-hal rumit dengan pemikiran yang jernih dan bijaksana.',
        detailNote: 'Partner diskusi terbaik untuk segala keputusan hidup.',
      },
      {
        id: 'detail-order',
        badge: '04 • KETELITIAN',
        title: 'Begitu Detail, Rapi & Teratur',
        nicknameTag: 'Boss',
        description:
          'Kamu memperhatikan hal-hal kecil yang sering terlewatkan oleh orang lain. Kerapian dan ketelitianmu membuat setiap sudut kehidupan kita terasa tertata, tenang, dan nyaman.',
        detailNote: 'Sentuhan tanganmu selalu mengubah hal biasa menjadi istimewa.',
      },
      {
        id: 'family-love',
        badge: '05 • KETULUSAN KASIH',
        title: 'Kasih Sayang Tulus untuk Keluarga',
        nicknameTag: 'Sayang',
        description:
          'Cara kamu menyayangi keluarga dengan sepenuh hati, tanpa pamrih, dan penuh perhatian menunjukkan betapa murninya kasih Kristus yang hidup di dalam dirimu.',
        detailNote: 'Kebaikan hatimu membuat siapa pun di dekatmu merasa dihargai.',
      },
      {
        id: 'unwavering-loyalty',
        badge: '06 • KESETIAAN SEJATI',
        title: 'Setia di Segala Musim Kehidupan',
        nicknameTag: 'Sayang',
        description:
          'Kamu mau menemani setiap up and down hidupku—melewati lembah duka cita maupun suka cita bersama tanpa pernah melepaskan genggaman tangan dan iman kita kepada Tuhan Yesus.',
        detailNote: 'Hadiah terindah yang Tuhan percayakan dalam hidupku.',
      },
    ],
  },
  act6Letter: {
    eyebrowEn: 'ACT VI — THE LETTER I NEVER WANT YOU TO FORGET',
    headlineEn: 'From My Heart to Yours',
    salutation: 'To My Beloved Wife, My Boss, My Everything — Natasha Rosaline,',
    paragraphs: [
      'Selamat ulang tahun yang ke-29, Sayang. Selamat bertambah usia untuk wanita paling hebat yang Tuhan kirimkan ke dalam hidupku — my favorite Boss.',
      'Kalau aku menoleh ke belakang, rasanya selalu luar biasa melihat bagaimana Tuhan merangkai cerita kita. Dari masa-masa putih abu-abu di SMAN 4 Bekasi, berjuang memeras otak bersama di OSN Matematika, sampai duduk di bangku kuliah Jurusan Matematika UI dan akhirnya lulus bersama... bahkan sampai hari ini aku masih sering tersenyum sendiri kalau ingat momen konyol waktu aku lari-lari mengejar kelas karena terlambat, tersandung, dan malah menabrak kamu. Dari sekian banyak rumus rumit yang pernah kita pelajari, ternyata rumus terbaik dalam hidupku sederhana: setiap langkahku selalu berujung kepadamu.',
      'Boss, terima kasih karena sejak 10 Agustus 2024, kamu bukan hanya menjadi pasangan hidupku, tapi juga rumah tempatku pulang. Terima kasih karena kamu selalu mandiri, begitu detail dan rapi menjaga segala hal, begitu tulus menyayangi keluarga, dan yang paling membuatku kagum setiap hari: hatimu yang begitu takut akan Tuhan, yang tidak pernah lelah berdoa dan menyelami firman-Nya.',
      'Aku sangat bersyukur kepada Tuhan Yesus karena memiliki kamu. Terima kasih karena kamu mau menggenggam tanganku melewati setiap up and down kehidupan—tidak pernah meninggalkanku saat kita harus melewati lembah duka cita, dan selalu merayakan setiap suka cita bersama di dalam nama Tuhan Yesus.',
      'Di usia ke-29 ini, doaku untukmu sederhana namun sepenuh hati: kiranya Tuhan Yesus senantiasa melimpahkan kesehatan, damai sejahtera, dan sukacita yang melimpah atas hidupmu. Aku berjanji untuk terus mencintaimu, melindungimu, belajar menjadi suami yang lebih baik setiap harinya, dan berjalan bersamamu sampai akhir waktu.',
    ],
    scripture: {
      reference: 'Amsal 3 : 5 – 6',
      verseText:
        '“Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.”',
      reflectionNote:
        'Firman pegangan hidup kita: sehebat apa pun logika dan matematika yang kita pelajari, kita memilih untuk selalu bersandar penuh pada tuntunan Tuhan Yesus.',
    },
    closingGreeting: 'Happy 29th Birthday, Boss. I love you, selalu dan selamanya.',
    signatureName: 'Robert',
    signatureRole: 'Suamimu yang selalu mencintaimu — Robertus Agung Pradana',
  },
  act7Wish: {
    eyebrowEn: 'ACT VII — MAKE A WISH • 29 CANDLES OF GRACE',
    headlineEn: 'A Sacred Birthday Moment',
    guidanceSteps: [
      'Tarik napas perlahan, Sayang...',
      'Pejamkan matamu sejenak dan naikkan doa syukur serta harapanmu di usia ke-29 ini di dalam nama Tuhan Yesus.',
      'Saat kamu siap, sentuh nyala lilin emas di bawah ini (atau tiup lembut melalui mikrofon).',
    ],
    buttonPrompt: 'Sentuh Nyala Lilin untuk Make a Wish',
    micPromptOptional: 'Atau Aktifkan Tiupan Lilin (Mikrofon Opsional)',
    afterWishHeadline: 'Happy 29th Birthday, Natasha Rosaline!',
    afterWishBlessing:
      'Kiranya setiap doa yang baru saja kau bisikkan didengar oleh Tuhan Yesus, dan tahun ke-29 ini menjadi musim penuh berkat, kesehatan, damai sejahtera, serta kemuliaan Tuhan dalam hidupmu.',
  },
  act8Surprise: {
    eyebrowEn: 'ACT VIII — ONE LAST SURPRISE',
    headlineEn: 'The Covenant Capsule for Your 29th Year',
    envelopeLabel: 'SEALED FOR MY BOSS • 5 JANJI & DOA SUAMI',
    introText:
      'Sebelum perjalanan kecil ini selesai, ada satu kapsul janji pernikahan dan doa khusus yang kusimpan untuk menemanimu sepanjang usia ke-29 ini, Sayang.',
    promises: [
      {
        id: 'promise-1',
        numberRoman: 'I',
        title: 'Berdoa & Bersandar pada Tuhan Bersamamu',
        promise:
          'Aku berjanji untuk terus memegang tanganmu dalam doa, menjadikan Tuhan Yesus nakhoda utama rumah tangga kita sesuai Amsal 3:5–6 di setiap musim kehidupan.',
      },
      {
        id: 'promise-2',
        numberRoman: 'II',
        title: 'Menjadi Tempat Bersandar bagi "Boss"-ku',
        promise:
          'Sekalipun kamu wanita yang sangat mandiri dan tangguh, aku berjanji bahwa di dekatku kamu boleh beristirahat, melepas lelah, dan selalu merasa dijaga sepenuhnya.',
      },
      {
        id: 'promise-3',
        numberRoman: 'III',
        title: 'Setia di Lembah Maupun di Puncak',
        promise:
          'Sebagaimana kamu setia menemaniku melewati segala up and down, aku berjanji akan selalu berdiri di sampingmu dalam suka maupun duka, merayakan setiap kemenanganmu dan memelukmu di hari yang berat.',
      },
      {
        id: 'promise-4',
        numberRoman: 'IV',
        title: 'Menghargai Setiap Detail & Ketulusanmu',
        promise:
          'Aku berjanji untuk tidak pernah menganggap biasa setiap perhatian kecil, kerapian, doa, dan kasih sayang tulus yang kamu curahkan untuk keluarga kita setiap hari.',
      },
      {
        id: 'promise-5',
        numberRoman: 'V',
        title: 'Terus Membuatmu Tersenyum & Tertawa',
        promise:
          'Entah lewat kejutan manis atau kekonyolanku seperti waktu tersandung di kampus UI dulu, aku berjanji untuk terus menjaga tawa hangat di rumah kita sampai rambut kita memutih.',
      },
    ],
    specialPrayer:
      '“Tuhan Yesus yang baik, terima kasih untuk 29 tahun kehidupan istriku tercinta, Natasha Rosaline. Berkati kesehatannya, berkati setiap langkah dan kerinduannya, pelihara hatinya yang tulus dan takut akan Engkau, serta luruskanlah setiap jalan kami bersama. Di dalam nama Tuhan Yesus Kristus aku berdoa dan mengucap syukur. Amin.”',
  },
  act9Finale: {
    eyebrowEn: 'ACT IX — FOREVER, MY LOVE',
    closingLines: [
      'Dalam setiap kemungkinan semesta dan setiap rumus kehidupan...',
      'Aku akan tetap memilihmu, lagi dan lagi.',
      'Selamat Ulang Tahun ke-29, Natasha Rosaline.',
      'Forever your husband, forever loving my Boss & my Sayang.',
    ],
    finalTimestamp: '23 OKTOBER 2026 • ROBERT & NATASHA',
  },
};
