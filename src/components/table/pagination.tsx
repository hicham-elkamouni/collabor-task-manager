interface PaginationProps {
  handleNext: () => void;
  handlePrevious: () => void;
  currentPage: number;
}

const Pagination = ({
  handleNext,
  handlePrevious,
  currentPage,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        className="pagination__button pagination__button--hover"
        
      >
        Previous
      </button>

      <span className="pagination__text">Page {currentPage}</span>

      <button
        onClick={handleNext}
        className="pagination__button pagination__button--hover"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
