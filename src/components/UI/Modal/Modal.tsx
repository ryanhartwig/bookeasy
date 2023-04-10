
import { useClickout } from '@/utility/hooks/useClickout';
import React, { useCallback, useEffect } from 'react';
import { useRef } from 'react';
import { TfiClose } from 'react-icons/tfi';
import './Modal.scss';

/* React Icons */

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode,
  onClose: (...args: any) => void,
  open: boolean,
  zIndex?: number,
  refs?: React.MutableRefObject<any>[],
  escapeCloses?: boolean,
}

export const Modal = ({zIndex = 15, refs = [], children, onClose, open, escapeCloses = false, ...divProps}: ModalProps) => {
  const header = React.Children.map(children, (child: any) => child?.type?.displayName === 'Header' ? child : null)
  const content = React.Children.map(children, (child: any) => child?.type?.displayName !== 'Header' ? child : null)

  const modalRef = useRef<HTMLDivElement>(undefined!)
  const contentRef = useRef<HTMLDivElement>(undefined!);

  const onClick = useClickout(onClose, open, contentRef, ...refs);

  const onKeyDown = useCallback((e: any) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);
  
  useEffect(() => {
    if (!escapeCloses) return;
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [escapeCloses, onKeyDown]);
  
  return (
    <>
      {open && 
      <div className='Modal noselect' style={{zIndex}} ref={modalRef}>
        <div className={'Modal-box '} ref={contentRef} >
          {!!header?.length && 
          <div className='Modal-header'>
            <div className='Modal-heading'>
              <h2>{header}</h2>
              <div onClick={() => onClick(undefined)} className='Modal-close'>
                <TfiClose fontSize={13} />
              </div>
            </div>
          </div>}
          <div {...divProps} className={'Modal-content ' + divProps.className ?? ''}>
            {content}
          </div>
        </div>
      </div>}
    </>
    
  )
}

const Header = ({children}: any) => children;
Header.displayName = 'Header';
Modal.Header = Header;

const Content = ({children}: any) => children;
Content.displayName = 'Content';
Modal.Content = Content;