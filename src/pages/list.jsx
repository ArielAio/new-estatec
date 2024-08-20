import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import AuthRoute from "../../lib/AuthRoute";


export default function Listar() {
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "job_posts"));
                const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setJobPosts(posts);
            } catch (err) {
                setError("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobPosts();
    }, []);

    const handleEdit = (id) => {
        router.push(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Você tem certeza que deseja excluir este item?")) {
            try {
                await deleteDoc(doc(db, "job_posts", id));
                setJobPosts(jobPosts.filter(post => post.id !== id));
            } catch (err) {
                setError("Erro ao excluir o item.");
            }
        }
    };

    if (loading) return <p className="text-center text-gray-500">Carregando...</p>;

    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
    <AuthRoute>

        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-4xl"> {/* Ajuste de padding e largura */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center animate-fadeIn">
                    Listagem de Estágios/Trabalhos
                </h1>
                {jobPosts.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhum estágio/trabalho cadastrado.</p>
                ) : (
                    <ul className="space-y-4">
                        {jobPosts.map((post) => (
                            <li
                                key={post.id}
                                className="border border-gray-300 rounded-lg p-4 shadow-sm transform transition-transform duration-500 hover:scale-105 hover:shadow-xl animate-fadeIn"
                            >
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{post.company_name}</h2>
                                <p className="text-gray-600">Tipo: {post.type === "internship" ? "Estágio" : "Trabalho"}</p>
                                <p className="text-gray-600">Requisitos: {post.requirements}</p>
                                <p className="text-gray-600">Salário/Bolsa: {post.salary_or_stipend}</p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0"> {/* Flex column for small screens */}
                                    <button
                                        onClick={() => handleEdit(post.id)}
                                        className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform duration-300 transform hover:scale-105"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </main>
    </AuthRoute>

    );
}
