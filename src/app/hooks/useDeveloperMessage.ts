import { useEffect } from 'react';

const useDeveloperMessage = () => {
    useEffect(() => {
        if (!localStorage.getItem('hasLoggedDeveloperMessage')) {
            console.log(
                '%cHello developers! The About page has a link to the source code :)',
                'background-color:#005234;color:#baffe6;font-size:1.125rem;padding:1rem;border-radius:0.5rem;text-align:center',
            );

            localStorage.setItem('hasLoggedDeveloperMessage', 'true');
        }

        const beforeUnloadHandler = () => {
            localStorage.removeItem('hasLoggedDeveloperMessage');
        };

        window.addEventListener('beforeunload', beforeUnloadHandler);
    }, []);
};

export default useDeveloperMessage;
