import { DetailedHTMLProps, HTMLAttributes } from "react";

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode,
}

export const Card: React.FC<CardProps> = ({children, ...props}) => {


  return (
    <div {...props} className={''}>
    </div>
  )
}