'use client';

import { useState } from 'react';
import { Slider } from "@/app/components/ui/slider";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar";
import { Search, Menu as HamIcon } from "lucide-react";

// Datos de productos (ficticios)
const products = [
  { id: 1, name: "Laptop Pro", price: 1299, category: "Electronics" },
  { id: 2, name: "Smartphone X", price: 699, category: "Electronics" },
  { id: 3, name: "Ergonomic Chair", price: 299, category: "Furniture" },
  { id: 4, name: "Coffee Maker", price: 89, category: "Appliances" },
  { id: 5, name: "Running Shoes", price: 129, category: "Sports" },
  { id: 6, name: "Wireless Earbuds", price: 159, category: "Electronics" },
];

// Componente principal del Marketplace
export default function Marketplace() {
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => 
    (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <SidebarComponent 
          priceRange={priceRange} 
          setPriceRange={setPriceRange} 
          selectedCategories={selectedCategories} 
          handleCategoryChange={handleCategoryChange} 
        />
        <div className="flex-1 overflow-auto">
          <HeaderComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </SidebarProvider>
  );
}

// Componente de Sidebar
function SidebarComponent({ priceRange, setPriceRange, selectedCategories, handleCategoryChange }) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium">Price range</h3>
            <Slider
              min={0}
              max={1500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Categories</h3>
            <div className="space-y-2">
              {["Electronics", "Furniture", "Appliances", "Sports"].map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="ml-2 text-sm">{category}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

// Componente de Header
function HeaderComponent({ searchTerm, setSearchTerm }) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <SidebarTrigger>
        <Button variant="outline" size="icon">
          <HamIcon className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SidebarTrigger>
      <div className="flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64"
        />
        <Button size="icon" variant="ghost">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </header>
  );
}

// Componente de Lista de Productos
function ProductList({ products }) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{product.category}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-lg font-semibold">${product.price}</span>
              <Button>Añadir al carrito</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
