/* Vue */

var app = new Vue(
    {
        el: '#root',

        /* DATA */
        data: {

            pushText: '',

        },
        /* end DATA */

        /* METHODS */
        methods: {

            /* Funzione callApi */
            // Funzione per richiamare API
            callApi () {

                // Dichiaro la variabile query con il valore
                // inserito dall'utente
                const query = this.pushText;

                axios
                .get( 'https://api.themoviedb.org/3/search/movie', {

                    params: {
                        api_key: '3414ee67882ebd632253f10b916225d8',
                        language: 'it',
                        query: query,
                        page: 1
                    }

                } )
                .then( ( response ) => {

                    // Secondo l'url inserito avremo l'array di oggetti che ci interessa in:
                    // response.data.results
                    const arrayFilm = response.data.results
                    console.log( response.data.results );

                } );

            }
            /* end Funzione callApi */

        },
        /* end METHODS */

        /* MOUNTED */
        mounted () {

            /* Axios */
            axios
                .get( 'https://api.themoviedb.org/3/search/movie', {

                    params: {
                        api_key: '3414ee67882ebd632253f10b916225d8',
                        language: 'it',
                        query: 'test',
                        page: 1
                    }

                } )
                .then( ( response ) => {

                    // Secondo l'url inserito avremo l'array di oggetti che ci interessa in:
                    // response.data.results
                    const arrayFilm = response.data.results
                    console.log( response.data.results );

                } );
            /* end Axios */

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
