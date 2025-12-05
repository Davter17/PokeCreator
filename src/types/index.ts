export interface PokemonData {
  animal: {
    name: string
    icon: string
  } | null
  abilities: Array<{
    value: string
    name: string
    icon: string
  }>
  name: string
  type: string
  color: string
  description: string
}

export interface SavedPokemon extends PokemonData {
  id: number
  createdAt: string
}
