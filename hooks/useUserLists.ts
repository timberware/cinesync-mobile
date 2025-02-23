import useSWR from 'swr';
import type { Lists, ListType } from '../types';
import { useAuthContext } from '../app/auth/context/AuthContext';
import { LISTS, MOVIES } from '../constants';
import { fetcher } from './swr/fetcher';

type UseFetchListsReturn = {
  lists: ListType[];
  sharedLists: ListType[];
  loading: boolean;
  error?: Error;
};

const fetchDetailedLists = async (lists: ListType[], token: string) => {
  return await Promise.all(
    lists.map(async (list: ListType) => {
      const [moviesRes, shareesRes] = await Promise.all([
        fetcher(`${MOVIES}?listId=${list.id}`, token),
        fetcher(`${LISTS}/${list.id}/sharees`, token),
      ]);

      return {
        ...list,
        movies: moviesRes.movies.length,
        posterUrl:
          moviesRes.movies[Math.floor(Math.random() * moviesRes.movies.length)]
            ?.posterUrl,
        sharees: shareesRes.length,
      };
    }),
  );
};

export const useUserLists = (): UseFetchListsReturn => {
  const { user } = useAuthContext();
  const token = user?.accessToken;

  const { data: listsData, error: listsError } = useSWR<Lists>(
    token ? [`${LISTS}?id=${user.id}`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
  );

  const { data: sharedListsData, error: sharedListsError } = useSWR<Lists>(
    token ? [`${LISTS}?id=${user.id}&shared=true`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
  );

  const { data: detailedLists } = useSWR(
    listsData?.lists && token
      ? ['detailedLists', listsData.lists, token]
      : null,
    ([_, lists, token]: [string, ListType[], string]) =>
      fetchDetailedLists(lists, token),
  );

  const { data: detailedSharedLists } = useSWR(
    sharedListsData?.lists && token
      ? ['detailedSharedLists', sharedListsData.lists, token]
      : null,
    ([_, lists, token]: [string, ListType[], string]) =>
      fetchDetailedLists(lists, token),
  );

  return {
    lists: detailedLists || [],
    sharedLists: detailedSharedLists || [],
    loading: !listsData && !listsError,
    error: listsError || sharedListsError,
  };
};
