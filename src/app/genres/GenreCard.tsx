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
      className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary transition-all cursor-pointer group"
    >
      <div className="card-body items-center justify-center p-6 text-center">
        <span className="text-lg font-bold capitalize group-hover:text-primary transition-colors">
          {genre.name}
        </span>
      </div>
    </Link>
  );
}
