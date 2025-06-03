import { MovieProps } from "../../domain/movie.entity";

export class MovieCsvReader {
  constructor(private readonly filePath: string) {}

  async readCsv(): Promise<MovieProps[]> {
    const fs = require("fs");
    const csv = require("csv-parser");

    return new Promise((resolve, reject) => {
      const movies: MovieProps[] = [];

      interface CsvRow {
        year: string;
        title: string;
        studios: string;
        producers: string;
        winner: string;
      }

      fs.createReadStream(this.filePath)
        .pipe(csv({ separator: ";" }))
        .on("data", (data: CsvRow) => {
          console.log("Processing row:", data.producers);
          const movie: MovieProps = {
            year: parseInt(data.year, 10),
            title: data.title,
            studios: data.studios
              .replace(/, and /g, ", ")
              .replace(/ and /g, ", ")
              .split(", ")
              .map((s) => s.trim()),
            producers: data.producers
              .replace(/, and /g, ", ")
              .replace(/ and /g, ", ")
              .split(", ")
              .map((s) => s.trim()),
            winner: data.winner === "yes",
          };
          movies.push(movie);
        })
        .on("end", (): void => {
          resolve(movies);
        })
        .on("error", (error: Error): void => {
          reject(error);
        });
    });
  }
}
