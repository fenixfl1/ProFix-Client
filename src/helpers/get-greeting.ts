export const getGreeting = (name: string) => {
  const hours = new Date().getHours()
  if (hours < 12) {
    return `¡Buenos días 🌤️, ${name}!`
  } else if (hours < 18) {
    return `¡Buenas tardes ☀️, ${name}!`
  } else {
    return `¡Buenas noches 🌔, ${name}!`
  }
}
