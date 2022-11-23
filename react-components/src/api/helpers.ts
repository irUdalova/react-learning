import { GetMovieResp, MovieTypeResp } from 'types';

export function renameValues(response: GetMovieResp) {
  const results = response.results.map((res: MovieTypeResp) => {
    return {
      id: res.id,
      title: res.title,
      posterPath: res.poster_path,
      releaseDate: res.release_date,
      overview: res.overview,
    };
  });

  return {
    page: response.page,
    results,
    totalResults: response.total_results,
    totalPages: response.total_pages,
  };
}
