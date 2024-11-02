import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Sidebar1() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value) => {
        switch (value) {
            case 'claims':
                navigate('/claimpage');
                break;
            case 'claim-Dashboard':
                navigate('/dashboard');
                break;
            case 'claim-Browse':
                navigate('/browseclaim');
                break;
            default:
                break;
        }
        setIsOpen(false);
    };

    return (
        <aside className="w-64 font-nunito font-semibold text-[14px] bg-white h-screen pb-4 border-r flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-orange-500 text-center">rekover</h2>
            <ul className="space-y-2 text-center">
                <li className="text-center">
                    <button
                        onClick={handleToggle}
                        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Claim
                    </button>
                    {isOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                                <button
                                    onClick={() => handleSelect('claims')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white w-full text-left"
                                >
                                    Claim Page
                                </button>
                                <button
                                    onClick={() => handleSelect('claim-Dashboard')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white w-full text-left"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => handleSelect('claim-Browse')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-600 hover:text-white w-full text-left"
                                >
                                    Browse
                                </button>
                            </div>
                        </div>
                    )}
                </li>
                <Link to="/"><li className="py-1">Customers</li></Link>
                <Link to="/"><li className="py-1">Policies</li></Link>
                <Link to="/"><li className="py-1">Providers</li></Link>
                <Link to="/"><li className="py-1">Appraisals</li></Link>
                <Link to="/"><li className="py-1">...</li></Link>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-gray-400 pl-4">Modules</h3>
            <ul className="space-y-2 text-gray-600 text-center">
                <Link to="/"><li className="py-1">Dashboard</li></Link>
                <Link to="/"><li className="py-1">Fraud</li></Link>
                <Link to="/leakagepage"><li className="py-1">Leakages</li></Link>
                <Link to="/"><li className="py-1">Vehicle Evaluation</li></Link>
                <Link to="/"><li className="py-1">Customer Debt</li></Link>
                <Link to="/"><li className="py-1">Document Verification</li></Link>
            </ul>
            <h3 className="mt-6 text-sm font-semibold text-gray-400 pl-4">Agent Workflows</h3>
            <ul className="space-y-2 text-gray-600 text-center">
                <Link to="/"><li className="py-1">FNOL</li></Link>
                <Link to="/"><li className="py-1">Underwriting</li></Link>
            </ul>
            <ul className="mt-6 space-y-2 text-gray-600 text-center">
                <Link to="/"><li className="py-1">Settings</li></Link>
                <Link to="/"><li className="py-1">Logout</li></Link>
            </ul>
        </aside>
    );
}
