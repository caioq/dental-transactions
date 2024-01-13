import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useViewport } from "../../hooks";

export function SearchForm() {
  const { isMobile } = useViewport();

  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque por procedimentos" />
      <button type="submit">
        <MagnifyingGlass size={20} /> {!isMobile && "Buscar"}
      </button>
    </SearchFormContainer>
  );
}
