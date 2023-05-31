import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './textbutton.module.scss';

interface TextButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode,
  fontSize?: string | number,
  altColor?: boolean,
  colorOverride?: string,
  backgroundColorOverride?: string,
  icon?: JSX.Element,
}

export const TextButton = forwardRef<HTMLDivElement, TextButtonProps>(({
  children,
  icon,
  colorOverride,
  backgroundColorOverride,
  fontSize,
  altColor = false,
  ...props
}, ref) => {
  const color = altColor ? '#ff462d' : '#216FDB';
  const backgroundColor = altColor ? '#ff462d19' : '#216fdb19';

  return (
    <div
      {...props}
      ref={ref}
      className={clsx(styles.action, props.className || '')}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
      tabIndex={0}
    >
      <div
        style={{
          color: colorOverride ?? color,
          backgroundColor: backgroundColorOverride ?? backgroundColor
        }}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <p style={{ fontSize }}>{children}</p>
      </div>
    </div>
  );
});

TextButton.displayName = 'TextButton';