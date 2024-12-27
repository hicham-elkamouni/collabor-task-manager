interface ActionButtonProps {
  title: string;
  classname: string;
  onActionClick: () => void;
}

const ActionButton = ({
  title,
  classname,
  onActionClick,
}: ActionButtonProps) => {
  return (
    <button className={`btn ${classname}`} onClick={onActionClick}>
      {title}
    </button>
  );
};

export default ActionButton;
