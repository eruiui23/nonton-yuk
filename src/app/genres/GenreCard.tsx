import Link from 'next/link';

type Genre = {
  id: string;
  name: string;
};

type GenreCardProps = {
  genre: Genre;
};

export default function GenreCard({ genre }: GenreCardProps) {
  return (
    <Link
      href={`/movies?genreId=${genre.id}&genreName=${genre.name}`}
      className="card bg-base-200/50 hover:bg-secondary/10 border border-base-content/10 hover:border-secondary/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 overflow-hidden group backdrop-blur-sm"
    >
      <div className="card-body items-center justify-center p-6 text-center">
        <span className="text-lg font-bold tracking-widest uppercase group-hover:text-secondary transition-colors">
          {genre.name}
        </span>
      </div>
    </Link>
  );
}
