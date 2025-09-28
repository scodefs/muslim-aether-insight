export interface Speaker {
  id: string;
  name: string;
  image: string;
  videoCount: number;
  transcriptionCount: number;
  playlistCount: number;
  bio: string;
  videos: Video[];
  playlists: Playlist[];
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  views: string;
  transcript: string;
  publishedAt: string;
}

export interface Playlist {
  id: string;
  title: string;
  videoCount: number;
  thumbnail: string;
  description: string;
}

export const dummySpeakers: Speaker[] = [
  {
    id: "1",
    name: "Sheikh Omar Suleiman",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    videoCount: 450,
    transcriptionCount: 420,
    playlistCount: 25,
    bio: "Islamic scholar, civil rights leader, and founder of the Yaqeen Institute for Islamic Research.",
    videos: [
      {
        id: "v1",
        title: "The Purpose of Life - Islamic Perspective",
        youtubeId: "dQw4w9WgXcQ",
        duration: "45:32",
        views: "2.1M",
        publishedAt: "2024-01-15",
        transcript: `Assalamu alaikum wa rahmatullahi wa barakatuh. In today's discussion, we explore the fundamental question that has puzzled humanity for centuries: What is the purpose of life? 

From an Islamic perspective, the purpose of life is beautifully summarized in the Quran: "And I did not create the jinn and mankind except to worship Me." (Quran 51:56)

This worship is not merely ritualistic, but encompasses a comprehensive way of living that includes justice, compassion, and service to others. When we understand our role as khalifa (stewards) on Earth, we begin to see how every action can become an act of worship.

The Prophet Muhammad (peace be upon him) taught us that even a smile can be charity, showing us that worship extends far beyond the mosque walls into every aspect of our daily lives.

Consider the balance Islam teaches us - we are neither purely spiritual beings nor purely material ones, but a unique combination of both, tasked with achieving success in this world while preparing for the next.`
      },
      {
        id: "v2", 
        title: "Finding Peace in Difficult Times",
        youtubeId: "dQw4w9WgXcQ",
        duration: "32:18",
        views: "1.8M",
        publishedAt: "2024-02-20",
        transcript: `Bismillah. Life presents us with challenges that can shake our faith and test our resolve. But Allah tells us in the Quran: "And it is He who sends down rain after they have despaired and spreads His mercy." (Quran 42:28)

This verse reminds us that relief comes after hardship, and mercy follows despair. The key is maintaining our connection with Allah during these difficult moments.

The Prophet (peace be upon him) faced incredible hardships - the loss of loved ones, persecution, and moments of seeming defeat. Yet he taught us that these trials are not punishments, but opportunities for growth and purification.

When we feel overwhelmed, we must remember that Allah does not burden a soul beyond what it can bear. Every test is calibrated to our capacity, and with every difficulty comes ease - not after it, but alongside it.

Prayer, dhikr, and connection with our community become our anchors in storms. The believer is like a tree with deep roots - the stronger the wind, the deeper the roots grow.`
      }
    ],
    playlists: [
      {
        id: "p1",
        title: "Ramadan Reflections 2024",
        videoCount: 30,
        thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=300&h=200&fit=crop",
        description: "Daily reflections and spiritual guidance for the blessed month of Ramadan"
      },
      {
        id: "p2",
        title: "Prophetic Character Series",
        videoCount: 15,
        thumbnail: "https://images.unsplash.com/photo-1584463613834-67c5324bb835?w=300&h=200&fit=crop",
        description: "Exploring the beautiful character traits of Prophet Muhammad (PBUH)"
      }
    ]
  },
  {
    id: "2",
    name: "Dr. Yasir Qadhi",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    videoCount: 380,
    transcriptionCount: 350,
    playlistCount: 18,
    bio: "Islamic theologian, professor, and Dean of Academic Affairs at the Islamic Seminary of America.",
    videos: [
      {
        id: "v3",
        title: "Understanding Islamic History",
        youtubeId: "dQw4w9WgXcQ", 
        duration: "58:47",
        views: "1.5M",
        publishedAt: "2024-01-22",
        transcript: `Assalamu alaikum. Today we embark on a journey through Islamic history, understanding how our faith spread and evolved while maintaining its core principles.

The early Muslim community faced unprecedented challenges. Within a century, Islam had spread from Spain to China, not through force as often misrepresented, but through trade, scholarship, and the exemplary character of Muslims.

The Golden Age of Islam, from the 8th to 13th centuries, saw Muslims at the forefront of science, medicine, philosophy, and mathematics. Baghdad's House of Wisdom became a beacon of learning for the entire world.

Understanding our history helps us appreciate the cyclical nature of civilizations and reminds us that periods of decline are followed by renewal, just as Allah promises in the Quran.

We must study history not with pride that leads to arrogance, but with gratitude that inspires us to contribute positively to human civilization in our own time.`
      }
    ],
    playlists: [
      {
        id: "p3",
        title: "Seerah Series",
        videoCount: 45,
        thumbnail: "https://images.unsplash.com/photo-1518109268768-b7ec5ff78e2d?w=300&h=200&fit=crop",
        description: "Comprehensive biography of Prophet Muhammad (PBUH)"
      }
    ]
  },
  {
    id: "3", 
    name: "Ustadh Nouman Ali Khan",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    videoCount: 520,
    transcriptionCount: 480,
    playlistCount: 32,
    bio: "Islamic speaker and Arabic instructor, founder of Bayyinah Institute for Arabic and Quranic Studies.",
    videos: [
      {
        id: "v4",
        title: "Quranic Arabic Fundamentals",
        youtubeId: "dQw4w9WgXcQ",
        duration: "42:15", 
        views: "3.2M",
        publishedAt: "2024-03-10",
        transcript: `Assalamu alaikum everyone. Today we're diving into the beautiful world of Quranic Arabic, the language that Allah chose to convey His final message to humanity.

Arabic is not just a language; it's a precision instrument. Every letter, every word, every grammatical structure in the Quran was chosen with divine wisdom. When you understand the Arabic, the Quran transforms from a translation to a living, breathing conversation with your Creator.

Let's start with the concept of 'root words' in Arabic. Unlike English, Arabic builds words from three-letter roots that carry core meanings. For example, the root س-ل-م gives us words like Islam (submission), Muslim (one who submits), and salaam (peace).

This interconnectedness shows us that Islam isn't just a religion - it's a comprehensive system that brings peace through submission to Allah. The very structure of the language teaches us theology.

When you hear Allah say "Iqra" (Read!) to the Prophet, you're not just hearing a command to read - you're hearing an invitation to engage with the divine text that will transform your understanding of existence itself.`
      }
    ],
    playlists: [
      {
        id: "p4",
        title: "Divine Speech Series",
        videoCount: 50,
        thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=300&h=200&fit=crop",
        description: "Deep dive into Quranic linguistics and meanings"
      }
    ]
  },
  {
    id: "4",
    name: "Sheikh Hamza Yusuf",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face", 
    videoCount: 310,
    transcriptionCount: 290,
    playlistCount: 20,
    bio: "Islamic scholar, co-founder of Zaytuna College, and advisor to world leaders on Islamic affairs.",
    videos: [
      {
        id: "v5",
        title: "Islamic Ethics in Modern Times",
        youtubeId: "dQw4w9WgXcQ",
        duration: "51:33",
        views: "1.9M", 
        publishedAt: "2024-02-05",
        transcript: `Bismillah ar-Rahman ar-Raheem. In our rapidly changing world, the need for ethical guidance has never been more pressing. Islam provides us with timeless principles that remain relevant across all eras.

The Prophet Muhammad, peace be upon him, said: "I was only sent to perfect noble character." This tells us that Islam's primary mission is character development - both individual and collective.

Consider the Islamic principle of stewardship (khalifa). We are not owners of this Earth but temporary guardians. This understanding should revolutionize how we approach environmental issues, economic systems, and social justice.

The concept of Adl (justice) in Islam encompasses not just legal justice, but economic justice, social justice, and even environmental justice. When we see inequality and injustice in our world, we are called to be agents of change.

Islamic ethics teaches us the middle path - avoiding extremes while maintaining principles. This balance is desperately needed in our polarized world where people often choose between moral relativism and rigid fundamentalism.`
      }
    ],
    playlists: [
      {
        id: "p5",
        title: "Wisdom Traditions",
        videoCount: 25,
        thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
        description: "Exploring classical Islamic wisdom and philosophy"
      }
    ]
  }
];