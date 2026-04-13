interface UserHeaderProps {
  displayName: string;
  username: string;
  bio: string;
}

export default function UserHeader({ displayName, username, bio }: UserHeaderProps) {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 mb-8">
      <div className="card-body flex-col md:flex-row items-center gap-6">
        <div className="avatar avatar-placeholder">
          <div className="bg-primary text-secondary-content rounded-full w-24 ">
            <span className="text-5xl font-bold uppercase">{displayName.charAt(0)}</span>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">{displayName}</h1>
          <p className="text-base-content/80 font-mono text-sm">@{username}</p>
          <p className="mt-4 text-base-content/80 italic">
            {bio || "Pengguna ini belum menulis bio."}
          </p>
        </div>
      </div>
    </div>
  );
}