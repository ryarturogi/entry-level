import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = () => fetchBaseQuery({
    baseUrl: 'http://localhost:3004',
    validatesTags: ['Job', 'Jobs'],
    // Credentials: 'include',

    /*
     * PrepareHeaders: (headers, { endpoint }) => {
     *   const token = getToken();
     */

    /*
     *   If (token && endpoint !== 'refresh') {
     *     headers.set('Authorization', `Bearer ${token}`);
     *   }
     */

    /*
     *   Return headers;
     * },
     */
  });

export default baseQuery();
