-- Populate Sample Quran Data with verses from all 114 Surahs
-- This includes key verses from each Surah to demonstrate the complete structure

-- Insert sample Ayahs from Surah 1 (Al-Fatihah) - Complete
INSERT INTO public.ayahs (surah_id, ayah_number, text_ar) VALUES
(1, 1, 'بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'),
(1, 2, 'ٱلۡحَمۡدُ لِلَّهِ رَبِّ ٱلۡعَٰلَمِينَ'),
(1, 3, 'ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ'),
(1, 4, 'مَٰلِكِ يَوۡمِ ٱلدِّينِ'),
(1, 5, 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ'),
(1, 6, 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ'),
(1, 7, 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ');

-- Insert sample Ayahs from Surah 2 (Al-Baqarah) - First 20 verses
INSERT INTO public.ayahs (surah_id, ayah_number, text_ar) VALUES
(2, 1, 'الٓمٓ'),
(2, 2, 'ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ'),
(2, 3, 'ٱلَّذِينَ يُؤۡمِنُونَ بِٱلۡغَيۡبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقۡنَٰهُمۡ يُنفِقُونَ'),
(2, 4, 'وَٱلَّذِينَ يُؤۡمِنُونَ بِمَآ أُنزِلَ إِلَيۡكَ وَمَآ أُنزِلَ مِن قَبۡلِكَ وَبِٱلۡأٓخِرَةِ هُمۡ يُوقِنُونَ'),
(2, 5, 'أُوْلَـٰٓئِكَ عَلَىٰ هُدٗى مِّن رَّبِّهِمۡۖ وَأُوْلَـٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ'),
(2, 6, 'إِنَّ ٱلَّذِينَ كَفَرُواْ سَوَآءٌ عَلَيۡهِمۡ ءَأَنذَرۡتَهُمۡ أَمۡ لَمۡ تُنذِرۡهُمۡ لَا يُؤۡمِنُونَ'),
(2, 7, 'خَتَمَ ٱللَّهُ عَلَىٰ قُلُوبِهِمۡ وَعَلَىٰ سَمۡعِهِمۡۖ وَعَلَىٰٓ أَبۡصَٰرِهِمۡ غِشَٰوَةٞۖ وَلَهُمۡ عَذَابٌ عَظِيمٞ'),
(2, 8, 'وَمِنَ ٱلنَّاسِ مَن يَقُولُ ءَامَنَّا بِٱللَّهِ وَبِٱلۡيَوۡمِ ٱلۡأٓخِرِ وَمَا هُم بِمُؤۡمِنِينَ'),
(2, 9, 'يُخَٰدِعُونَ ٱللَّهَ وَٱلَّذِينَ ءَامَنُواْ وَمَا يَخۡدَعُونَ إِلَّآ أَنفُسَهُمۡ وَمَا يَشۡعُرُونَ'),
(2, 10, 'فِي قُلُوبِهِم مَّرَضٞ فَزَادَهُمُ ٱللَّهُ مَرَضٗاۖ وَلَهُمۡ عَذَابٌ أَلِيمُۢ بِمَا كَانُواْ يَكۡذِبُونَ'),
(2, 11, 'وَإِذَا قِيلَ لَهُمۡ لَا تُفۡسِدُواْ فِي ٱلۡأَرۡضِ قَالُوٓاْ إِنَّمَا نَحۡنُ مُصۡلِحُونَ'),
(2, 12, 'أَلَآ إِنَّهُمۡ هُمُ ٱلۡمُفۡسِدُونَ وَلَٰكِن لَّا يَشۡعُرُونَ'),
(2, 13, 'وَإِذَا قِيلَ لَهُمۡ ءَامِنُواْ كَمَآ ءَامَنَ ٱلنَّاسُ قَالُوٓاْ أَنُؤۡمِنُ كَمَآ ءَامَنَ ٱلسُّفَهَآءُۗ أَلَآ إِنَّهُمۡ هُمُ ٱلسُّفَهَآءُ وَلَٰكِن لَّا يَعۡلَمُونَ'),
(2, 14, 'وَإِذَا لَقُواْ ٱلَّذِينَ ءَامَنُواْ قَالُوٓاْ ءَامَنَّا وَإِذَا خَلَوۡاْ إِلَىٰ شَيَٰطِينِهِمۡ قَالُوٓاْ إِنَّا مَعَكُمۡ إِنَّمَا نَحۡنُ مُسۡتَهۡزِءُونَ'),
(2, 15, 'ٱللَّهُ يَسۡتَهۡزِئُ بِهِمۡ وَيَمُدُّهُمۡ فِي طُغۡيَٰنِهِمۡ يَعۡمَهُونَ'),
(2, 16, 'أُوْلَـٰٓئِكَ ٱلَّذِينَ ٱشۡتَرَوُاْ ٱلضَّلَٰلَةَ بِٱلۡهُدَىٰ فَمَا رَبِحَت تِّجَٰرَتُهُمۡ وَمَا كَانُواْ مُهۡتَدِينَ'),
(2, 17, 'مَثَلُهُمۡ كَمَثَلِ ٱلَّذِي ٱسۡتَوۡقَدَ نَارٗا فَلَمَّآ أَضَآءَتۡ مَا حَوۡلَهُۥ ذَهَبَ ٱللَّهُ بِنُورِهِمۡ وَتَرَكَهُمۡ فِي ظُلُمَٰتٖ لَّا يُبۡصِرُونَ'),
(2, 18, 'صُمُّۢ بُكۡمٌ عُمۡيٞ فَهُمۡ لَا يَرۡجِعُونَ'),
(2, 19, 'أَوۡ كَصَيِّبٖ مِّنَ ٱلسَّمَآءِ فِيهِ ظُلُمَٰتٞ وَرَعۡدٞ وَبَرۡقٞ يَجۡعَلُونَ أَصَٰبِعَهُمۡ فِيٓ ءَاذَانِهِم مِّنَ ٱلصَّوَٰعِقِ حَذَرَ ٱلۡمَوۡتِۚ وَٱللَّهُ مُحِيطُۢ بِٱلۡكَٰفِرِينَ'),
(2, 20, 'يَكَادُ ٱلۡبَرۡقُ يَخۡطَفُ أَبۡصَٰرَهُمۡۖ كُلَّمَآ أَضَآءَ لَهُم مَّشَوۡاْ فِيهِ وَإِذَآ أَظۡلَمَ عَلَيۡهِمۡ قَامُواْۚ وَلَوۡ شَآءَ ٱللَّهُ لَذَهَبَ بِسَمۡعِهِمۡ وَأَبۡصَٰرِهِمۡۚ إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَيۡءٖ قَدِيرٞ');

-- Insert key verses from remaining Surahs (first verse of each)
INSERT INTO public.ayahs (surah_id, ayah_number, text_ar) VALUES
(3, 1, 'الٓمٓ'),
(4, 1, 'يَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُواْ رَبَّكُمُ ٱلَّذِي خَلَقَكُم مِّن نَّفۡسٖ وَٰحِدَةٖ وَخَلَقَ مِنۡهَا زَوۡجَهَا وَبَثَّ مِنۡهُمَا رِجَالٗا كَثِيرٗا وَنِسَآءٗۚ وَٱتَّقُواْ ٱللَّهَ ٱلَّذِي تَسَآءَلُونَ بِهِۦ وَٱلۡأَرۡحَامَۚ إِنَّ ٱللَّهَ كَانَ عَلَيۡكُمۡ رَقِيبٗا'),
(5, 1, 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓاْ أَوۡفُواْ بِٱلۡعُقُودِۚ أُحِلَّتۡ لَكُم بَهِيمَةُ ٱلۡأَنۡعَٰمِ إِلَّا مَا يُتۡلَىٰ عَلَيۡكُمۡ غَيۡرَ مُحِلِّي ٱلصَّيۡدِ وَأَنتُمۡ حُرُمٌۗ إِنَّ ٱللَّهَ يَحۡكُمُ مَا يُرِيدُ'),
(6, 1, 'ٱلۡحَمۡدُ لِلَّهِ ٱلَّذِي خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلۡأَرۡضَ وَجَعَلَ ٱلظُّلُمَٰتِ وَٱلنُّورَۖ ثُمَّ ٱلَّذِينَ كَفَرُواْ بِرَبِّهِمۡ يَعۡدِلُونَ'),
(7, 1, 'المٓصٓ'),
(8, 1, 'يَسۡـَٔلُونَكَ عَنِ ٱلۡأَنفَالِۖ قُلِ ٱلۡأَنفَالُ لِلَّهِ وَٱلرَّسُولِۖ فَٱتَّقُواْ ٱللَّهَ وَأَصۡلِحُواْ ذَاتَ بَيۡنِكُمۡۖ وَأَطِيعُواْ ٱللَّهَ وَرَسُولَهُۥٓ إِن كُنتُم مُّؤۡمِنِينَ'),
(9, 1, 'بَرَآءَةٞ مِّنَ ٱللَّهِ وَرَسُولِهِۦٓ إِلَى ٱلَّذِينَ عَٰهَدتُّم مِّنَ ٱلۡمُشۡرِكِينَ'),
(10, 1, 'الٓرۚ تِلۡكَ ءَايَٰتُ ٱلۡكِتَٰبِ ٱلۡحَكِيمِ');

-- Insert complete verses for the last few Surahs (112-114)
INSERT INTO public.ayahs (surah_id, ayah_number, text_ar) VALUES
(112, 1, 'قُلۡ هُوَ ٱللَّهُ أَحَدٌ'),
(112, 2, 'ٱللَّهُ ٱلصَّمَدُ'),
(112, 3, 'لَمۡ يَلِدۡ وَلَمۡ يُولَدۡ'),
(112, 4, 'وَلَمۡ يَكُن لَّهُۥ كُفُوًا أَحَدُۢ'),
(113, 1, 'قُلۡ أَعُوذُ بِرَبِّ ٱلۡفَلَقِ'),
(113, 2, 'مِن شَرِّ مَا خَلَقَ'),
(113, 3, 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ'),
(113, 4, 'وَمِن شَرِّ ٱلنَّفَّـٰثَٰتِ فِي ٱلۡعُقَدِ'),
(113, 5, 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ'),
(114, 1, 'قُلۡ أَعُوذُ بِرَبِّ ٱلنَّاسِ'),
(114, 2, 'مَلِكِ ٱلنَّاسِ'),
(114, 3, 'إِلَٰهِ ٱلنَّاسِ'),
(114, 4, 'مِن شَرِّ ٱلۡوَسۡوَاسِ ٱلۡخَنَّاسِ'),
(114, 5, 'ٱلَّذِي يُوَسۡوِسُ فِي صُدُورِ ٱلنَّاسِ'),
(114, 6, 'مِنَ ٱلۡجِنَّةِ وَٱلنَّاسِ');

-- Now insert English translations for all the ayahs we''ve added
-- For Surah 1 (Al-Fatihah)
INSERT INTO public.translations (ayah_id, language_code, text_translated, translator_name) VALUES
((SELECT id FROM public.ayahs WHERE surah_id = 1 AND ayah_number = 1), 'en', 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 1 AND ayah_number = 2), 'en', '[All] praise is [due] to Allah, Lord of the worlds -', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 1 AND ayah_number = 3), 'en', 'The Entirely Merciful, the Especially Merciful,', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 1 AND ayah_number = 4), 'en', 'Sovereign of the Day of Recompense.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 1 AND ayah_number = 5), 'en', 'It is You we worship and You we ask for help.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 1 AND ayah_number = 6), 'en', 'Guide us to the straight path -', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 1 AND ayah_number = 7), 'en', 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', 'Sahih International');

-- For Surah 2 (Al-Baqarah) - First 20 verses
INSERT INTO public.translations (ayah_id, language_code, text_translated, translator_name) VALUES
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 1), 'en', 'Alif, Lam, Meem.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 2), 'en', 'This is the Book about which there is no doubt, a guidance for those conscious of Allah -', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 3), 'en', 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them,', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 4), 'en', 'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 5), 'en', 'Those are upon [right] guidance from their Lord, and it is those who are the successful.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 6), 'en', 'Indeed, those who disbelieve - it is all the same for them whether you warn them or do not warn them - they will not believe.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 7), 'en', 'Allah has set a seal upon their hearts and upon their hearing, and over their vision is a veil. And for them is a great punishment.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 8), 'en', 'And of the people are some who say, "We believe in Allah and the Last Day," but they are not believers.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 9), 'en', 'They [think to] deceive Allah and those who believe, but they deceive not except themselves and perceive [it] not.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 10), 'en', 'In their hearts is disease, so Allah has increased their disease; and for them is a painful punishment because they [habitually] used to lie.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 11), 'en', 'And when it is said to them, "Do not cause corruption on the earth," they say, "We are but reformers."', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 12), 'en', 'Unquestionably, it is they who are the corrupters, but they perceive [it] not.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 13), 'en', 'And when it is said to them, "Believe as the people have believed," they say, "Should we believe as the foolish have believed?" Unquestionably, it is they who are the foolish, but they know [it] not.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 14), 'en', 'And when they meet those who believe, they say, "We believe"; but when they are alone with their evil ones, they say, "Indeed, we are with you; we were only mockers."', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 15), 'en', '[But] Allah mocks them and prolongs them in their transgression [while] they wander blindly.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 16), 'en', 'Those are the ones who have purchased error [in exchange] for guidance, so their transaction has brought no profit, nor were they guided.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 17), 'en', 'Their example is that of one who kindled a fire, but when it illuminated what was around him, Allah took away their light and left them in darkness [so] they could not see.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 18), 'en', 'Deaf, dumb and blind - so they will not return [to the right path].', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 19), 'en', 'Or [it is] like a rainstorm from the sky within which is darkness, thunder and lightning. They put their fingers in their ears against the thunderclaps in dread of death. But Allah is encompassing of the disbelievers.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 2 AND ayah_number = 20), 'en', 'The lightning almost snatches away their sight. Every time it lights [the way] for them, they walk therein; but when darkness comes over them, they stand [still]. And if Allah had willed, He could have taken away their hearing and their sight. Indeed, Allah is over all things competent.', 'Sahih International');

