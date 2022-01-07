const app = Vue.createApp({
    data() {
        return {
            Name: '',
            OfcName: '',
            borders: '',
            Capital: '',
            isIndependent: '',
            isUnMember: '',
            currency: '',
            languages: '',
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
            let Results = document.querySelector('.Results')
            Results.style.display = 'none';
            this.Name = ''
            this.OfcName = ''
            this.borders = ''
            this.Capital = ''
            this.isIndependent = ''
            this.isUnMember = ''
            this.currency = ''
            this.languages = ''
            this.isLandlocked = ''
            this.Demonyms = ''
            this.flag = ''
            this.timezone = ''
            this.carside = ''
            this.continent = ''
            this.emoji = ''
            let country = document.querySelector('.input').value;
            

            const response = await fetch('https://restcountries.com/v3.1/name/' + country)
            const data = await response.json();
            console.log(data);

            if (data['status'] == 404) {
                document.querySelector('#message').innerText = 'Country not found.'
                return;
            }
            document.querySelector('#message').innerText = ''

            this.Name = data['0']['name']['common'];
            this.OfcName = data['0']['name']['official'];
            try {
                this.Capital = data['0']['capital']['0'];
             }
             catch (e) {
                document.querySelector('#capital').style.display = 'none'
             }

            this.flag = data['0']['flags']['svg'];
            this.isIndependent = data['0']['independent'];
            this.isUnMember = data['0']['unMember'];
            for (var key in data['0']['currencies']) {
                this.currency = data['0']['currencies'][key]['symbol'] + ' - ' + data['0']['currencies'][key]['name'];
                console.log(key)
                break;
            }
            let i = 1
            for (let key in data['0']['languages']) {

                if (i < Object.keys(data['0']['languages']).length) {
                    this.languages = this.languages + data['0']['languages'][key] + ', '
                }
                else {
                    this.languages = this.languages + data['0']['languages'][key]
                }
                i++
            }
            this.isLandlocked = data['0']['landlocked'];
            try {
                this.Demonyms = data['0']['demonyms']['eng']['m'];
             }
             catch (e) {
                console.log(e);
            }

            try {
                var searchstring = '';
                for (var a = 0; a < data[0]['borders'].length; a++) {
                    if (a == data[0]['borders'].length - 1) {
                        searchstring = searchstring + (data[0]['borders'][a])
                    }
                    else {
                        searchstring = searchstring + (data[0]['borders'][a]) + ','
                    }
                }
                const bordercountry = await fetch('https://restcountries.com/v2/alpha?codes=' + searchstring);
                const bordercountrys = await bordercountry.json()
                console.log(bordercountrys)
                for (var b = 0; b < bordercountrys.length; b++) {
                    if (b == bordercountrys.length - 1) {
                            this.borders = this.borders + (bordercountrys[b]['name'])
                        }
                        else {
                            this.borders = this.borders + (bordercountrys[b]['name']) + ', '
                        }
                    }
            }
            
            catch (e) {
                document.querySelector('#borders').style.display = 'hidden'
            }
            this.timezone = data['0']['timezones']['0'];
            this.carside =   data['0']['car']['side'];
            this.continent =  data['0']['continents']['0'];
            this.emoji =  data['0']['flag'];

            // Landlocked
            if (this.isLandlocked) {
                this.isLandlocked = 'Landlocked'
            }
            else {
                document.querySelector('#landlocked').style.display = 'none'
            }

            // Independent
            if (this.isIndependent) {
                this.isIndependent = 'Independent State'
            }
            else {
                this.isIndependent = 'Dependancy'
            }

            // Un Member
            if (this.isUnMember) {
                this.isUnMember = 'An Un Member'
            }
            else {
                document.querySelector('#unmember').style.display = 'none'
            }
                
            

            Results.style.display = 'grid';
            
        }
    }
});

app.mount('#app');