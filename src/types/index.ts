export interface PokemonData {
  concept: string
  types: string[]
  name: string
  primaryColor: string
  secondaryColor: string
  description: string
}

export interface SavedPokemon extends PokemonData {
  id: number
  imageUrl?: string
  createdAt: string
}

export const TYPE_GRADIENTS: Record<string, string> = {
  fire: 'from-pokemon-fire to-accent',
  water: 'from-pokemon-water to-primary',
  grass: 'from-pokemon-grass to-green-400',
  electric: 'from-pokemon-electric to-secondary',
  psychic: 'from-pokemon-psychic to-accent-light',
  dark: 'from-pokemon-dark to-gray-700',
  dragon: 'from-pokemon-dragon to-primary'
}

export const POKEMON_TYPES = [
  { value: 'normal', label: 'Normal' },
  { value: 'fire', label: 'Fuego' },
  { value: 'water', label: 'Agua' },
  { value: 'grass', label: 'Planta' },
  { value: 'electric', label: 'Eléctrico' },
  { value: 'ice', label: 'Hielo' },
  { value: 'fighting', label: 'Lucha' },
  { value: 'poison', label: 'Veneno' },
  { value: 'ground', label: 'Tierra' },
  { value: 'flying', label: 'Volador' },
  { value: 'psychic', label: 'Psíquico' },
  { value: 'bug', label: 'Bicho' },
  { value: 'rock', label: 'Roca' },
  { value: 'ghost', label: 'Fantasma' },
  { value: 'dragon', label: 'Dragón' },
  { value: 'dark', label: 'Siniestro' },
  { value: 'steel', label: 'Acero' },
  { value: 'fairy', label: 'Hada' }
] as const
