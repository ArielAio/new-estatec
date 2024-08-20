import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditWork() {
    const [type, setType] = useState("internship");
    const [companyName, setCompanyName] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salaryOrStipend, setSalaryOrStipend] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const docRef = doc(db, "job_posts", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setType(data.type);
                        setCompanyName(data.company_name);
                        setRequirements(data.requirements);
                        setSalaryOrStipend(data.salary_or_stipend);
                    } else {
                        setError("Documento não encontrado.");
                    }
                } catch (err) {
                    setError("Erro ao carregar os dados.");
                }
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            try {
                const docRef = doc(db, "job_posts", id);
                await updateDoc(docRef, {
                    type,
                    company_name: companyName,
                    requirements,
                    salary_or_stipend: salaryOrStipend,
                });
                setSuccess("Atualização realizada com sucesso!");
                setError(null);
                router.push("/list");
            } catch (err) {
                setError("Erro ao atualizar, tente novamente.");
                setSuccess(null);
            }
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Editar Estágio/Trabalho
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Tipo:</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg w-full"
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
                        className="p-3 border border-gray-300 rounded-lg"
                        required
                    />
                    <textarea
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        placeholder="Requisitos"
                        className="p-3 border border-gray-300 rounded-lg h-32"
                        required
                    />
                    <input
                        type="text"
                        value={salaryOrStipend}
                        onChange={(e) => setSalaryOrStipend(e.target.value)}
                        placeholder="Salário ou Bolsa"
                        className="p-3 border border-gray-300 rounded-lg"
                        required
                    />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Atualizar
                    </button>
                </form>
            </div>
        </main>
    );
}
