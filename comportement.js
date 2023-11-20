

document.addEventListener('DOMContentLoaded', function () {
    // Déclare la variable data en dehors des fonctions pour qu'elle soit accessible dans les deux
    let data;
    let i = 0;

    // Fonction pour mettre à jour le lecteur vidéo
    function mettreAJourLecteurVideo() {
        if (i < data.length) {
            // Lien complet de la vidéo YouTube
            var lienComplet = data[i]['url'];

            // Extrait uniquement l'ID de la vidéo de la partie du lien intéressante
            var videoId = lienComplet.split('.be/')[1];

            // Si l'ID est suivi d'autres paramètres (par exemple, si le lien inclut "&" pour d'autres informations), supprimez les paramètres après l'ID
            if (videoId.includes('&')) {
                videoId = videoId.split('&')[0];
            }


            // Met à jour l'attribut src de l'iframe avec le lien incorporé
            document.querySelector('iframe').setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?controls=0&mute=1&rel=0&showinfo=0');

            i++;

        }else {
            document.location.href="index.html"; 
        }
        
    }

    // Fonction pour tester le résultat
    function testresultat(reponse) {

        if (reponse == data[i - 1]['classement']) {

            const popup = document.getElementById('win');
            const closePopupButton = document.getElementById('closePopup-win');

            // Ouvrir le pop-up
            popup.style.display = 'block';

            // Fermer le pop-up
            closePopupButton.addEventListener('click', function () {
                mettreAJourLecteurVideo();
                popup.style.display = 'none';
            });
        }
        else {
            const popup = document.getElementById('lose');
            const closePopupButton = document.getElementById('closePopup-lose');

            // Ouvrir le pop-up
            popup.style.display = 'block';

            if (document.querySelector('html').getAttribute('lang')==='fr'){
                document.getElementById('bonne-reponse').textContent = "La bonne réponse était : " + data[i - 1]["classement"]
            } else{
                document.getElementById('bonne-reponse').textContent = "Pas français : " + data[i - 1]["classement"]
            }
            

            // Fermer le pop-up
            closePopupButton.addEventListener('click', function () {
                mettreAJourLecteurVideo();
                popup.style.display = 'none';
            });
        }
    }

    // Récupère les données de l'API
    fetch('..\api.json')
        .then(response => response.json())
        .then(result => {
            data = result; // Stocke les données dans la variable data

            // Appelle la fonction pour mettre à jour le lecteur vidéo au chargement de la page
            mettreAJourLecteurVideo();

            // Ajoute un gestionnaire d'événements pour le clic sur le bouton de soumission
            document.querySelector('#submit').addEventListener('click', function () {
                const selectElement = document.querySelector('#selectRang');
                const selectedOption = selectElement.options[selectElement.selectedIndex].value;

                testresultat(selectedOption);
            });
            document.querySelector('.agrandir').addEventListener('click', function () {
                if(document.querySelector('#video').classList.contains('test')){
                    document.querySelector('#video').classList.remove('test')
                    document.querySelector('#video').classList.add('testGrand')
                    document.querySelector('.agrandir img').setAttribute('src','../images/no-full.png')



                } else {
                    document.querySelector('#video').classList.add('test')
                    document.querySelector('#video').classList.remove('testGrand')
                    document.querySelector('.agrandir img').setAttribute('src','../images/full-screen-38.png')
                }
                
            })


        })
        .catch(error => {

        });
});
