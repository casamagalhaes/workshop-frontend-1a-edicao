module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./worker-control.db",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./worker-control-test.db",
    },
    useNullAsDefault: true,
  },
};
