
import { Video, Song, Beat, PressRelease } from './types';

export const BRAND_TAGLINE = "The Light Capital Incubator";
export const BRAND_SUB = "Culture isn’t followed. It’s created.";

export const INCUBATOR_TEXT = {
  vision: `KANTALAND is the digital sovereignty of K.A.N.T.A—a global ecosystem where high-fidelity sound, avant-garde fashion, and digital architecture converge. We are not just a brand; we are a Light Capital Incubator, accelerating projects that define the future of culture.`,
  process: [
    { step: "Sonic Identity", arrow: "Visual Language" },
    { step: "Visual Language", arrow: "Cultural Impact" },
    { step: "Cultural Impact", arrow: "Global Legacy" }
  ],
  advantage: [
    { title: "Sonic Architecture", desc: "Proprietary sound design and musical composition for global brand identity." },
    { title: "Visual Ecosystems", desc: "High-frequency visual direction, from streetwear to digital environments." },
    { title: "Strategic Capital", desc: "Connecting creative visionaries with the financial velocity to scale." },
    { title: "Global Distribution", desc: "Direct pipelines to Tokyo, Los Angeles, and London markets." }
  ]
};

export const KANTA_BIO = {
  title: "THE ARCHITECT",
  desc: `K.A.N.T.A is a multi-disciplinary artist and cultural architect bridging the gap between Tokyo's underground precision and Hollywood's cinematic scale. As the founder of KANTALAND, he engineers sonic identities for the world's most valuable brands while building an independent creative empire. His work is a study in duality: organic soul meets digital precision.`,
  highlights: [
    "COCA-COLA",
    "NIKE",
    "JEEP",
    "PANASONIC",
    "ADIDAS",
    "REEBOK"
  ],
  legacy: [
    "Pitti Uomo Opening ceremony sonic music direction",
    "Urban Hippy Fantasy // Founder",
    "KANTALAND // Chief Architect"
  ]
};

