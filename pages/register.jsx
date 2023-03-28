import AutoComplete from '@/components/Form/AutoComplete';
import TextField from '@/components/Form/TextField';
import TextareaField from '@/components/Form/Textarea';
import AvatarUpload from '@/components/UI/AvatarUpload';
import Button from '@/components/UI/Button';
import {
  CANDIDATE_FIELDS,
  COMPANY_FIELDS,
  CREDENTIALS_FIELDS,
  INITIAL_VALUES,
  ROLE_OPTIONS,
  ROLES,
  SCHEMAS,
  STEPS,
} from '@/constants/register';
import useCountries from '@/hooks/useCountries';
import ClientApi from '@/utils/initDatabase';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useModal from '@/hooks/useModal';
import { ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';

const Register = () => {
  const router = useRouter();
  const allCountries = useCountries();
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(STEPS.SELECT_ROLE);
  const [role, setRole] = useState(ROLES.CANDIDATE);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [typesSchemas] = useState(SCHEMAS);
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Returns an array of options for a given field name.
  const getFieldOptions = (fieldName) => {
    // Field names for which options are available
    const CAREER_FIELD = 'career';
    const SIZE_FIELD = 'size';
    const INDUSTRY_FIELD = 'industry';

    // Object that maps field names to their available options.
    const fieldOptions = {
      career: CANDIDATE_FIELDS.find((field) => field.name === CAREER_FIELD).options,
      size: COMPANY_FIELDS.find((field) => field.name === SIZE_FIELD).options,
      industry: COMPANY_FIELDS.find((field) => field.name === INDUSTRY_FIELD).options,
      location: allCountries,
    };

    // Return the options for the specified field name, or an empty array if the field name is not found.
    return fieldOptions[fieldName] || [];
  };

  // Returns an array of field definitions for a given role (either candidate or company).
  const setFieldsByRole = (role) => {
    // Object that maps roles to their corresponding field definitions.
    const fields = {
      candidate: CANDIDATE_FIELDS,
      company: COMPANY_FIELDS,
    };

    // Return the field definitions for the specified role, or an empty array if the role is not found.
    return fields[role] || [];
  };

  // Checks if the form is valid based on the current step and role
  const isFormValid = (values, step) => {
    if (step === STEPS.CREDENTIALS) {
      return (
        values.email &&
        values.password &&
        values.confirmPassword &&
        values.password === values.confirmPassword
      );
    } else if (step === STEPS.REGISTER_INFO) {
      if (role === ROLES.CANDIDATE) {
        return values.name && values.phone && values.career.length;
      } else if (role === ROLES.COMPANY) {
        return (
          values.companyName &&
          values.phone &&
          values.companyDescription &&
          values.industry.length &&
          values.size.length &&
          values.location.length
        );
      }
    }
    return false;
  };

  // Uploads an avatar or logo image to the server and returns its URL
  const uploadAvatarHandler = async (values, role) => {
    try {
      // Helper function to get the email prefix for the filename
      const getEmailPrefix = (email) => {
        return email.split('@')[0].toLowerCase().replace(/\s/g, '-');
      };

      // Helper function to generate the filename based on values and role
      const getFilename = (values, role) => {
        const prefix = getEmailPrefix(values.email);
        const type = role === ROLES.CANDIDATE ? 'avatar' : 'logo';
        return `${prefix}-${type}`;
      };

      // Generate the filename and the slug based on the role
      const filename = getFilename(values, role);
      const slug = role === ROLES.CANDIDATE ? 'avatars' : 'company-logos';

      // Call the API to upload the file and get its URL
      const { data: avatarURL, error } = await ClientApi.uploadLogo({
        slug,
        file: values.avatar_url,
        filename,
      });

      // Handle any errors that may have occurred during the API call
      if (error) {
        const errorMessage = error?.message || 'Server error occurred';
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Get the path from the URL and return the full URL
      const path = avatarURL?.path || avatarURL?.Key || '';
      return `/${slug}/${path}`;
    } catch (error) {
      // Handle any errors that may have occurred during the upload process
      const errorMessage = error?.message || 'Server error occurred';
      toast.error(errorMessage);
      throw new Error(`Error uploading avatar: ${errorMessage}`);
    }
  };

  // Creates a user with the given values and avatarURL
  const createUserHandler = async (values, avatarURL) => {
    try {
      // Create an object with the user's role, avatarURL, and saved jobs
      const registerData = {
        role: values.role,
        avatar_url: avatarURL,
        savedJobs: [],
      };

      // If the user is a candidate, add their name, phone, and career to registerData
      if (values.role === ROLES.CANDIDATE) {
        registerData.name = values.name;
        registerData.phone = values.phone;
        registerData.career = values.career[0]?.id || values.career[0];
      }

      // If the user is a company, add their company information to registerData
      if (values.role === ROLES.COMPANY) {
        registerData.company = {
          name: values.companyName,
          phone: values.phone,
          description: values.companyDescription,
          website: values.companyWebsite,
          industry: values.industry[0]?.id || values.industry[0],
          size: values.size[0]?.id || values.size[0],
          location: values.location[0]?.id || values.location[0],
        };
      }

      // Call the signUp API with the user's email, password, and registerData
      const { data, error } = await ClientApi.Auth.signUp({
        email: values.email,
        password: values.password,
        data: registerData,
      });

      // Return the response data and error (if any)
      return { data, error };
    } catch (error) {
      const errorMessage = error?.message || 'Server error occurred';
      toast.error(errorMessage);
      // Re-throw the error to propagate it up the call stack
      throw error;
    }
  };

  const onRegisterHandler = async () => {
    setIsSubmitting(true);

    try {
      const avatarURL = formData.avatar_url ? await uploadAvatarHandler(formData) : '';
      const { error } = await createUserHandler(formData, avatarURL);

      if (error) {
        const errorMessage = error?.message || 'Server error occurred';
        throw new Error(errorMessage);
      }

      closeModal();
      toast.success('Account created successfully');
      router.push('/');
    } catch (error) {
      const errorMessage = error?.message || 'Server error occurred';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set the email field to the value of the query parameter 'email', if present
  useEffect(() => {
    const { email } = router.query;
    if (email) {
      setInitialValues((prevValues) => ({ ...prevValues, email }));
    }
  }, [router.query.email]);

  // Memoize the Yup validation schema based on the selected role.
  const validationSchemaSelected = useMemo(() => {
    return typesSchemas[role];
  }, [role]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchemaSelected}
    >
      {({ values, handleChange, handleBlur, setFieldValue, errors, touched, setFieldTouched }) => (
        <>
          <article
            className={`container flex flex-col items-center pt-8 w-full min-h-[calc(100vh-4rem)] mx-auto space-y-6 bg-gray-100 min-w-screen
          ${step === STEPS.REGISTER_INFO && role === ROLES.COMPANY ? 'max-w-2xl' : 'max-w-sm'}
        `}
          >
            <header>
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl md:text-3xl ">
                {step === STEPS.SELECT_ROLE && 'Select your role'}
                {step === STEPS.CREDENTIALS && 'Account Registration'}
                {step === STEPS.REGISTER_INFO &&
                  `${values.role === ROLES.CANDIDATE ? 'Candidate' : 'Company'} Registration`}
              </h1>
            </header>

            <form
              className="grid w-full grid-cols-1 p-8 bg-white rounded-lg shadow-md shadow-lg shadow-xl"
              role="form"
            >
              {step === STEPS.SELECT_ROLE && (
                <article>
                  <div className="flex items-center justify-center w-full gap-4">
                    {ROLE_OPTIONS.map((option) => (
                      <div
                        className="relative flex items-center justify-start w-full"
                        key={option.id}
                      >
                        <label
                          aria-label={option.name}
                          aria-pressed={option.id === role}
                          className={`flex items-center justify-center w-full p-2 text-lg font-semibold select-none text-white rounded-md cursor-pointer h-32 ${
                            option.id === role
                              ? 'bg-primary-700 hover:bg-secondary-800 '
                              : 'bg-gray-400 hover:bg-secondary-700'
                          }`}
                          htmlFor={option.id}
                          role="button"
                        >
                          {option.name}
                          <input
                            aria-checked={option.id === role}
                            checked={option.id === role}
                            className="absolute cursor-pointer bottom-1.5 right-1.5 rounded text-primary-800 ring-0 focus:ring-0 focus:outline-none"
                            id={option.id}
                            name="role"
                            onChange={() => {
                              setRole(option.id);
                              setFieldValue('role', option.id);
                            }}
                            role="radio"
                            type="checkbox"
                            value={option.id}
                          />
                        </label>
                      </div>
                    ))}
                  </div>

                  <Button
                    aria-label="Continue"
                    displayType="flex"
                    fullWidth
                    onClick={(event) => {
                      event.preventDefault();
                      // validate form
                      setStep(STEPS.CREDENTIALS);
                    }}
                    rounded="md"
                    size="lg"
                    styles={'w-full h-[50px] mt-8'}
                    title="Continue"
                    type="button"
                  >
                    <div className="text-white">Get started</div>
                  </Button>
                </article>
              )}

              {step === STEPS.CREDENTIALS && (
                <article className="cols-span-1">
                  <section className="grid w-full grid-cols-1 gap-2">
                    <ul className="flex flex-col w-full">
                      {CREDENTIALS_FIELDS.map((field) => (
                        <li className="block w-full" key={field.name}>
                          {field.type === 'text' && (
                            <TextField
                              error={
                                errors[field.name] && touched[field.name] && errors[field.name]
                              }
                              label={field.label}
                              name={field.name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              required={field.required}
                              title={field.label}
                              type="text"
                              value={values[field.name]}
                            />
                          )}
                          {field.type === 'select' && getFieldOptions(field.name)?.length > 0 && (
                            <AutoComplete
                              error={
                                errors[field.name] && touched[field.name] && errors[field.name]
                              }
                              multiple={field.multiple}
                              onChange={(selected) => setFieldValue(field.name, selected)}
                              options={getFieldOptions(field.name)}
                              optionsSelected={values[field.name] || []}
                              placeholder={field.placeholder}
                              required={field.required}
                              setTouched={(name) => setFieldTouched(name)}
                              title={field.label}
                              touched={touched[field.name]}
                            />
                          )}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col w-full">
                      <TextField
                        error={errors.password && touched.password && errors.password}
                        label="Password"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        title="Password"
                        type="password"
                        value={values.password}
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <TextField
                        error={
                          errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword
                        }
                        label="Confirm Password"
                        name="confirmPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        title="Confirm Password"
                        type="password"
                        value={values.confirmPassword}
                      />
                    </div>
                  </section>

                  <Button
                    color={isFormValid(values, step) ? 'primary' : 'disabled'}
                    disabled={!isFormValid(values, step)}
                    displayType="flex"
                    fullWidth
                    onClick={(event) => {
                      event.preventDefault();
                      if (isFormValid(values, step)) {
                        setStep(STEPS.REGISTER_INFO);
                      }
                    }}
                    rounded="md"
                    size="lg"
                    styles={'w-full h-[50px] mt-8'}
                    title="Continue"
                    type="button"
                  >
                    <div className={isFormValid(values, step) ? 'text-white' : 'text-gray-400'}>
                      Continue
                    </div>
                  </Button>
                  <footer className="flex items-center justify-center w-full mt-4">
                    <Button
                      className="text-sm font-light text-gray-800 cursor-pointer hover:text-secondary-700"
                      color="text"
                      onClick={() => setStep(STEPS.SELECT_ROLE)}
                      type="button"
                    >
                      Return to previous step
                    </Button>
                  </footer>
                </article>
              )}

              {step === STEPS.REGISTER_INFO && (
                <article className="w-full">
                  <section className="flex flex-col items-center w-full">
                    <AvatarUpload
                      errors={errors.avatar_url}
                      id="avatar_url"
                      name="avatar_url"
                      onChange={(uploadedAvatar) => {
                        setFieldValue('avatar_url', uploadedAvatar);
                      }}
                      placeholder={`Upload ${role === 'candidate' ? 'avatar' : 'logo'}`}
                    />

                    <div className="w-full h-px mt-6 mb-4 bg-gray-300" />

                    <section
                      className={`grid w-full gap-4 grid-cols-${role === 'candidate' ? 1 : 2}`}
                    >
                      {setFieldsByRole(role).map((field) => (
                        <div className="w-full" key={field.name}>
                          {field.type === 'text' && (
                            <TextField
                              error={
                                errors[field.name] && touched[field.name] && errors[field.name]
                              }
                              label={field.label}
                              name={field.name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              required={field.required}
                              title={field.label}
                              type="text"
                              value={values[field.name]}
                            />
                          )}

                          {field.type === 'select' && getFieldOptions(field.name)?.length > 0 && (
                            <AutoComplete
                              error={
                                errors[field.name] && touched[field.name] && errors[field.name]
                              }
                              name={field.name}
                              onChange={(selected) => setFieldValue(field.name, selected)}
                              options={getFieldOptions(field.name)}
                              optionsSelected={values[field.name] || []}
                              placeholder={field.placeholder}
                              required={field.required}
                              setTouched={(name) => setFieldTouched(name)}
                              title={field.label}
                            />
                          )}
                        </div>
                      ))}
                    </section>

                    {role === ROLES.COMPANY && (
                      <section className="flex flex-col w-full mt-4">
                        <TextareaField
                          error={
                            errors.companyDescription &&
                            touched.companyDescription &&
                            errors.companyDescription
                          }
                          label={'Description'}
                          name={'companyDescription'}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={'Enter your company description'}
                          required
                          rows={5}
                          title={'Company Description'}
                          value={values.companyDescription}
                        />
                      </section>
                    )}
                  </section>

                  <Button
                    color={isFormValid(values, step) ? 'primary' : 'disabled'}
                    disabled={!isFormValid(values, step)}
                    displayType="block"
                    fullWidth
                    onClick={(event) => {
                      event.preventDefault();

                      if (!isOpen && isFormValid(values, step)) {
                        setFormData(values);
                        openModal();
                      }
                    }}
                    rounded="md"
                    size="lg"
                    styles={'w-full h-[50px] mt-8'}
                    title="Register"
                    type="button"
                  >
                    <div className={isFormValid(values, step) ? 'text-white' : 'text-gray-400'}>
                      Create account
                    </div>
                  </Button>

                  <footer className="flex items-center justify-center w-full mt-4">
                    <Button
                      className="text-sm font-light text-gray-800 cursor-pointer hover:text-secondary-700"
                      color="text"
                      onClick={() => setStep(STEPS.CREDENTIALS)}
                      type="button"
                    >
                      Return to previous step
                    </Button>
                  </footer>
                </article>
              )}
            </form>

            <footer className="flex flex-col gap-2 mt-4 text-center">
              <section className="text-base font-light text-gray-800">
                Already have an account?{' '}
                <button
                  className="cursor-pointer text-primary-700"
                  onClick={() => router.push('/login')}
                  type="button"
                >
                  Login
                </button>
              </section>
              {/* 
            <section className="text-base font-light text-gray-800">
              Forgot your password?{' '}
              <button
                type="button"
                className="cursor-pointer text-primary-700"
                onClick={() => router.push('/forgot-password')}
              >
                Reset Password
              </button>
            </section> */}
            </footer>
          </article>

          {/* Confirmation Modal */}
          <Modal>
            <article>
              <header className="flex flex-col items-center justify-center w-full h-full">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-700">
                  <CheckIcon className="w-8 h-8 text-white" />
                </div>

                <h2 className="mb-2 text-2xl font-semibold text-center text-gray-800">
                  Are you sure you want to continue?
                </h2>

                <p className="text-base font-light text-center text-gray-800">
                  You will not be able to change your role after registration.
                </p>
              </header>

              <section className="flex items-center w-full mt-8 space-x-4">
                <Button
                  color="white"
                  displayType="block"
                  fullWidth
                  onClick={() => {
                    setFormData({});
                    closeModal();
                  }}
                  rounded="md"
                  size="lg"
                  styles={'w-full h-[50px]'}
                  title="Cancel"
                  type="button"
                >
                  Cancel
                </Button>

                <Button
                  color={isSubmitting ? 'disabled' : 'primary'}
                  disabled={isSubmitting}
                  displayType="block"
                  fullWidth
                  onClick={() => {
                    onRegisterHandler();
                  }}
                  rounded="md"
                  size="lg"
                  styles={'w-full h-[50px]'}
                  title="Login"
                  type="button"
                >
                  {isSubmitting ? (
                    <span>
                      <ArrowPathIcon className="w-5 h-5 text-white animate-spin" />
                    </span>
                  ) : (
                    <div className="text-white">Register</div>
                  )}
                </Button>
              </section>
            </article>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default Register;
