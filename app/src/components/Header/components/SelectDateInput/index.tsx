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
  startDate?: Date;
  value: Date;
  onChange: (date: Date) => void;
}

interface SelectDateInputOption {
  name: string;
  value: Date;
}

export function SelectDateInput(props: SelectDateInputProps) {
  const { startDate, value, onChange } = props;
  const [monthsAvailable, setMonthsAvailable] = useState<{ value: Date; name: string }[]>([]);

  function getMonthsAvailable(from: Date) {
    const months: SelectDateInputOption[] = [];
    const today = new Date();
    const startDate = new Date(from);
    while (today >= startDate) {
      const dateObj = getMonthYearStringFromDate(today);
      months.push({ name: `${dateObj.month} ${dateObj.year}`, value: new Date(today) });

      today.setMonth(today.getMonth() - 1);
    }
    console.log(months);
    return months;
  }

  useEffect(() => {
    if (startDate) {
      setMonthsAvailable(getMonthsAvailable(startDate));
    }
  }, [startDate]);

  return (
    <CustomSelect>
      <Listbox value={value} onChange={(e) => onChange(e)}>
        <div>
          <ListboxButton>
            <SelectorIconContainer>
              <CalendarBlank size={24} />
            </SelectorIconContainer>
            <SelectionContainer>
              {value ? getMonthYearStringFromDate(value).monthYear : "Loading..."}
            </SelectionContainer>
          </ListboxButton>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions>
              {monthsAvailable.map((option, index) => (
                <ListboxOption key={index} value={option.value}>
                  {option.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </CustomSelect>
  );
}