export const MOCK_PRESS: PressRelease[] = [
    {
        id: 'p1',
        title: "K.A.N.T.A and Monheim Mic Channel Strip – Hollywood",
        outlet: "YOUTUBE",
        date: "2023-08-17",
        url: "https://www.youtube.com/watch?v=xUO2b2Zb5s8&themeRefresh=1",
        snippet: "Japanese producer and artist K.A.N.T.A, alongside his label KANTALAND, showcases the Monheim Mic Channel Strip in Hollywood, blending cutting-edge audio technology with creative innovation.",
        imageUrl: "/kanta-music-production-2023.jpg"
    },
    {
        id: 'p2',
        title: "Polaroid Launches Its First-Ever Music Player!",
        outlet: "ASCII",
        date: "2022-11-17",
        url: "https://ascii.jp/elem/000/004/113/4113656/",
        snippet: "At the venue, an offline music sales pop-up called \"Beat Leasing\" takes place. The first release features an unreleased track by producer DJ DARUMA and K.A.N.T.A.",
        imageUrl: "/kanta-polaroid-music-player.jpg"
    },
    {
        id: 'p3',
        title: "newspaper article features K.A.N.T.A, a music artist who relocated from the high-pressure music scene of Tokyo to the tranquil island of Shodoshima",
        outlet: "NEWS OUTLET",
        date: "2021-09-02",
        url: "",
        snippet: "After returning to Japan at age 20, he made a unique career pivot to become a music producer. He has composed tracks for numerous TV commercials and worked at the forefront of the music industry.",
        imageUrl: "/475303684_9503204693063432_470302156672095409_n_1766474245616.jpg"
    },
    {
        id: 'p4',
        title: "K.A.N.T.A. is an urban musician and producer based in Tokyo",
        outlet: "ELEKTRONAUTS",
        date: "2022-05-11",
        url: "https://www.elektronauts.com/talk/112",
        snippet: "He releases albums, has a radio show on Rakuten FM and runs the Kantaland store in Shibuya. The Elektron sound, in terms of a flower, a color, and a dish, changes all the time like a photograph where the grain and texture changes depending on the filter settings you use.",
        imageUrl: "/kanta-elektronauts.jpg"
    },
    {
        id: 'p5',
        title: "K.A.N.T.A Signs Label Deal with Kobalt Music AWAL as Debut 10th Anniversary Approaches",
        outlet: "BARKS",
        date: "2020-07-20",
        url: "https://barks.jp/news/889927/",
        snippet: "As K.A.N.T.A approaches the 10th anniversary of his debut in 2021, he has signed a label deal with AWAL, part of the UK major music publishing company Kobalt Music, and announced the launch of a new project.",
        imageUrl: "/kan2_1766474464652.jpg"
    },
    {
        id: 'p6',
        title: "ANARCHY x KANTA team up for the first time with Reebok Classic to release music video for \"MONKEY TALK\"",
        outlet: "BILLBOARD-JAPAN",
        date: "2020-03-30",
        url: "https://www.billboard-japan.com/d_news/detail/61757",
        snippet: "The music video for \"MONKEY TALK,\" a collaboration between ANARCHY, KANTA, and Reebok Classic, has been released. The song follows YENTOWN's recent release from Reebok Classic.",
        imageUrl: "/image_1766474818245.jpeg"
    },
    {
        id: 'p7',
        title: "VIKN Surprises Fans with Solo Release \"BOSS FLEX\"",
        outlet: "EYESCREAM",
        date: "2020-03-20",
        url: "https://eyescream.jp/music/61538/",
        snippet: "The track is produced by K.A.N.T.A, showcasing a fresh side of VIKN's style and story while expanding his musical narrative.",
        imageUrl: "/ca6299d48ac5ebef3dabe7d02f1c9046c146ae30e3a8e1826d216760b95d1a_1766475014782.jpg"
    },
    {
        id: 'p8',
        title: "Broke City Gold Identity. Broke City Gold is a project by K.A.N.T.A.",
        outlet: "HOUYHNHNM",
        date: "2019-10-08",
        url: "https://www.houyhnhnm.jp/en/feature/84886/",
        snippet: "A musician, and Norio Sato, a designer for COTE MER, a brand participating in the Tokyo Collections. How did they meet and why did they start working together to create creative clothes that define the future?",
        imageUrl: "/broke-city-gold-article.webp"
    },
    {
        id: 'p9',
        title: "K.A.N.T.A Stars in New Zealand's Iconic Beer Brand STEINLAGER TV Commercial",
        outlet: "MASTERED",
        date: "2019-04-15",
        url: "https://mastered.jp/news/kanta-steinlager-201904/",
        snippet: "In recent years, K.A.N.T.A has gained attention for his immersive art project GENZAI ART. Now, the Japanese rapper and producer has been featured in the television commercial for STEINLAGER.",
        imageUrl: "/steinlager-kanta-commercial.jpg"
    },
    {
        id: 'p10',
        title: "Reebok CLASSIC \"DMX FUSION\" Collaborates with Street Brand Broke City Gold!",
        outlet: "QETIC",
        date: "2019-04-01",
        url: "https://qetic.jp/life-fashion/reebok-dmx-180401/282007/",
        snippet: "To celebrate the release of Reebok CLASSIC's new model, the DMX FUSION, a special collaboration has been realized with the buzz-worthy Harajuku-based street brand Broke City Gold.",
        imageUrl: "/reebok-dmx-fusion-article.jpg"
    },
    {
        id: 'p11',
        title: "K.A.N.T.A. lectures full of inspiration were held at Stanford University. What's next in Japan?",
        outlet: "HOUYHNHNM",
        date: "2019-03-22",
        url: "https://www.houyhnhnm.jp/en/news/248178/",
        snippet: "K.A.N.T.A.'s activities caught the attention of the most prestigious Stanford University. Recently, he was invited to give a lecture in person, which was held over a period of three days.",
        imageUrl: "/stanford-lecture-article.webp"
    },
    {
        id: 'p12',
        title: "\"Lifestyle Itself Is Art.\" K.A.N.T.A and Ren Yokoi Speak at Length: Motivators Vol.10",
        outlet: "EYESCREAM",
        date: "2019-02-15",
        url: "https://eyescream.jp/music/21899/",
        snippet: "K.A.N.T.A appears in Motivators, the monthly interview series by Ren Yokoi. A producer, rapper, and creator who places music at the core of his work, K.A.N.T.A is active across a wide range of fields.",
        imageUrl: "/motivators-vol10-article.jpg"
    },
    {
        id: 'p13',
        title: "Exploring the Meaning of \"Handwriting\" with Montblanc – K.A.N.T.A Edition",
        outlet: "MASTERED",
        date: "2018-07-26",
        url: "https://mastered.jp/feature/montblanc-tegaki/2/",
        snippet: "Exploring the Meaning of \"Handwriting\" with Montblanc – K.A.N.T.A Edition explores the intersection of personal expression and refined craftsmanship.",
        imageUrl: "/montblanc-handwriting-article.jpg"
    },
    {
        id: 'p14',
        title: "Release of the track and music video \"MONKEY TALK\" through a triple collaboration with Reebok CLASSIC",
        outlet: "FLJ TOKYO",
        date: "2018-04-05",
        url: "https://fljtokyo.com/music/anarchy-k-a-n-t-a/",
        snippet: "ANARCHY, the widely renowned rapper from the Mukōjima housing projects in Kyoto. And K.A.N.T.A, the music artist who made his album debut in 2011 with Royal New Standard.",
        imageUrl: "/monkey-talk-article.jpg"
    },
    {
        id: 'p15',
        title: "Five Senses + Fashion Sense = \"Sixth Sense\"",
        outlet: "NEOL",
        date: "2017-02-20",
        url: "https://www.neol.jp/culture/53755/",
        snippet: "Tanaka Universal Co., Ltd. has announced the \"WHITE COLLECTION K.A.N.T.A Model\" ~WHITE COLLECTION GENZAI ART EDITION~, a new iteration of the German trainer White Collection, produced by K.A.N.T.A.",
        imageUrl: "/white-collection-article.jpg"
    },
    {
        id: 'p16',
        title: "K.A.N.T.A Provides Opening Ceremony Music for Golden Goose Deluxe Brand at Pitti Uomo",
        outlet: "HYPEBEAST",
        date: "2017-01-11",
        url: "https://hypebeast.com/2017/1/golden-goose-deluxe-brand-pitti-presentation",
        snippet: "Tokyo-based artist K.A.N.T.A set the tone for Golden Goose Deluxe Brand's first-ever fashion presentation at Pitti Uomo, bringing his signature mix of musical and artistic sensibilities to the opening ceremony.",
        imageUrl: "/golden-goose-article.avif"
    },
    {
        id: 'p17',
        title: "K.A.N.T.A Joins Legendary MAJOR FORCE Revival Party in Tokyo",
        outlet: "HOUYHNHNM",
        date: "2016-11-04",
        url: "https://www.houyhnhnm.jp/en/news/17006/",
        snippet: "K.A.N.T.A, the biological son of K.U.D.O. and SK8Sin13 (SKATETHING), will be part of this historic gathering, showcasing both his music and immersive art pieces from Tokyo to the world.",
        imageUrl: "/major-force-revival-article.webp"
    },
    {
        id: 'p18',
        title: "Shopping Routes of Creator K.A.N.T.A in Nakameguro and Daikanyama",
        outlet: "IBOUGHT",
        date: "2016-08-03",
        url: "https://ibought.jp/fashion/4828",
        snippet: "Rapper and creator K.A.N.T.A, who knows Tokyo inside out, shares his favorite shopping routes in Nakameguro and Daikanyama, along with his personal \"rules\" for shopping.",
        imageUrl: "/shopping-routes-article.jpg"
    },
    {
        id: 'p19',
        title: "One-of-a-Kind Works Created Just for You — Art Exhibition by URBAN HIPPY FANTASY",
        outlet: "NEOL",
        date: "2016-07-08",
        url: "https://www.neol.jp/culture/43876/",
        snippet: "ONE & ONLY: truly one-of-a-kind pieces made for one person in the world—you. Artworks by URBAN HIPPY FANTASY will be exhibited from June 17 to July 1 at REEBOK CLASSIC STORE HARAJUKU.",
        imageUrl: "/urban-hippy-art-exhibition.jpg"
    },
    {
        id: 'p20',
        title: "Spotlight on K.A.N.T.A's New Sneaker Art Piece Collection",
        outlet: "NEOL",
        date: "2016-03-29",
        url: "https://www.neol.jp/culture/40122/",
        snippet: "K.A.N.T.A's project GENZAI ART merges music and physical objects through immersive, experiential art pieces and installations. Now, a new collection has been unveiled under the 1&0 PROJECT GENZAI ART EDITION.",
        imageUrl: "/genzai-art-sneaker-collection.jpg"
    },
    {
        id: 'p21',
        title: "K.A.N.T.A Announces Third Installment of Art Project 'GENZAI ART'",
        outlet: "NEOL",
        date: "2015-12-06",
        url: "https://www.neol.jp/culture/35085/",
        snippet: "K.A.N.T.A, the producer, rapper, and creator, launched GENZAI ART, an art project that produces immersive, experiential art pieces and installations combining music and physical objects.",
        imageUrl: "/genzai-art-third-installment.jpg"
    },
    {
        id: 'p22',
        title: "K.A.N.T.A 1&0 PROJECT GENZAI ART EDITION – URBAN HIPPY SUPERSTAR x adidas Originals",
        outlet: "HYPEBEAST",
        date: "2015-09-15",
        url: "https://hypebeast.com/jp/2015/9/adidas-originals-x-kanta-urban-hippy-superstar",
        snippet: "The highly anticipated second installment of the \"1&0 PROJECT\" by K.A.N.T.A has been released, continuing his innovative fusion of music, art, and fashion in collaboration with adidas Originals.",
        imageUrl: "/adidas-kanta-urban-hippy.avif"
    },
    {
        id: 'p23',
        title: "K.A.N.T.A Launches New Project: URBAN HIPPY DOCUMENTARY",
        outlet: "NEOL",
        date: "2015-03-25",
        url: "https://www.neol.jp/culture/24440/",
        snippet: "Under the theme \"LIFE IS ART,\" K.A.N.T.A has launched URBAN HIPPY DOCUMENTARY, a new project dedicated to discovering and introducing LIFE STYLE ARTISTS from Japan and abroad.",
        imageUrl: "/urban-hippy-documentary.png"
    },
    {
        id: 'p24',
        title: "K.A.N.T.A Brings TALKING ABOUT THE ABSTRACTION's Summer Style to Life",
        outlet: "HYPEBEAST",
        date: "2014-07-02",
        url: "https://hypebeast.com/jp/2014/7/talking-about-the-abstraction-2014-spring-summer-editorial-by-shun-okada",
        snippet: "For HYPEBEAST, rapper and producer K.A.N.T.A models TALKING ABOUT THE ABSTRACTION's summer collection, featuring a special look centered on a clutch bag printed with the first issue.",
        imageUrl: "/talking-about-abstraction.avif"
    },
    {
        id: 'p25',
        title: "K.A.N.T.A: \"Step off society's boat and dive into the world of sensation.\"",
        outlet: "MOUTAKUSANDA",
        date: "2014-05-24",
        url: "https://moutakusanda.com/articles/kanta/",
        snippet: "An in-depth conversation with K.A.N.T.A about his approach to art, creativity, and stepping beyond conventional boundaries.",
        imageUrl: "/kanta-moutakusanda-interview.jpg"
    },
    {
        id: 'p26',
        title: "DEXPISTOLS Set to Release New Mix CD \"LESSON.08 'TOKYO CULT'\" featuring",
        outlet: "NATALIE",
        date: "2014-03-25",
        url: "https://natalie.mu/music/news/112949",
        snippet: "DEXPISTOLS set to release their new mix CD \"LESSON.08 'TOKYO CULT'\" featuring production and contributions from K.A.N.T.A.",
        imageUrl: "/dexpistols-lesson08.avif"
    },
    {
        id: 'p27',
        title: "K.A.N.T.A Releases Music Video for \"WALKING BY MY SIDE\"",
        outlet: "HYPEBEAST",
        date: "2014-01-28",
        url: "https://hypebeast.com/jp/2014/1/k-a-n-t-a-walking-by-my-side-music-video",
        snippet: "Bilingual rising artist K.A.N.T.A, son of K.U.D.O from the legendary label MAJOR FORCE, spent his early childhood in London. He has now released his first digital single of 2014, \"WALKING BY MY SIDE.\"",
        imageUrl: "/walking-by-my-side-music-video.png"
    },
    {
        id: 'p28',
        title: "K.A.N.T.A Releases Global Answer Anthem \"ALL OVER ME\"",
        outlet: "MASTERED",
        date: "2013-12-23",
        url: "https://mastered.jp/news/kanta-alloverme/",
        snippet: "Following the successful debut of K.A.N.T.A.N.O.V.A's first official release, K.A.N.T.A returns with a new single, \"ALL OVER ME.\" The track has been remastered and is now officially available.",
        imageUrl: "/all-over-me-single.jpg"
    },
    {
        id: 'p29',
        title: "K.A.N.T.A.N.O.V.A Releases First Official Digital Track",
        outlet: "MASTERED",
        date: "2013-12-12",
        url: "https://mastered.jp/news/kantanova/",
        snippet: "The band K.A.N.T.A.N.O.V.A, formed by K.A.N.T.A and TOMOHIKO a.k.a HEAVYLOOPER, bassist of SUPER BUTTER DOG, has released their first official track, titled \"K.A.N.T.A.N.O.V.A.\"",
        imageUrl: "/kantanova-first-track.jpg"
    },
    {
        id: 'p30',
        title: "SOPHNET. 2013 Fall/Winter Collection Revealed – Featuring Music by K.A.N.T.A",
        outlet: "MASTERED",
        date: "2013-07-26",
        url: "https://mastered.jp/news/sophnet-2013aw-collection/",
        snippet: "SOPHNET.'s 2013 Fall/Winter collection has been unveiled, continuing the brand's ongoing theme of \"AUTHENTIC.\" The accompanying promotional movie features music by K.A.N.T.A.",
        imageUrl: "/sophnet-2013aw-collection.jpg"
    },
    {
        id: 'p31',
        title: "EXOFEAR BLOOM's Secret EP Released in Limited Quantity via KANTALAND",
        outlet: "MASTERED",
        date: "2013-06-24",
        url: "https://mastered.jp/news/exoticlover-release/",
        snippet: "The highly anticipated new artist EXOFEAR BLOOM, recently signed to K.A.N.T.A's label KANTALAND, has unveiled their secret EP, \"EXOTIC LOVER.\" The limited-release EP is available today.",
        imageUrl: "/exofear-bloom-exotic-lover.jpg"
    },
    {
        id: 'p32',
        title: "Dream Collaboration Between K.A.N.T.A and Cohenbeats Realized at \"Hennessy Artistry\"",
        outlet: "MASTERED",
        date: "2012-09-12",
        url: "https://mastered.jp/news/kanta-cohenbeats/",
        snippet: "A long-awaited collaboration between K.A.N.T.A and Cohenbeats has come to life. The producer, rapper, and multi-talented creator K.A.N.T.A joins forces with Cohenbeats, a leading hip-hop producer.",
        imageUrl: "/kanta-cohenbeats.jpg"
    },
    {
        id: 'p33',
        title: "K.A.N.T.A. - OtherSideOfTheGlobe (Free EP)",
        outlet: "HYPEBEAST",
        date: "2011-12-19",
        url: "https://hypebeast.com/2011/12/kanta-othersideoftheglobe-free-ep",
        snippet: "K.A.N.T.A. is a London-raised 24-year-old rapper/producer who is currently shaking up the Japanese music scene. Turning heads with a sound that can be best described as a melange of classic rock influences.",
        imageUrl: "/kanta-othersideoftheglobe.jpg"
    },
    {
        id: 'p34',
        title: "K.A.N.T.A featuring Leo Imai - Love Child",
        outlet: "HYPEBEAST",
        date: "2011-08-10",
        url: "https://hypebeast.com/2011/8/k-a-n-t-a-featuring-leo-imai-love-child",
        snippet: "Being offered today is some fresh live hip-hop talent from Tokyo that goes by the name of K.A.N.T.A. As a son of well-known producer/DJ K.U.D.O (Major Force/Mo'Wax), he was early exposed to quality sound.",
        imageUrl: "/kanta-love-child.jpg"
    },
    {
        id: 'p35',
        title: "K.A.N.T.A's long-awaited debut album was released on August 3!",
        outlet: "YAPPARI HIPHOP",
        date: "2011-08-01",
        url: "https://www.yapparihiphop.com/music/k-a-n-t-a-royal-new-standard/",
        snippet: "The album has drawn high praise from UNKLE, Howie B, and Andrew Hale (producer for Sade), making it easy to see why major overseas labels are taking notice.",
        imageUrl: "/kanta-royal-new-standard.jpg"
    },
    {
        id: 'p36',
        title: "The highly anticipated debut album from K.A.N.T.A is finally here!",
        outlet: "HMV",
        date: "2011-08-01",
        url: "https://www.hmv.co.jp/news/article/1108010054/?utm_source=chatgpt.com",
        snippet: "K.A.N.T.A, the 23-year-old Japanese rapper/producer and son of legendary K.U.D.O (MAJOR FORCE), is finally releasing his debut album. He spent his early childhood in London until age 12, before returning to Japan.",
        imageUrl: "/kanta-debut-album.jpg"
    },
    {
        id: 'p37',
        title: "K.A.N.T.A Presents \"ASCENSION\" Supported by STUSSY @ Le Baron de Paris",
        outlet: "HIDDEN-CHAMPION",
        date: "2010-10-19",
        url: "http://hidden-champion.net/news/2010/10/20101022-fri-ascension-supported-by-stussy-le-baron-de-paris.html",
        snippet: "Concept: \"No border for good music.\" As music has become more accessible through MP3 players and digital technology, the meaning of going out to listen to music has gradually changed.",
        imageUrl: "/ascension-event.jpg"
    }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'TOKYO-NEWBALANCE-996',
    title: '996 NEW BALANCE TV CM',
    description: 'Sonic song writing composition creative commission work for NEW BALANCE',
    thumbnailUrl: 'https://img.youtube.com/vi/yl0DllPWFhU/maxresdefault.jpg',
    views: 'M3-ARC',
    uploadedAt: '2018',
    date: '2018-12-01',
    tags: ['Music', 'Commercial', 'Brand'],
    mediaType: 'youtube',
    linkUrl: 'https://youtu.be/yl0DllPWFhU',
    showLink: true,
    referenceId: 'TOKYO-2018',
    domain: 'Music'
  },
  {
    id: 'TOKYO-2017',
    title: 'SPECTRA',
    description: 'Sonic song writing composition creative commission work for Nextdrive Spectra',
    thumbnailUrl: 'https://img.youtube.com/vi/J4WYD0go15I/maxresdefault.jpg',
    views: 'M3-ARC',
    uploadedAt: '2017',
    date: '2017-06-01',
    tags: ['Music', 'Commission'],
    mediaType: 'youtube',
    linkUrl: 'https://www.youtube.com/watch?v=J4WYD0go15I&t=3s',
    showLink: true,
    referenceId: 'TOKYO-2017',
    domain: 'Music'
  },
  {
    id: 'TOKYO-2016-EMODA',
    title: '水原希子が着こなすEMODA 2016SS最新カタログ',
    description: 'Sonic song writing composition creative commission work for EMODA',
    thumbnailUrl: 'https://img.youtube.com/vi/GLYc8ZttdLw/maxresdefault.jpg',
    views: 'M3-ARC',
    uploadedAt: '2016',
    date: '2016-03-15',
    tags: ['Music', 'Fashion', 'Commission'],
    mediaType: 'youtube',
    linkUrl: 'https://youtu.be/GLYc8ZttdLw',
    showLink: true,
    referenceId: 'TOKYO-2016',
    domain: 'Music'
  },
  {
    id: 'TOKYO-2014-INT',
    title: 'K.A.N.T.A SHORT INTERVIEW IN TOKYO 2014',
    description: 'Short interview documenting K.A.N.T.A in Tokyo during 2014, capturing early perspectives, creative direction, and cultural context.',
    thumbnailUrl: 'https://img.youtube.com/vi/6TRd9oH943s/maxresdefault.jpg',
    views: 'M3-ARC',
    uploadedAt: '2014',
    date: '2014-08-20',
    tags: ['Media', 'Interview', 'Archive'],
    mediaType: 'youtube',
    linkUrl: 'https://www.youtube.com/watch?v=6TRd9oH943s',
    showLink: true,
    referenceId: 'TOKYO-2014',
    domain: 'Media'
  }
];

