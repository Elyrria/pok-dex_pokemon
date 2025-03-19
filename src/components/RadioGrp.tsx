import { Radio, RadioGroup } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

const plans = [{ name: "Number" }, { name: "Name" }]

export default function RadioGrp() {
	const [selected, setSelected] = useState(plans[0])

	return (
		<div className='w-full px-4'>
			<div className='mx-auto w-full max-w-md'>
				<RadioGroup
					by='name'
					value={selected}
					onChange={setSelected}
					aria-label='Server size'
					className='space-y-2 bg-white rounded-lg'
				>
					{plans.map((plan) => (
						<Radio
							key={plan.name}
							value={plan}
							className='group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10'
						>
							<div className='flex w-full items-center justify-between border-red-500'>
								<div className='border-2 border-primary rounded-full'>
									<CheckCircleIcon className='size-6 fill-red-500 opacity-0 transition group-data-[checked]:opacity-100' />
								</div>
								<div className='text-sm/6'>
									<p className='font-semibold text-black'>
										{plan.name}
									</p>
								</div>
							</div>
						</Radio>
					))}
				</RadioGroup>
			</div>
		</div>
	)
}
