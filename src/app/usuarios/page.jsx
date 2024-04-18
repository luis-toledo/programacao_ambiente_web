'use client'
import { api } from "@/api-client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios(){
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    api.get("api/usuarios")
      .then(res => setUsuarios(res.data) );
  },
  []);
  return(
    <div className="flex justify-center items-center w-full h-full p-2">
       <div className=" w-1/2 h-1/2 flex flex-col gap-3 justify-center">
       <h1 className="p-2 self-center">Usuários</h1>
       <ul className="flex flex-col gap-3">
        {usuarios.map((usuario) => {
          return <li key={usuario.id} className="p-2 border-dashed border-2 border-blue-500 rounded-md">
            {usuario.nome} - {usuario.email} - {usuario.papel.nome} - <Link href={"/usuarios/" + usuario.id}>+Detalhes</Link> 
          </li>
        })}      
       </ul>
       <Link 
          className="w-full bg-green-500 text-white rounded-xl p-2 text-center" 
          href="/usuarios/novo"
        >
          Cadastrar novo Usuário
        </Link>
      </div>
    </div>  
  );
}