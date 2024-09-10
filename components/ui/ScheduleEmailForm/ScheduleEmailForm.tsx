'use client';

import Button from '@/components/ui/Button';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest, signInWithOAuth } from '@/utils/auth-helpers/client';
import React, { useState } from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */
// Define prop type with allowEmail boolean

const frequencyOptions = [
    { value: 'weekly_monday', label: 'Weekly on Monday' },
    { value: 'weekly_monday_friday', label: 'Weekly on Monday and Friday' },
    { value: 'monthly_first_monday', label: 'Monthly First Monday of the Month' }
];

export default function ScheduleEmailForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true); // Disable the button while the request is being handled
        await handleRequest(e, signInWithPassword);
        setIsSubmitting(false);
    };

    const handleGoogleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitting(true); // Disable the button while the request is being handled
        await signInWithOAuth(e);
        setIsSubmitting(false);
    };

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Email Schedule
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" noValidate={true} onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900">Select frequency</label>
                            <select id="frequency" name="frequency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 ">
                                <option value="">Choose a frequency</option>
                                {frequencyOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select time:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="time" id="time" name='time' className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 " min="09:00" max="18:00" value="00:00" required />
                            </div>

                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                loading={isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
