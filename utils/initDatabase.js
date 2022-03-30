import Firebase from '@/repositories/FirebaseRepo';
import Supabase from '@/repositories/SupabaseRepo';

import Repository from '../repositories';

const Provider = (provider) => {
  switch (provider) {
    case 'supabase':
      // Init using Supabase service
      return Repository.init(Supabase());
    case 'firebase':
      // Init using Firebase service
      return Repository.init(Firebase());
    default:
      return Repository.init(Supabase());
  }
};

export default Provider;
