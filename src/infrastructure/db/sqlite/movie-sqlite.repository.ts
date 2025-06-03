import { promisify } from "util";
import { Movie } from "../../../domain/movie.entity";
import { MovieGateway } from "../../../domain/movie.gateway";

export class MovieSqliteRepository implements MovieGateway {
  private connection: any;
  private runAsync: any;
  private allAsync: any;

  constructor(connection: any) {
    this.connection = connection;
    this.runAsync = promisify(this.connection.run.bind(this.connection));
    this.allAsync = promisify(this.connection.all.bind(this.connection));
  }

  async init(): Promise<void> {
    const dropTableQuery = `
      DROP TABLE IF EXISTS movies;
    `;
    await this.runAsync(dropTableQuery);

    const createTableQuery = `
      CREATE TABLE movies (
        year INTEGER,
        title TEXT,
        studios TEXT,
        producers TEXT,
        winner BOOLEAN
      )
    `;
    await this.runAsync(createTableQuery);
  }

  async save(movie: Movie): Promise<void> {
    const query =
      "INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)";
    const params = [
      movie.year,
      movie.title,
      JSON.stringify(movie.studios),
      JSON.stringify(movie.producers),
      movie.winner,
    ];
    await this.runAsync(query, params);
  }

  async findAll(): Promise<Movie[]> {
    const query = "SELECT * FROM movies";
    const rows = await this.allAsync(query);
    return rows.map(
      (row: any) =>
        new Movie({
          year: row.year,
          title: row.title,
          studios: JSON.parse(row.studios),
          producers: JSON.parse(row.producers),
          winner: row.winner,
        })
    );
  }
}
