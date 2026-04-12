interface Genre {
  id: string;
  name: string;
}

interface GenreTableProps {
  genres: Genre[];
  isLoading: boolean;
  onEdit: (genre: Genre) => void;
}

export default function GenreTable({ genres, isLoading, onEdit }: GenreTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (genres.length === 0) {
    return (
      <div className="text-center py-16 bg-base-200 rounded-xl border-2 border-dashed border-base-300">
        <h3 className="text-xl font-bold opacity-50">Belum ada data genre.</h3>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl border border-base-200">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200 text-base-content text-sm">
          <tr>
            <th className="w-16 text-center">No</th>
            <th>ID Genre</th>
            <th>Nama Genre</th>
            <th className="text-center w-32">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {genres.map((genre, index) => (
            <tr key={genre.id} className="hover">
              <th className="text-center">{index + 1}</th>
              <td className="font-mono text-xs opacity-70">{genre.id}</td>
              <td className="font-bold ">{genre.name}</td>
              <td className="text-center">
                <button 
                  onClick={() => onEdit(genre)}
                  className="btn btn-sm btn-outline btn-warning"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}