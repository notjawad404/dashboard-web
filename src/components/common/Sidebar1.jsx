import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
                        <div className="absolute z-10 left-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                <li>
                    <button onClick={() => navigate('/customers')} className={`px-2 py-1 rounded-lg ${isActive('/customers') ? 'bg-blue-600 text-white' : ''}`}>
                        Customers
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/policies')} className={`px-2 py-1 rounded-lg ${isActive('/policies') ? 'bg-blue-600 text-white' : ''}`}>
                        Policies
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/providers')} className={`px-2 py-1 rounded-lg ${isActive('/providers') ? 'bg-blue-600 text-white' : ''}`}>
                        Providers
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/appraisals')} className={`px-2 py-1 rounded-lg ${isActive('/appraisals') ? 'bg-blue-600 text-white' : ''}`}>
                        Appraisals
                    </button>
                </li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-gray-400 pl-4">Modules</h3>
            <ul className="space-y-2 text-gray-600 text-center">
                <li>
                    <button onClick={() => navigate('/dashboard')} className={`px-2 py-1 rounded-lg ${isActive('/dashboard') ? 'bg-blue-600 text-white' : ''}`}>
                        Dashboard
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/fraud')} className={`px-2 py-1 rounded-lg ${isActive('/fraud') ? 'bg-blue-600 text-white' : ''}`}>
                        Fraud
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/leakagepage')} className={`px-2 py-1 rounded-lg ${isActive('/leakagepage') ? 'bg-blue-600 text-white' : ''}`}>
                        Leakages
                    </button>
                </li>
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
                        <div className="absolute z-10 left-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                <li>
                    <button onClick={() => navigate('/marketevaluation')} className={`px-2 py-1 rounded-lg ${isActive('/marketevaluation') ? 'bg-blue-600 text-white' : ''}`}>
                        Market Evaluation
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/customerdebt')} className={`px-2 py-1 rounded-lg ${isActive('/customerdebt') ? 'bg-blue-600 text-white' : ''}`}>
                        Customer Debt
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/pdfparser')} className={`px-2 py-1 rounded-lg ${isActive('/pdfparser') ? 'bg-blue-600 text-white' : ''}`}>
                        Document Verification
                    </button>
                </li>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-gray-400 pl-4">Agent Workflows</h3>
            <ul className="space-y-2 text-gray-600 text-center">
                <li>
                    <button onClick={() => navigate('/fnol')} className={`px-2 py-1 rounded-lg ${isActive('/fnol') ? 'bg-blue-600 text-white' : ''}`}>
                        FNOL
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/underwriting')} className={`px-2 py-1 rounded-lg ${isActive('/underwriting') ? 'bg-blue-600 text-white' : ''}`}>
                        Underwriting
                    </button>
                </li>
            </ul>
            <ul className="mt-6 space-y-2 text-gray-600 text-center">
                <li>
                    <button onClick={() => navigate('/settings')} className={`px-2 py-1 rounded-lg ${isActive('/settings') ? 'bg-blue-600 text-white' : ''}`}>
                        Settings
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/logout')} className={`px-2 py-1 rounded-lg ${isActive('/logout') ? 'bg-blue-600 text-white' : ''}`}>
                        Logout
                    </button>
                </li>
            </ul>
        </aside>
    );
}
