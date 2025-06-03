export function log(message: string): void {
  console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
}

export function validateMovieProps(props: any): boolean {
  const { year, title, studios, producers, winner } = props;
  return (
    typeof year === 'number' &&
    typeof title === 'string' &&
    Array.isArray(studios) &&
    Array.isArray(producers) &&
    typeof winner === 'boolean'
  );
}