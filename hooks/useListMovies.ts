import useSWR, { mutate } from 'swr';
import type { Movies, MovieType, User, ListInfo } from '../types';
import { useAuthContext } from '../app/auth/context/AuthContext';
import { MOVIES, LISTS, LISTS_PER_PAGE } from '../constants';
import { fetcher } from './swr/fetcher';

type UseMovieListReturn = {
  loading: boolean;
  error: string | null;
  list: ListInfo | null;
  movies: MovieType[];
  sharees: User[];
  deleteMovie: (movieId: string) => Promise<boolean>;
  toggleWatched: (movieId: string) => Promise<boolean>;
};

export const useListMovies = (listId: string): UseMovieListReturn => {
  const { user } = useAuthContext();
  const token = user?.accessToken;

  const { data: listInfo, error: listError } = useSWR(
    token ? [`${LISTS}/${listId}`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
  );

  const { data: moviesData, mutate: mutateMovies } = useSWR<Movies>(
    token ? [`${MOVIES}?listId=${listId}`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
  );

  const { data: sharees, error: shareesError } = useSWR<User[]>(
    token ? [`${LISTS}/${listId}/sharees`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
  );

  const { data: watchedMovies, mutate: mutateWatchedMovies } = useSWR(
    token && moviesData?.movies ? ['watchedMovies', listId, token] : null,
    async ([_, listId, token]) => {
      const userAndSharees = [user, ...(sharees || [])].filter(
        (user): user is User => user !== null,
      );

      const watchedByUsers = await Promise.all(
        userAndSharees.map((u) =>
          fetcher(
            `${MOVIES}?listId=${listId}&userId=${u.id}&per_page=${LISTS_PER_PAGE}`,
            token,
          ),
        ),
      );

      return watchedByUsers[0].movies;
    },
  );

  const movies = moviesData?.movies.map((movie) => ({
    ...movie,
    watched: watchedMovies?.some((m: MovieType) => m.id === movie.id) || false,
  }));

  const deleteMovie = async (movieId: string) => {
    if (!token || !listId) return false;

    try {
      const response = await fetch(`${MOVIES}/${movieId}/lists/${listId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 204) return false;

      await mutateMovies((data) => {
        if (!data) return data;

        return {
          ...data,
          movies: data.movies.filter((m) => m.id !== movieId),
        };
      }, false);

      await Promise.all([
        mutate([`${LISTS}?id=${user.id}`, token]),
        mutate([`${LISTS}?id=${user.id}&shared=true`, token]),
      ]);

      await Promise.all([
        mutate(
          (key) => Array.isArray(key) && key[0] === 'detailedLists',
          undefined,
          { revalidate: true },
        ),
        mutate(
          (key) => Array.isArray(key) && key[0] === 'detailedSharedLists',
          undefined,
          { revalidate: true },
        ),
      ]);

      return true;
    } catch (error) {
      console.error('error deleting movie:', error);
      await mutateMovies();
      return false;
    }
  };

  const toggleWatched = async (movieId: string) => {
    if (!token) return false;

    const response = await fetch(`${MOVIES}/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 204) {
      await Promise.all([mutateMovies(), mutateWatchedMovies()]);
      return false;
    }

    try {
      await Promise.all([
        mutateMovies((data: Movies | undefined) => {
          if (!data) return data;

          return {
            ...data,
            movies: data.movies.map((m: MovieType) =>
              m.id === movieId ? { ...m, watched: !m.watched } : m,
            ),
          };
        }, false),

        mutateWatchedMovies((data: MovieType[] | undefined) => {
          const movieExists = data?.some((m: MovieType) => m.id === movieId);
          if (movieExists) {
            return data?.filter((m: MovieType) => m.id !== movieId);
          } else {
            const movieToAdd = moviesData?.movies.find((m) => m.id === movieId);
            return movieToAdd ? [...(data || []), movieToAdd] : data;
          }
        }, false),
      ]);

      return true;
    } catch (error) {
      console.error('error updating watch status:', error);
      await Promise.all([mutateMovies(), mutateWatchedMovies()]);
      return false;
    }
  };

  return {
    movies: movies || [],
    list: listInfo || null,
    sharees: sharees || [],
    loading: !moviesData,
    error: listError || shareesError || null,
    deleteMovie,
    toggleWatched,
  } satisfies UseMovieListReturn;
};
