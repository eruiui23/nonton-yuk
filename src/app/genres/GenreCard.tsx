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
      href={`/?genreId=${genre.id}&genreName=${genre.name}`}
      className="card glass-card border border-base-200 shadow-lg hover:-translate-y-1 transform transition-all duration-300 overflow-hidden group"
    >
      <div className="card-body items-center justify-center p-6 text-center">
        <span className="text-lg font-semibold capitalize group-hover:text-primary transition-colors">
          {genre.name}
        </span>
      </div>
    </Link>
  );
}
