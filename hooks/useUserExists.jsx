import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-toastify';

export const useCheckUserExistence = () => {
  const supabaseClient = useSupabaseClient();

  const checkIfExists = async (email) => {
    const { data: users, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    const userExists = users?.length > 0 || false;
    return userExists;
  };

  return [checkIfExists];
};
