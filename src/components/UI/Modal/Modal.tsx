
import { useClickout } from '@/utility/hooks/useClickout';
import clsx from 'clsx';
import React, { useCallback, useEffect } from 'react';
import { useRef } from 'react';
import { TfiClose } from 'react-icons/tfi';
import './Modal.scss';

import { ClipLoader } from 'react-spinners';

/* React Icons */

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode,
  onClose: (...args: any) => void,
  open: boolean,
  zIndex?: number,
  refs?: React.MutableRefObject<any>[],
  escapeCloses?: boolean,
  actionButtonText?: string,
  onAction?: (...args: any) => any,
  actionButtonDisabled?: boolean,
  actionCloses?: boolean,
  loading?: boolean,
  pauseListener?: boolean,
}

export const Modal = ({zIndex = 15, refs = [], children, onClose, pauseListener = false, open, escapeCloses = false, actionButtonText, onAction, actionCloses = false, actionButtonDisabled, loading = false, ...divProps}: ModalProps) => {
  const header = React.Children.map(children, (child: any) => child?.type?.displayName === 'Header' ? child : null)
  const content = React.Children.map(children, (child: any) => child?.type?.displayName !== 'Header' ? child : null)

  const modalRef = useRef<HTMLDivElement>(undefined!)
  const contentRef = useRef<HTMLDivElement>(undefined!);

  const onClick = useClickout(onClose, open, loading || pauseListener, contentRef, ...refs);

  const onKeyDown = useCallback((e: any) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);
  
  useEffect(() => {
    if (!escapeCloses) return;
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [escapeCloses, onKeyDown]);

  const handleActionClick = useCallback(() => {
    if (actionButtonDisabled) return;
    if (actionCloses) {
      onClick(undefined);
    }
    onAction && onAction();
  }, [actionButtonDisabled, actionCloses, onAction, onClick]);
  
  return (
    <>
      {open && 
      <div className='Modal noselect' style={{zIndex}} ref={modalRef}>
        <div className={clsx('Modal-box', {'Modal-box-disabled': loading})} ref={contentRef} >
          {loading && <div className='Loading-cover'>
            <ClipLoader loading={loading} color="white" size={40} />
          </div>}

          {!!header?.length && 
            <div className='Modal-header'>
              <div className='Modal-heading'>
                <h2>{header}</h2>
                <div onClick={() => setTimeout(() => onClick(undefined), 1)} className='Modal-close'>
                  <TfiClose fontSize={13} />
                </div>
              </div>
            </div>
          }
          <div {...divProps} className={clsx('Modal-content', divProps.className ?? '')} >
            {content}
          </div>
          {actionButtonText && 
            <div className={clsx('Modal-actions', {"disabled": actionButtonDisabled})} onClick={() => setTimeout(handleActionClick, 1)}>
              <hr/>
              <p>{actionButtonText}</p>
            </div>
          }
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