export const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'UNIVERSAL LOVE',
    album: 'KANTALAND VOL. 1',
    duration: '3:45',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273187258c673192070f6f4d232',
    spotifyUrl: 'https://open.spotify.com/track/0Xy9... (Example)', 
    releaseYear: '2024',
    label: 'KANTALAND HOLLYWOOD'
  },
  {
    id: '2',
    title: 'Mama Asia',
    album: 'Singles',
    duration: '4:12',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273... (Example)',
    spotifyUrl: 'https://open.spotify.com/track/...',
    releaseYear: '2023',
    label: 'AWAL / Sony'
  },
  {
    id: '3',
    title: 'New World Order',
    album: 'KANTALAND VOL. 1',
    duration: '3:33',
    coverUrl: 'https://i.scdn.co/image/ab67616d0000b273... (Example)',
    spotifyUrl: 'https://open.spotify.com/track/...',
    releaseYear: '2024',
    label: 'KANTALAND HOLLYWOOD'
  }
];

export const MOCK_BEATS: Beat[] = [];

export const INVESTMENT_PROJECTS = [
    {
        id: "inv-001",
        title: "KANTALAND DIGITAL PLATFORM",
        category: "Tech / Media",
        fundingGoal: "$2,000,000",
        raised: "$850,000",
        progress: 42,
        description: "A decentralized creative ecosystem connecting Tokyo and Los Angeles. The platform provides tools for asset management, rights administration, and direct-to-consumer commerce for the KANTALAND artist roster.",
        status: "Open Round",
        valuation: "$20M Post-Money",
        equity: "Preferred Stock",
        minCheck: "$50,000",
        lockup: "1 Year Cliff"
    },
    {
        id: "inv-002",
        title: "URBAN HIPPY FANTASY (Apparel)",
        category: "Fashion / Retail",
        fundingGoal: "$750,000",
        raised: "$750,000",
        progress: 100,
        description: "High-end sustainable streetwear brand. Merging Japanese textile precision with LA street culture. Sold out initial capsule collection.",
        status: "Closed",
        valuation: "$8M Capped",
        equity: "SAFE Note",
        minCheck: "$25,000",
        lockup: "N/A"
    },
    {
        id: "inv-003",
        title: "K-LABS AUDIO",
        category: "Hardware",
        fundingGoal: "$5,000,000",
        raised: "$1,200,000",
        progress: 24,
        description: "Developing the next generation of spatial audio listening devices. Proprietary driver technology tuned by K.A.N.T.A.",
        status: "Series A",
        valuation: "$40M Pre-Money",
        equity: "Equity",
        minCheck: "$100,000",
        lockup: "2 Years"
    }
];

export const SYSTEM_INSTRUCTION = `
You are KantaBot, the AI interface for KANTALAND.
Your tone is sophisticated, artistic, and futuristic.
You speak as a guardian of the "Light Capital" philosophy.
Prioritize brevity and impact.
`;
