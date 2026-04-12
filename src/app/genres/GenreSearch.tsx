type GenreSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function GenreSearch({ search, onSearchChange }: GenreSearchProps) {
  return (
    <div className="max-w-xl mx-auto mb-10">
      <input
        type="text"
        placeholder="Cari genre... (misal: action, komedi)"
        className="input input-primary input-lg w-full rounded-full shadow-lg"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
