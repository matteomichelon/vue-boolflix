/* Vue */

var app = new Vue(
    {
        el: '#root',

        /* DATA */
        data: {

            pushText: '',
            genreSelected: '',
            arrayFilms: [],
            arrayTelefilms: [],
            filmId: '',
            arrayCast: [],
            arrayGenresId: [],
            arrayGenresFilm: [],
            arrayGenresTelefilm: []

        },
        /* end DATA */

        /* METHODS */
        methods: {

            /* Chiamate API */

            /* Funzione callApi */
            // Funzione per richiamare API
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
                        this.arrayFilms = response.data.results;
                        this.arrayPopular = [];

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
                        this.arrayTelefilms = response.data.results;
                        this.arrayPopular = [];

                    } );
            },

            // Ricerca Cast specifico id passato come parametro
            // /id_film/casts       
            infoCast ( film_id ) {
                axios
                    .get( 'https://api.themoviedb.org/3/movie/' + film_id + '/casts', {

                        params: {
                            api_key: '3414ee67882ebd632253f10b916225d8',
                            language: 'it',
                        }

                    } )
                    .then( ( response ) => {
                        this.arrayCast = response.data.cast;
                    } );
            },

            // Ricerca genere film in riferimento id passato come parametro
            // /id_film
            genres ( film_id ) {
                axios
                    .get( 'https://api.themoviedb.org/3/movie/' + film_id, {

                        params: {
                            api_key: '3414ee67882ebd632253f10b916225d8',
                            language: 'it',
                        }

                    } )
                    .then( ( response ) => {
                        this.arrayGenresId = response.data.genres;
                    } );
            },

            // Ricerca genere film in riferimento id passato come parametro
            // /id_film
            genresTelefilm ( telefilm_id ) {
                axios
                    .get( 'https://api.themoviedb.org/3/tv/' + telefilm_id, {

                        params: {
                            api_key: '3414ee67882ebd632253f10b916225d8',
                            language: 'it',
                        }

                    } )
                    .then( ( response ) => {
                        this.arrayGenresId = response.data.genres;
                    } );
            },

            // Ricerca Cast specifico id passato come parametro
            // /id_film/casts       
            infoCastTelefilm ( film_id ) {
                axios
                    .get( 'https://api.themoviedb.org/3/tv/' + film_id + '/credits', {

                        params: {
                            api_key: '3414ee67882ebd632253f10b916225d8',
                            language: 'it',
                        }

                    } )
                    .then( ( response ) => {
                        this.arrayCast = response.data.cast;
                    } );
            },

            /* end Chiamate API */

            // Funzione per inserire il poster del film
            // Se il poster non è presente dalla chiamata API 
            // inseriamo l'immmagine di default
            posterImage ( posterPath ) {
                let url = 'https://image.tmdb.org/t/p/w342';
                const nullImage = 'img/null.jpg';

                if ( posterPath === null ) {
                    url = nullImage;
                } else {
                    url += posterPath;
                }

                return url;
            },

            // Funzione che ritorna l'immagine della bandiera 
            // rispetto all'"original_language" passato dall'Api
            imageLanguage ( language ) {

                let flag = 'europe';
                const english = 'gb';
                const italian = 'it';

                if ( language === 'en' ) {
                    flag = english
                } else if ( language === 'it' ) {
                    flag = italian
                }
                return flag;

            },

            // Funzione che mi ritorna un numero 
            // per eccesso da 1 a 5
            // riceve numeri da 1 a 10 
            voteStar ( vote ) {

                // Trasformo il numero ricevuto come parametro in un voto da 1 a 5
                let newVote = ( vote / 2 );

                // Calcolo il numero per eccesso
                const excessVote = Math.ceil( newVote );

                return excessVote;

            },

            // Funzione ricevente un codice id univoco
            // e cambia il valore della variabile filmId
            mouseEnter ( idFilm ) {
                this.filmId = idFilm;
            },

            // Funzione che ritorna il valore orifinale 
            // della variabile filmId
            mouseLeave () {
                this.filmId = '';
                this.arrayCast = [];
            },

            // Funzione che riceve una overview di un film
            // e ne ritorna le prime 100 lettere
            filmOverview ( overview ) {

                let overviewSlice = overview.slice( 0, 100 );

                if ( overview.length >= 100 ) {
                    overviewSlice += '...';
                }

                return overviewSlice;
            },

            // Funzione che riceve un array di numeri e ne confronta con 
            // un altro array già in nostro possesso.
            // Ritorna un valore booleano
            slideGenresFilm ( arrayNum ) {

                let viewFilm = false;

                if ( arrayNum.includes( this.genreSelected.id ) ) {
                    viewFilm = true;
                }

                return viewFilm;
            },

        },
        /* end METHODS */

        /* MOUNTED */
        mounted () {

            // Movies Popular
            // /movie/popular
            axios
                .get( 'https://api.themoviedb.org/3/movie/popular', {

                    params: {
                        api_key: '3414ee67882ebd632253f10b916225d8',
                        language: 'it',
                        page: 1,
                        region: 'IT'
                    }

                } )
                .then( ( response ) => {

                    // Secondo l'url inserito avremo l'array di oggetti che ci interessa in:
                    // response.data.results
                    this.arrayFilms = response.data.results;

                } );

            // Tv Popular
            // /tv/popular
            axios
                .get( 'https://api.themoviedb.org/3/tv/popular', {

                    params: {
                        api_key: '3414ee67882ebd632253f10b916225d8',
                        language: 'it',
                        page: 1,
                    }

                } )
                .then( ( response ) => {

                    // Secondo l'url inserito avremo l'array di oggetti che ci interessa in:
                    // response.data.results
                    this.arrayTelefilms = response.data.results;

                } );

            // Chiamata di tutti i generi di film presenti nell'Api
            // Creo un array di oggetti con presenti tutti i generi dei Film
            // con id specifico
            // genre/movie/list
            axios
                .get( 'https://api.themoviedb.org/3/genre/movie/list', {

                    params: {
                        api_key: '3414ee67882ebd632253f10b916225d8',
                        language: 'it',
                    }

                } )
                .then( ( response ) => {

                    this.arrayGenresFilm = response.data.genres;

                } );

            // Chiamata di tutti i generi di film presenti nell'Api
            // Creo un array di oggetti con presenti tutti i generi dei Film
            // con id specifico
            // genre/tv/list
            axios
                .get( 'https://api.themoviedb.org/3/genre/tv/list', {

                    params: {
                        api_key: '3414ee67882ebd632253f10b916225d8',
                        language: 'it',
                    }

                } )
                .then( ( response ) => {

                    this.arrayGenresTelefilm = response.data.genres;
                    
                } );

        }
        /* end MOUNTED */

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

/* Mileston 5 */
// Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno
// parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti
// dall’API con Nome e Cognome, e i generi associati al film con questo schema:
// “Genere 1, Genere 2, …”.

/* Milestone 6 */
// Creare una lista di generi richiedendo quelli disponibili all'API e creare dei filtri con i
// generi tv e movie per mostrare/nascondere le schede ottenute con la ricerca.

/* Milestone 6.1 */
// Creare una lista di generi richiedendo quelli disponibili all'API 

/* Milestone 6.2 */
// creare dei filtri con i generi tv e movie 
// per mostrare/nascondere le schede ottenute con la ricerca.



