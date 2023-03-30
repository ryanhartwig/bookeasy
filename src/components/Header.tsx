interface HeaderProps {
  text: string,
}

export const Header: React.FC<HeaderProps> = ({text}) => {

  return (
    <div className='Header'>
      <h2>{text}</h2>
    </div>
  )
}