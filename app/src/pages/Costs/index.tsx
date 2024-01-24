import { useContext, useState } from "react";
import { ArrowCircleDown } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import {
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableContainer,
  TransactionsTitle,
  DialogTrigger,
  TransactionsCardsContainer,
} from "./styles";
import { Cost, ProceduresContext } from "../../contexts/ProceduresContext";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { Skeleton } from "../../components/core/Skeleton";
import { EmptyState } from "./components/EmptyState";
import { CostCard } from "./components/CostCard";
import { currencyFormatter, dateFormatter } from "../../utils";
import { NewCostModal } from "../../components/NewCostModal";

export function Costs() {
  const { costs, loading } = useContext(ProceduresContext);

  const [open, setOpen] = useState(false);
  const [selectedCost, setSelectedCost] = useState<Cost | null>(null);

  function handleSelectCost(cost: Cost) {
    setSelectedCost(cost);
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionsTitle>
          <ArrowCircleDown size={28} />
          <span>Custos:</span>
        </TransactionsTitle>
        <SearchForm />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <TransactionsTableContainer>
            <TransactionsTable>
              {loading ? (
                <Skeleton height={65} />
              ) : costs.length === 0 ? (
                <EmptyState />
              ) : (
                <tbody>
                  {costs.map((cost, index) => (
                    <DialogTrigger asChild key={index} onClick={() => handleSelectCost(cost)}>
                      <tr key={index}>
                        <td>{cost.description || "Não informado"}</td>
                        <td>{currencyFormatter.format(cost.value)}</td>
                        <td>
                          {/* <PriceHighlight variant="income">{currencyFormatter.format(cost.totalPaid)}</PriceHighlight> */}
                        </td>
                        <td>{cost.category.name}</td>
                        <td>{dateFormatter.format(new Date(cost.date))}</td>
                      </tr>
                    </DialogTrigger>
                  ))}
                </tbody>
              )}
            </TransactionsTable>
          </TransactionsTableContainer>
          <TransactionsCardsContainer>
            {loading ? (
              <Skeleton height={150} />
            ) : costs.length === 0 ? (
              <EmptyState />
            ) : (
              costs.map((cost, index) => (
                <DialogTrigger key={index} onClick={() => handleSelectCost(cost)}>
                  <CostCard
                    key={index}
                    date={dateFormatter.format(new Date(cost.date))}
                    description={cost.description || "Não informado"}
                    value={currencyFormatter.format(cost.value)}
                    category={cost.category.name}
                  />
                </DialogTrigger>
              ))
            )}
          </TransactionsCardsContainer>
          <NewCostModal setOpenDialog={setOpen} initialValues={selectedCost} />
        </Dialog.Root>
      </TransactionsContainer>
    </div>
  );
}
