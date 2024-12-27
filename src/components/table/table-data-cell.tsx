interface TableCellProps {
  label: string;
  value: React.ReactNode;
}

const TableDataCell = ({ label, value }: TableCellProps) => {
  return <td data-label={label}>{value}</td>;
};

export default TableDataCell;
