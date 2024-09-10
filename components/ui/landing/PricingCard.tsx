import React from 'react';
import Check from '@/components/icons/Check';
import Link from 'next/link';

type PricingPlanProps = {
    plan: {
        name: string;
        description: string;
        price: {
            monthly: number;
            yearly: number;
        };
        features: string[];
    };
    selectedDuration: 'monthly' | 'yearly';
};

const PricingCard: React.FC<PricingPlanProps> = ({ plan, selectedDuration }) => {


    return (
        <div
            key={plan.name}
            className="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200"
        >
            <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-slate-900">
                    {plan.name}
                </h2>
                <p className="mt-2 text-base text-slate-700 leading-tight">
                    {plan.description}
                </p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                        ${plan.price[selectedDuration]}
                    </span>
                    <span className="text-base font-medium text-slate-500">/{selectedDuration === 'monthly' ? 'month' : 'year'}</span>
                </p>
                <Link
                    href="/sign-up"
                    className="mt-8 block w-full bg-primary rounded-md py-2 text-sm font-semibold text-white text-center border border-primary hover:bg-white hover:text-primary"
                >
                    Join as {plan.name}
                </Link>

            </div>
            <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                    What&apos;s included
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex space-x-3">
                            <Check className="flex-shrink-0 h-5 w-5 text-green-400" />
                            <span className="text-base text-slate-700">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PricingCard;
