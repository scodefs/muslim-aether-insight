export interface Verse {
  number: number;
  arabic: string;
  english: string;
}

export interface Surah {
  id: string;
  name: string;
  arabicName: string;
  verses: Verse[];
}

export const quranData = {
  surahs: [
    {
      id: "al-fatihah",
      name: "Al-Fatihah",
      arabicName: "الفاتحة",
      verses: [
        {
          number: 1,
          arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
          english: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
        },
        {
          number: 2,
          arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
          english: "All praise is due to Allah, Lord of the worlds."
        },
        {
          number: 3,
          arabic: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
          english: "The Entirely Merciful, the Especially Merciful,"
        },
        {
          number: 4,
          arabic: "مَٰلِكِ يَوْمِ ٱلدِّينِ",
          english: "Sovereign of the Day of Recompense."
        },
        {
          number: 5,
          arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          english: "It is You we worship and You we ask for help."
        },
        {
          number: 6,
          arabic: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
          english: "Guide us to the straight path"
        },
        {
          number: 7,
          arabic: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ",
          english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray."
        }
      ]
    },
    {
      id: "an-nas",
      name: "An-Nas",
      arabicName: "الناس",
      verses: [
        {
          number: 1,
          arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ",
          english: "Say, I seek refuge in the Lord of mankind,"
        },
        {
          number: 2,
          arabic: "مَلِكِ ٱلنَّاسِ",
          english: "The Sovereign of mankind,"
        },
        {
          number: 3,
          arabic: "إِلَٰهِ ٱلنَّاسِ",
          english: "The God of mankind,"
        },
        {
          number: 4,
          arabic: "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ",
          english: "From the evil of the retreating whisperer"
        },
        {
          number: 5,
          arabic: "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ",
          english: "Who whispers [evil] into the breasts of mankind"
        },
        {
          number: 6,
          arabic: "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
          english: "From among the jinn and mankind."
        }
      ]
    },
    {
      id: "al-falaq",
      name: "Al-Falaq",
      arabicName: "الفلق",
      verses: [
        {
          number: 1,
          arabic: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ",
          english: "Say, I seek refuge in the Lord of daybreak"
        },
        {
          number: 2,
          arabic: "مِن شَرِّ مَا خَلَقَ",
          english: "From the evil of that which He created"
        },
        {
          number: 3,
          arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
          english: "And from the evil of darkness when it settles"
        },
        {
          number: 4,
          arabic: "وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ",
          english: "And from the evil of the blowers in knots"
        },
        {
          number: 5,
          arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
          english: "And from the evil of an envier when he envies."
        }
      ]
    },
    {
      id: "al-ikhlas",
      name: "Al-Ikhlas",
      arabicName: "الإخلاص",
      verses: [
        {
          number: 1,
          arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
          english: "Say, He is Allah, [who is] One,"
        },
        {
          number: 2,
          arabic: "ٱللَّهُ ٱلصَّمَدُ",
          english: "Allah, the Eternal Refuge."
        },
        {
          number: 3,
          arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
          english: "He neither begets nor is born,"
        },
        {
          number: 4,
          arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ",
          english: "Nor is there to Him any equivalent."
        }
      ]
    }
  ]
};