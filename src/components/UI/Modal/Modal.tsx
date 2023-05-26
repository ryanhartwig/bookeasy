
import { useClickout } from '@/utility/hooks/useClickout';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { TfiClose } from 'react-icons/tfi';
import './Modal.scss';

import { ClipLoader } from 'react-spinners';

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
  onClickDisabledAction?: (...args: any) => any,
  loading?: boolean,
  pauseListener?: boolean,
}

export const Modal = ({zIndex = 15, refs = [], children, onClose, pauseListener = false, onClickDisabledAction, open, escapeCloses = false, actionButtonText, onAction, actionCloses = false, actionButtonDisabled, loading = false, ...divProps}: ModalProps) => {
  const header = React.Children.map(children, (child: any) => child?.type?.displayName === 'Header' ? child : null)
  const content = React.Children.map(children, (child: any) => child?.type?.displayName !== 'Header' ? child : null)

  const modalRef = useRef<HTMLDivElement>(undefined!)
  const contentRef = useRef<HTMLDivElement>(undefined!);

  const forceClickout = useClickout({
    contentRefs: [contentRef, ...refs],
    onClickout: onClose,
    enabled: open,
    pause: loading || pauseListener,
  });

  const onKeyDown = useCallback((e: any) => {
    e.stopImmediatePropagation();
    if (!escapeCloses) return;

    window.removeEventListener('keydown', onKeyDown);
    if (e.key === 'Escape') onClose();
  }, [escapeCloses, onClose]);
  
  useEffect(() => {
    if (!open) {
      window.removeEventListener('keydown', onKeyDown);
      return;
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [escapeCloses, onKeyDown, open]);

  const handleActionClick = useCallback((e: any) => {
    if (actionButtonDisabled) {
      onClickDisabledAction && onClickDisabledAction();
      return;
    }
    if (actionCloses) {
      forceClickout(e);
    }

    onAction && onAction();
  }, [actionButtonDisabled, actionCloses, onAction, onClickDisabledAction, forceClickout]);
  
  return (
    <>
      {open && 
      <div className='Modal' style={{zIndex}} ref={modalRef}>
        <div className={clsx('Modal-box', {'Modal-box-disabled': loading})} ref={contentRef} >
          {loading && <div className='Loading-cover'>
            <ClipLoader loading={loading} color="white" size={40} />
          </div>}

          {!!header?.length && 
            <div className='Modal-header'>
              <div className='Modal-heading'>
                <h2>{header}</h2>
                <div tabIndex={0}
                  onClick={forceClickout} 
                  className='Modal-close'
                  onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
                >
                  <TfiClose fontSize={13} />
                </div>
              </div>
            </div>
          }
          <div {...divProps} className={clsx('Modal-content', divProps.className ?? '')} >
            {content}
          </div>
          {actionButtonText && 
            <div className={clsx('Modal-actions', {"disabled": actionButtonDisabled})}>
              <hr/>
              <p tabIndex={0} 
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
                onClick={handleActionClick}
              >{actionButtonText}
              </p>
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