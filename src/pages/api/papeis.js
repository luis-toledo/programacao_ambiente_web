import { PrismaClient } from "@prisma/client";

export default function handler(req, res) {
  if(req.method === 'GET'){
    return handlerGetPapeis(req, res);
  }
  if(req.method === 'POST'){
    return handlerPostPapel(req, res);
  }
  res.satus(405).send({});
}

async function handlerGetPapeis(req, res){
  const prisma = new PrismaClient();
  console.log('PASSEI AQUI');
  const papeis = await prisma.papel.findMany();
  res.status(201).send(papeis);
}

async function handlerPostPapel(req, res){
  const prisma = new PrismaClient();
  const { nome, nivel_acesso } = req.body;
  const papel = await prisma.papel.create({
    data: {
      nome,
      nivel_acesso
    }
  });
  res.status(201).send(papel);
}