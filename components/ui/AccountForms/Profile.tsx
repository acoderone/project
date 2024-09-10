'use client';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/utils/auth-helpers/server';
import { User } from '@supabase/supabase-js';
import Button from '../Button';

export default function Profile({ user }: { user: User | null }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit start');
    setIsSubmitting(true);
    // Check if the new name is the same as the old name
    if (
      e.currentTarget.email.value === user?.email &&
      e.currentTarget.fullName.value === user?.user_metadata.full_name
    ) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    console.log('submit');
    handleRequest(e, updateProfile, router);
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Update Account
        </h2>
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
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="hidden"
                  name="oldFullName"
                  value={user?.user_metadata.full_name}
                />
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                  defaultValue={user?.user_metadata.full_name}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input type="hidden" name="oldEmail" value={user?.email} />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm"
                  placeholder="Your email"
                  defaultValue={user?.email}
                />
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
