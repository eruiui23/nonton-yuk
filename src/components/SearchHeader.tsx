interface SearchHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  setPage: (val: number) => void;
}

export default function SearchHeader({ search, setSearch, setPage }: SearchHeaderProps) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Cari judul film..."
        className="input input-primary input-lg w-full shadow-inner border-base-content/10 bg-base-100/50"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); 
        }}
      />
    </div>
  );
}