import React, { useContext } from "react";
import { MainContext } from "../../App";

export function CountryCodeSelector({
  handleChange,
}: {
  handleChange: (value: string) => void;
}) {
  const { countryList } = useContext(MainContext);
  return (
    <select
      name="select-telephone"
      id="select-telephone"
      className="font-medium border bg-gray-100 py-4 px-3 rounded-md w-full text-xs"
      onChange={(e) => handleChange(e.target.value)}
    >
      {countryList.map((country) => (
        <option value={country.code} className="bg-gray-200">
          +{country.code} ({country.name})
        </option>
      ))}
    </select>
  );
}
