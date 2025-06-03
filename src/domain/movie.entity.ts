export type MovieProps = {
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
};

export class Movie {
  private readonly props: MovieProps;

  constructor(props: MovieProps) {
    this.props = props;
  }

  get year(): number {
    return this.props.year;
  }

  get title(): string {
    return this.props.title;
  }

  get studios(): string[] {
    return this.props.studios;
  }

  get producers(): string[] {
    return this.props.producers;
  }

  get winner(): boolean {
    return this.props.winner;
  }
}