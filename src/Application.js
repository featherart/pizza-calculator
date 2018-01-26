import React, { Component } from 'react';

import Title from './Title';
import Input from './Input';
import Result from './Result';
import './style.css';

import calculatePizzasNeeded from './lib/calculate-pizzas-needed';

const initialState = {
  numberOfPeople: 10,
  slicesPerPerson: 2,
};

const WithCalculator = WrappedComponent => {
  return class extends Component {
    static displayName = `WithCalculator(${WrappedComponent.displayName ||
      WrappedComponent.name})`; // give the class a name so you can find it, not necessary but helpful!

    state = { ...initialState };

    updateNumberOfPeople = event => {
      const numberOfPeople = parseInt(event.target.value, 10);
      this.setState({ numberOfPeople });
    };

    updateSlicesPerPerson = event => {
      const slicesPerPerson = parseInt(event.target.value, 10);
      this.setState({ slicesPerPerson });
    };

    reset = event => {
      this.setState({ ...initialState });
    };

    render() {
      const { numberOfPeople, slicesPerPerson } = this.state;
      const numberOfPizzas = calculatePizzasNeeded(
        numberOfPeople,
        slicesPerPerson,
      );

      return (
        <WrappedComponent
          numberOfPeople={numberOfPeople}
          slicesPerPerson={slicesPerPerson}
          numberOfPizzas={numberOfPizzas}
          updateNumberOfPeople={this.updateNumberOfPeople}
          updateSlicesPerPerson={this.updateSlicesPerPerson}
        />
      );
    }
  };
};

class Application extends Component {
  render() {
    const {
      numberOfPeople,
      slicesPerPerson,
      numberOfPizzas,
      updateNumberOfPeople,
      updateSlicesPerPerson,
    } = this.props;
    return (
      <div className="Application">
        <Title />
        <Input
          label="Number of Guests"
          type="number"
          min={0}
          value={numberOfPeople}
          onChange={updateNumberOfPeople}
        />
        <Input
          label="Slices Per Person"
          type="number"
          min={0}
          value={slicesPerPerson}
          onChange={updateSlicesPerPerson}
        />
        <Result amount={numberOfPizzas} />
        <button className="full-width" onClick={this.reset}>
          Reset
        </button>
      </div>
    );
  }
}

export default WithCalculator(Application);
