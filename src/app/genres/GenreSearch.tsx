type GenreSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function GenreSearch({ search, onSearchChange }: GenreSearchProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Cari nama genre... (misal: Action, Romance)"
        className="input input-secondary input-lg w-full rounded-2xl shadow-inner border border-base-content/10 bg-base-100/60 backdrop-blur-xl text-center placeholder:text-base-content/40"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
