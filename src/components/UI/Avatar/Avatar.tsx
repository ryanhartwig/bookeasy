import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { BsPersonCircle } from 'react-icons/bs';

interface AvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  src?: string,
  /**
   * Width and height of the avatar or default
   */
  size?: number,
  /**
   * Fill color of the default avatar
   */
  defaultColor?: string,
  alt?: string,
}

/**
 * Displays avatar if provided, or uses default icon
 */
export const Avatar: React.FC<AvatarProps> = ({src, alt = 'Person avatar', size = 30, defaultColor = 'rgb(210, 210, 210)', ...props}) => {

  return (
    <div {...props} style={{...props.style, width: size, height: size}}>
      {src
        ? <Image alt={alt} src={src} width={size} height={size} style={{borderRadius: '50%'}} />
        : <BsPersonCircle fontSize={size} color={defaultColor} />
      }
    </div>
  )
} 