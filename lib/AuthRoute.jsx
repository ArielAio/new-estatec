import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Oval } from 'react-loader-spinner'; 

const AuthRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
                <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                />
            </div>
        );
    }

    return user ? children : null;
};

export default AuthRoute;
