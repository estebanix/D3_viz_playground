import {useState} from "react";

const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
  <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
    {options.map(({ value, label }) => (
      <option value={value} selected={value === selectedValue}>
        {label}
      </option>
    ))}
  </select>
);

 const options = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'hamster', label: 'Hamster' },
    { value: 'parrot', label: 'Parrot' },
    { value: 'spider', label: 'Spider' },
    { value: 'goldfish', label: 'Goldfish' }
  ];
  const initialValue = 'hamster';
  
  export default function Canvas () {
    const [selectedValue, setSelectedValue] = useState(initialValue);
    console.log(selectedValue);
    return (
      <div>
        <label for="pet-select">Choose a pet:</label>
        <Dropdown
          options={options}
          id="pet-select"
          selectedValue={selectedValue}
          onSelectedValueChange={setSelectedValue}
        />
      </div>
    );
  };