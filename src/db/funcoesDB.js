import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("./doma.db");

export function CriarDB() {
  const retorno = db.runSync(
    `CREATE TABLE IF NOT EXISTS perfil (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, estado INTEGER);`
  );
  console.log("tabela criada com sucesso");
}

export function buscarUmRegistro() {
    const retorno = db.getAllSync(`SELECT * FROM perfil`);
    console.log("Dados do perfil ativo:", retorno);
}
export function apagarTabela() {
    const retorno = db.runSync(`DROP TABLE perfil;`);
    console.log('tabela apagada com sucesso');
}

export function inserirRegistro(texto) {
    const retorno = db.runSync(`INSERT INTO perfil (nome, estado) VALUES (?, ?)`, texto, 1);
    console.log('Registro inserido',retorno);
}
