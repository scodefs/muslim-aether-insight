import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Star, User } from "lucide-react";

const dailyContent = {
  verse: {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    english: "And whoever fears Allah - He will make for him a way out",
    reference: "Surah At-Talaq 65:2"
  },
  hadith: {
    arabic: "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
    english: "The believer to another believer is like a building whose different parts enforce each other.",
    reference: "Sahih Bukhari, Hadith #481"
  },
  dua: {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    english: "Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.",
    description: "Dua for seeking goodness in both worlds"
  },
  character: {
    trait: "Patience and Perseverance",
    description: "The Prophet ﷺ showed remarkable patience during trials and hardships. Practice patience in daily challenges - whether in traffic, with difficult people, or when facing setbacks. Remember that patience is a form of worship and brings great reward."
  }
};

export default function DailyGuidance() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Daily Guidance</h1>
        <p className="text-muted-foreground">
          Daily Islamic reminders and inspiration for spiritual growth
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Verse of the Day */}
        <Card className="hover:shadow-lg transition-shadow animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Verse of the Day</CardTitle>
              <p className="text-sm text-muted-foreground">{dailyContent.verse.reference}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-right text-lg font-arabic text-primary leading-relaxed">
                {dailyContent.verse.arabic}
              </p>
              <p className="text-sm text-muted-foreground italic">
                "{dailyContent.verse.english}"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Hadith of the Day */}
        <Card className="hover:shadow-lg transition-shadow animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Star className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Hadith of the Day</CardTitle>
              <p className="text-sm text-muted-foreground">{dailyContent.hadith.reference}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-right text-lg font-arabic text-primary leading-relaxed">
                {dailyContent.hadith.arabic}
              </p>
              <p className="text-sm text-muted-foreground italic">
                "{dailyContent.hadith.english}"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dua of the Day */}
        <Card className="hover:shadow-lg transition-shadow animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-chart-2/10 rounded-lg">
              <Heart className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <CardTitle className="text-lg">Dua of the Day</CardTitle>
              <p className="text-sm text-muted-foreground">{dailyContent.dua.description}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-right text-lg font-arabic text-primary leading-relaxed">
                {dailyContent.dua.arabic}
              </p>
              <p className="text-sm text-muted-foreground italic">
                "{dailyContent.dua.english}"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prophetic Character of the Day */}
        <Card className="hover:shadow-lg transition-shadow animate-fade-in">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="p-2 bg-chart-3/10 rounded-lg">
              <User className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <CardTitle className="text-lg">Prophetic Character</CardTitle>
              <p className="text-sm text-muted-foreground">Character of the Prophet ﷺ</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-primary">{dailyContent.character.trait}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dailyContent.character.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}