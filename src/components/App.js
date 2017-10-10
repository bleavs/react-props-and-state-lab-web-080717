import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    }; // setting state internally
  }

  onChangeType = (type) => {
    this.setState({
      filters: {
        type: type
      }
    }) //updating state of type to passed in type
  }

  fetchPets = () => {
    const type = this.state.filters.type

    const query = type === 'all' ? '' : `?type=${type}`
    const url = '/api/pets' + query

    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          pets: json
        })
      }) //updating pets state w/ new pet

  }

  onAdoptPet = (petId) => {
    this.setState({
      adoptedPets: this.state.adoptedPets.concat([petId])
    }) //updating the adopted pets array -- state - in app
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">

            <div className="four wide column">
              <Filters
                filters={this.state.filters}
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets}/>
            </div>

            <div className="twelve wide column">
              <PetBrowser
                pets = {this.state.pets} // setting props from Apps state-- parent setting props from its internal state
                adoptedPets = {this.state.adoptedPets}
                onAdoptPet = {this.onAdoptPet}
                />

            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default App;
