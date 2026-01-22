import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import profileData from "@/data/profile.json";
import { DeveloperProfile } from "@/domain/profile.types";

// Force cast since we know the structure matches (validated by tests/types)
const profile = profileData as unknown as DeveloperProfile;

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-24 pb-24">
      <Hero profile={profile} />
      <Experience profile={profile} />
      <Projects profile={profile} />
      <Skills profile={profile} />
      <Education profile={profile} />
    </div>
  );
}
