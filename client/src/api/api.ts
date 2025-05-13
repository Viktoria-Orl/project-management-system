import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  //   reducerPath: "pokemonApi", - чтобы было больше управления в созданных reducers
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/" }),
  endpoints: () => ({}), // данные которые мы будем получать с сервера, пока пустой объект, инициализируем их в отдельных слайсах
  //   endpoints: (builder) => ({
  //     getPokemonByName: builder.query<Pokemon, string>({
  //       query: (name) => `pokemon/${name}`,
  //     }),
  //   }),
});
