document.getElementById('RegisterForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const mdp = document.getElementById('mdp').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:8000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
            },
            body: JSON.stringify({
                nom: nom,
                prenom: prenom,
                email: email,
                mdp: mdp,
            }),
        });

        if (response.ok) {
            // Utilisateur créé avec succès
            alert('Utilisateur créé avec succès');

            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = redirectButtons;
        } else {
            // Si le serveur renvoie un statut d'erreur
            const errorData = await response.json();
            alert(`Erreur du serveur: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Erreur : ' + error.stack);
        alert('Erreur');
    }
});
