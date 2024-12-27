interface TableHeaderProps {
  children: React.ReactNode;
}

const TableHead = ({ children }: TableHeaderProps) => {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
};

export default TableHead;
