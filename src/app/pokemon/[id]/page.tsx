'use client'

import { PokemonClient, Pokemon } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PageProps {
    params: {
        id: string
    }
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

const statNames: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
}

export default function PokemonDetail({ params }: PageProps) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [description, setDescription] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const api = new PokemonClient()

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setLoading(true)
                const [pokemonData, speciesData] = await Promise.all([
                    api.getPokemonById(parseInt(params.id)),
                    api.getPokemonSpeciesById(parseInt(params.id))
                ])
                
                setPokemon(pokemonData)
                
                // Get English flavor text
                const englishEntry = speciesData.flavor_text_entries.find(
                    entry => entry.language.name === 'en'
                )
                setDescription(englishEntry?.flavor_text.replace(/[\n\f]/g, ' ') || '')
            } catch (error) {
                console.error('Error fetching pokemon:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchPokemonData()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    if (!pokemon) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-bold">Pokemon not found</h1>
                <Link href="/" className="btn btn-primary">Return to Home</Link>
            </div>
        )
    }

    const mainType = pokemon.types[0].type.name
    const backgroundColor = typeColors[mainType] || '#777777'

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="bg-white/95 backdrop-blur shadow-xl rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
                <div className="relative">
                    {/* Pokemon image and name section */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block">
                            <div 
                                className="absolute inset-0 rounded-full opacity-30"
                                style={{ backgroundColor }}
                            />
                            <Image
                                src={pokemon.sprites.other?.['official-artwork']?.front_default || ''}
                                alt={pokemon.name}
                                width={300}
                                height={300}
                                className="relative z-10"
                                priority
                            />
                        </div>
                        <div className="mt-4">
                            <h1 className="text-4xl font-bold capitalize mb-2 text-black">{pokemon.name}</h1>
                            <p className="text-2xl text-black font-medium">#{String(pokemon.id).padStart(3, '0')}</p>
                        </div>
                    </div>

                    {/* Types */}
                    <div className="flex justify-center gap-4 mb-8">
                        {pokemon.types.map((type, index) => (
                            <span 
                                key={index}
                                className="badge badge-lg px-6 py-4 text-white text-lg"
                                style={{ backgroundColor: typeColors[type.type.name] }}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>

                    {/* About section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6 text-center text-black">About</h2>
                        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                </div>
                                <span className="text-sm text-black mb-1">Weight</span>
                                <span className="text-xl font-bold text-black">{pokemon.weight / 10} kg</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </div>
                                <span className="text-sm text-black mb-1">Height</span>
                                <span className="text-xl font-bold text-black">{pokemon.height / 10} m</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-sm text-black mb-1">Abilities</span>
                                <span className="text-xl font-bold capitalize text-black">
                                    {pokemon.abilities[0]?.ability.name.replace('-', ' ')}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        {description && (
                            <div className="max-w-2xl mx-auto text-center">
                                <p className="text-lg text-black leading-relaxed">
                                    {description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Base Stats */}
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center text-black">Base Stats</h2>
                        <div className="space-y-6">
                            {pokemon.stats.map((stat, index) => (
                                <div key={index} className="group">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium text-black">{statNames[stat.stat.name] || stat.stat.name}</span>
                                        <span className="font-bold text-black">{stat.base_stat}</span>
                                    </div>
                                    <div className="w-full rounded-full h-3 overflow-hidden" style={{ backgroundColor: `${backgroundColor}20` }}>
                                        <div 
                                            className="h-full rounded-full transition-all duration-300 group-hover:opacity-80"
                                            style={{ 
                                                width: `${(stat.base_stat / 255) * 100}%`,
                                                backgroundColor
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
