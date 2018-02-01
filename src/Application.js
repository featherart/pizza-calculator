import React, { Component } from 'react';

import Title from './Title';
import Input from './Input';
import Result from './Result';
import pizzaCalculatorStore from './PizzaCalculatorStore'
import * as actions from './actions';

import calculatePizzasNeeded from './lib/calculate-pizzas-needed';

export default class ApplicationContainer extends Component {
  state = pizzaCalculatorStore.getState();

  updateCalculations = () => {
    this.setState(pizzaCalculatorStore.getState());
  }

  componentDidMount() {
    pizzaCalculatorStore.on('change', this.updateCalculations);
  }

  componentWillUnmount() {
    pizzaCalculatorStore.off('change', this.updateCalculations);
  }

  render() {
    return (
      <PizzaCalculator
        {...this.state}
        updateNumberOfPeople={actions.updateNumberOfPeople}
        updateSlicesPerPerson={actions.updateSlicesPerPerson}
        reset={actions.reset}
      />
    );
  }
}

class PizzaCalculator extends Component {
  state = pizzaCalculatorStore.getState();

  updateNumberOfPeople = event => {
    const numberOfPeople = parseInt(event.target.value, 10);
    actions.updateNumberOfPeople(numberOfPeople);
  };

  updateSlicesPerPerson = event => {
    const slicesPerPerson = parseInt(event.target.value, 10);
    actions.updateSlicesPerPerson(slicesPerPerson)
  };

  updateState() {
    this.setState(pizzaCalculatorStore.getState());
  }

  componentDidMount() {
    pizzaCalculatorStore.on('change', this.updateState);
  }

  componentWillUnmount() {
    pizzaCalculatorStore.off('change', this.updateState);
  }

  render() {
    const {
      numberOfPeople,
      slicesPerPerson,
      reset,
    } = this.props;

    const numberOfPizzas = calculatePizzasNeeded(
      numberOfPeople,
      slicesPerPerson,
    );

    return (
      <div className="Application">
        <Title />
        <Input
          label="Number of Guests"
          type="number"
          min={0}
          value={numberOfPeople}
          onChange={this.updateNumberOfPeople}
        />
        <Input
          label="Slices Per Person"
          type="number"
          min={0}
          value={slicesPerPerson}
          onChange={this.updateSlicesPerPerson}
        />
        <Result amount={numberOfPizzas} />
        <button className="full-width" onClick={reset}>
          Reset
        </button>
      </div>
    );
  }
}
