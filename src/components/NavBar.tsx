'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function NavBar() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<div className='navbar bg-base-100 shadow-sm bg-primary'>
			<div>
				<Image src='/Pokeball.svg' alt='Pokeball' width={35} height={35} />
			</div>
			<div className='flex-1'>
				<a className='btn btn-ghost text-xl'>Poke-dex</a>
			</div>
			<div className='flex-none'>
				<button className='btn rounded-full' onClick={openModal}>
					#
				</button>
				{isModalOpen && (
					<dialog open className='modal'>
						<div className='modal-box'>
							<h3 className='font-bold text-lg'>Hello!</h3>
							<p className='py-4'>
								Press ESC key or click the button below to close
							</p>
							<div className='modal-action'>
								<button className='btn' onClick={closeModal}>
									Close
								</button>
							</div>
						</div>
					</dialog>
				)}
			</div>
		</div>
	)
}
