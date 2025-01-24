import React, { useState } from 'react';
import {
  Building2,
  Users,
  DollarSign,
  CheckCircle2,
  ShieldCheck,
  Scale,
  Building,
  FileCheck,
  BadgeCheck,
} from 'lucide-react';

type Framework = 'SOC2' | 'ISO27001' | 'GDPR' | 'NIST' | 'HIPAA' | 'CMMC';
type Vendor = 'Vanta' | 'SecureFrame' | 'Drata' | 'ServiceNow' | 'AuditBoard';

const frameworks = [
  { id: 'SOC2', name: 'SOC 2', icon: ShieldCheck },
  { id: 'ISO27001', name: 'ISO 27001', icon: BadgeCheck },
  { id: 'GDPR', name: 'GDPR', icon: Scale },
  { id: 'NIST', name: 'NIST', icon: Building },
  { id: 'HIPAA', name: 'HIPAA', icon: FileCheck },
  { id: 'CMMC', name: 'CMMC', icon: CheckCircle2 },
];

const vendors: Record<Vendor, { name: string; logo: string }> = {
  Vanta: {
    name: 'Vanta',
    logo: 'https://movingbrands.com/wp-content/uploads/2023/09/MB-Vanta-001-Logo-2000x1125.jpg',
  },
  SecureFrame: {
    name: 'SecureFrame',
    logo: 'https://getlogovector.com/wp-content/uploads/2020/11/secureframe-logo-vector.png',
  },
  Drata: {
    name: 'Drata',
    logo: 'https://dailyalts.com/wp-content/uploads/2022/12/About_Drata_Logo_Image_2x.jpg',
  },
  ServiceNow: {
    name: 'ServiceNow',
    logo: 'https://th.bing.com/th/id/R.a6b036ec917db7ddc38a36be03cbfe26?rik=flgVNuAPw4edZQ&pid=ImgRaw&r=0',
  },
  AuditBoard: {
    name: 'AuditBoard',
    logo: 'https://th.bing.com/th/id/R.dfa9ff38de0f1e62302d92e3f8d73e1e?rik=kj33oTevSAFdFw&riu=http%3a%2f%2fww1.prweb.com%2fprfiles%2f2018%2f10%2f16%2f15845858%2fAuditBoard-Logo+2x.png&ehk=PLl7LW4TWf0FiutMQbtCFX2ZOCh7tm8sQ5a0JbMgIj0%3d&risl=&pid=ImgRaw&r=0',
  },
};

function App() {
  const [step, setStep] = useState(0);
  const [selectedFramework, setSelectedFramework] = useState<Framework>();
  const [headcount, setHeadcount] = useState('');
  const [revenue, setRevenue] = useState('');
  const [eliminatedVendors, setEliminatedVendors] = useState<Set<Vendor>>(new Set());

  const eliminateVendor = (vendor: Vendor) => {
    setEliminatedVendors(prev => new Set([...prev, vendor]));
  };

  const questions = [
    {
      question: "What's your primary compliance framework goal?",
      component: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {frameworks.map(framework => (
            <button
              key={framework.id}
              onClick={() => {
                setSelectedFramework(framework.id as Framework);
                eliminateVendor('ServiceNow');
                setStep(1);
              }}
              className="p-4 border rounded-lg hover:border-blue-500 transition-colors flex flex-col items-center gap-2"
            >
              <framework.icon className="w-8 h-8 text-blue-600" />
              <span>{framework.name}</span>
            </button>
          ))}
        </div>
      ),
    },
    {
      question: "What's your company headcount?",
      component: (
        <div className="flex items-center gap-4">
          <Users className="w-6 h-6 text-blue-600" />
          <input
            type="number"
            value={headcount}
            onChange={(e) => {
              setHeadcount(e.target.value);
              eliminateVendor('AuditBoard');
            }}
            placeholder="Enter headcount"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => setStep(2)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      ),
    },
    {
      question: "What's your annual revenue?",
      component: (
        <div className="flex items-center gap-4">
          <DollarSign className="w-6 h-6 text-blue-600" />
          <input
            type="number"
            value={revenue}
            onChange={(e) => {
              setRevenue(e.target.value);
              eliminateVendor('Drata');
            }}
            placeholder="Enter annual revenue"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => setStep(3)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      ),
    },
    {
      question: "What's your approach to compliance?",
      component: (
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              eliminateVendor('SecureFrame');
              setStep(4);
            }}
            className="p-4 border rounded-lg hover:border-blue-500 transition-colors text-left"
          >
            <h3 className="font-semibold">Strategic Investment</h3>
            <p className="text-gray-600">
              Build a scalable compliance program that grows with your business
            </p>
          </button>
          <button
            onClick={() => {
              eliminateVendor('SecureFrame');
              setStep(4);
            }}
            className="p-4 border rounded-lg hover:border-blue-500 transition-colors text-left"
          >
            <h3 className="font-semibold">One-time Certification</h3>
            <p className="text-gray-600">Just need to check the box for now</p>
          </button>
        </div>
      ),
    },
  ];

  const getQuote = () => {
    const count = parseInt(headcount);
    if (count <= 50) return '$24,000/year';
    if (count <= 100) return '$36,000/year';
    return 'Custom pricing - Contact sales';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-12 border-b pb-6">
          {Object.entries(vendors).map(([key, vendor]) => (
            <div
              key={key}
              className={`transition-opacity duration-500 ${
                eliminatedVendors.has(key as Vendor) ? 'opacity-20' : 'opacity-100'
              }`}
            >
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="w-20 h-20 object-contain"
              />
            </div>
          ))}
        </div>

        {step < questions.length ? (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">{questions[step].question}</h2>
            {questions[step].component}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">
              Vanta is Your Ideal Solution!
            </h2>
            <div className="space-y-4">
              <p className="text-xl">
                Based on your needs ({selectedFramework} compliance with {headcount}{' '}
                employees), we recommend:
              </p>
              <div className="text-2xl font-bold">{getQuote()}</div>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Continuous compliance monitoring</li>
                <li>Automated evidence collection</li>
                <li>Expert support team</li>
                <li>Custom policies and procedures</li>
              </ul>
              <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full">
                Get Started with Vanta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;