'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { requestPasswordUpdate } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Define prop type with allowEmail boolean
/* eslint-disable @typescript-eslint/no-unused-vars */
interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton
}: ForgotPasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, requestPasswordUpdate, router);
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Receive a link to reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Or
          <Link
            href="/signin/signup"
            className="font-medium text-pink-600 hover:text-pink-500"
          >
            create an account
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            noValidate={true}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                loading={isSubmitting}
                disabled={disableButton}
              >
                Send Email
              </Button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                className="font-medium text-pink-600 hover:underline "
                href="/signin/password_signin"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
