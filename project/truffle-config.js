module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",   // Localhost (no HTTP)
      port: 7546,          // Ganache default port
      network_id: "*",     // Match any network id (Ganache usually 5777)
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.21",   // Match the version used to compile
    },
  },
};
