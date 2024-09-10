import React from 'react';
import Check from '@/components/icons/Check';
import PricingCard from './PricingCard';

type PricingPlan = {
  name: string;
  description: string;
  price: number;
  features: string[];
};

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'For new makers who want to fine-tune and test an idea.',
    price: 0,
    features: ['Sent Dashboard']
  },
  {
    name: 'Pro',
    description: 'For professionals who need advanced features and support.',
    price: 29,
    features: ['Sent Dashboard', 'Advanced Analytics', 'Priority Support']
  },
  {
    name: 'Enterprise',
    description: 'For large teams and organizations with custom requirements.',
    price: 99,
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
            className="relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 gradient text-white shadow-sm"
          >
            Monthly billing
          </button>
          <button
            type="button"
            className="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 border-transparent text-slate-900"
          >
            Yearly billing
          </button>
        </div>
        <div className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