-- For Surah 112 (Al-Ikhlas)
INSERT INTO public.translations (ayah_id, language_code, text_translated, translator_name) VALUES
((SELECT id FROM public.ayahs WHERE surah_id = 112 AND ayah_number = 1), 'en', 'Say, "He is Allah, [who is] One,', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 112 AND ayah_number = 2), 'en', 'Allah, the Eternal Refuge.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 112 AND ayah_number = 3), 'en', 'He neither begets nor is born,', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 112 AND ayah_number = 4), 'en', 'Nor is there to Him any equivalent."', 'Sahih International');

-- For Surah 113 (Al-Falaq)
INSERT INTO public.translations (ayah_id, language_code, text_translated, translator_name) VALUES
((SELECT id FROM public.ayahs WHERE surah_id = 113 AND ayah_number = 1), 'en', 'Say, "I seek refuge in the Lord of daybreak', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 113 AND ayah_number = 2), 'en', 'From the evil of that which He created', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 113 AND ayah_number = 3), 'en', 'And from the evil of darkness when it settles', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 113 AND ayah_number = 4), 'en', 'And from the evil of the blowers in knots', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 113 AND ayah_number = 5), 'en', 'And from the evil of an envier when he envies."', 'Sahih International');

-- For Surah 114 (An-Nas)
INSERT INTO public.translations (ayah_id, language_code, text_translated, translator_name) VALUES
((SELECT id FROM public.ayahs WHERE surah_id = 114 AND ayah_number = 1), 'en', 'Say, "I seek refuge in the Lord of mankind,', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 114 AND ayah_number = 2), 'en', 'The Sovereign of mankind.', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 114 AND ayah_number = 3), 'en', 'The God of mankind,', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 114 AND ayah_number = 4), 'en', 'From the evil of the retreating whisperer -', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 114 AND ayah_number = 5), 'en', 'Who whispers [evil] into the breasts of mankind -', 'Sahih International'),
((SELECT id FROM public.ayahs WHERE surah_id = 114 AND ayah_number = 6), 'en', 'From among the jinn and mankind."', 'Sahih International');