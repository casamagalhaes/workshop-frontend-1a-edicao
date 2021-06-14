import { app } from "./config/server";
import { knex } from "./config/db";

console.log("[INFO] Iniciando migrações...");
knex.migrate.latest().then((_) => {
  console.log("[INFO] Migrações concluídas!");
  const port = process.env.PORT || 3000;
  app.listen(port);
  console.log(`[INFO] Aplicação disponível em http://localhost:${port}`);
});
