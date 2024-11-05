import { Link, Outlet, useParams } from "react-router-dom";
import ClaimProgress from "./ClaimProgress";

export default function ClaimSubDashboard() {
  const { id } = useParams(); // Access the id from route parameters

  return (
    <>
      <ClaimProgress />
      <nav>
        <ul className="flex flex-row">
          <li className="text-gray-500 border-b-4 px-3">
            <Link to={`claim/${id}`}>Claim</Link>
          </li>
          <li className="text-gray-500 border-b-4 px-3">
            <Link to={`policy/${id}`}>Policy</Link>
          </li>
          <li className="text-gray-500 border-b-4 px-3">
            <Link to={`customerdetail`}>Customer</Link>
          </li>
          <li className="text-gray-500 border-b-4 px-3">
            <Link to={`appraisal/${id}`}>Appraisal</Link>
          </li>
          <li className="text-gray-500 border-b-4 px-3">
            <Link to={`litigation/${id}`}>Litigation</Link>
          </li>
          <li className="text-gray-500 border-b-4 px-3">
            <Link to={`fraud/${id}`}>Fraud</Link>
          </li>
          <li className="text-gray-500 border-b-4 px-3">
            <Link to='leakage'>Leakages</Link>
          </li>
          <li className="text-gray-500 border-b-4 px-3">
            <Link to={`Network/${id}`}>Network</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
