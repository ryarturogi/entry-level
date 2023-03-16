import Supabase from '@/repositories/SupabaseRepo';
import Firebase from '@/repositories/FirebaseRepo';

import Repository from '../repositories';
import { PROVIDERS } from '@/constants/index';

const Provider = (provider) => {
  switch (provider) {
    case PROVIDERS.SUPABASE:
      // Init using Supabase service
      return Repository.init(Supabase());
    case PROVIDERS.FIREBASE:
      // Init using Firebase service
      return Repository.init(Firebase());
    default:
      return Repository.init(Supabase());
  }
};

const ClientApi = Provider(process.env.NEXT_PUBLIC_PROVIDER_NAME);

export default ClientApi;
