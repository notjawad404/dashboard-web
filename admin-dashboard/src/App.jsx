import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar1 from "./components/common/Navbar1";
import Sidebar1 from "./components/common/Sidebar1";
import DashboardScreen from "./components/ClaimsPages/DashboardScreen1";
import ClaimScreen from "./components/ClaimsPages/ClaimScreen";
import LeakageForm from "./components/LeakagePage/LeakageForm";
import LeakagePage from "./components/LeakagePage/LeakagePage";
import AuditForm from "./components/LeakagePage/AuditForm";
import ClaimDetail from "./components/ClaimSubPages/ClaimDetail";
import ClaimSubDashboard from "./components/ClaimSubPages/ClaimSubDashboard";
import ClaimPolicy from "./components/ClaimSubPages/ClaimPolicy";
import CustomerDetail from "./components/ClaimSubPages/CustomerDetail";
import AppraisalDetails from "./components/ClaimSubPages/AppraisalDetail";
import LeakageDashboard from "./components/LeakagesPages/LeakageDashboard";
import LeakageBrowse from "./components/LeakagesPages/LeakageBrowse";
import PDFParser from "./components/MarketEvaluation/PDFParser";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar1/>
        <div className="flex flex-col flex-1">
          <Navbar1/>
          <Routes>
            <Route path="/" element={<DashboardScreen/>} />
            <Route path="/dashboard" element={<DashboardScreen/>} />
            <Route path="/claimpage" element={<ClaimScreen/>} />
            <Route path="/LeakageForm" element={<LeakageForm/>} />

            <Route path="/auditForm" element={<AuditForm/>} />


            <Route path="/claimDashboard/:id" element={<ClaimSubDashboard/>}>
            <Route path="leakage" element={<LeakagePage/>} />
            <Route path="claim/:id" element={<ClaimDetail/>} />
            <Route path="policy/:id" element={<ClaimPolicy/>} />
            <Route path="customerdetail" element={<CustomerDetail/>} />
            <Route path="appraisal/:id" element={<AppraisalDetails/>}/>

            </Route>    
            
            <Route path="/leakagedashboard" element={<LeakageDashboard/>} />
            <Route path="/leakagebrowse" element={<LeakageBrowse/>} />
            
            <Route path="/pdfparser" element={<PDFParser/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
