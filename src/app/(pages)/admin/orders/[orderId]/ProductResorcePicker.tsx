import React, { useState } from 'react';

const ProductResorcePicker = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products] = useState([
        { 
            name: 'broken dust', 
            available: 16, 
            price: 44.01, 
            variants: ['red / L', 'red / XL', 'red / XXL', 'black / L', 'black / XL', 'black / XXL'] 
        },
        { 
            name: 'clean breeze', 
            available: 10, 
            price: 50.00, 
            variants: [] 
        }
    ]);
    const [selectedVariants, setSelectedVariants] = useState({});

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleProductSelect = (product, variant) => {
        if (variant) {
            setSelectedVariants((prev) => ({
                ...prev,
                [product.name]: prev[product.name] ? [...prev[product.name], variant] : [variant],
            }));
        } else {
            setSelectedProducts((prev) => [...prev, product.name]);
        }
    };

    const isVariantSelected = (productName, variant) => {
        return selectedVariants[productName]?.includes(variant);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-3xl">
                <div className="flex items-center justify-between mb-4">
                    <button className="text-gray-500">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <h2 className="text-lg font-semibold">Create order</h2>
                </div>
                <div className="space-y-4">
                    {/* Product Section */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <label className="block text-gray-700">Product</label>
                        <div className="relative mt-2">
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Search for products"
                                onClick={toggleModal}
                                readOnly
                            />
                            <button className="absolute right-2 top-2 text-gray-500">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    {/* Other sections */}
                    {/* ... */}
                </div>
                <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold">All products</h3>
                            <button className="text-gray-500" onClick={toggleModal}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="p-4">
                            {products.map((product, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                checked={selectedProducts.includes(product.name)}
                                                onChange={() => handleProductSelect(product)}
                                                disabled={product.variants.length > 0}
                                            />
                                            <img
                                                src="https://placehold.co/50x50"
                                                alt="Product image"
                                                className="w-10 h-10 rounded-lg mr-2"
                                            />
                                            <span>{product.name}</span>
                                        </div>
                                        <span>{product.available} available</span>
                                        <span>₹{product.price} INR</span>
                                    </div>
                                    {product.variants.length > 0 && (
                                        <div className="ml-6">
                                            {product.variants.map((variant, vIndex) => (
                                                <div
                                                    key={vIndex}
                                                    className="flex items-center justify-between py-2 border-b"
                                                >
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="mr-2"
                                                            checked={isVariantSelected(product.name, variant)}
                                                            onChange={() => handleProductSelect(product, variant)}
                                                        />
                                                        <span>{variant}</span>
                                                    </div>
                                                    <span>0 available</span>
                                                    <span>₹{product.price} INR</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-end p-4 border-t">
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-2"
                                onClick={toggleModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={toggleModal}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductResorcePicker;
