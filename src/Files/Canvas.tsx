import {useState} from "react";
import {Scatterplot} from "./Scatterplot";
import { data } from "../Datas/data";

interface Option {
    value: string;
    label : string;
}

interface Images {
  id: number;
  clr: string
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
    { value: 'green', label: 'Dog' },
    { value: 'blue', label: 'Cat' },
    { value: 'red', label: 'Hamster' }
  ];
  const initialValue = 'green';

  const images: Images[] = [
    {id: 1, clr: "green"},
    {id: 2, clr: "blue"},
    {id: 3, clr: "red"}
  ]
  
  export default function Canvas () {
    const [selectedValue, setSelectedValue] = useState(initialValue);

    const currentImage = images.find(img => img.clr === selectedValue);
    console.log(currentImage)
    
    return (
      <div className="canvas--container">
        <label for="pet-select">Choose a pet:</label>
        <Dropdown
          options={options}
          id="pet-select"
          selectedValue={selectedValue}
          onSelectedValueChange={setSelectedValue}
        />
        <Scatterplot data={data} width={400} height={400} color={currentImage?.clr}/>
      </div>
    );
  }