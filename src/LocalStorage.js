import React from "react";

function withLocalStorage(Component, initialValue, storageKey) {
  const storedValue = JSON.parse(localStorage.getItem(storageKey));

  const save = (val) => localStorage.setItem(storageKey, JSON.stringify(val));

  return class ComponentWithQuery extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        value: storedValue || initialValue,
      };

      this.onChange = (value) => this.setState({ value: save(value) });
    }

    render() {
      {
      }
      return (
        <Component
          {...this.props}
          value={this.state.value}
          onChange={this.onChange}
        />
      );
    }
  };
}

const TextInput = ({ value, onChange }) => (
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
);

const NumericInput = ({ value, onChange }) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(e.target.valueAsNumber)}
  />
);

const TextInputWithLocalStorage = withLocalStorage(
  TextInput,
  "123",
  "text-input"
);
const NumericInputWithLocalStorage = withLocalStorage(
  NumericInput,
  10,
  "numeric-input"
);

class LocalStorage extends React.Component {
  render() {
    return (
      <>
        <TextInputWithLocalStorage />
        <NumericInputWithLocalStorage />
      </>
    );
  }
}

export default LocalStorage;
