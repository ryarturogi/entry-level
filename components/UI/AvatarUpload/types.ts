export interface AvatarUploadProps {
  id: string;
  name: string;
  onChange: (file: File) => void;
  placeholder: string;
  src: string;
  errors: object;
}
