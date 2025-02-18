import { useParams } from "react-router-dom";

const Transaction = () => {
  const { id } = useParams();
  return <div>Details of transaction #{id}</div>;
};

export default Transaction;
