import Image from 'next/image';
import Link from 'next/link';

interface Film {
    id: string;
    title: string;
    airing_status: string;
    total_episodes: number;
    average_rating: number;
    imageUrl?: string | null;
}

export default function FilmCard({ film }: { film: Film }) {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden group">
            <figure className="h-80 bg-base-300 relative w-full overflow-hidden">
                {film.imageUrl ? (
                    <Image
                        src={`https://film-management-api.labse.id/api/static/${film.imageUrl}`}
                        alt={`Poster ${film.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-base-content/30 font-bold text-xl px-4 text-center bg-base-200">
                        No Image
                    </div>
                )}
                <div className="absolute top-2 right-2 badge badge-secondary shadow-sm z-10 font-semibold uppercase text-[10px]">
                    {film.airing_status.replace('_', ' ')}
                </div>
            </figure>

            <div className="card-body p-5">
                <h2 className="card-title text-lg line-clamp-1" title={film.title}>
                    {film.title}
                </h2>
                <div className="flex justify-between items-center mt-2 text-sm font-medium text-base-content/70">
                    <span className="flex items-center gap-1 text-warning font-bold">
                        ⭐ {film.average_rating > 0 ? film.average_rating : 'N/A'}
                    </span>
                    <span className="badge badge-outline">{film.total_episodes} Eps</span>
                </div>
                <div className="card-actions justify-end mt-4">
                    <Link href={`/films/${film.id}`} className="btn btn-primary w-full shadow-md">
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}