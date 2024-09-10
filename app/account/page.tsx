import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  getUser
} from '@/utils/supabase/queries';
import Profile from '@/components/ui/AccountForms/Profile';

export default async function Account() {
  const supabase = createClient();
  const [user] = await Promise.all([
    getUser(supabase),
  ]);

  if (!user) {
    return redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Profile user={user} />
    </div>
  );
}
