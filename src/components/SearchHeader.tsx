interface SearchHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  setPage: (val: number) => void;
}

export default function SearchHeader({ search, setSearch, setPage }: SearchHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Temukan judul yang tepat</h1>
        <p className="text-sm text-base-content/70 mt-2">Cari film berdasarkan judul untuk melihat detail, rating, dan review.</p>
      </div>
      <div className="w-full lg:w-auto">
        <input
          type="text"
          placeholder="Cari judul film..."
          className="input input-primary input-lg w-full lg:w-[28rem] shadow-inner"
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