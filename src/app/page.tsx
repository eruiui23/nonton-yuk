import LandingHero from '../components/LandingHero';
import LandingRecommended from '../components/LandingRecommended';

export default function LandingPage() {
  return (
    <div className="bg-base-100 overflow-hidden relative">
      <LandingHero />
      <LandingRecommended />
    </div>
  );
}
