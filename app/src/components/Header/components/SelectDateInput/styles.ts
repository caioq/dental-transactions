import styled from "styled-components";
import { Listbox } from "@headlessui/react";

export const CustomSelect = styled.div`
  & > div {
    position: relative;
    margin-top: 4px;
  }
`;

export const ListboxButton = styled(Listbox.Button)`
  background: ${(props) => props.theme["blue-dark"]};
  border-radius: 6px;
  color: ${(props) => props.theme["white"]};
  border: 0px;
  font-size: 1rem;
  font-weight: bold;
  min-height: 3rem;
  outline: none;
  padding: 0.8rem;
  position: relative;
  width: 100%;
  text-align: left;
  gap: 0.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  background-repeat: no-repeat;
  background-position-x: calc(100% - 1.25rem);
  background-position-y: 1.125rem;

  transition: all 0.1s;

  &[aria-expanded="true"] {
  }
`;

export const ListboxOptions = styled(Listbox.Options)`
  position: absolute;
  max-height: 336px;
  width: 100%;
  overflow: auto;
  border-radius: 5px;
  background: ${(props) => props.theme["white"]};
  color: ${(props) => props.theme["blue-bright"]};
  z-index: 10;
`;

export const ListboxOption = styled(Listbox.Option)`
  position: relative;
  cursor: pointer;
  padding: 1rem 1.125rem;

  &:hover {
    background: ${(props) => props.theme["blue-bright-700"]};
    color: ${(props) => props.theme["white"]};
    transition: background-color 0.2s;
  }
`;

export const SelectionContainer = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
`;

export const SelectorIconContainer = styled.span`
  padding-right: 0.5rem;
  align-items: center;
  display: flex;
  pointer-events: none;
`;
