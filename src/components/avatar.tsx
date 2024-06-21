import { generateGravatarUrl } from '../utils/gravatar';

type AvatarProps = {
  email: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
};
export default function Avatar({ email, alt, size }: AvatarProps) {
  const gravatarUrl = generateGravatarUrl(email);
  return (
    <img
      src={gravatarUrl}
      alt={alt}
      className={`rounded-full ${size === 'small' ? 'w-10 h-10' : size === 'medium' ? 'w-16 h-16' : 'w-24 h-24'}`}
    />
  );
}
