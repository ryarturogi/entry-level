import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';

const Login = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md px-8 py-5 bg-white h-fit rounded-2xl">
          <Auth
            appearance={{
              style: {
                button: {
                  background: 'white',
                  color: 'black',
                  border: '1px solid black',
                  height: '40px',
                  borderRadius: '5px',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 300,
                  marginTop: '5px',
                },
                anchor: {
                  color: 'black',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 300,
                },
                label: {
                  color: 'black',
                  fontSize: '16px',
                  fontWeight: 400,
                },
                input: {
                  background: 'white',
                  color: 'black',
                  border: '1px solid black',
                  height: '50px',
                  borderRadius: '8px',
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 300,
                  padding: '0 10px',
                  marginTop: '5px',
                },
                divider: {
                  display: 'none',
                },
              },
            }}
            providers={['google', 'github']}
            redirectTo="http://localhost:3000/"
            supabaseClient={supabaseClient}
          />
        </div>
      </div>
    );
  }
};

export default Login;
