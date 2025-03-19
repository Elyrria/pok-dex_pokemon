import { Pokemon, PokemonClient, NamedAPIResourceList } from "pokenode-ts";

export async function fetchDataPokemons(pokemons: NamedAPIResourceList) {
    try {
        console.log("Starting fetchDataPokemons with:", pokemons);
        const api = new PokemonClient();
        
        if (!pokemons?.results?.length) {
            console.error("No pokemon results found in:", pokemons);
            return [];
        }

        console.log("Creating promises for", pokemons.results.length, "pokemons");
        const pokemonPromises = pokemons.results.map(pokemon => {
            console.log("Fetching details for pokemon:", pokemon.name);
            return api.getPokemonByName(pokemon.name);
        });

        const results = await Promise.all(pokemonPromises);
        console.log("Successfully fetched details for", results.length, "pokemons");
        return results;
    } catch (error) {
        console.error("Error in fetchDataPokemons:", error);
        return [];
    }
}
