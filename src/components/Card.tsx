import { Pokemon } from 'pokenode-ts'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CardProps {
    pokemon: Pokemon
}

const typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
}

export default function Card({ pokemon }: CardProps) {
    const router = useRouter()
    const mainType = pokemon.types[0].type.name
    const backgroundColor = typeColors[mainType] || '#777777'

    return (
        <div 
            className="card shadow-xl relative overflow-visible h-[300px] cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => router.push(`/pokemon/${pokemon.id}`)}
        >
            {/* Pokemon image - Positioned in front */}
            <figure className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-30">
                <Image
                    src={pokemon.sprites.other?.['official-artwork']?.front_default || ''}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="drop-shadow-xl"
                    priority
                />
            </figure>

            {/* Top part - White background */}
            <div className="h-[55%] bg-white rounded-t-2xl relative px-4 pt-4">
                <div className="absolute top-2 right-2 font-bold text-gray-500 z-20">
                    #{String(pokemon.id).padStart(3, '0')}
                </div>
            </div>
            
            {/* Bottom part - Colored background with elliptical top border */}
            <div 
                className="h-[45%] relative z-10" 
                style={{ backgroundColor }}
            >
                {/* Elliptical mask for top border */}
                <div 
                    className="absolute -top-8 left-0 right-0 h-16"
                    style={{ 
                        background: backgroundColor,
                        borderRadius: '50% 50% 0 0',
                    }}
                />
                
                <div className="absolute inset-x-0 bottom-0 p-6 text-center text-white">
                    <h2 className="font-bold text-xl capitalize mb-3">{pokemon.name}</h2>
                    <div className="flex gap-3 justify-center">
                        {pokemon.types.map((type, index) => (
                            <span 
                                key={index} 
                                className="badge badge-lg bg-white/20 border-none text-white"
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}