class RepositoryProgram {
  constructor(clientName) {
    this.clientName = clientName;
  }
  init(databaseStrategy) {
    return databaseStrategy;
  }
}
// instantiate the `RepositoryProgram` with an service name
const Repository = (clientName) => new RepositoryProgram(clientName);

export default Repository();
