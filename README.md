# ✨ Express Typescript Starter ✨

A production-ready Express.js boilerplate built with TypeScript, designed to provide a robust, scalable, and secure foundation for your next Node.js API project. This template comes with essential features like strong security, high code quality, and developer-friendly tools, enabling you to focus on building your application while ensuring maintainability and performance right from the start.

## 🌟 Key Features

### 🛠 Core Functionality

- **Web framework**: Fast and minimalist web application framework using [express](https://www.npmjs.com/package/express)
- **Logging**: Advanced logging with [winston](https://www.npmjs.com/package/winston) and [morgan](https://www.npmjs.com/package/morgan)
- **Schema validation**: Ensure the integrity of incoming requests (query params, body) using [zod](https://www.npmjs.com/package/zod)
- **Environment Variable Management**: Ensures all required environment variables are present and properly validated using [zod](https://www.npmjs.com/package/zod)
- **Error handling**: Comprehensive error management system
- **Signal handling**: Gracefully handles OS signals like `SIGTERM` and `SIGINT` to ensure proper cleanup and shutdown of the application
- **API Documentation**: Automatic OpenAPI/Swagger documentation generation using [zod-openapi](https://www.npmjs.com/package/zod-openapi), seamlessly integrated with Zod schemas to provide always up-to-date API documentation

### 🔒 Security Features

- **CORS protection**: Manage cross-origin requests with [cors](https://www.npmjs.com/package/cors)
- **Helmet**: Help secure Express apps by setting HTTP response headers with [helmet](https://www.npmjs.com/package/helmet)
- **Rate limiting**: Safeguard the API against excessive requests and potential DDoS attacks with efficient middleware provided by [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- **Secure authentication**: Robust JWT-based authentication implemented using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [jwks-rsa](https://www.npmjs.com/package/jwks-rsa) and [jwt-decode](https://www.npmjs.com/package/jwt-decode). Public keys are fetched from Microsoft’s identity platform, tokens are decoded and verified, and user informations (like `username` and `groups`) are extracted. Tokens are validated against audience and issuer claims to ensure only authorized clients can access the API.

### 💻 Code Quality

- **Code formatting**: Consistent code style with [oxfmt](https://www.npmjs.com/package/oxfmt)
- **Linting**: Enforce best practices and maintainable code with [oxlint](https://www.npmjs.com/package/oxlint)
- **Code Quality Monitoring**: Integrated [SonarQube](https://www.sonarqube.org/) configuration for continuous code quality assessment and static analysis
- **Pre-commit Hooks with Husky**: Ensure quality code by running tests, linting and formatting checks before committing the code using [husky](https://www.npmjs.com/package/husky).

  ```json
  {
    "*.{js,jsx,ts,tsx}": ["npm run lint:fix"],
    "*.{js,jsx,ts,tsx,md,html,css,json}": ["npm run format"]
  }
  ```

  The configuration runs the following tasks:
  - Run tests to prevent commits that would break the test suite
  - Lint `JavaScript`, `TypeScript`, and `JSX` files with oxlint (auto-fixing issues where possible)
  - Format `JavaScript`, `TypeScript`, `Markdown`, `HTML`, `CSS`, and `JSON` files using oxfmt.

### 📖 API Documentation

This boilerplate includes automatic OpenAPI/Swagger documentation generation that keeps your API docs always in sync with your code.

#### Features

- **Automatic Generation**: Documentation is automatically generated from your Zod schemas using `zod-openapi`
- **Type Safety**: Leverages TypeScript and Zod for type-safe API definitions
- **Multiple Formats**: Generates both JSON and YAML formats for maximum compatibility
- **Rich Descriptions**: Supports detailed descriptions, examples, and metadata for each endpoint

#### Usage

1. **Generate Documentation**: Run `npm run openapi` to generate the latest API documentation
2. **View Documentation**: The generated files are saved in the `docs/` directory:
   - `docs/openapi.json` - JSON format for programmatic use
   - `docs/openapi.yaml` - YAML format for human readability
3. **Schema Definitions**: API schemas are defined in `src/models/` with OpenAPI extensions
4. **Route Definitions**: OpenAPI route configurations are in `src/openapi/routes/`

#### Example Schema Definition

```typescript
import { z } from 'zod'

export const userSchema = z
  .strictObject({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    email: z.string().email(),
  })
  .meta({
    description: 'User object with basic information',
    id: 'User'
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  })
```

The documentation can be viewed using any OpenAPI/Swagger UI tool or integrated into your API gateway.

### 🧪 Testing and Coverage

- **Unit testing**: Powered by [vitest](https://www.npmjs.com/package/vitest) and [supertest](https://www.npmjs.com/package/supertest)
- **Mocking**: Mocks HTTP requests using [nock](https://www.npmjs.com/package/nock)
- **Code coverage**: Ensure high code quality and test coverage with Vitest’s built-in coverage reporting

### ⚡ Performance Optimization

- **Hot-reload**: Streamline development with automatic server reload using Node's native `--watch`

### 🔑 Secrets Management

- **Azure Key Vault Integration**: Securely manage secrets using [azure/identity](https://www.npmjs.com/package/@azure/identity) and [azure/keyvault-secrets](https://www.npmjs.com/package/@azure/keyvault-secrets)

### 🐳 Deployment

- **Docker support**: Containerization for easy deployment

### 📚 Additional Libraries

- **HTTP Status Codes**: Simplified status code management with [http-status-codes](https://www.npmjs.com/package/http-status-codes)

## 🚀 Getting Started

1. Clone the repository
   ```sh
   git clone https://github.com/ToniR7/express-typescript-starter.git
   cd express-typescript-starter
   ```
2. Install dependecies: `npm install`
3. Set up your environment variables (you can use the `.env.example` file to create your own `.env` file)
4. Run the development server: `npm run dev`

## 📦 Project Structure

```
project-name/
│
├── .husky/                   # Git hooks managed by Husky
│   └── pre-commit            # Pre-commit hook to run checks (linting, formatting)
│
├── dist/                     # Compiled output (generated by TypeScript)
├── docs/                     # Generated documentation
│   ├── openapi.json          # OpenAPI specification in JSON format
│   └── openapi.yaml          # OpenAPI specification in YAML format
├── node_modules/             # Installed dependencies
│
├── src/                      # Source code
│   ├── apis/                 # Request handlers for different routes
│   ├── environment/          # Configuration and environment variable management
│   ├── errors/               # Custom errors definition
│   ├── logger/               # Logging utilities (Winston and Morgan)
│   ├── middlewares/          # Express middleware functions (authentication, validation, error handling, rate limit)
│   ├── models/               # Schemas definition (Zod schemas with OpenAPI extensions)
│   ├── openapi/              # OpenAPI documentation generation
│   ├── routes/               # API route definitions
│   ├── typings/              # TypeScript type definitions and interfaces
│   ├── utils/                # Utility functions and helper modules
│   └── app.ts                # Entry point of the application, initializes the server
│
├── .dockerignore             # Files and directories to exclude from Docker builds
├── .env                      # Environment variables (local development)
├── .env.test                 # Example environment variables file (for documentation)
├── .gitignore                # Files and directories to ignore in Git
├── .lintstagedrc             # Configuration for lint-staged to run linting and formatting on staged files
├── .nvmrc                    # Specifies the Node.js version to use (for nvm compatibility)
├── .oxfmtrc.json             # Oxfmt configuration file for code formatting
├── .oxlintrc.json            # Oxlint configuration for linting the codebase
├── azure-pipelines.yml       # Azure DevOps pipeline configuration for CI/CD
├── Dockerfile                # Instructions to build a Docker image of the project
├── package-lock.json         # Lockfile for package versions
├── package.json              # Project metadata, dependencies, and scripts
├── README.md                 # Project documentation and setup instructions
├── sonar-project.properties  # SonarQube configuration for code quality analysis
├── tsconfig.build.json       # TypeScript configuration used for production builds
├── tsconfig.json             # Base TypeScript configuration for development and tooling
├── vitest.config.ts          # Vitest configuration for running tests
```

## 🧩 Scripts

### Test

- `npm run test`: Runs Vitest tests. It will execute all the test cases written in the project without coverage reporting.
- `npm run test:coverage`: Runs Vitest tests with coverage reporting. It generates a code coverage report showing which parts of the code are covered by tests.
- `npm run test:watch`: Runs Vitest tests in watch mode. It watches for changes in the codebase and automatically reruns tests when files are modified.

### Update

- `npm run updates`: Runs npm-check-updates, a tool that checks for the latest versions of dependencies in the package.json and shows which packages can be updated.
- `npm run updates:upgrade`: Automatically update the versions of dependencies in the package.json to the latest versions.

### Dependencies

- `npm run depcheck`: Runs depcheck, a tool that checks how each dependency is used, which dependencies are useless, and which dependencies are missing from package.json

### Documentation

- `npm run openapi`: Generates OpenAPI/Swagger documentation from Zod schemas. Creates _openapi.json_ and _openapi.yaml_ files containing the complete API specification that can be used with Swagger UI or other OpenAPI tools.

### Linting and Formatting

- `npm run lint`: Runs oxlint to check for issues in the code. It will output warnings and errors according to the rules defined in the oxlint configuration.
- `npm run lint:fix`: Runs oxlint with the --fix flag, which automatically fixes any issues it can. It’s useful for cleaning up common problems.
- `npm run format`: Runs oxfmt to format the code. It will rewrite the code to follow a consistent style, ensuring things like indentation and line breaks are uniform across the codebase.
- `npm run format:check`: Runs oxfmt in check mode. It verifies that files conform to the formatting rules without modifying them, returning a non-zero exit code if differences are found (useful for CI pipelines).
- `npm run lint-staged`: Runs lint-staged, which executes oxlint and oxfmt only on staged files according to the configuration in .lintstagedrc. This allows for faster pre-commit checks by only processing files that are about to be committed rather than the entire codebase.

### Development

- `npm run dev`: Runs the development server. This tool watches for changes in TypeScript files and automatically restarts the server.
- `npm run debug`: Runs the server in debugging mode using the --inspect flag. This allows to attach a debugger to the Node.js process, enabling step-through debugging.

### Build and Production

- `npm run build`: Compiles the TypeScript code to JavaScript using tsc. It then runs tsc-alias to fix any path aliases in the compiled JavaScript files. This is typically used before deploying to production.
- `npm run prod`: Runs the compiled JavaScript in the dist/ directory. This script is for running the app in production, where the TypeScript code has already been compiled to JavaScript.

### Husky Prepare

- `npm run prepare`: Runs the Husky setup. It prepares the Git hooks (like pre-commit hooks) by setting up the necessary files. This is typically used after installing or updating Husky.

## 🔍 Code Quality & Analysis

### SonarQube Integration

This project includes SonarQube configuration for continuous code quality monitoring and static analysis.

#### Configuration

The `sonar-project.properties` file includes:

- **Project identification**: Configures project key and name for SonarQube
- **Source analysis**: Analyzes TypeScript source files in the `src/` directory
- **Test coverage**: Integrates with Vitest coverage reports (`coverage/lcov.info`)
- **Quality exclusions**: Excludes test files, configuration files, and generated documentation from quality analysis

#### Key Features

- **Code Smells**: Identifies maintainability issues and technical debt
- **Security Hotspots**: Detects potential security vulnerabilities
- **Coverage Analysis**: Tracks test coverage and identifies untested code
- **Duplication Detection**: Finds duplicated code blocks
- **Quality Gates**: Enforces quality standards before code deployment

#### Usage

1. Configure your SonarQube server connection
2. Run tests with coverage: `npm run test:coverage`
3. Execute SonarQube analysis using your preferred method (CLI, CI/CD pipeline)
4. Review quality reports in your SonarQube dashboard

The configuration excludes certain files from analysis to focus on application logic while maintaining comprehensive coverage of critical code paths.

## 👊🏻 Contributing

We welcome contributions through:

- 🐛 Bug Reports
- 💡 Feature Requests
- 📚 Documentation Improvements
- 🛠️ Code Contributions
