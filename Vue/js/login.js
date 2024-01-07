document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                email: email,
                mdp: password,
            }),
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('jwtToken', data.token);
            // Stocker le token dans un cookie
            document.cookie = `jwtToken=${data.token}; path=/; expires=${new Date(Date.now() + 604800000).toUTCString()}`; // expire dans 7 jours

            alert('Vous êtes bien connecté');

            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = redirectButtons;
        } else {
            alert('Échec de la connexion');
        }
    } catch (error) {
        console.error('Erreur : ' + error.stack);
        alert('Erreur');
    }
});
