import {useState} from "react";

interface Option {
    value: string;
    label : string;
}

interface Dropdown{
    options: Option[];
    id: string;
    selectedValue: string;
    onSelectedValueChange: (value: string) => void;
}

const Dropdown: React.FC<Dropdown> = ({ options, id, selectedValue, onSelectedValueChange }) => (
  <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
    {options.map(({ value, label }) => (
      <option value={value} selected={value === selectedValue}>
        {label}
      </option>
    ))}
  </select>
);

 const options: Option[] = [
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
    
    return (
      <div className="canvas--container">
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