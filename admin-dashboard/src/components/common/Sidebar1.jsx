import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar1() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isClaimOpen, setIsClaimOpen] = useState(false);
    const [isLeakageOpen, setIsLeakageOpen] = useState(false);

    const handleToggleClaim = () => {
        setIsClaimOpen(!isClaimOpen);
    };

    const handleToggleLeakage = () => {
        setIsLeakageOpen(!isLeakageOpen);
    };

    const handleSelect = (value) => {
        switch (value) {
            case 'claim-Dashboard':
                navigate('/dashboard');
                break;
            case 'claim-Browse':
                navigate('/claimpage');
                break;
            default:
                break;
        }
        setIsClaimOpen(false);
    };

    const handleLeakageSelect = (value) => {
        switch (value) {
            case 'leakage-Dashboard':
                navigate('/leakagedashboard');
                break;
            case 'leakage-Browse':
                navigate('/leakagebrowse');
                break;
            default:
                break;
        }
        setIsLeakageOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 font-nunito font-semibold text-[14px] bg-white h-screen pb-4 border-r flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-orange-500 text-center">rekover</h2>
            <ul className="space-y-2 text-center">
                <li className="text-center">
                    <button
                        onClick={handleToggleClaim}
                        className={`py-2 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                            isClaimOpen || isActive('/dashboard') || isActive('/claimpage') ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                    >
                        Claim
                    </button>
                    {isClaimOpen && (
                        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                                <button
                                    onClick={() => handleSelect('claim-Dashboard')}
                                    className={`block px-4 py-2 text-sm w-full text-left ${
                                        isActive('/dashboard') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-600 hover:text-white'
                                    }`}
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => handleSelect('claim-Browse')}
                                    className={`block px-4 py-2 text-sm w-full text-left ${
                                        isActive('/claimpage') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-600 hover:text-white'
                                    }`}
                                >
                                    Browse
                                </button>
                            </div>
                        </div>
                    )}
                </li>
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Customers</li></Link>
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Policies</li></Link>
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Providers</li></Link>
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Appraisals</li></Link>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-gray-400 pl-4">Modules</h3>
            <ul className="space-y-2 text-gray-600 text-center">
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Dashboard</li></Link>
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Fraud</li></Link>
                <Link to="/leakagepage" className={isActive('/leakagepage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Leakages</li></Link>
                <li className="text-center">
                    <button
                        onClick={handleToggleLeakage}
                        className={`py-2 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                            isLeakageOpen || isActive('/leakagedashboard') || isActive('/leakagebrowse') ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                    >
                        Leakage
                    </button>
                    {isLeakageOpen && (
                        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                                <button
                                    onClick={() => handleLeakageSelect('leakage-Dashboard')}
                                    className={`block px-4 py-2 text-sm w-full text-left ${
                                        isActive('/leakagedashboard') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-600 hover:text-white'
                                    }`}
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => handleLeakageSelect('leakage-Browse')}
                                    className={`block px-4 py-2 text-sm w-full text-left ${
                                        isActive('/leakagebrowse') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-600 hover:text-white'
                                    }`}
                                >
                                    Browse
                                </button>
                            </div>
                        </div>
                    )}
                </li>
                <Link  className={isActive('/marketevaluation') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Market Evaluation</li></Link>
                <Link  className={isActive('/customerdebt') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Customer Debt</li></Link>
                <Link to="/pdfparser" className={isActive('/pdfparser') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Document Verification</li></Link>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-gray-400 pl-4">Agent Workflows</h3>
            <ul className="space-y-2 text-gray-600 text-center">
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">FNOL</li></Link>
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Underwriting</li></Link>
            </ul>
            <ul className="mt-6 space-y-2 text-gray-600 text-center">
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Settings</li></Link>
                <Link  className={isActive('/nopage') ? 'bg-blue-600 text-white' : ''}><li className="py-1">Logout</li></Link>
            </ul>
        </aside>
    );
}
