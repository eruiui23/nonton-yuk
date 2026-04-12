'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from '../../../services/api';
import { Image as ImageIcon } from 'lucide-react';

interface FilmPosterProps {
    filmTitle: string;
    className?: string;
}

export default function FilmPoster({ filmTitle, className = "" }: FilmPosterProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPoster = async () => {
            if (!filmTitle) {
                setIsLoading(false);
                return;
            }

            try {
                // Mencari data film berdasarkan judul untuk mendapatkan URL gambarnya
                const response = await api.get(`/films`, {
                    params: {
                        filter_by: 'title',
                        filter: filmTitle,
                        take: 1
                    }
                });

                const foundFilms = response.data.data;

                if (foundFilms && foundFilms.length > 0 && foundFilms[0].images?.length > 0) {
                    setImageUrl(foundFilms[0].images[0]);
                }
            } catch (error) {
                console.error(`Gagal mencari poster untuk judul: ${filmTitle}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPoster();
    }, [filmTitle]);

    if (isLoading) {
        return <div className={`skeleton bg-base-300 rounded-md w-full h-full ${className}`}></div>;
    }

    if (!imageUrl) {
        return (
            <div className={`bg-base-300 rounded-md flex flex-col items-center justify-center text-base-content/30 w-full h-full ${className}`}>
                <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                <span className="text-[8px] text-center px-1 line-clamp-2">{filmTitle}</span>
            </div>
        );
    }

    return (
        <Image
            // src={imageUrl}
            src={`https://film-management-api.labse.id/api/static/${imageUrl}`}
            alt={filmTitle}
            fill
            sizes="100px"
            // unoptimized={true}
            className={`object-cover ${className}`}
        />
    );
}