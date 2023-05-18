'use client';

import Image from 'next/image';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import teamDefault from '@/assets/team_default.png';

interface AvatarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  src?: string | null,
  /**
   * Width and height of the avatar or default
   */
  size?: number,
  /**
   * Fill color of the default avatar
   */
  defaultColor?: string,
  alt?: string,
  useTeamIcon?: boolean,
}

/**
 * Displays avatar if provided, or uses default icon
 */
export const Avatar: React.FC<AvatarProps> = ({src, alt = 'Person avatar', size = 30, defaultColor = 'rgb(210, 210, 210)', useTeamIcon, ...props}) => {

  const isValidUrl = (str: string) => {
    try { 
      return !!(new URL(str)) && !str.includes('localhost'); 
    }
    catch(e){ 
      return false; 
    }
  }

  return (
    <div {...props} style={{...props.style, width: size, height: size}}>
      {src && isValidUrl(src)
        ? <Image alt={alt} src={src} width={size} height={size} style={{borderRadius: '50%'}} />
        : useTeamIcon 
          ? <Image alt="Team logo" src={teamDefault} width={size * 1.14} height={size} style={{borderRadius: '50%'}} />
          : <BsPersonCircle fontSize={size} color={defaultColor} style={{borderRadius: '50%'}} />
      }
    </div>
  )
} 