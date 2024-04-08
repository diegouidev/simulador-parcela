import logo from '../assets/logo.jpeg'

export function Header() {
    return (
        <div className='flex items-center gap-5 py-2 w-full bg-zinc-900 justify-center'>
           <img src={logo} alt="logo nlw" className='size-24' />
        </div>
    )
}