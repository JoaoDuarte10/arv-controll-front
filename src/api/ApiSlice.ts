import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const userId = getState().authenticated.userId;
      headers.set('id-user', userId);
      return headers;
    },
  }),
  tagTypes: ['Clients', 'Segments'],
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => '/client/all',
      providesTags: ['Clients'],
    }),
    addNewClient: builder.mutation({
      query: (initialClient) => ({
        url: '/client/create',
        method: 'POST',
        body: initialClient,
      }),
      invalidatesTags: ['Clients'],
    }),
    updateClient: builder.mutation({
      query: (client) => ({
        url: '/client/update',
        method: 'PUT',
        body: client,
      }),
      invalidatesTags: ['Clients'],
    }),
    deleteClient: builder.mutation({
      query: (client) => ({
        url: '/client',
        method: 'DELETE',
        params: { id: client },
      }),
      invalidatesTags: ['Clients'],
    }),
    getSegments: builder.query({
      query: () => '/segments',
      providesTags: ['Segments'],
    }),
    addNewSegment: builder.mutation({
      query: (segment) => ({
        url: '/segment/create',
        method: 'POST',
        body: segment,
      }),
      invalidatesTags: ['Segments'],
    }),
    updateSegment: builder.mutation({
      query: (segment) => ({
        url: '/segment/update',
        method: 'PUT',
        body: segment,
      }),
      invalidatesTags: ['Segments'],
    }),
    deleteSegment: builder.mutation({
      query: (params) => ({
        url: '/segment',
        method: 'DELETE',
        params: { id: params.id, segment: params.segment },
      }),
      invalidatesTags: ['Segments'],
    }),
    getSchedulesByDate: builder.query({
      query: (params) => ({
        url: '/schedule/date',
        method: 'GET',
        params: { date: params.date },
      }),
    }),
    getSchedulesByClient: builder.query({
      query: (params) => ({
        url: '/schedule/client',
        method: 'GET',
        params: { date: params.client },
      }),
    }),
    addNewSchedule: builder.mutation({
      query: (params) => ({
        url: '/schedule/new',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddNewClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetSegmentsQuery,
  useAddNewSegmentMutation,
  useUpdateSegmentMutation,
  useDeleteSegmentMutation,
  useGetSchedulesByDateQuery,
  useGetSchedulesByClientQuery,
  useAddNewScheduleMutation,
} = apiSlice;
