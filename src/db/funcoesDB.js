import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("./doma.db");

export function CriarDB() {
  const retorno = db.runSync(
    `CREATE TABLE IF NOT EXISTS perfil (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, estado INTEGER);`,
  );
  console.log("Tabela criada");
}

export function buscarUmRegistro() {
  const retorno = db.getFirstSync(`SELECT * FROM perfil order by id desc`);
  console.log("Perfil ativo:", retorno);
  return retorno;
}
export function apagarTabela() {
  const retorno = db.runSync(`DROP TABLE perfil;`);
  console.log("Tabela apagada");
}

export function inserirRegistro(texto) {
  const retorno = db.runSync(
    `INSERT INTO perfil (nome, estado) VALUES (?, ?)`,
    texto,
    1,
  );
  console.log("Perfil criado:", texto);
}

export function buscarTodosRegistros() {
  const retorno = db.getAllSync(`SELECT * FROM perfil`);
  console.log("Perfis:", retorno);
}
