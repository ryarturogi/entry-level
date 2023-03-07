import { PlusIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const AvatarUpload = ({ onChange, id, name, placeholder, src, errors }) => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = (e) => {
    e.preventDefault();
    if (avatar) {
      setAvatar(null);
      setPreview(null);
      setError(null);
    } else {
      fileInputRef.current.click();
    }
  };

  const handleFileInputClick = (e) => {
    e.stopPropagation();
  };

  const handleFileInputChange = (e) => {
    const fileInput = e.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const imageData = e.target.result;

          setPreview(imageData);
          setAvatar(imageData);
          onChange(file);
          setError('');
          fileInput.value = ''; // reset input value
        };

        reader.onerror = () => {
          setError('Error reading file. Please try again.');
        };

        reader.readAsDataURL(file);
      } else {
        setError('Please choose an image file.');
      }
    }
  };

  useEffect(() => {
    if (errors) {
      setError(errors);
    }
  }, [errors]);

  return (
    <>
      <div className="relative flex items-center space-x-5">
        <label
          className={`${
            error
              ? 'bg-secondary-100 hover:bg-secondary-200 focus:bg-secondary-100'
              : ' bg-gray-300 hover:bg-gray-300 focus:bg-gray-300'
          } block object-cover w-20 h-20 overflow-hidden rounded-lg cursor-pointer`}
          htmlFor={id || 'companyLogo'}
          onClick={handleImageClick}
        >
          {src || preview ? (
            <Image
              alt="avatar preview"
              className="object-cover w-20 h-20"
              height={80}
              key={src || preview}
              src={src || preview}
              width={80}
            />
          ) : (
            <div
              className={`flex items-center justify-center w-full h-full text-2xl ${
                error ? 'text-secondary-800' : 'text-gray-600'
              }`}
            >
              <PlusIcon className="w-10 h-10" />
            </div>
          )}
        </label>
        <input
          accept="image/*"
          className="hidden"
          id={id || 'companyLogo'}
          name={name || 'companyLogo'}
          onChange={handleFileInputChange}
          onClick={handleFileInputClick}
          ref={fileInputRef}
          type="file"
        />
        <p
          className={`mt-2 text-base font-semibold uppercase ${
            error ? 'text-red-600' : 'text-gray-800'
          }`}
        >
          {error || placeholder || 'Upload Company Logo'}
        </p>
      </div>
    </>
  );
};

AvatarUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  src: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
};

export default AvatarUpload;
