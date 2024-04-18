import { PrismaClient } from "@prisma/client";

export default function handler (req, res){
  if (req.method === "GET"){
    return handleGetUsuarios(req, res);
  }
  if (req.method === "POST"){
    return handlePostUsuario(req, res);
  }
  res.status(405).send({});
}

async function handleGetUsuarios(req, res){
  const prisma = new PrismaClient();
  const usuarios = await prisma.usuario.findMany({
    include: {
      papel: true,
    }
  });
  console.log(usuarios.papel);
  res.status(200).send(usuarios);
}

async function handlePostUsuario(req, res){
  const prisma = new PrismaClient();
  const {nome, email, senha, papel_id} = req.body;
  console.error(nome, email, senha, papel_id);
  const usuario = await prisma.usuario.create({
    data:{
      nome,
      email,
      senha,
      papel_id
    }
  })
  res.status(201).send(usuario);
}