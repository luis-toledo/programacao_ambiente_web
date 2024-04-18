'use client'
import { api } from "@/api-client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Papeis(){
  const [papeis, setPapeis] = useState([]);
  useEffect(() => {
    api.get("/api/papeis")
      .then(res => setPapeis(res.data));
  },[])
  return(
    <div className="flex justify-center items-center w-full h-full p-2">
      <div className=" w-1/2 h-1/2 flex flex-col gap-3 justify-center">
        <h1 className="p-2 self-center">Papéis</h1>
        <ul className="flex flex-col gap-3">
          {papeis.map((papel) => {
            return <li key={papel.id} className="p-2 border-dashed border-2 border-blue-500 rounded-md">
              {papel.nome} - {papel.nivel_acesso} - <Link href={"/papeis/" + papel.id}>+Detalhes</Link>
            </li>;
          })}
        </ul>
        <Link 
          className="w-full bg-green-500 text-white rounded-xl p-2 text-center" 
          href="/papeis/novo"
        >
          Cadastrar novo Papel
        </Link>
      </div>
    </div>
  );
}