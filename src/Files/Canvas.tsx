import {useState} from "react";
import {Scatterplot} from "./Scatterplot";
import { data } from "../Datas/data";

interface Option {
    id: number;
    value: string;
    label : string;
}

interface Dating {
    id: number;
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
    { id: 1, value: 'all', label: 'All Continents' },
    { id: 2, value: 'americas', label: 'Americas' },
    { id: 3, value: 'africa', label: 'Africa' },
    { id: 4, value: 'europe', label: 'Europe' },
    { id: 5, value: 'asia', label: 'Asia' },
    { id: 6, value: 'oceania', label: 'Oceania' }
  ];
  const initialOption = 'all';

  const dating: Dating[] = [
    {id: 1, value: 'all', label: 'All'},
    {id: 2, value: 'small', label: 'Small'},
    {id: 3, value: 'medium', label: 'Medium'},
    {id: 4, value: 'large', label: 'Large'}
  ];
  const initialDate = 'all';
  
  export default function Canvas () {
    const [selectedValue, setSelectedValue] = useState(initialOption);
    const [selectedDate, setSelectedDate] = useState(initialDate);

    const currentImage = options.find(dat => dat.value === selectedValue);
    const currentDate = dating.find(dat => dat.value === selectedDate);
    
    return (
      <div className="canvas--container">
        <label for="pet-select">Choose a continent:</label>
        <div className="select--box">
          <Dropdown
            options={options}
            id="continent-select"
            selectedValue={selectedValue}
            onSelectedValueChange={setSelectedValue}
          />
          <Dropdown
            options={dating}
            id="dating-select"
            selectedValue={selectedDate}
            onSelectedValueChange={setSelectedDate}
          />
        </div>
        <input type="range" />
        <Scatterplot data={data} width={400} height={400} state={currentImage?.value} dating={currentDate?.value}/>
      </div>
    );
  }