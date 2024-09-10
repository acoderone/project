'use client';

import React, { useState } from 'react';
import PricingCard from './PricingCard';

type PricingPlan = {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
};

type BillingDuration = 'monthly' | 'yearly';

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'For new makers who want to fine-tune and test an idea.',
    price: {
      monthly: 0,
      yearly: 0
    },
    features: ['Sent Dashboard']
  },
  {
    name: 'Pro',
    description: 'For professionals who need advanced features and support.',
    price: {
      monthly: 10,
      yearly: 100
    },
    features: ['Sent Dashboard', 'Advanced Analytics', 'Priority Support']
  },
  {
    name: 'Enterprise',
    description: 'For large teams and organizations with custom requirements.',
    price: {
      monthly: 30,
      yearly: 300
    },
    features: [
      'Sent Dashboard',
      'Advanced Analytics',
      'Priority Support',
      'Custom Integrations',
      'Dedicated Account Manager'
    ]
  }
];

const Pricing = () => {
  const [selectedDuration, setSelectedDuration] = useState<BillingDuration>('monthly');
  return (
    <section className="bg-gray-100 py-8" id="pricing">
      <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
        Pricing
      </h2>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
      </div>
      <div className="sm:flex sm:flex-col sm:align-center p-10">
        <div className="relative self-center bg-slate-200 rounded-lg p-0.5 flex">
          <button
            type="button"
            className={`relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${selectedDuration === 'monthly' ? 'bg-primary text-white shadow-sm' : 'text-slate-900'}`}
            onClick={() => setSelectedDuration('monthly')}
          >
            Monthly billing
          </button>
          <button
            type="button"
            className={`relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${selectedDuration === 'yearly' ? 'bg-primary text-white shadow-sm' : 'text-slate-900'}`}
            onClick={() => setSelectedDuration('yearly')}
          >
            Yearly billing
          </button>
        </div>
        <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} selectedDuration={selectedDuration} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
