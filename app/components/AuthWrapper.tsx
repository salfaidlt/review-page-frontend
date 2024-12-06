
type AuthWrapperProps = {
    children: React.ReactNode
}

const AuthWrapper = ({children}: AuthWrapperProps) => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
        {children}
    </div>
  )
}

export default AuthWrapper