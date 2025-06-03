# Movie CSV Importer

## Overview

The Movie CSV Importer is a TypeScript application designed to read movie data from a CSV file and insert it into an embedded Sqlite database. The project follows a clean architecture structure, separating concerns into distinct layers: application, domain, infrastructure, and interfaces.

## Project Structure

```
outsera-back-end
├── src
│   ├── application
│   │   ├── services
│   │   │   └── movie-import.service.ts
│   │   └── use-cases
│   │       └── import-movies.usecase.ts
│   ├── domain
│   │   ├── movie.entity.ts
│   │   └── movie.gateway.ts
│   ├── infrastructure
│   │   ├── db
│   │   │   ├── sqlite
│   │   │   │   ├── sqlite-connection.ts
│   │   │   │   └── movie-sqlite.repository.ts
│   │   └── csv
│   │       └── movie-csv.reader.ts
│   ├── interfaces
│   │   └── cli
│   │       └── main.ts
│   └── shared
│       └── utils.ts
├── movies.csv
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **CSV Reading**: The application can read movie data from a CSV file.
- **Database Integration**: It uses an embedded SQLITE database to store movie records.
- **Clean Architecture**: The project is organized into layers, promoting separation of concerns and maintainability.

## Getting Started

### Prerequisites

- Node.js
- TypeScript

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd outsera-back-end
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Importing Movies

To import movies used by the api, execute the following command:

```
npm run import
```

This will initialize the application, establish a connection to the SQLITE database, read the `movies.csv` file, and import the movie data into the database.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
