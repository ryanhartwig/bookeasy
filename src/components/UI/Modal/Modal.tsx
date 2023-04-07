
import { useClickout } from '@/utility/hooks/useClickout';
import React from 'react';
import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './Modal.css';

/* React Icons */

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode,
  onClose: (...args: any) => void,
  open: boolean,
  closeText?: string,
  zIndex?: number,
  refs?: React.MutableRefObject<any>[],
}

export const Modal = ({zIndex = 15, refs = [], children, onClose, open, closeText, ...divProps}: ModalProps) => {
  const header = React.Children.map(children, (child: any) => child?.type?.displayName === 'Header' ? child : null)
  const content = React.Children.map(children, (child: any) => child?.type?.displayName !== 'Header' ? child : null)

  const modalRef = useRef<HTMLDivElement>(undefined!)
  const contentRef = useRef<HTMLDivElement>(undefined!);

  const onClick = useClickout(onClose, open, contentRef, ...refs);
  
  return (
    <>
      {open && 
      <div className='Modal noselect' style={{zIndex}} ref={modalRef}>
        <div className={'Modal-box '} ref={contentRef} >
          {!!header?.length && 
          <div className='Modal-header'>
            <h2>{header}</h2>
            <hr></hr>
          </div>}
          <div {...divProps} className={'Modal-content ' + divProps.className ?? ''}>
            {content}
          </div>
          {closeText && 
          <div onClick={() => onClick(undefined)} className='Modal-close'>
            <AiOutlineClose size={12} />
            <p>{closeText}</p>
          </div>}
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