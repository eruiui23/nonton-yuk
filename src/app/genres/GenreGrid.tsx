import GenreCard from './GenreCard';

type Genre = {
  id: string;
  name: string;
};

type GenreGridProps = {
  genres: Genre[];
};

export default function GenreGrid({ genres }: GenreGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {genres.map((genre) => (
        <GenreCard key={genre.id} genre={genre} />
      ))}
    </div>
  );
}
