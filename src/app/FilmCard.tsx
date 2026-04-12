import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

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
        <div className="card bg-base-100 hover:-translate-y-1 transform transition-all duration-300 overflow-hidden border border-base-200 shadow-xl">
            <figure className="relative h-80 w-full overflow-hidden bg-slate-100">
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
                <div className="absolute top-4 left-4 badge badge-secondary shadow-lg z-10 font-semibold uppercase text-[10px]">
                    {film.airing_status.replace('_', ' ')}
                </div>
            </figure>

            <div className="card-body p-6">
                <h2 className="text-xl font-semibold line-clamp-2" title={film.title}>
                    {film.title}
                </h2>
                <div className="mt-4 flex flex-col gap-3 text-sm text-base-content/75">
                    <div className="flex items-center justify-between">
                        <span className="badge badge-outline">{film.total_episodes} Eps</span>
                        <span className="flex items-center gap-2 text-warning font-semibold">
                            <Star className="w-4 h-4 fill-current" /> {film.average_rating > 0 ? film.average_rating : 'N/A'}
                        </span>
                    </div>
                </div>
                <div className="card-actions justify-end mt-6">
                    <Link href={`/films/${film.id}`} className="btn btn-primary btn-sm w-full md:w-auto">
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </div>
    );
}