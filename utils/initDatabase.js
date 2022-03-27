import Repository from 'repositories';
import Supabase from 'repositories/SupabaseRepo';

const Provider = (providerName) => {
  switch (providerName) {
    case 'supabase':
      // init using Supabase service
      return Repository.init(new Supabase());
    default:
      return Repository.init(new Supabase());
  }
};

export default Provider();
