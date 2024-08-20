import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-blue-500 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-center items-center">
                <h1 className="text-2xl font-bold">
                    <Link href="/" className="hover:underline">
                        Estatec
                    </Link>
                </h1>
            </div>
        </header>
    );
}
""