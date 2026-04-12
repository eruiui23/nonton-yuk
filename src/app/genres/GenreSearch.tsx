type GenreSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function GenreSearch({ search, onSearchChange }: GenreSearchProps) {
  return (
    <div className="max-w-md mx-auto mb-10">
      <input
        type="text"
        placeholder="Cari genre... (misal: action, komedi)"
        className="input input-bordered input-primary w-full shadow-sm rounded-full px-6"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
