import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { BsPersonCircle } from 'react-icons/bs';

interface AvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  avatarUrl?: string,
  /**
   * Width and height of the avatar or default
   */
  size?: number,
  /**
   * Fill color of the default avatar
   */
  defaultColor?: string,
}

/**
 * Displays avatar if the person has one, or uses default
 */
export const Avatar: React.FC<AvatarProps> = ({avatarUrl, size = 30, defaultColor = 'rgb(210, 210, 210)', ...props}) => {

  return (
    <div>
      {avatarUrl
        ? <Image alt="Person avatar" src={avatarUrl} width={size} height={size} style={{width: size, height: size}} />
        : <BsPersonCircle fontSize={size} color={defaultColor} />
      }
    </div>
  )
} 