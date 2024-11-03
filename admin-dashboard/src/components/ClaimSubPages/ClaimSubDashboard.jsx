import { Link } from "react-router-dom";
import ClaimProgress from "./ClaimProgress";


export default function ClaimSubDashboard() {
  return (
    <>
    <ClaimProgress/>
    <nav>
    <ul className="flex flex-row">
    <li className="text-gray-500 border-b-4 px-3"><Link to='/claim'>Claim</Link></li>
    <li className="text-gray-500 border-b-4 px-3"><Link to='/policy'>Policy</Link></li>
    <li className="text-gray-500 border-b-4 px-3"><Link to='/customer'>Customer</Link></li>
    <li className="text-gray-500 border-b-4 px-3"><Link to='/appraisal'>Appraisal</Link></li>
    <li className="text-gray-500 border-b-4 px-3"><Link to='/litigation'>Litigation</Link></li>
    <li className="text-gray-500 border-b-4 px-3"><Link to='/fraud'>Fraud</Link></li>
    <li className="text-gray-500 border-b-4 px-3"><Link to='/leakages'>Leakages</Link></li>
    <li className="text-gray-500 border-b-4 px-3"><Link to='/Network'>Network</Link></li>
    </ul>
    </nav>
    </>
  )
}
