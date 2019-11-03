  import React, {Component, Fragment} from 'react';
  import axios from 'axios';
  import './App.css';

  import Header from './components/Header';
  import Infos from './components/Infos';
  import Weather from './components/Weather';

  import sampleData from './sampleData.json';
  import zipcodes from './zipcodes.json';

  class App extends Component {
    state = {
      city: 'Hélécine',
      zip: 1357,
      data: sampleData,
      zipcodes,
      filteredZipcodes: []
    }

    componentDidMount () {
      const lastUpdate = localStorage.getItem('lastUpdate')
      const city = localStorage.getItem('city')
      const zip = localStorage.getItem('zip')
      const now = new Date().getTime()

      if(city !== null && zip !== null && lastUpdate !== null) {
        this.setState({city, zip})
      }

      if(lastUpdate !== undefined && Math.ceil((now - lastUpdate) / 1000) < 600) {
        this.getDataFromLocal()
      } else {
        this.getDataFromWeather(zip||this.state.zip)
      }

    }

    getDataFromWeather = zip => {
      console.log('from site');

      axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},be&units=metric&appid=e0f8b3ba6e6a3d2236d0cf7502e02c99`)
      .then(resp => {
        localStorage.setItem('lastUpdate', Date.now())
        localStorage.setItem('data', JSON.stringify(resp.data))
        this.setState({
          data: resp.data
        })
      })
    }

    getDataFromLocal =  () => {
      console.log('from local');

      const data = JSON.parse(localStorage.getItem('data'))
      this.setState({ data })
    }

    handleChange = event => {
      const zip = event.target.value

      if(zip.length >= 2) {
        const filteredZipcodes = zipcodes.filter(el => {
          return el.Code_postal.toString().startsWith(zip)
        })

        this.setState({filteredZipcodes})
      } else {
        this.setState({filteredZipcodes : []})
      }

      this.setState({zip})
    }

    handleSubmit = event => {
      event.preventDefault()
      const filteredZipcodes = this.state.filteredZipcodes;

      if(this.state.zip.length >= 2 && filteredZipcodes.length > 0 ) {
        this.selectZip(filteredZipcodes[0])
      }
    }

    selectZip = el => {
      const zip = el.Code_postal
      const city = el.Localité_FR
      const filteredZipcodes = []

      localStorage.setItem('city', city)
      localStorage.setItem('zip', zip)

      this.getDataFromWeather(zip)

      this.setState({zip, city, filteredZipcodes})
    }



    render () {
      return (
        <Fragment>
          <Header
          zip = {this.state.zip}
          zipcodes = {this.state.filteredZipcodes}
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
          selectZip = {this.selectZip} />
          <Infos
          city= {this.state.city} />
          <Weather
          data = {this.state.data} />
        </Fragment>
      )
    }
  }

  export default App;
