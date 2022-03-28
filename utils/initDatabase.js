import Repository from 'repositories';
import Supabase from 'repositories/SupabaseRepo';

const Client = (providerName) => {
  switch (providerName) {
    case 'supabase':
      // Init using Supabase service
      return Repository.init(Supabase());
    default:
      return Repository.init(Supabase());
  }
};

export default Client();
