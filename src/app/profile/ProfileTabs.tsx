interface ProfileTabsProps {
  activeTab: 'watchlist' | 'reviews';
  setActiveTab: (tab: 'watchlist' | 'reviews') => void;
  watchlistCount: number;
  reviewsCount: number;
}

export default function ProfileTabs({ activeTab, setActiveTab, watchlistCount, reviewsCount }: ProfileTabsProps) {
  return (
    <div className="tabs tabs-boxed mb-6 bg-base-200/50 p-1">
      <button 
        className={`tab tab-lg flex-1 font-bold transition-all ${activeTab === 'watchlist' ? 'tab-active bg-primary text-white' : ''}`}
        onClick={() => setActiveTab('watchlist')}
      >
        🎬 Watchlist ({watchlistCount})
      </button>
      <button 
        className={`tab tab-lg flex-1 font-bold transition-all ${activeTab === 'reviews' ? 'tab-active bg-primary text-white' : ''}`}
        onClick={() => setActiveTab('reviews')}
      >
        ⭐ Ulasan Saya ({reviewsCount})
      </button>
    </div>
  );
}