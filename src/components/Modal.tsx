'use client'

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useState } from "react"
import RadioGrp from "./RadioGrp"

export default function Modal() {
	const [isOpen, setIsOpen] = useState(false)

	function open() {
		setIsOpen(true)
	}

	function close() {
		setIsOpen(false)
	}

	return (
		<>
			<Button
				onClick={open}
				className='rounded-full bg-white py-2 px-4 text-sm font-medium text-primary focus:outline-none data-[hover]:bg-white/15 data-[focus]:outline-1 data-[focus]:outline-black'
			>
				#
			</Button>

			<Dialog
				open={isOpen}
				as='div'
				className='relative z-10 focus:outline-none'
				onClose={close}
				__demoMode
			>
				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-center justify-center p-4'>
						<DialogPanel
							transition
							className='w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 bg-primary'
						>
							<DialogTitle
								as='h3'
								className='text-base/7 font-medium text-white'
							>
								Sort By
							</DialogTitle>
							<div className='mt-2 text-sm/6 text-white/50'>
								<RadioGrp></RadioGrp>
							</div>
							<div className='mt-4'></div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	)
}
