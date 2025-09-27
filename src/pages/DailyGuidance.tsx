import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Sparkles, User } from "lucide-react";

export default function DailyGuidance() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Daily Guidance</h1>
        <p className="text-muted-foreground">
          Begin each day with wisdom from the Quran, Sunnah, and Islamic teachings
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Verse of the Day */}
        <motion.div variants={cardVariants}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                Verse of the Day
              </CardTitle>
              <div className="text-sm text-muted-foreground">Surah Al-Baqarah: 286</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-right text-lg leading-relaxed font-arabic">
                لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا
              </div>
              <div className="text-foreground leading-relaxed">
                "Allah does not burden a soul beyond that it can bear."
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Hadith of the Day */}
        <motion.div variants={cardVariants}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Heart className="h-5 w-5" />
                Hadith of the Day
              </CardTitle>
              <div className="text-sm text-muted-foreground">Sahih Bukhari, Hadith #6018</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-right text-lg leading-relaxed font-arabic">
                مَن لَّا يَرْحَمِ النَّاسَ لَا يَرْحَمْهُ اللَّهُ
              </div>
              <div className="text-foreground leading-relaxed">
                "He who does not show mercy to people, Allah will not show mercy to him."
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dua of the Day */}
        <motion.div variants={cardVariants}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                Dua of the Day
              </CardTitle>
              <div className="text-sm text-muted-foreground">Dua for Patience</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-right text-lg leading-relaxed font-arabic">
                رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ
              </div>
              <div className="text-foreground leading-relaxed">
                "Our Lord, pour upon us patience and let us die as Muslims."
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Prophetic Character of the Day */}
        <motion.div variants={cardVariants}>
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-primary">
                <User className="h-5 w-5" />
                Prophetic Character
              </CardTitle>
              <div className="text-sm text-muted-foreground">Trait to Emulate</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-xl font-semibold text-foreground">
                Kindness to Neighbors
              </div>
              <div className="text-foreground leading-relaxed">
                The Prophet ﷺ emphasized the importance of treating neighbors with kindness and respect. 
                Start by greeting them warmly, offering help when needed, and being mindful of not causing any disturbance.
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}