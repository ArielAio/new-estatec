import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleCadastrar = () => {
    router.push("/createWork");
  };

  const handleListar = () => {
    router.push("/list");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transform transition-transform duration-500 hover:scale-105 hover:shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-fadeIn">
          Bem-vindo ao <span className="text-blue-500">Estatec</span>
        </h1>
        <p className="text-gray-600 text-center mb-8 animate-fadeIn delay-150">
          Selecione uma das opções abaixo para continuar:
        </p>
        <div className="flex flex-col space-y-4 animate-fadeIn delay-300">
          <button
            onClick={handleCadastrar}
            className="w-full py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
          >
            Cadastrar Estágio/Trabalho
          </button>
          <button
            onClick={handleListar}
            className="w-full py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-transform duration-300 transform hover:scale-105"
          >
            Listar Estágio/Trabalho
          </button>
        </div>
      </div>
    </main>
  );
}
