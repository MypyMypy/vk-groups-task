import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GetGroupsResponse, Group } from '../../types';

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Groups'],
  endpoints: (builder) => ({
    getGroups: builder.query<Group[], void>({
      query: () => ({
        url: 'groups.json',
        method: 'GET',
        responseHandler: async (response) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (!response.ok) throw new Error('Fetching Error');
          return response.json();
        },
      }),
      transformResponse: (response: GetGroupsResponse | Group[]) => {
        if ('result' in response) {
          if (response.result === 0 || response.data === undefined) {
            throw new Error('Fetching Error: Invalid result or missing data');
          }
          return response.data;
        }
        if (Array.isArray(response)) return response;

        throw new Error('Fetching Error: Unexpected response structure');
      },
      providesTags: ['Groups'],
    }),
  }),
});

export const { useGetGroupsQuery } = groupsApi;
