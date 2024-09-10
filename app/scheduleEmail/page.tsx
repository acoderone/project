import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/queries';
import ScheduleEmailForm from '@/components/ui/ScheduleEmailForm';

export default async function ScheduleEmail() {
  const supabase = createClient();
  const [user] = await Promise.all([getUser(supabase)]);

  if (!user) {
    return redirect('/signin');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ScheduleEmailForm />
    </div>
  );
}
