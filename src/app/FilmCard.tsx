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
        <Link
            href={`/films/${film.id}`}
            className="group block relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-base-200/40 bg-base-300/50 hover:border-primary hover:ring-2 hover:ring-primary hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:z-10 transition-all duration-300 shadow-sm cursor-pointer"
        >
            {film.imageUrl ? (
                <Image
                    src={`https://film-management-api.labse.id/api/static/${film.imageUrl}`}
                    alt={`Poster ${film.title}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-500 "
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-base-200">
                    <span className="font-bold text-sm mb-1 opacity-60 line-clamp-3">{film.title}</span>
                    <span className="text-xs text-base-content/40 font-medium">No Image</span>
                </div>
            )}

            {/* Aksi Overlay saat di-hover (Mirip Letterboxd style) */}
            <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none p-3 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                {/* Info Overlay (Titile, Eps, Rating) */}
                <div className="w-full text-white pb-1 backdrop-blur-none">
                    <h3 className="font-bold text-sm sm:text-base leading-tight mb-2 line-clamp-2 drop-shadow-md">
                        {film.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs font-semibold drop-shadow-md">
                        <span className="bg-black/60 px-2 py-1 rounded-md">{film.total_episodes} Eps</span>
                        <span className="flex items-center gap-1 text-warning bg-black/60 px-2 py-1 rounded-md">
                            <Star className="w-3.5 h-3.5 fill-warning" />
                            {film.average_rating > 0 ? film.average_rating : 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}