import Button from '@/components/UI/Button';
import { ArrowPathIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import GithubIcon from 'public/img/github-icon.svg';
import GoogleIcon from 'public/img/google-icon.svg';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useCheckUserExistence } from '@/hooks/useUserExists';

const SchemaValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('The email field is required'),
  password: Yup.string().required('The password field is required'),
});

const Login = () => {
  const supabaseClient = useSupabaseClient();
  const [checkIfExists] = useCheckUserExistence();

  const router = useRouter();

  const handleLogin = async (values) => {
    const { error } = await supabaseClient.auth.signInWithPassword(values);
    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
    router.push('/');
  };

  const handleLoginWithProvider = async ({ email, provider }) => {
    const userExists = await checkIfExists(email);

    if (!userExists) {
      router.push(`/register?email=${email}`);
      return;
    }

    const { error } = await supabaseClient.auth.signInWithOAuth({ provider: provider || 'google' });

    if (error) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  return (
    <article className="flex flex-col items-center max-w-sm pt-8 mx-auto space-y-6 bg-gray-100">
      <header>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl md:text-4xl ">Login</h1>
      </header>

      <section className="flex flex-col items-center justify-center w-full space-y-4">
        <div className="flex flex-col items-center justify-center w-full p-5 bg-white rounded-lg">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={handleLogin}
            validationSchema={SchemaValidation}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <form className="w-full" role="form">
                <div className="flex flex-col items-center justify-center w-full space-y-2">
                  <div className="flex flex-col w-full space-y-1">
                    <label
                      className={`text-base ${
                        errors.email && touched.email ? 'text-red-500' : 'text-gray-800'
                      }`}
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      className={`w-full p-2 border ${
                        errors.email && touched.email
                          ? 'border-red-500 placeholder:text-secondary-500 text-secondary-500 '
                          : 'border-gray-300'
                      } rounded-md font-light placeholder:font-light placeholder:text-gray-500`}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={
                        errors.email && touched.email ? errors.email : 'Enter your email address'
                      }
                      type="email"
                      value={values.email}
                    />
                  </div>

                  <div className="flex flex-col w-full space-y-1">
                    <label
                      className={`${
                        errors.password && touched.password ? 'text-red-500' : 'text-gray-800'
                      }`}
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className={`w-full p-2 border ${
                        errors.password && touched.password
                          ? 'border-red-500 placeholder:text-secondary-500 text-secondary-500'
                          : 'border-gray-300'
                      }  rounded-md font-light placeholder:font-light placeholder:text-gray-500`}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={
                        errors.password && touched.password
                          ? errors.password
                          : 'Enter your password'
                      }
                      type="password"
                      value={values.password}
                    />
                  </div>
                </div>

                <Button
                  color={Object.keys(errors).length > 0 ? 'disabled' : 'primary'}
                  disabled={Object.keys(errors).length > 0}
                  displayType="block"
                  fullWidth
                  icon={<ArrowRightOnRectangleIcon className="w-6 h-6 ml-1" />}
                  iconPosition={'right'}
                  onClick={handleSubmit}
                  rounded="md"
                  size="lg"
                  styles={'w-full h-[50px] mt-4'}
                  title="Login"
                  type="submit"
                >
                  Login
                </Button>

                <div className="flex items-center justify-center w-full my-4 space-x-2">
                  <div className="block w-full h-[1px] bg-gray-300" />
                  <span className="text-gray-500">or</span>
                  <div className="block w-full h-[1px] bg-gray-300" />
                </div>
              </form>
            )}
          </Formik>

          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={handleLoginWithProvider}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Invalid email').required('The email field is required'),
              provider: Yup.string(),
            })}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
            }) => (
              <form className="w-full">
                <div className="flex flex-col w-full mb-4 space-y-1">
                  <label
                    className={`text-base ${
                      errors.email && touched.email ? 'text-red-500' : 'text-gray-800'
                    }`}
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className={`w-full p-2 border ${
                      errors.email && touched.email
                        ? 'border-red-500 placeholder:text-secondary-500 text-secondary-500 '
                        : 'border-gray-300'
                    } rounded-md font-light placeholder:font-light placeholder:text-gray-500`}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={
                      errors.email && touched.email ? errors.email : 'Enter your email address'
                    }
                    type="email"
                    value={values.email}
                  />

                  {errors.email && touched.email && (
                    <div className="text-xs text-red-500">{errors.email}</div>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center w-full space-y-4">
                  <Button
                    color={Object.keys(errors).length > 0 ? 'disabled' : 'info'}
                    displayType="block"
                    fullWidth
                    icon={<GoogleIcon className="w-5 h-5 mt-0.5" />}
                    onClick={() => {
                      setFieldValue('provider', 'google');
                      handleSubmit({ email: values.email, provider: 'google' });
                    }}
                    rounded="md"
                    styles={`w-full h-[50px] ${Object.keys(errors).length === 0 && 'text-white'} `}
                  >
                    <div className="flex items-center space-x-4 ">
                      {isSubmitting && values.provider === 'google' ? (
                        <>
                          <span>Login...</span>
                          <span>
                            <ArrowPathIcon className="w-5 h-5 text-white animate-spin" />
                          </span>
                        </>
                      ) : (
                        'Login with Google'
                      )}
                    </div>
                  </Button>
                  <Button
                    color={Object.keys(errors).length > 0 ? 'disabled' : 'dark'}
                    disabled={Object.keys(errors).length > 0}
                    displayType="block"
                    fullWidth
                    icon={<GithubIcon className="w-5 h-5 top-0.5" />}
                    onClick={() => {
                      setFieldValue('provider', 'github');
                      handleSubmit({ email: values.email, provider: 'github' });
                    }}
                    rounded="md"
                    styles={`w-full h-[50px] ${Object.keys(errors).length === 0 && 'text-white'} `}
                  >
                    <div className="flex items-center space-x-4 ">
                      {isSubmitting && values.provider === 'github' ? (
                        <>
                          <span>Login...</span>
                          <span>
                            <ArrowPathIcon className="w-5 h-5 text-white animate-spin" />
                          </span>
                        </>
                      ) : (
                        'Login with Github'
                      )}
                    </div>
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>

        <footer className="flex flex-col gap-1 text-center">
          <p className="text-base font-light text-gray-800">
            Don&apos;t have an account?{' '}
            <button
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push('/register')}
              type="button"
            >
              Register
            </button>
          </p>

          <p className="text-base font-light text-gray-800">
            Forgot your password?{' '}
            <button
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push('/forgot-password')}
              type="button"
            >
              Reset Password
            </button>
          </p>
        </footer>
      </section>
    </article>
  );
};

export default Login;
