const { connect } = require("../config/connectiondb.js");

let componente = {};

componente.read = async function (req, res) {
  try {
    const con = await connect();
    let componentes = await con.query("SELECT * FROM componentes;");
    res.send(componentes);
    console.log("Busca efetuada com sucesso");
  } catch (e) {
    console.log("Ocorreu um erro ao buscar as componentes!", e);
  }
};

componente.create = async function (req, res) {
  try {
    const con = await connect();
    let componente = req.body;
    let sql =
      "INSERT INTO componente(codigo_componente, nome_componente, desc_componente) VALUES (?,?,?);";
    let values = [
      componente.codigo_componente,
      componente.nome_componente,
      componente.desc_componente,
    ];
    let result = await con.query(sql, values);
    res.send({
      status: "Inserção efetuada com sucesso",
      result: result,
    });
    console.log("Inserção efetuada com sucesso");
  } catch (e) {
    console.log("Ocorreu um erro ao inserir o registro", e);
  }
};

componente.update = async function (req, res) {
  try {
    const con = await connect();
    let componenteId = req.params.codigo_componente;
    let componenteEditada = req.body;

    let sql =
      "UPDATE componente SET nome_componente=?, desc_componente=? WHERE codigo_componente=?;";
    let values = [
      componenteId,
      componenteEditada.nome_componente,
      componenteEditada.desc_componente,
    ];

    let result = await con.query(sql, values);
    res.send({
      status: "Edição feita com sucesso",
      result: result,
    });
    console.log("Edição feita com sucesso");
  } catch (e) {
    console.log("Ocorreu um erro ao editar/achar esse registro", e);
  }
};

componente.delete = async function (req, res) {
  try {
    const con = await connect();
    let componenteId = req.params.codigo_componente;

    let sql = "DELETE from componente where codigo_componente=?;";
    let result = await con.query(sql, [componenteId]);
    res.send({
      status: "Registro excluido com sucesso",
      result: result,
    });
    console.log("Registro excluido com sucesso");
  } catch (e) {
    console.log("Ocorreu um erro ao excluir esse registro", e);
  }
};


componente.search = async function (req, res) {
  const { codigo, nome } = req.query;
  try {
    const con = await connect();
    let sql = "SELECT * FROM  componente WHERE 1 ";
    if (codigo) {
      sql += `AND desc_componente LIKE '%${codigo}%'`;
    }
    if (nome) {
      sql += `AND nome_componente ='${nome} ';`;
    }
    const [result] = await con.query(sql);
    res.send({
      status: "Pesquisa feita com sucesso",
      result: result,
    });
    console.log("Pesquisa feita com sucesso");
    console.log(result);
  } catch (e) {
    console.log(
      "Ocorreu um erro ao pesquisar esse modelo e codigo de componente",
      e
    );
  }
};

module.exports = { componente };