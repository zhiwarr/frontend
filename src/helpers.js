// helpers.js

// Set active class for routes
function setActive(routes) {
  if (Array.isArray(routes)) {
    for (let route of routes) {
      if (window.location.pathname === route) {
        return 'active'
      }
    }
  }
}

// Check if product has discount
function checkDiscount(product) {
  const currentDate = new Date().toISOString().slice(0, 10)

  if (
    product.offer_price > 0 &&
    currentDate >= product.offer_start_date &&
    currentDate <= product.offer_end_date
  ) {
    return true
  }

  return false
}

// Calculate discount percent
function calculateDiscountPercent(originalPrice, discountPrice) {
  const discountAmount = originalPrice - discountPrice
  const discountPercent = (discountAmount / originalPrice) * 100

  return Math.round(discountPercent)
}

// Check the product type
function productType(type) {
  switch (type) {
    case 'new_arrival':
      return 'New'
    case 'featured_product':
      return 'Featured'
    case 'top_product':
      return 'Top'
    case 'best_product':
      return 'Best'
    default:
      return ''
  }
}
// Limit text function
function limitText(text, limit = 20) {
  return text.length > limit ? text.substring(0, limit) + '...' : text
}

// Get currency icon function
function getCurrencyIcon(currencyIcon) {
  // Assuming currencyIcon is provided as an argument
  return currencyIcon
}

export {
  setActive,
  checkDiscount,
  calculateDiscountPercent,
  productType,
  limitText,
  getCurrencyIcon
}
