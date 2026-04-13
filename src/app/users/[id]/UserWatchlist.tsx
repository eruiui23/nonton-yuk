'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../services/api';
import UserWatchlistItem from './UserWatchlistItem';

interface UserWatchlistItemData {
  id?: string;
  film_title?: string;
  list_status?: string;
  visibility?: string;
}

interface UserWatchlistProps {
  items: UserWatchlistItemData[];
  isOwner: boolean;
  token: string | null;
  onRefresh: () => void;
}

export default function UserWatchlist({ items, isOwner, token, onRefresh }: UserWatchlistProps) {
  const queryClient = useQueryClient();

  const { mutate: toggleVisibility, variables: pendingVariables, isPending } = useMutation({
    mutationFn: async ({ listId, newVisibility }: { listId: string; newVisibility: string }) => {
      if (!token || !isOwner) throw new Error('Tidak diizinkan.');
      await api.patch(
        `/film-lists/${listId}`,
        { visibility: newVisibility },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onMutate: async ({ listId, newVisibility }) => {
      // Optimistic update: langsung update cache sebelum server merespons
      await queryClient.cancelQueries({ queryKey: ['watchlist'] });
      const previousItems = queryClient.getQueryData(['watchlist']);

      queryClient.setQueryData(['watchlist'], (old: UserWatchlistItemData[] | undefined) =>
        old?.map((item) => (item.id === listId ? { ...item, visibility: newVisibility } : item))
      );

      return { previousItems };
    },
    onError: (error, _, context) => {
      // Rollback jika gagal
      if (context?.previousItems) {
        queryClient.setQueryData(['watchlist'], context.previousItems);
      }
      console.error(error);
      alert('Gagal merubah visibilitas.');
    },
    onSettled: () => {
      // Refetch data asli untuk sinkronisasi
      onRefresh();
    },
  });

  const handleToggle = (listId: string, currentStatus: string) => {
    const newVisibility = currentStatus === 'public' ? 'private' : 'public';
    toggleVisibility({ listId, newVisibility });
  };

  const loadingId =
    isPending && pendingVariables ? pendingVariables.listId : null;

  const sortedItems = [...items].sort((a, b) => ((a.id || '') > (b.id || '') ? 1 : -1));

  if (sortedItems.length === 0)
    return (
      <div className="p-8 bg-base-200 rounded-xl text-center opacity-50 italic">
        Daftar tontonan kosong.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sortedItems.map((item, i) => (
        <UserWatchlistItem
          key={item.id || i}
          item={item}
          isOwner={isOwner}
          loadingId={loadingId}
          onToggleVisibility={handleToggle}
        />
      ))}
    </div>
  );
}