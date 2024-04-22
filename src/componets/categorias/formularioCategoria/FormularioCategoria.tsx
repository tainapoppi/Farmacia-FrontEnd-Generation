import { ChangeEvent, Dispatch, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";


function FormularioCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  let navigate = navigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });

    console.log(JSON.stringify(categoria));
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: {
            Authorization: token,
          },
        });

        alert("Categoria atualizado com sucesso");
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          alert("O token expirou, favor logar novamente");
          handleLogout();
        } else {
          alert("Erro ao atualizar o Categoria");
        }
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: {
            Authorization: token,
          },
        });

        alert("Categoria cadastrada com sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          alert("O token expirou, favor logar novamente");
          handleLogout();
        } else {
          alert("Erro ao cadastrado a Categoria");
        }
      }
    }

    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastre um novo tema" : "Editar categoria"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição da categoria</label>
          <input
            type="text"
            placeholder="Descrição"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
          type="submit"
        >
          {id === undefined ? "Cadastrar" : "Editar"}
        </button>
      </form>
    </div>
  );
}

export default FormularioCategoria;

function useParams<T>(): { id: any; } {
    throw new Error("Function not implemented.");
}


function buscar(_arg0: string, _setCategoria: Dispatch<any>, _arg2: { headers: { Authorization: any; }; }) {
    throw new Error("Function not implemented.");
}


function atualizar(_arg0: string, _categoria: Categoria, _setCategoria: Dispatch<any>, _arg3: { headers: { Authorization: any; }; }) {
    throw new Error("Function not implemented.");
}


function cadastrar(_arg0: string, _categoria: Categoria, _setCategoria: Dispatch<any>, _arg3: { headers: { Authorization: any; }; }) {
    throw new Error("Function not implemented.");
}
