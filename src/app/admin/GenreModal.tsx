import { useState, useEffect } from 'react';

interface Genre {
  id: string;
  name: string;
}

interface GenreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
  initialData?: Genre | null;
}

export default function GenreModal({ isOpen, onClose, onSubmit, initialData }: GenreModalProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Jika modal dibuka untuk Edit, isi form dengan nama genre lama
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(name);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {initialData ? 'Ubah Kategori/Genre' : 'Tambah Genre Baru'}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-6">
            <label className="label"><span className="label-text font-bold">Nama Genre</span></label>
            <input 
              type="text" 
              placeholder="Contoh: action, romance, comedy..." 
              className="input input-bordered w-full focus:input-primary" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose} disabled={isSubmitting}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner"></span> : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}