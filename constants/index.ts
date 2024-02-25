export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Utwórz wydarzenie',
      route: '/events/create',
    },
    {
      label: 'Konto',
      route: '/profile',
    },
  ]
  
  export const eventDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }