import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js";
const {bruxos, varinhas, pocoes, animais} = dados;

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT;

app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

app.get('/bruxos', (req, res) => {
    const {casa, ano, especialidade, nome} = req.query;
    let resultado = bruxos;
  
    if (casa) {
      resultado = resultado.filter(b => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }
  
    if (ano) {
      resultado = resultado.filter(b => b.ano == ano);
    }
  
    if (especialidade) {
      resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }
  
    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
  
    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

app.post("/bruxos", (req, res) => {
    const {nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body;

    if (!nome || !casa || !ano || !vivo) {
        return res.status(400).json({
            sucess: false,
            message: "nome, casa, ano e estar vivo são obrigatórios para um bruxo!"
        });
    }
        const novoBruxo = {
            id: bruxos.length + 1,
            nome,
            casa: casa,
            ano: parseInt(ano),
            varinha: varinha || "Ainda não definida",
            mascote: mascote || "Ainda não definido",
            patrono: patrono || "Ainda não definido",
            especialidade: especialidade || "Ainda não definido",
            vivo: vivo 
        }
    

    bruxos.push(novoBruxo);

    res.status(201).json({
        sucess: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    });
});

app.get("/varinhas", (req, res) => {
  const {material, nucleo, comprimento} = req.query;
  let resultado = varinhas;

  if (material) {
    resultado = resultado.filter(b => b.material.toLowerCase().includes(material.toLowerCase()));
  }

  if (nucleo) {
    resultado = resultado.filter(b => b.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
  }

  if (comprimento) {
    resultado = resultado.filter(b => b.comprimento.toLowerCase().includes(comprimento.toLowerCase()));
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado
  });
});

app.post("/varinhas", (req, res) => {
  const {material, nucleo, comprimento} = req.body;

  if (!material || !nucleo || !comprimento) {
    return res.status(400).json({
      sucess: false,
      massage: "Material, nucleo e comprimento são obrigatórios para uma varinha"
    });
  }

  const novaVarinha = {
    id: varinhas.length + 1,
    material,
    nucleo,
    comprimento
  }

  varinhas.push(novaVarinha);

  res.status(201).json({
    sucess: true,
    message: "Nova varinha adicionada",
    data: novaVarinha
  });
});

app.get("/pocoes", (req, res) => {
  const {nome, efeito} = req.query;
  let resultado = pocoes;

  if (nome) {
    resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  if (efeito) {
    resultado = resultado.filter(b => b.efeito.toLowerCase().includes(efeito.toLowerCase()));
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado
  });
});

app.get("/animais", (req, res) => {
    const {nome, tipo} = req.query;
    let resultado = animais;

    if (nome) {
      resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }
    if (tipo) {
      resultado = resultado.filter(b => b.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }

    res.status(200).json({
      total: resultado.length,
      data: resultado
    });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});