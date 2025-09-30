import { CheckIcon, ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import React, { useEffect, useRef, useState, type FC } from "react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { ScrollArea } from "./components/ui/scroll-area";

interface ComboBoxProps {
  options: { label: string, value: string }[];
  placeholder: string;
  name: string;
  renderOption?: (opt : { label: string, value: string }) => React.JSX.Element
}

const ComboBox : FC<ComboBoxProps> = ({
  name,
  placeholder,
  options,
  renderOption
}) =>
{
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ query, setQuery ] = useState('');
  const [ selected, setSelected ] = useState('');

  const selectedOption = options.find((opt) => opt.value === selected)?.label;

  const filteredOptions = options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase()));
  const filteredOptionsFound = filteredOptions.length > 0;
  const filteredOptionsEmpty = !filteredOptionsFound;

  const ACTIONS = {
    toggle : () => setIsOpen(!isOpen),
    show : () => setIsOpen(true),
    hidde : () => setIsOpen(false)
  };

  const triggerBtnRef = useRef<HTMLButtonElement | null>(null);
  const comboboxContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outOfContentEvt = (e : MouseEvent) => {
      const target = e.target;

      const targetIsTriggerBtn = triggerBtnRef.current?.contains(target as Node);
      const targetIsInside = comboboxContentRef.current?.contains(target as Node);

      if(!targetIsInside && !targetIsTriggerBtn) {
        ACTIONS.hidde();
      }
    }

    document.addEventListener('mousedown', outOfContentEvt);

    return () => {
      document.removeEventListener('mousedown', outOfContentEvt);
    }
  }, []);

  return(
    <div className="relative w-[300px]">
      <Button ref={triggerBtnRef} className="w-full justify-between" variant='outline' onClick={() => {
        ACTIONS.toggle();
      }}>
        <span>{selectedOption ? selectedOption : placeholder}</span>
        <ChevronsUpDownIcon className="w-4 h-4"/>
      </Button>
      
      {isOpen && (
        <div ref={comboboxContentRef} className="absolute z-50 left-0 right-0 mt-1 border rounded-md bg-popover">
          <Label className="flex items-center gap-0 w-full cursor-text bg-transparent px-2 border-b">
            <SearchIcon className="opacity-50 h-[1em]"/>
            <Input
              autoFocus={isOpen}
              className="w-full dark:bg-transparent border-0 focus-visible:border-none focus-visible:ring-0"
              type="text"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Chercher une catégorie"
            />
          </Label>

          <ScrollArea className="p-1 scroll-p-4">
            <ul className="flex flex-col gap-1 max-h-32">
              {filteredOptionsFound && (
                filteredOptions.map((opt, i) => (
                  <li key={opt.label + i}>
                    <label className="flex items-center hover:bg-accent/30 has-checked:bg-accent py-1.5 px-2 rounded-md">
                      {renderOption && renderOption(opt)}
                      
                      <input className="peer sr-only" hidden type="radio" name={name} value={opt.value} checked={selectedOption === opt.label} onChange={() => setSelected(opt.value)}/>
                      <CheckIcon className="h-[1em] invisible peer-checked:visible ml-auto"/>
                    </label>
                  </li>
                ))
              )}
              
              {filteredOptionsEmpty && (
                <li>
                  <label className="flex items-center hover:bg-accent/30 has-checked:bg-accent py-1.5 px-2 rounded-md">
                    <span>Pas de trouvailles</span>
                  </label>
                </li>
              )}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default ComboBox;