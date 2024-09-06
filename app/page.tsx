'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import Logo from "../app/Assets/images/logo-search-grid-1x.png"

const products = [
  { id: 1, name: 'Classic Salt', price: 2.99, image: 'https://m.media-amazon.com/images/I/81EUE1oZURL._SY679_.jpg' },
  { id: 2, name: 'Sour Cream & Onion', price: 3.49, image: 'https://m.media-amazon.com/images/I/81EUE1oZURL._SY679_.jpg' },
  { id: 3, name: 'BBQ Flavor', price: 3.29, image:'https://m.media-amazon.com/images/I/81EUE1oZURL._SY679_.jpg' },
  { id: 4, name: 'Jalapeño Cheddar', price: 3.79, image: 'https://m.media-amazon.com/images/I/81EUE1oZURL._SY679_.jpg' },
  { id: 5, name: 'Salt & Vinegar', price: 3.19, image: 'https://m.media-amazon.com/images/I/81EUE1oZURL._SY679_.jpg' },
  { id: 6, name: 'Ranch', price: 3.59, image: 'https://m.media-amazon.com/images/I/81EUE1oZURL._SY679_.jpg' },
]

 const  Page=()=>{
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([])

  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { id: productId, quantity: 1 }]
    })
  }

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id)
    return total + (product ? product.price * item.quantity : 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Image
           width={100}
           height={100}
           src={Logo}
           alt='LOGO'
          />
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-gray-600 mr-2" />
            <span className="text-gray-600">
              {cart.reduce((total, item) => total + item.quantity, 0)} items
            </span>
            <span className="ml-2 font-semibold">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card key={product.id} className=" flex  flex-col justify-between backdrop-blur-2xl">
              <CardHeader>
                <img src={product.image} alt={product.name} className="w-full h-[200px]object-cover rounded-t-lg" />
                <CardTitle className="mt-2">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button onClick={() => addToCart(product.id)}>Add to Cart</Button>
                <Badge variant="secondary">
                  {cart.find(item => item.id === product.id)?.quantity || 0} in cart
                </Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
export default Page