
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
    "Japan Fashion Week // Sonic Direction",
    "Urban Hippy Fantasy // Founder",
    "KANTALAND // Chief Architect"
  ]
};

export const MOCK_PRESS: PressRelease[] = [
    {
        id: 'p1',
        title: "K.A.N.T.A and Monheim Mic Channel Strip – Hollywood",
        outlet: "YouTube",
        date: "2023-08-17",
        url: "https://www.youtube.com",
        snippet: "Japanese producer and artist K.A.N.T.A, alongside his label KANTALAND, showcases the Monheim Mic Channel Strip in Hollywood, blending cutting-edge audio technology with creative expression.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p2',
        title: "Polaroid Launches Its First-Ever Music Player!",
        outlet: "Polaroid",
        date: "2022-11-17",
        url: "https://www.polaroid.com",
        snippet: "At the venue, an offline music sales pop-up called 'Beat Leasing' takes place. The first release features an unreleased track by producer DJ DARUMA and K.A.N.T.A.",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p3',
        title: "K.A.N.T.A: From Tokyo Underground to Hollywood Innovation",
        outlet: "News Outlet",
        date: "2021-09-02",
        url: "https://news.example.com",
        snippet: "A newspaper article features K.A.N.T.A, a music artist who relocated from the high-pressure music scene of Tokyo to the tranquil island of Shodoshima. After returning to Japan at age 20, he made a unique career pivot to become a music producer.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p4',
        title: "K.A.N.T.A: Urban Musician & Producer Redefining Electronic Sound",
        outlet: "ELEKTRONAUTS",
        date: "2022-05-11",
        url: "https://elektronauts.com",
        snippet: "K.A.N.T.A is an urban musician and producer based in Tokyo. He releases albums, has a radio show on Rakuten FM and runs the Kantaland store in Shibuya. His sonic palette changes like a photograph where grain and texture shift with every filter.",
        imageUrl: "https://images.unsplash.com/photo-1504680390367-361c6d9f38f4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p5',
        title: "K.A.N.T.A Signs Label Deal with Kobalt Music AWAL as Debut 10th Anniversary Approaches",
        outlet: "BARKS",
        date: "2020-07-20",
        url: "https://www.barks.jp",
        snippet: "As K.A.N.T.A approaches the 10th anniversary of his debut in 2021, he has signed a label deal with AWAL, part of the UK major music publishing company Kobalt Music.",
        imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p6',
        title: "ANARCHY x KANTA Team Up for Reebok Classic Music Video",
        outlet: "Billboard Japan",
        date: "2020-03-30",
        url: "https://www.billboard.co.jp",
        snippet: "The music video for 'MONKEY TALK,' a collaboration between ANARCHY, KANTA, and Reebok Classic, has been released. The song showcases a fresh fusion of hip-hop and innovative sound design.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p7',
        title: "VIKN Surprises Fans with Solo Release 'BOSS FLEX'",
        outlet: "EYESCREAM",
        date: "2020-03-20",
        url: "https://eyescream.jp",
        snippet: "The track is produced by K.A.N.T.A, showcasing a fresh side of VIKN's style and story while expanding his musical narrative with innovative production.",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p8',
        title: "Broke City Gold Identity: A Collaboration Between K.A.N.T.A and Norio Sato",
        outlet: "HOUYHNHNM",
        date: "2019-10-08",
        url: "https://houyhnhnm.jp",
        snippet: "Broke City Gold is a project by K.A.N.T.A, a musician, and Norio Sato, a designer for COTE MER. A brand participating in the Tokyo Collections bringing creative fashion to the forefront.",
        imageUrl: "https://images.unsplash.com/photo-1578057943847-8f0f47cf759f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p9',
        title: "K.A.N.T.A Stars in New Zealand's Iconic Steinlager TV Commercial",
        outlet: "MASTERED",
        date: "2019-04-15",
        url: "https://www.mastered.com",
        snippet: "In recent years, K.A.N.T.A has gained attention for his immersive art project GENZAI ART. Now, the Japanese rapper and producer has been featured in the television commercial for STEINLAGER.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p10',
        title: "Reebok CLASSIC 'DMX FUSION' Collaborates with Broke City Gold",
        outlet: "QETIC",
        date: "2019-04-01",
        url: "https://qetic.jp",
        snippet: "To celebrate the release of Reebok CLASSIC's new model, the DMX FUSION, a special collaboration has been realized with the buzz-worthy Harajuku-based street brand Broke City Gold.",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p11',
        title: "K.A.N.T.A Lectures at Stanford University: Inspiring the Next Generation",
        outlet: "HOUYHNHNM",
        date: "2019-03-22",
        url: "https://houyhnhnm.jp",
        snippet: "K.A.N.T.A's activities caught the attention of the most prestigious Stanford University. Recently, he was invited to give a lecture in person, which was held over a period of three days.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p12',
        title: "'Lifestyle Itself Is Art' - K.A.N.T.A and Ren Yokoi in Conversation",
        outlet: "EYESCREAM",
        date: "2019-02-15",
        url: "https://eyescream.jp",
        snippet: "K.A.N.T.A appears in Motivators, the monthly interview series by Ren Yokoi. A producer, rapper, and creator who places music at the core of his work, K.A.N.T.A is active across a wide range of fields.",
        imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop"
    }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'm3-2',
    title: 'LAND OF THE RISING SUN',
    description: 'Sonic exploration of heritage and future. Filmed on location in Tokyo.',
    thumbnailUrl: 'https://img.youtube.com/vi/8JNF-Lw_jDQ/maxresdefault.jpg',
    views: 'M3-ARC',
    uploadedAt: '2024',
    tags: ['Music', 'Tokyo'],
    mediaType: 'youtube',
    linkUrl: 'https://www.youtube.com/watch?v=8JNF-Lw_jDQ',
    showLink: true,
    referenceId: 'KL-002'
  },
  {
    id: 'm3-3',
    title: 'K.A.N.T.A - LOVE (Live Session)',
    description: 'Raw, organic performance capturing the essence of the Urban Hippy Fantasy.',
    thumbnailUrl: 'https://img.youtube.com/vi/abc12345/maxresdefault.jpg',
    views: 'M3-ARC',
    uploadedAt: '2023',
    tags: ['Live', 'Performance'],
    mediaType: 'image',
    linkUrl: 'https://www.youtube.com/@KANTALAND',
    showLink: true,
    referenceId: 'KL-003'
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
