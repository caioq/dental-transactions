import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CalendarBlank } from "phosphor-react";
import { getMonthYearStringFromDate } from "../../../../utils";
import {
  CustomSelect,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  SelectionContainer,
  SelectorIconContainer,
} from "./styles";

interface SelectDateInputProps {
  date?: Date;
  value: string;
  onChange: (date: string) => void;
}

export function SelectDateInput(props: SelectDateInputProps) {
  const { date, value, onChange } = props;
  const [monthsAvailable, setMonthsAvailable] = useState<string[]>([]);

  function getMonthsAvailable(from: Date) {
    const months: string[] = [];
    const today = new Date();
    const startDate = new Date(from);
    while (startDate <= today) {
      const dateObj = getMonthYearStringFromDate(startDate);
      months.push(`${dateObj.month} ${dateObj.year}`);

      startDate.setMonth(startDate.getMonth() + 1);
    }

    return months;
  }

  useEffect(() => {
    if (date) {
      setMonthsAvailable(getMonthsAvailable(date));
    }
  }, [date]);

  return (
    <CustomSelect>
      <Listbox value={value} onChange={(e) => onChange(e)}>
        <div>
          <ListboxButton>
            <SelectorIconContainer>
              <CalendarBlank size={24} />
            </SelectorIconContainer>
            <SelectionContainer>{value ? value : "Loading..."}</SelectionContainer>
          </ListboxButton>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions>
              {monthsAvailable.map((option, index) => (
                <ListboxOption key={index} value={option}>
                  {option}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </CustomSelect>
  );
}
