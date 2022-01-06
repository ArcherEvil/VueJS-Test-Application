const app = Vue.createApp({
    data() {
        return {
            firstName: 'Tio seidosão'}
    },
    methods: {
        async GetCountry() {
            let country = document.querySelector('input').value;

            const response = await fetch('https://restcountries.com/v3.1/all');
            const { results } = await response.json();
            console.log(results);
        }
    }
});

app.mount('#app');