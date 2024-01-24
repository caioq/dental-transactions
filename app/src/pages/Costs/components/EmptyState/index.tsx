interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div>
      <h4>{message || "Nenhum registro encontrado"}</h4>
    </div>
  );
}
