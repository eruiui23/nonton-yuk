import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../services/api';
import { Clapperboard } from 'lucide-react';

export default function FilmForm({ token }: { token: string }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [toast, setToast] = useState<{ text: string; type: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newFilm, setNewFilm] = useState({
    title: '',
    synopsis: '',
    airing_status: 'not_yet_aired',
    total_episodes: 1,
    release_date: '',
  });

  // useQuery menggantikan useEffect untuk fetching daftar genre public
  const { data: genres = [] } = useQuery({
    queryKey: ['genres-public'],
    queryFn: async () => {
      const response = await api.get('/genres');
      return response.data.data as { id: string; name: string }[];
    },
    staleTime: 1000 * 60 * 10, // Genre jarang berubah, cache 10 menit
  });

  // useMutation untuk membuat film baru
  const { mutate: createFilm, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('title', newFilm.title);
      formData.append('synopsis', newFilm.synopsis || '');
      formData.append('airing_status', newFilm.airing_status);
      formData.append('total_episodes', String(newFilm.total_episodes));
      formData.append('release_date', `${newFilm.release_date} 00:00:00`);
      formData.append('genres', selectedGenres.join(','));

      if (selectedFiles) {
        Array.from(selectedFiles).forEach((file) => {
          formData.append('images', file);
        });
      }

      await api.post('/films', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      setToast({ text: 'Film berhasil dibuat dengan gambar dan genre!', type: 'success' });
      // Reset form
      setNewFilm({ title: '', synopsis: '', airing_status: 'not_yet_aired', total_episodes: 1, release_date: '' });
      setSelectedGenres([]);
      setSelectedFiles(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setToast(null), 4000);
    },
    onError: (error: any) => {
      setToast({ text: error.response?.data?.message || 'Gagal membuat film.', type: 'error' });
      setTimeout(() => setToast(null), 4000);
    },
  });

  return (
    <div className="card bg-base-200/40 backdrop-blur-xl shadow-2xl border border-base-content/10">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
          <Clapperboard className="w-6 h-6" /> Buat Film Baru
        </h2>

        {toast && (
          <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'} text-white shadow-sm mb-4`}>
            <span>{toast.text}</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createFilm();
          }}
          className="flex flex-col gap-3"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-xs tracking-widest uppercase text-base-content/80">Judul Film</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-base-100/50 focus:border-primary transition-colors"
              required
              value={newFilm.title}
              onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-xs tracking-widest uppercase text-base-content/80">Sinopsis</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-32 bg-base-100/50 focus:border-primary transition-colors"
              placeholder="Opsional..."
              value={newFilm.synopsis}
              onChange={(e) => setNewFilm({ ...newFilm, synopsis: e.target.value })}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs tracking-widest uppercase text-base-content/80">Status Tayang</span>
              </label>
              <select
                className="select select-bordered w-full bg-base-100/50 focus:border-primary transition-colors"
                value={newFilm.airing_status}
                onChange={(e) => setNewFilm({ ...newFilm, airing_status: e.target.value })}
              >
                <option value="not_yet_aired">Belum Tayang</option>
                <option value="airing">Sedang Tayang</option>
                <option value="finished_airing">Selesai</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-xs tracking-widest uppercase text-base-content/80">Total Episode</span>
              </label>
              <input
                type="number"
                min="1"
                className="input input-bordered w-full bg-base-100/50 focus:border-primary transition-colors"
                required
                value={newFilm.total_episodes}
                onChange={(e) => setNewFilm({ ...newFilm, total_episodes: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-bold text-xs tracking-widest uppercase text-base-content/80">Tanggal Rilis</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full bg-base-100/50 focus:border-primary transition-colors"
              required
              value={newFilm.release_date}
              onChange={(e) => setNewFilm({ ...newFilm, release_date: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-xs tracking-widest uppercase text-base-content/80">Pilih Genre</span>
            </label>
            <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-base-100/30 border border-base-content/10 max-h-40 overflow-y-auto">
              {genres.map((g) => (
                <label
                  key={g.id}
                  className="flex items-center gap-2 cursor-pointer bg-base-100 px-3 py-1 rounded-full border hover:border-primary transition-colors"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs checkbox-primary"
                    checked={selectedGenres.includes(g.id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedGenres([...selectedGenres, g.id]);
                      else setSelectedGenres(selectedGenres.filter((id) => id !== g.id));
                    }}
                  />
                  <span className="text-sm">{g.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-bold text-xs tracking-widest uppercase text-base-content/80">Poster Film (Multiple)</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="file-input file-input-bordered file-input-primary w-full bg-base-100/50"
              onChange={(e) => setSelectedFiles(e.target.files)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full shadow-lg" disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner"></span> : '+ Publikasikan Film'}
          </button>
        </form>
      </div>
    </div>
  );
}