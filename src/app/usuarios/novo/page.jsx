'use client'
import { api } from "@/api-client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
export default function Usuarios(){
  const [usuarios, setUsuarios] = useState([]);
  const [papeis, setPapeis] = useState([]);
  useEffect(() => {
    api.get("/api/papeis")
      .then((res) => setPapeis(res.data))
  }, [])
  
  const UsuarioSchema = yup.object().shape({
    nome: yup.string("O nome precisa ser uma string").required("Nome é obrigatório"),
    email: yup.string("O email precisa ser uma string").email("Email é obrigatório").required(),
    senha: yup.string("O nome precisa ser uma string").required("Senha é obrigatória"),
    papel_id: yup.string("O nome precisa ser uma string").required("Papel é obrigatório")
  })

  const router = useRouter();

  const {
    register,
    handleSubmit, 
    formState: {errors}
  } = useForm ({ resolver: yupResolver(UsuarioSchema)});

  const onSubmit = (data) => {
    api.post("/api/usuarios", data)
      .then((data) => {
        toast("Usuário cadastrado com sucesso");
        router.replace("/usuarios");
      })
  };
  return (
    <div className="flex justify-center items-center w-full h-full p-2">
      <div className=" w-1/2 h-1/2 flex flex-col gap-3 justify-center bg-gray-400 rounded-xl">
        <h1 className="p-2 self-center">Usuários</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-2">
          <div className="flex flex-col">
            <span>Nome</span>
            <input type="text" {...register("nome")} className="border rounded-md"/>
            {errors.nome ? <span className=" self-start text-red-600 text-sm">{errors.nome.message}</span> : null}
          </div>
          <div className="flex flex-col">
            <span>Email</span>
            <input type="email" {...register("email")} className="border rounded-md"/>
            {errors.email ? <span className=" self-start text-red-600 text-sm">{errors.email.message}</span> : null}
          </div>
          <div className="flex flex-col">
            <span>Senha</span>
            <input type="password" {...register("senha")} className="border rounded-md"/>
            {errors.senha ? <span className=" self-start text-red-600 text-sm">{errors.senha.message}</span> : null}
          </div>
          <div className="flex flex-col">
            <span>Papeis</span>
            <select {...register("papel_id")} className="border rounded-md" >
              {papeis.map((papel) => {
                return <option key={papel.id} value={papel.id} >
                  {papel.nome}
                </option>
              })}
            </select>
            {errors.papel_id ? <span className=" self-start text-red-600 text-sm">{errors.papel_id.message}</span>: null}
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