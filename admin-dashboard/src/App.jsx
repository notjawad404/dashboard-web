import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar1 from "./components/common/Navbar1";
import Sidebar1 from "./components/common/Sidebar1";
import DashboardScreen from "./components/ClaimsPages/DashboardScreen1";
import ClaimScreen from "./components/ClaimsPages/ClaimScreen";
import ClaimBrowse from "./components/ClaimsPages/ClaimBrowse";
import LeakageForm from "./components/LeakagePage/LeakageForm";
import LeakagePage from "./components/LeakagePage/LeakagePage";
import AuditForm from "./components/LeakagePage/AuditForm";
import ClaimDetail from "./components/ClaimSubPages/ClaimDetail";
import ClaimSubDashboard from "./components/ClaimSubPages/ClaimSubDashboard";
import ClaimPolicy from "./components/ClaimSubPages/ClaimPolicy";

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
            <Route path="/browseClaim" element={<ClaimBrowse/>} />
            <Route path="/LeakageForm" element={<LeakageForm/>} />

            <Route path="/auditForm" element={<AuditForm/>} />


            <Route path="/claimDashboard/:id" element={<ClaimSubDashboard/>}>
            <Route path="Leakage" element={<LeakagePage/>} />
            <Route path="claim/:id" element={<ClaimDetail/>} />
            <Route path="policy/:id" element={<ClaimPolicy/>} />

            </Route>

            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
