import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-toastify';

const useCheckUserExistence = () => {
  const supabase = useSupabaseClient();
  const [userExists, setUserExists] = useState(false);

  const checkIfExists = async (email) => {
    const { data: users, error } = await supabase.from('users').select('*').eq('email', email);

    if (error) {
      toast.error(error?.message || 'Something went wrong');
      return;
    }

    const userExists = users?.length > 0;
    setUserExists(userExists);
    return userExists;
  };

  return { userExists, checkIfExists };
};

export default useCheckUserExistence;
