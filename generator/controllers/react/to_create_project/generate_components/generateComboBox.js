import fs from 'fs';
import path from 'path';
import { createFolder } from '../../../../helpers/helperFile.js';


export const generateComboBox = async (fullPath) => {
  const comboDir = path.join(fullPath, 'src', 'components', 'ComboBoxes');
  createFolder(comboDir);

  const filePath = path.join(comboDir, 'ThemedComboBox.jsx');

  const content = `"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useState } from "react";

export default function ThemedComboBox({
  label = "Select an option",
  options = [],
  selected,
  setSelected,
  onChange,
  error,
  getLabel = (item) => item?.name,
  disabled = false,
}) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((item) =>
          getLabel(item).toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <Combobox
        autoComplete="off"
        value={selected}
        onChange={(value) => {
          setQuery("");
          setSelected(value);
          onChange?.(value);
        }}
        disabled={disabled}
      >
        <div className="relative">
          <ComboboxInput
            disabled={disabled}
            autoComplete="off"
            className={classNames(
              "block w-full rounded-md bg-white py-2.5 pr-12 pl-3 text-base text-gray-900 outline-1 placeholder:text-gray-400 sm:text-sm",
              {
                "border border-danger": error,
                "outline-gray-300 focus:outline-indigo-600": !error,
              },
              disabled && "disabled"
            )}
            onChange={(e) => !disabled && setQuery(e.target.value)}
            onBlur={() => setQuery("")}
            displayValue={(item) => getLabel(item)}
          />

          <ComboboxButton
            disabled={disabled}
            className={classNames(
              "absolute inset-y-0 right-0 flex items-center px-2",
              disabled && "disabled"
            )}
          >
            <ChevronUpDownIcon className="size-5 text-gray-400" />
          </ComboboxButton>

          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredOptions.map((item) => (
                <ComboboxOption
                  key={item.id}
                  value={item}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
                >
                  <span className="block truncate group-data-selected:font-semibold">
                    {getLabel(item)}
                  </span>
                  <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-focus:text-white group-data-selected:flex">
                    <CheckIcon className="size-5" aria-hidden="true" />
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  );
}
`.trimStart();

  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Archivo generado: ${filePath}`.green);
  } catch (error) {
    console.error(`❌ Error al generar el archivo ${filePath}: ${error.message}`);
  }
}
