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
}

export function SelectDateInput(props: SelectDateInputProps) {
  const { date } = props;
  const [monthsAvailable, setMonthsAvailable] = useState<string[]>([]);

  const currentDateString = getMonthYearStringFromDate(new Date());
  const [month, setMonth] = useState<string>(`${currentDateString.month} ${currentDateString.year}`);

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
      <Listbox value={month} onChange={setMonth}>
        <div>
          <ListboxButton>
            <SelectorIconContainer>
              <CalendarBlank size={24} />
            </SelectorIconContainer>
            <SelectionContainer>{month ? month : "Loading..."}</SelectionContainer>
          </ListboxButton>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions>
              {monthsAvailable.map((option, idx) => (
                <ListboxOption key={idx} value={option}>
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
