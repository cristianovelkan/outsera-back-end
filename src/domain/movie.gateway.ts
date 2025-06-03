import { MovieProps } from "./movie.entity";

export interface MovieGateway {
  save(movie: MovieProps): Promise<void>;
  findAll(): Promise<MovieProps[]>;
}
