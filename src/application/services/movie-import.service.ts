import { Movie } from "../../domain/movie.entity";
import { MovieGateway } from "../../domain/movie.gateway";
import { MovieCsvReader } from "../../infrastructure/csv/movie-csv.reader";

export class MovieImportService {
  constructor(
    private movieGateway: MovieGateway,
    private csvReader: MovieCsvReader
  ) {}

  async importMovies(): Promise<void> {
    const moviesData = await this.csvReader.readCsv();
    for (const movieProps of moviesData) {
      const movie = new Movie(movieProps);
      await this.movieGateway.save(movie);
    }
  }
}
