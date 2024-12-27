import { useLocation } from "react-router-dom";

export const getCurrentPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = searchParams.get("page") || "1"; 

  return parseInt(currentPage);
};