interface SearchHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  setPage: (val: number) => void;
}

export default function SearchHeader({ search, setSearch, setPage }: SearchHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
      <div>
        <h1 className="text-4xl font-bold font-mono tracking-tight">Katalog Film</h1>
        <p className="text-base-content/70 mt-2">Eksplorasi mahakarya sinematik terbaru.</p>
      </div>
      <div className="w-full md:w-auto">
        <input
          type="text"
          placeholder="Cari judul film..."
          className="input input-bordered w-full md:w-80 focus:input-primary transition-all shadow-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); 
          }}
        />
      </div>
    </div>
  );
}