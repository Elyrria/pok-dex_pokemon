'use client'
import Card from "@/components/Card"
import { PokemonClient, Pokemon } from "pokenode-ts"
import { useEffect, useState } from "react"
import { fetchDataPokemons } from "@/app/utiles/fetchDataPokemons"

export default function Page() {
	const api = new PokemonClient()
	const [pokemons, setPokemons] = useState<Pokemon[]>([])
	const [loading, setLoading] = useState(true)
	const [offset, setOffset] = useState(0)

	const loadPokemons = async (currentOffset: number) => {
		try {
			setLoading(true)
			const response = await api.listPokemons(currentOffset, 20)
			const newPokemons = await fetchDataPokemons(response)
			setPokemons(prev => [...prev, ...newPokemons])
		} catch (error) {
			console.error("Error loading pokemons:", error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadPokemons(0)
	}, [])

	const handleLoadMore = () => {
		const newOffset = offset + 20
		setOffset(newOffset)
		loadPokemons(newOffset)
	}

	return (
		<>
			<main className='p-4 md:p-8 bg-primary min-h-screen'>
				<div className='bg-white/90 backdrop-blur rounded-lg p-6 md:p-8'>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10'>
						{pokemons?.map(pokemon => (
							<Card key={pokemon.id} pokemon={pokemon} />
						))}
					</div>
					<div className="flex justify-center mt-16">
						<button 
							className="btn btn-primary btn-lg" 
							onClick={handleLoadMore}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Load More'}
						</button>
					</div>
				</div>
			</main>
		</>
	)
}