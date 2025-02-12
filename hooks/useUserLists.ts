import { useState, useEffect } from 'react';
import { useAuthContext } from '../app/auth/context/AuthContext';
import type { Lists, ListType } from '../types';
import { LISTS, MOVIES } from '../constants';

type UseFetchListsReturn = {
  lists: ListType[];
  sharedLists: ListType[];
  loading: boolean;
  error?: Error;
};

export const useUserLists = (): UseFetchListsReturn => {
  const { user } = useAuthContext();
  const [lists, setLists] = useState<ListType[]>([]);
  const [sharedLists, setSharedLists] = useState<ListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (!user || !user.accessToken) {
      setLoading(false);
      return;
    }

    const fetchLists = async () => {
      try {
        const { accessToken, id } = user;
        const [listResponse, sharedListsResponse] = await Promise.all([
          fetch(`${LISTS}?id=${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(`${LISTS}?id=${id}&shared=true`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
        ]);

        if (listResponse.status !== 200 && sharedListsResponse.status !== 200) {
          setLoading(false);
          return;
        }

        const { lists }: Lists = await listResponse.json();
        const { lists: sharedLists }: Lists = await sharedListsResponse.json();

        const [
          moviesInListsResponse,
          moviesInSharedListsResponse,
          shareesResponse,
          shareesInSharedResponse,
        ] = await Promise.all([
          Promise.all(
            lists.map((l: ListType) =>
              fetch(`${MOVIES}?listId=${l.id}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }),
            ),
          ),
          Promise.all(
            sharedLists.map((l: ListType) =>
              fetch(`${MOVIES}?listId=${l.id}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }),
            ),
          ),
          Promise.all(
            lists.map((l: ListType) =>
              fetch(`${LISTS}/${l.id}/sharees`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }),
            ),
          ),
          Promise.all(
            sharedLists.map((l: ListType) =>
              fetch(`${LISTS}/${l.id}/sharees`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }),
            ),
          ),
        ]);

        const moviesInLists = await Promise.all(
          moviesInListsResponse.map((m) => m.json()),
        );
        const moviesInSharedLists = await Promise.all(
          moviesInSharedListsResponse.map((m) => m.json()),
        );
        const sharees = await Promise.all(shareesResponse.map((s) => s.json()));
        const shareesInShared = await Promise.all(
          shareesInSharedResponse.map((s) => s.json()),
        );

        lists.forEach((l, index) => {
          l.movies = moviesInLists[index].movies.length;
          l.posterUrl =
            l.movies &&
            moviesInLists[index].movies[Math.floor(Math.random() * l.movies)]
              ?.posterUrl;
          l.sharees = sharees[index].length;
        });

        sharedLists.forEach((l, index) => {
          l.movies = moviesInSharedLists[index].movies.length;
          l.posterUrl =
            l.movies &&
            moviesInSharedLists[index].movies[
              Math.floor(Math.random() * l.movies)
            ]?.posterUrl;
          l.sharees = shareesInShared[index].length;
        });

        setLists(lists);
        setSharedLists(sharedLists);
      } catch (e) {
        console.error(e);
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [user]);

  return { lists, sharedLists, loading, error };
};
