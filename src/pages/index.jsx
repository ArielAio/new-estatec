import { useRouter } from "next/router";
import AuthRoute from "../../lib/AuthRoute";
import LogoutButton from "../../lib/LogoutButton";


export default function Home() {
  const router = useRouter();

  const handleCadastrar = () => {
    router.push("/createWork");
  };

  const handleListar = () => {
    router.push("/list");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redireciona para a página de login após o logout
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };


  return (
    <AuthRoute>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4 animate-fadeIn">
            Bem-vindo ao <span className="text-blue-500">Estatec</span>
          </h1>
          <p className="text-gray-600 text-center mb-6 animate-fadeIn delay-150">
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

            <LogoutButton />
          </div>
        </div>
      </main>
    </AuthRoute>
  );
}