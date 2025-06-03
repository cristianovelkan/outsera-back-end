import { MovieSqliteRepository } from "../../infrastructure/db/sqlite/movie-sqlite.repository";
import { ImportMoviesUseCase } from "../../application/use-cases/import-movies.usecase";
import * as path from "path";
import { MovieImportService } from "../../application/services/movie-import.service";
import { MovieCsvReader } from "../../infrastructure/csv/movie-csv.reader";
import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();
const connection = new sqlite.Database("database.sqlite");

async function main() {
  try {
    const csvPath = path.resolve(__dirname, "../../../movies.csv");

    const movieRepository = new MovieSqliteRepository(connection);
    await movieRepository.init();
    const movieCsvReader = new MovieCsvReader(csvPath);

    const movieImportService = new MovieImportService(
      movieRepository,
      movieCsvReader
    );
    const importMoviesUseCase = new ImportMoviesUseCase(movieImportService);

    await importMoviesUseCase.execute();
    console.log("Movies imported successfully.");
  } catch (error) {
    console.error("Error during movie import:", error);
  } finally {
    await connection.close();
  }
}

main().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
