// id, email, phone, avatar, name, createdAt,
const strategy = {
  id: {
    supabase: 'id',
    firebase: 'uid',
  },
  email: {
    supabase: 'email',
    firebase: 'email',
  },
  phone: {
    supabase: 'phone',
    firebase: 'phoneNumber',
  },
  avatar: {
    supabase: 'avatar_url',
    firebase: 'photoURL',
  },
  name: {
    supabase: 'name',
    firebase: 'displayName',
  },
  createdAt: {
    supabase: 'created_at',
    firebase: 'createdAt',
  },
};
