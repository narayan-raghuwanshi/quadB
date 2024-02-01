export interface Show {
    id: string
    name: string
    image: string
    rating: number
    language: string
    type: string
    summary: string
    status: "Ended" | "Running" | "In Development"
}