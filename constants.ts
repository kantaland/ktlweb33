
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
        title: "K.A.N.T.A: The Sonic Architect Defining Future Culture",
        outlet: "GQ Japan",
        date: "2024-02-10",
        url: "https://www.gqjapan.jp",
        snippet: "From the streets of Tokyo to the hills of Hollywood, K.A.N.T.A is rewriting the rules of independent artistry and brand collaboration.",
        imageUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p2',
        title: "Inside KANTALAND: The Digital Incubator",
        outlet: "HYPEBEAST",
        date: "2023-11-20",
        url: "https://hypebeast.com",
        snippet: "An exclusive look inside the invite-only digital ecosystem where music, fashion, and tech collide.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p3',
        title: "The Future of Sound Branding",
        outlet: "Forbes",
        date: "2023-09-05",
        url: "https://www.forbes.com",
        snippet: "How K.A.N.T.A is using frequency and vibration to engineer the emotional identity of global superbrands.",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p4',
        title: "K.A.N.T.A and Monheim Mic Channel Strip – Hollywood",
        outlet: "YouTube",
        date: "2023-08-19",
        url: "https://www.youtube.com/results?search_query=KANTA+Monheim+Mic+Channel+Strip",
        snippet: "Japanese producer and artist K.A.N.T.A, alongside his label KANTALAND, showcases the Monheim Mic Channel Strip in Hollywood, blending cutting-edge audio technology with creative vision.",
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p5',
        title: "Polaroid Launches Its First-Ever Music Player!",
        outlet: "ASCII",
        date: "2022-11-17",
        url: "https://ascii.jp",
        snippet: "At the venue, an offline music sales pop-up called \"Beat Leasing\" will also take place. The first release features an unreleased track by producer DJ DARUMA and K.A.N.T.A.",
        imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 'p6',
        title: "K.A.N.T.A: Urban Musician and Producer Spotlight",
        outlet: "Elektronauts",
        date: "2022-05-11",
        url: "https://elektronauts.com",
        snippet: "K.A.N.T.A is an urban musician and producer based in Tokyo. He releases albums, has a radio show on Rakuten FM and runs the Kantaland store in Shibuya, bringing the Elektron sound to life.",
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
