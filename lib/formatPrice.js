
const priceThousandsIndicator = (price, indicator = ',') => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, indicator)
}

const formatPrice = (price) => {
  let roundedPrice = Math.round((price + Number.EPSILON) * 100) / 100
  let formattedPrice = roundedPrice.toString()
        
  if (!formattedPrice.match(/^[0-9]+\.[0-9]{2}$/)) {
    if (formattedPrice.match(/^[0-9]+\.[0-9]{1}$/)) {
      formattedPrice += "0"
    } else if (formattedPrice.match(/^[0-9]+$/)) {
      formattedPrice += ".00"
    }
  }

  return priceThousandsIndicator(formattedPrice, ",")
}

export default formatPrice