'use client'
import { api } from "@/api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Papeis(){
  const [papeis, setPapeis] = useState([]);

  const PapelSchema = yup.object().shape({
    nome: yup.string("O nome precisa ser uma string").required("Nome é obrigatório"),
    nivel_acesso: yup.number("O nível de acesso necessita ser um número").required("Nível de acesso é obrigatório") 
  })

  const router = useRouter();

  const {
    register, 
    handleSubmit, 
    formState:{ errors },
  } = useForm({ resolver: yupResolver(PapelSchema)});

  const onSubmit = (data) => {
    api.post("/api/papeis", data)
      .then((data) => {
        toast("Cadastrado com sucesso");
        router.replace("/papeis");
      })
  }
  return (
    <div className="flex justify-center items-center w-full h-full p-2">
       <div className=" w-1/2 h-1/2 flex flex-col gap-3 justify-center bg-gray-400 rounded-xl">
        <h1 className="p-2 self-center">Papéis</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-2">
          <div className="flex flex-col">
            <span>Nome</span>
            <input type="text" {...register("nome")} className="border rounded-md" />
            {errors.nome? <span className=" self-start text-red-600 text-sm">{errors.nome.message}</span>: null}
          </div>
          <div className="flex flex-col">
            <span>Nivel Acesso</span>
            <input type="number" {...register("nivel_acesso")} className="border rounded-md" />
            {errors.nivel_acesso? <span className=" self-start text-red-600 text-sm">{errors.nivel_acesso.message}</span>: null}
          </div>
          <div>
            <button type="submit" className="text-center w-full rounded-xl bg-green-300 p-2">
              Cadastrar
            </button>
          </div>
        </form>

       </div>   

    </div>
  )
}