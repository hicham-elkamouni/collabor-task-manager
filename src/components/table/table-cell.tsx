interface TableCellProps {
  label: string;
  value: React.ReactNode;
}

const TableCell = ({ label, value }: TableCellProps) => {
  return <th data-label={label}>{value}</th>;
};

export default TableCell;
