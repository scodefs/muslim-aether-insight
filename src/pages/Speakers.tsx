import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { dummySpeakers } from "@/data/speakersData";

export default function Speakers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpeakers = dummySpeakers.filter(speaker =>
    speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    speaker.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Speakers page rendering, filtered speakers count:", filteredSpeakers.length);
  console.log("First speaker:", filteredSpeakers[0]?.name);

  return (
    <div className="h-full w-full overflow-auto">
      <div className="container mx-auto p-6 space-y-8 max-w-7xl min-h-screen">
        {/* Header */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Islamic Speakers</h1>
            <p className="text-muted-foreground text-lg">
              Discover wisdom from renowned Islamic scholars and speakers
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search speakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>

        {/* No Results */}
        {filteredSpeakers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No speakers found matching your search.</p>
              <p className="text-sm">Try adjusting your search terms.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}