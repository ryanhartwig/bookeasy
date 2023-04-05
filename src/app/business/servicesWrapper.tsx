interface ServicesWrapperProps {
  children: React.ReactNode,
}

export const ServicesWrapper: React.FC<ServicesWrapperProps> = ({children}) => {

  return (
    <>
      {children}
    </>
  )
}