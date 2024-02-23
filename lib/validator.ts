import * as z from "zod"

export const eventFormSchema = z.object({
    title: z.string().min(3, 'Tytuł musi mieć zawierać conajmniej 3 znaki'),
    description: z.string().min(3, 'Opis musi mieć zawierać conajmniej 3 znaki').max(400, 'Opis nie może zawierać więcej niż 400 znaków'),
    location: z.string().min(3, 'Lokalizacja musi zawierać conajmniej 3 znaki').max(400, 'Lokalizacja nie może zawierać więcej niż 400 znaków'),
    imageUrl: z.string(), 
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url()
  })