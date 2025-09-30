import ComboBox from "@/Combobox";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function CountrySelector()
{
  const [countries, setCountries] = useState<{label: string, value: string}[]>([]);

  useEffect(() => {
    axios.get('https://flagcdn.com/fr/codes.json').then(res => {
      const associated = Object.entries(res.data);
      const countriesOpts = associated.map((c) => { return { label: c[1], value: c[0] } });

      setCountries(countriesOpts);
    });
  }, []);

  return(
    <ComboBox
      name="country"
      placeholder="Sélectionnez une origine"
      options={countries}
      renderOption={(opt) => (
        <span className="flex items-center gap-4">
          <img
            className="w-6"
            src={`https://flagcdn.com/${opt.value}.svg`}
            alt={opt.label}/>
          {opt.label}
        </span>
      )}
    />
  )
}