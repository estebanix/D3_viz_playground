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
    { value: 'all', label: 'All Continents' },
    { value: 'americas', label: 'Americas' },
    { value: 'africa', label: 'Africa' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'oceania', label: 'Oceania' }
  ];
  const initialValue = 'all';

  const images: Images[] = [
    {id: 1, clr: "all"},
    {id: 2, clr: "americas"},
    {id: 3, clr: "africa"},
    {id: 4, clr: "europe"},
    {id: 5, clr: "asia"},
    {id: 6, clr: "oceania"}
  ]
  
  export default function Canvas () {
    const [selectedValue, setSelectedValue] = useState(initialValue);

    const currentImage = images.find(img => img.clr === selectedValue);
    
    return (
      <div className="canvas--container">
        <label for="pet-select">Choose a continent:</label>
        <Dropdown
          options={options}
          id="pet-select"
          selectedValue={selectedValue}
          onSelectedValueChange={setSelectedValue}
        />
        <Scatterplot data={data} width={400} height={400} state={currentImage?.clr}/>
      </div>
    );
  }