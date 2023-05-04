'use client';

import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
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

  const [source, setSource] = useState<string>();

  const isValidUrl = (str: string) => {
    try { 
      return !!(new URL(str)) && !str.includes('localhost'); 
    }
    catch(e){ 
      return false; 
    }
  }

  useEffect(() => {
    if (!src) return;
    if (!isValidUrl(src)) return;
    setSource(src);
  }, [src]);

  return (
    <div {...props} style={{...props.style, width: size, height: size}}>
      {source
        ? <Image alt={alt} src={source} width={size} height={size} style={{borderRadius: '50%'}} />
        : <BsPersonCircle fontSize={size} color={defaultColor} />
      }
    </div>
  )
} 