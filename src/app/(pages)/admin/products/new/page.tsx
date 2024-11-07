'use client'
import React, { useState } from 'react';

const Page: React.FC = () => {
    const [productName, setProductName] = useState('Puffer Jacket With Pocket Detail');
    const [description, setDescription] = useState('Cropped puffer jacket made of technical fabric. High neck and long sleeves. Flap pocket at the chest and in-seam side pockets at the hip. Inside pocket detail. Hem with elastic interior. Zip-up front.');
    const [size, setSize] = useState('M');
    const [gender, setGender] = useState('Woman');
    const [material, setMaterial] = useState('Polyester');
    const [color, setColor] = useState('Navy Blue');
    const [price, setPrice] = useState(59.99);

    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const genders = ['Men', 'Woman', 'Unisex'];

    const handleSaveDraft = () => {
        // Logic to save the draft
        console.log('Draft saved:', { productName, description, size, gender, material, color, price });
    };

    const handleAddProduct = () => {
        // Logic to add the product
        console.log('Product added:', { productName, description, size, gender, material, color, price });
    };

    return (
        <div className=" p-4 md:p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold mb-4 md:mb-0">
                    <i className="fas fa-box-open mr-2"></i>Add New Product
                </h1>
                <div className="flex space-x-2">
                    <button onClick={handleSaveDraft} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Save Draft</button>
                    <button onClick={handleAddProduct} className="bg-primary text-white px-4 py-2 rounded">Add Product</button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 bg-white shadow 50 p-4 md:p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">General Information</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Title</label>
                        <input type="text" className="w-full p-2 border rounded" value={productName} onChange={e => setProductName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea className="w-full p-2 border rounded h-24" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Size</label>
                        <div className="flex flex-wrap space-x-2">
                            {sizes.map(sizeOption => (
                                <button key={sizeOption} className={`px-4 py-2 border rounded mb-2 ${size === sizeOption ? 'bg-primary text-white' : 'bg-gray-200'}`} onClick={() => setSize(sizeOption)}>
                                    {sizeOption}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Gender</label>
                        <div className="flex space-x-4">
                            {genders.map(genderOption => (
                                <label key={genderOption} className="flex items-center space-x-2">
                                    <input type="radio" name="gender" checked={gender === genderOption} onChange={() => setGender(genderOption)} className="form-radio" />
                                    <span>{genderOption}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1 bg-white shadow 50 p-4 md:p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Upload Img</h2>
                    <div className="mb-4">
                        <img src="https://placehold.co/300x300" alt="Puffer jacket" className="w-full h-64 object-cover rounded" />
                    </div>
                    <div className="flex space-x-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <img key={index} src="https://placehold.co/100x100" alt={`Puffer jacket thumbnail ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                        ))}
                        <div className="w-20 h-20 border-2 border-dashed border-gray-300 flex items-center justify-center rounded">
                            <i className="fas fa-plus text-gray-400"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
                <div className="lg:col-span-3 bg-white shadow 50 p-4 md:p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Product Details</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Material</label>
                        <input type="text" className="w-full p-2 border rounded" value={material} onChange={e => setMaterial(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Color</label>
                        <input type="text" className="w-full p-2 border rounded" value={color} onChange={e => setColor(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Price</label>
                        <input type="number" className="w-full p-2 border rounded" value={price} onChange={e => setPrice(parseFloat(e.target.value))} />
                    </div>
                </div>
                <div className="lg:col-span-1 bg-white shadow 50 p-4 md:p-6 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Product Reviews</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Rating</label>
                        <div className="flex space-x-2">
                            {[...Array(5)].map((_, i) => (
                                <i key={i} className={`fas fa-star ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Reviews</label>
                        <p className="text-gray-600">No reviews yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
