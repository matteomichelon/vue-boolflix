/* Vue */

var app = new Vue(
    {
        el: '#root',

        /* DATA */
        data: {

            pushText: 'mr robot',
            arrayFilms: [],
            arrayTelefilms: [],
            activeFilmIndex: -1

        },
        /* end DATA */

        /* METHODS */
        methods: {

            /* Funzione callApi */
            // Funzione per richiamare API
            /* TODO: controlla chiamata singola per  film e telefilm */
            callApi () {
                this.film( this.pushText );
                this.telefilm( this.pushText );
            },
            /* end Funzione callApi */

            // Ricerca Film
            // /search/movie
            // Passare come parametro il valore di query
            film ( text ) {
                axios
                    .get( 'https://api.themoviedb.org/3/search/movie', {

                        params: {
                            api_key: '3414ee67882ebd632253f10b916225d8',
                            language: 'it',
                            query: text,
                            page: 1
                        }

                    } )
                    .then( ( response ) => {

                        // Secondo l'url inserito avremo l'array di oggetti che ci interessa in:
                        // response.data.results
                        this.arrayFilms = response.data.results
                        //console.log( response.data.results );

                    } );
            },

            // Ricerca Telefilm
            // /search/tv
            // Passare come parametro il valore di query
            telefilm ( text ) {
                axios
                    .get( 'https://api.themoviedb.org/3/search/tv', {

                        params: {
                            api_key: '3414ee67882ebd632253f10b916225d8',
                            language: 'it',
                            query: text,
                            page: 1
                        }

                    } )
                    .then( ( response ) => {

                        // Secondo l'url inserito avremo l'array di oggetti che ci interessa in:
                        // response.data.results
                        this.arrayTelefilms = response.data.results
                        //console.log( response.data.results );

                    } );
            },


            // Funzione che ritorna l'immagine della bandiera 
            // rispetto all'"original_language" passato dall'Api
            imageLanguage ( language ) {

                const ita = 'it';
                const eng = 'en';

                let result = 'mondo.jpg';

                if ( language === ita ) {
                    result = 'ita.png';
                } else if ( language === eng ) {
                    result = 'eng.jpg';
                }

                return result;
            },

            // Funzione per la transizione da voto in decimale a 
            // numero di stelline colorate
            // Può ricevere come parametro il voto in formato decimale da 0 a 10
            // Ritorna un codice html di stelline colorate 
            // ( con Vue utilizzare in html v-html="" )
            /* TODO: da sistemare con v-for su html */
            voteStar ( vote ) {

                // Dichiaro il numero massimo di stelline
                const numberOfStar = 5;

                // Trasformo il numero ricevuto come parametro in un voto da 1 a 5
                let newVote = ( vote / 2 );

                // Calcolo il numero per eccesso
                const excessVote = Math.ceil( newVote );
                let star = '';

                // Compilo il mumero di stelline colorate secondo il numero massimo di stelline
                for ( let i = 1; i <= numberOfStar; i++ ) {

                    if ( i <= excessVote ) {
                        star += `<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>`;
                    } else {
                        star += `<i class="fa fa-star" aria-hidden="true" style="color: grey;"></i>`;
                    }

                }

                return star;

            },

            posterMouseEnter ( indexFilm ) {
                this.activeFilmIndex = indexFilm;
            },

            posterMouseLeave () {
                this.activeFilmIndex = -1;
            }

        },
        /* end METHODS */

        /* MOUNTED */
        mounted () {

        },
        /* end MOUNTED */

        /* CREATED */
        created () {

        }
        /* end CREATED */

    }
);

/* end Vue */


//====
/*
Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo
scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
film trovato:
1. Titolo
2. Titolo Originale
3. Lingua
4. Voto
*/
//====

/* Milestone 1.1 */
// Creare un layout base con una searchbar (una input e un button) in cui possiamo 
// scrivere completamente o parzialmente il nome di un film.

/* Mileston 1.2 */
// Possiamo, cliccando il bottone, 
// cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.

/* Mileston 1.3 */
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
// film trovato:
// 1. Titolo
// 2. Titolo Originale
// 3. Lingua
// 4. Voto


//===
/*
Mileston 2:
Trasformiamo la stringa statica della lingua in una vera e propria bandiera della
nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
nazione ritornata dall’API (le flag non ci sono in FontAwesome).
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca
dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di
risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=s
crubs
*/
//===

/* Mileston 2.1 */
// Trasformiamo la stringa statica della lingua in una vera e propria bandiera della
// nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
// nazione ritornata dall’API (le flag non ci sono in FontAwesome).

/* Mileston 2.2 */
// Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query,
// sia le serie tv, stando attenti ad avere alla fine dei valori simili 
// (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)
// Qui un esempio di chiamata per le serie tv:
// https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=scrubs

//===
/*
Mileston 3;
In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
Dovremo prendere quindi l’URL base delle immagini di TMDB:
https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
(troviamo tutte le dimensioni possibili a questo link:
https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la
parte finale dell’URL passata dall’API.
Esempio di URL:
https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
Trasformiamo poi il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
piene (o mezze vuote :P)
*/
//===

/* Mileston 3.1 */
// In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
// al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
// perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
// Dovremo prendere quindi l’URL base delle immagini di TMDB:
// https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
// (troviamo tutte le dimensioni possibili a questo link:
// https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400) per poi aggiungere la
// parte finale dell’URL passata dall’API.
// Esempio di URL:
// https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png

/* Mileston 3.2 */
// Trasformiamo poi il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
// permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
// lasciando le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
// piene (o mezze vuote :P)

/* Mileston 4 */
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
// creando un layout completo simil-Netflix:
// 1- Un header che contiene logo e search bar
// 2- Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
// di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio
// la poster_path con w342)
// 3-  Andando con il mouse sopra una card (on hover), appaiono le informazioni
// aggiuntive già prese nei punti precedenti più la overview

/* Mileston 4.1 */
// Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
// creando un layout completo simil-Netflix:
// 1- Un header che contiene logo e search bar
// 2- Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
// di “card” in cui lo sfondo è rappresentato dall’immagine di copertina (consiglio
// la poster_path con w342)

/* Mileston 4.2 */
// 3-  Andando con il mouse sopra una card (on hover), appaiono le informazioni
// aggiuntive già prese nei punti precedenti più la overview




