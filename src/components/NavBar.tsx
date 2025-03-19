import Image from 'next/image'
import Link from 'next/link'
import Modal from './Modal'
import SearchBar from './SearchBar'

export default function NavBar() {

	return (
		<div>
			<div className='navbar bg-base-100 bg-primary border-none'>
				<div>
					<Link href="/" className="flex items-center gap-3 w-fit hover:text-gray-700 transition-colors">
						<Image src='/Pokeball.svg' alt='Pokeball' width={35} height={35} className="hover:rotate-180 transition-transform duration-500" />
						<span className="text-2xl font-bold text-white">Poke-dex</span>
					</Link>
				</div>
				<div className='flex-1'></div>
				<SearchBar></SearchBar>
				<div className='flex-none'>
					<Modal></Modal>
				</div>
			</div>
		</div>
	)
}
