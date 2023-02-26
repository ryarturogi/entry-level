const RepositoryProgram = (clientName) => {
  const repository = {
    clientName,

    init: (databaseStrategy) => {
      return databaseStrategy;
    },
  };

  return repository;
};

// Instantiate the `RepositoryProgram` with a client name
const Repository = (clientName) => RepositoryProgram(clientName);

export default Repository();
