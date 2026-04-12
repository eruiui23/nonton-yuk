interface ProfileHeaderProps {
  displayName: string;
  username: string;
  bio: string;
}

export default function ProfileHeader({ displayName, username, bio }: ProfileHeaderProps) {
  return (
    <div className="card bg-base-200 shadow-xl mb-8 border border-base-300">
      <div className="card-body flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-28 ring ring-primary ring-offset-base-100 ring-offset-2">
            <span className="text-4xl font-bold uppercase">
              {displayName.charAt(0)}
            </span>
          </div>
        </div>
        
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl font-bold">{displayName}</h1>
          <p className="text-base-content/60 font-mono text-sm mb-3">@{username}</p>
          <div className="text-base-content/80 max-w-2xl bg-base-100 p-3 rounded-lg border border-base-300">
            {bio || 'Belum ada bio.'}
          </div>
        </div>
      </div>
    </div>
  );
}