/* eslint-disable no-console */
import AutoComplete from '@/components/Form/AutoComplete';
import Checkbox from '@/components/Form/Checkbox';
import TextField from '@/components/Form/TextField';
import Textarea from '@/components/Form/Textarea';
import AvatarUpload from '@/components/UI/AvatarUpload';
import Button from '@/components/UI/Button';
import HeadingTitle from '@/components/UI/HeadingTitle';
import Head from '@/components/partials/Head';
import {
  experienceLevelsOptions,
  jobCategories,
  jobLocationTypes,
  jobTypes,
} from '@/constants/filters';
import {
  COMPANY_FIELDS,
  EXTRA_FEATURES_FIELDS,
  INITIAL_VALUES,
  JOB_FIELDS,
  JOB_TITLE_FIELD,
  SchemaValidation,
} from '@/constants/new-job';
import useCountries from '@/hooks/useCountries';
import useSkills from '@/hooks/useSkills';
import ClientApi from '@/utils/initDatabase';
import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  CommandLineIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const NewJob = () => {
  const router = useRouter();
  const allSkills = useSkills();
  const allCountries = useCountries();

  const getFieldOptions = (fieldName) => {
    switch (fieldName) {
      case 'jobTags':
        return allSkills;
      case 'location':
        return allCountries;
      case 'jobType':
        return jobTypes;
      case 'jobCategory':
        return jobCategories;
      case 'jobLocationType':
        return jobLocationTypes.slice(1);
      case 'experienceLevel':
        return experienceLevelsOptions;
      default:
        return [];
    }
  };

  const uploadLogoHandler = async (values) => {
    const params = {
      slug: 'company-logos',
      file: values.companyLogo,
      filename: `${values.companyName.toLowerCase().replace(/ /g, '-')}-logo`,
    };

    const { data: companyLogoURL, error: companyLogoURLError } = await ClientApi.uploadLogo(params);

    if (companyLogoURLError) {
      throw new Error(`Error uploading company logo: ${companyLogoURLError.message}`);
    }

    return `/company-logos/${companyLogoURL.path || companyLogoURL.Key || companyLogoURL || ''}`;
  };

  const createJobHandler = async (values, companyLogoURL) => {
    const jobTags = values.jobTags.map((tag) => tag.name.toLowerCase());
    const location = values.location.map((loc) => loc.name.toLowerCase()).join('');
    const jobCategory = values.jobCategory.map((cat) => cat.id).join('');
    const jobType = values.jobType.map((type) => type.id).join('');
    const jobLocationType = values.jobLocationType.map((type) => type.id).join('');
    const experienceLevel = values.experienceLevel
      .map((experienceLevel) => experienceLevel.id)
      .join('');
    const hasCompanyLogo = values.hasCompanyLogo;
    const isFeatured = values.isFeatured;
    const isGuaranteed = values.isGuaranteed;

    const job = {
      ...values,
      jobTags,
      location,
      jobCategory,
      jobType,
      jobLocationType,
      experienceLevel,
      isFeatured,
      isGuaranteed,
      hasCompanyLogo,
      companySlug: values.companyName.toLowerCase().replace(/ /g, '-'),
      companyLogo: companyLogoURL,
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await ClientApi.createJob(job);

    if (error) {
      throw new Error(error?.message || 'Error creating new job');
    }

    return data;
  };

  const onSubmitHandler = async (values) => {
    try {
      const companyLogoURL = await uploadLogoHandler(values);
      const jobData = await createJobHandler(values, companyLogoURL);

      if (Object.keys(jobData).length > 0) {
        router.push('/');
        return;
      }

      throw new Error('Error creating new job');
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  return (
    <section className="max-w-5xl min-h-screen p-8 mx-auto mb-20 xl rounded-xl">
      <Head />

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => onSubmitHandler(values)}
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
          <form className="grid grid-cols-1 gap-10" onSubmit={handleSubmit}>
            {/* Company Information */}
            <section className="flex flex-col w-full max-w-6xl gap-10 p-10 mx-auto bg-white rounded-xl">
              <HeadingTitle>
                <BuildingOffice2Icon className="w-10 h-10 mr-3 text-primary-600" />
                Company Information *
              </HeadingTitle>

              {/* Avatar Upload */}
              <div className="flex flex-col w-full">
                <AvatarUpload
                  errors={errors.companyLogo}
                  id="companyLogo"
                  name="companyLogo"
                  onChange={async (uploadedAvatar) => {
                    setFieldValue('companyLogo', uploadedAvatar);
                  }}
                  placeholder="Upload your company logo"
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
                <Textarea
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
                  success={!errors.companyDescription && touched.companyDescription ? 'Valid' : ''}
                  type="text"
                  value={values.companyDescription}
                />
              </div>
            </section>

            {/* Job Detail */}
            <section className="grid grid-cols-1 gap-10">
              <div className="flex flex-col w-full max-w-6xl gap-10 p-10 mx-auto bg-white rounded-xl">
                <HeadingTitle>
                  <BriefcaseIcon className="w-10 h-10 mr-3 text-primary-600" />
                  Job Detail *
                </HeadingTitle>

                <div className="grid w-full grid-cols-12 gap-x-6 gap-y-4">
                  {JOB_FIELDS.map((field) => (
                    <div className="col-span-6" key={field.name}>
                      {field.type === 'select' && getFieldOptions(field.name)?.length > 0 && (
                        <AutoComplete
                          error={errors[field.name] && touched[field.name] && errors[field.name]}
                          multiple={field.multiple}
                          onSelect={(selected) => {
                            setFieldValue(field.name, selected);
                          }}
                          options={getFieldOptions(field.name)}
                          optionsSelected={values[field.name] || []}
                          placeholder={field.placeholder}
                          required={field.required}
                          success={!errors[field.name] && touched[field.name] ? 'Valid' : ''}
                          title={field.label}
                        />
                      )}
                      {field.type === 'text' && (
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
                      )}
                    </div>
                  ))}
                </div>

                <div className="-mt-5">
                  <Textarea
                    error={errors.jobDescription && touched.jobDescription && errors.jobDescription}
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

            {/* Extra Features */}
            <section className="flex flex-col w-full max-w-6xl p-10 mx-auto bg-white rounded-xl">
              <HeadingTitle>
                <CommandLineIcon className="w-10 h-10 mr-3 text-primary-600" />
                Extra Features (Optional)
              </HeadingTitle>

              <ul className="flex flex-col w-full gap-1 mt-6">
                {EXTRA_FEATURES_FIELDS.map((field) => (
                  <li key={field.name}>
                    <Checkbox
                      error={errors[field.name] && touched[field.name] && errors[field.name]}
                      id={field.name}
                      name={field.name}
                      onBlur={handleBlur}
                      onChange={(value) => {
                        setFieldValue(field.name, value[0]?.selected);
                      }}
                      options={field.options}
                      optionsSelected={values[field.name] || []}
                      success={!errors[field.name] && touched[field.name] ? 'Valid' : ''}
                      title={field.label}
                    />
                  </li>
                ))}
              </ul>
            </section>

            {/* Submit */}
            <section className="grid grid-cols-1 gap-10">
              <div className="flex flex-col w-full max-w-6xl p-10 mx-auto bg-white gap-x-10 gap-y-8 rounded-xl">
                <HeadingTitle>
                  <PencilIcon className="w-10 h-10 mr-3 text-primary-600" />
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
          </form>
        )}
      </Formik>
    </section>
  );
};

export default NewJob;
