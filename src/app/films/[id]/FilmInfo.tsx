import Image from 'next/image';

interface FilmInfoProps {
    film: any;
}

export default function FilmInfo({ film }: FilmInfoProps) {
    const posterUrl = film.images && film.images.length > 0
        ? film.images[0]
        : null;

    return (
        <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                <figure className="relative aspect-[2/3] w-full rounded-2xl shadow-2xl overflow-hidden bg-base-300">
                    {posterUrl ? (
                        <Image
                            src={`https://film-management-api.labse.id/api/static/${posterUrl}`}
                            alt={film.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            //   unoptimized={true} 
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-base-content/30 font-bold text-xl">
                            No Poster
                        </div>
                    )}
                    <div className="absolute top-4 right-4 badge badge-secondary font-bold shadow-lg">
                        {film.airing_status?.replace('_', ' ')}
                    </div>
                </figure>
            </div>

            {/* Info Detail */}
            <div className="flex-1 flex flex-col">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{film.title}</h1>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="badge badge-lg badge-warning font-bold gap-1">
                        ⭐ {film.average_rating > 0 ? film.average_rating : 'N/A'}
                    </div>
                    <div className="badge badge-lg badge-outline">{film.total_episodes} Episode</div>
                    {film.genres?.map((genre: any) => (
                        <div key={genre.id} className="badge badge-lg badge-ghost">{genre.name}</div>
                    ))}
                </div>

                <div className="prose prose-p:text-base-content/80 max-w-none mb-8">
                    <h3 className="text-xl font-bold mb-2">Sinopsis</h3>
                    <p className="leading-relaxed">
                        {film.synopsis || 'Belum ada sinopsis untuk film ini.'}
                    </p>
                </div>
            </div>
        </div>
    );
}