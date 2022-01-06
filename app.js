const app = Vue.createApp({
    data() {
        return {
            Name: '',
            OfcName: '',
            borders: [],
            Capital: '',
            isIndependent: '',
            isUnMember: '',
            currency: '',
            languages: [],
            isLandlocked: '',
            Demonyms: '',
            flag: '',
            timezone: '',
            carside: '',
            continent: '',
            emoji: ''
        }
    },
    methods: {
        async GetCountry() {
            let country = document.querySelector('.input').value;
            const response = await fetch('https://restcountries.com/v3.1/name/' + country)
            const data = await response.json();
            console.log(data);

            if (data['status'] == 404) {
                document.querySelector('#message').innerText = 'Country not found.'
                return;
            }

            this.Name = data['0']['name']['common'];
            this.OfcName = data['0']['name']['common'];
            this.Capital = data['0']['capital']['0'];
            this.flag = data['0']['flags']['svg'];
            this.isIndependent = data['0']['independent'];
            this.isUnMember = data['0']['unMember'];
            for (var key in data['0']['currencies']) {
                this.currency = data['0']['currencies'][key];
                break;}
            for (var key in data['0']['languages']) {
                this.languages.push(data['0']['languages'][key]);
            }
            this.isLandlocked = data['0']['landlocked'];
            this.Demonyms = data['0']['demonyms']['eng']['m'];
            this.timezone = data['0']['timezones']['0'];
            this.carside =   data['0']['car']['signs']['side'];
            this.continent =  data['0']['continents']['0'];
            this.emoji =  data['0']['flag'];
        }
    }
});

app.mount('#app');