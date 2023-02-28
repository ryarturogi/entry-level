import TextareaField from '@/components/Form/TextareaField';
import TextField from '@/components/Form/TextField';
import Head from '@/components/partials/Head';
import { AvatarUpload } from '@/components/UI/AvatarUpload';
import Button from '@/components/UI/Button';
import HeadingTitle from '@/components/UI/HeadingTitle';
import Client from '@/utils/initDatabase';
import { BriefcaseIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { IconPenTool } from '@supabase/ui';
import { Formik } from 'formik';
import * as Yup from 'yup';

const PROVIDER_NAME = String(process.env.NEXT_PUBLIC_PROVIDER_NAME);

const INITIAL_VALUES =
  {
    companyName: '',
    companyWebsite: '',
    companyDescription: '',
    companyLogo: null,
    companyPhone: '',
    jobTitle: '',
    seniority: '',
    jobCategory: '',
    jobDescription: '',
    jobLocation: '',
    jobType: '',
    jobSalary: '',
    jobSkills: [],
    howToApply: '',
  } || {};

const SchemaValidation = {
  companyName: Yup.string().required('The company name is required'),
  companyWebsite: Yup.string()
    .url('The company website is not valid')
    .required('The company website is required'),
  companyDescription: Yup.string()
    .required('The company description is required')
    .max(500, 'Must be 500 characters or less')
    .min(200, 'Must be 200 characters or more'),
  companyLogo: Yup.string().required('The company logo is required'),
  companyHQ: Yup.string().required('The company HQ is required'),
  jobTitle: Yup.string().required('The job title is required'),
  seniority: Yup.string().required('The seniority is required'),
  jobCategory: Yup.string().required('The job category is required'),
  jobDescription: Yup.string()
    .required('The job description is required')
    .max(2000, 'Must be 2000 characters or less')
    .min(500, 'Must be 500 characters or more'),
  jobLocation: Yup.string().required('The job location is required'),
  jobType: Yup.string().required('The job type is required'),
  jobSalary: Yup.string().required('The job salary is required'),
  jobSkills: Yup.string().required('The job skills is required'),
  howToApply: Yup.string().required('The how to apply is required'),
};

const COMPANY_FIELDS = [
  {
    name: 'companyName',
    label: 'Company Name',
    placeholder: 'What is the name of your company?',
    required: true,
  },
  {
    name: 'companyWebsite',
    label: 'Company Website',
    placeholder: 'What is the website of your company?',
    required: true,
  },
  {
    name: 'companyHQ',
    label: 'Company HQ',
    placeholder: 'What is the HQ of your company?',
    required: true,
  },
];

const JOB_FIELDS = [
  {
    name: 'jobTitle',
    label: 'Job Title',
    placeholder: 'What is the title of the job?',
    required: true,
  },
  {
    name: 'seniority',
    label: 'Seniority',
    placeholder: 'What is the seniority of the job?',
    required: true,
  },
  {
    name: 'jobCategory',
    label: 'Job Category',
    placeholder: 'What is the category of the job?',
    required: true,
  },
  {
    name: 'jobLocation',
    label: 'Job Location',
    placeholder: 'What is the location of the job?',
    required: true,
  },
  {
    name: 'jobType',
    label: 'Job Type',
    placeholder: 'What is the type of the job?',
    required: true,
  },
  {
    name: 'jobSalary',
    label: 'Job Salary',
    placeholder: 'What is the salary of the job?',
    required: true,
  },
  {
    name: 'jobSkills',
    label: 'Job Skills',
    placeholder: 'What are the skills of the job?',
    required: true,
  },
  {
    name: 'howToApply',
    label: 'How to Apply',
    placeholder: 'How to apply for the job?',
    required: true,
  },
];

const JOB_TITLE_FIELD = [
  {
    name: 'jobTitle',
    label: 'Job Title',
    placeholder: 'What is the title of the job?',
    required: true,
  },
];

const NewJob = () => {
  const _onSave = async (values) => {
    console.log(values);
    try {
      // Upload the logo for the company
      const { data: logoData, error: logoError } = await Client(PROVIDER_NAME).uploadLogo(
        'company-logos',
        values.companyLogo
      );

      if (logoError) {
        console.error('Error uploading logo: ', logoError.message);
        return;
      }

      // Add the company logo key/value to the values object
      const job = {
        ...values,
        companyLogo: logoData.Key,
      };

      const { data: newJobData, error: newJobError } = await Client(PROVIDER_NAME).createJob(job);

      if (newJobError) {
        console.error('Error creating new job: ', newJobError.message);
        return;
      }

      // Do something with the new job data
      console.log('New job created: ', newJobData);
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  return (
    <section className="min-h-screen p-8 mx-auto mb-20 max-w-7xl rounded-xl">
      <Head />

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => _onSave(values)}
        validationSchema={Yup.object(SchemaValidation)}
      >
        {({
          values,
          errors,
          setFieldValue,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {JSON.stringify(errors)}
            <section className="grid grid-cols-1 gap-10">
              <section className="flex flex-col w-full max-w-6xl gap-10 p-10 mx-auto bg-white rounded-xl">
                <HeadingTitle>
                  <BuildingOffice2Icon className="w-10 h-10 mr-3 text-primary-600" />
                  Company Information *
                </HeadingTitle>

                {/* Avatar Upload */}
                <div className="flex flex-col w-full">
                  <AvatarUpload
                    id="companyLogo"
                    name="companyLogo"
                    onAvatarChange={async (uploadedAvatar) => {
                      setFieldValue('companyLogo', uploadedAvatar);
                    }}
                  />
                </div>
                <div className="grid w-full grid-cols-12 gap-6">
                  {COMPANY_FIELDS.map((field) => (
                    <div className="col-span-6" key={field.name}>
                      <TextField
                        error={errors[field.name] && touched[field.name] && errors[field.name]}
                        label={field.label}
                        name={field.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        success={!errors[field.name] && touched[field.name] ? 'Valid' : ''}
                        title={field.label}
                        type="text"
                        value={values[field.name]}
                      />
                    </div>
                  ))}
                </div>

                <div className="-mt-5">
                  <TextareaField
                    error={
                      errors.companyDescription &&
                      touched.companyDescription &&
                      errors.companyDescription
                    }
                    label="Company Description"
                    maxLength={200}
                    name="companyDescription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="A short description of your company."
                    required
                    rows={3}
                    success={
                      !errors.companyDescription && touched.companyDescription ? 'Valid' : ''
                    }
                    type="text"
                    value={values.companyDescription}
                  />
                </div>
              </section>

              <section className="grid grid-cols-1 gap-10">
                <div className="flex flex-col w-full max-w-6xl gap-10 p-10 mx-auto bg-white rounded-xl">
                  <HeadingTitle>
                    <BriefcaseIcon className="w-10 h-10 mr-3 text-primary-600" />
                    Job Detail *
                  </HeadingTitle>

                  <div className="grid w-full grid-cols-12 gap-6">
                    {JOB_FIELDS.map((field) => (
                      <div className="col-span-6" key={field.name}>
                        <TextField
                          error={errors[field.name] && touched[field.name] && errors[field.name]}
                          label={field.label}
                          name={field.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          success={!errors[field.name] && touched[field.name] ? 'Valid' : ''}
                          title={field.label}
                          type="text"
                          value={values[field.name]}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="-mt-5">
                    <TextareaField
                      error={
                        errors.jobDescription && touched.jobDescription && errors.jobDescription
                      }
                      label="Job Description"
                      maxLength={5000}
                      minLength={2000}
                      name="jobDescription"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="A detailed description of the job."
                      required
                      rows={10}
                      success={!errors.jobDescription && touched.jobDescription ? 'Valid' : ''}
                      type="text"
                      value={values.jobDescription}
                    />
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-10">
                <div className="flex flex-col w-full max-w-6xl p-10 mx-auto bg-white gap-x-10 gap-y-8 rounded-xl">
                  <HeadingTitle>
                    <IconPenTool className="w-10 h-10 mr-3 text-primary-600" />
                    Job title *
                  </HeadingTitle>

                  <div className="grid w-full grid-cols-12 gap-6">
                    {JOB_TITLE_FIELD.map((field) => (
                      <div className="col-span-6" key={field.name}>
                        <TextField
                          error={errors[field.name] && touched[field.name] && errors[field.name]}
                          name={field.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required={field.required}
                          success={!errors[field.name] && touched[field.name] ? 'Valid' : ''}
                          title={field.label}
                          type="text"
                          value={values[field.name]}
                        />
                      </div>
                    ))}

                    <div className="self-start w-full col-span-6">
                      <Button
                        color={isSubmitting ? 'disabled' : 'secondary'}
                        disabled={isSubmitting}
                        fullWidth
                        onClick={handleSubmit}
                        rounded="md"
                        styles={`h-[48px] text-base font-lexend font-semibold ${
                          isSubmitting ? 'cursor-not-allowed' : ''
                        }`}
                        type="submit"
                      >
                        {(isSubmitting && (
                          <div className="relative flex items-center justify-center w-full h-full">
                            <ArrowPathIcon className="absolute w-6 h-6 text-white animate-spin" />
                          </div>
                        )) || <span>POST JOB</span>}
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </form>
        )}
      </Formik>
    </section>
  );
};

export default NewJob;
