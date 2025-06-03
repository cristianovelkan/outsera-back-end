import { MovieImportService } from "../services/movie-import.service";

export class ImportMoviesUseCase {
  private movieImportService: MovieImportService;

  constructor(movieImportService: MovieImportService) {
    this.movieImportService = movieImportService;
  }

  async execute(): Promise<void> {
    try {
      await this.movieImportService.importMovies();
    } catch (error) {
      console.error("Error importing movies:", error);
      throw new Error("Failed to import movies");
    }
  }
}
