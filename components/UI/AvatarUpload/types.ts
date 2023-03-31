export interface AvatarUploadProps {
  errors: string;
  id: string;
  name: string;
  onChange: (file: File) => void;
  placeholder: string;
  src: string;
}
