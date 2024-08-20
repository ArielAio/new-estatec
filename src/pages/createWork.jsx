import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import AuthRoute from "../../lib/AuthRoute";


export default function CreateWork() {
    const [type, setType] = useState("internship");
    const [companyName, setCompanyName] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salaryOrStipend, setSalaryOrStipend] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "job_posts"), {
                type,
                company_name: companyName,
                requirements,
                salary_or_stipend: salaryOrStipend,
            });
            setSuccess("Cadastro realizado com sucesso!");
            setError(null);
            router.push("/");
        } catch (err) {
            setError("Erro ao cadastrar, tente novamente.");
            setSuccess(null);
        }
    };

    return (
    <AuthRoute>

        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                    Cadastrar Estágio/Trabalho
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Tipo:</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg w-full transition-transform duration-300 hover:scale-105"
                        >
                            <option value="internship">Estágio</option>
                            <option value="job">Trabalho</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Nome da Empresa"
                        className="p-3 border border-gray-300 rounded-lg transition-transform duration-300 hover:scale-105"
                        required
                    />
                    <textarea
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Requisitos"
                        className="p-3 border border-gray-300 rounded-lg h-32 transition-transform duration-300 hover:scale-105"
                        required
                    />
                    <input
                        type="text"
                        value={salaryOrStipend}
                        onChange={(e) => setSalaryOrStipend(e.target.value)}
                        placeholder="Salário ou Bolsa"
                        className="p-3 border border-gray-300 rounded-lg transition-transform duration-300 hover:scale-105"
                        required
                    />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </main>
    </AuthRoute>

    );
}
