"use client";

import React, { useState, ChangeEvent } from "react";

import Breadcrumb from "@/components/common/Breadcrumb";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input/Input";
import Textarea from "@/components/common/Input/Textarea";
import { CrossIcon, SearchIcon } from "@/components/Icons";
import Image from "next/image";
import Autocomplete from "@/components/common/Input/AutoComplete";

function OrderForm() {
  const [tags, setTags] = useState<string[]>(["sdfsdf", "sdf", "sdfd"]);
  const [inputValue, setInputValue] = useState<string>("");

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleTagChange = (event: string[]) => {
    setTags(event);
    setInputValue("");
  };

  const fetchSuggestions = async (query: string) => {
    // Simulate a fetch operation for suggestions
    return ["Apple", "Banana", "Cherry"].filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSelect = (selectedValue: string) => {
    console.log("Selected:", selectedValue);
  };

  return (
    <form>
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Create New Order</h1>
          <Breadcrumb />
        </div>
        <div className="flex space-x-2">
          <Button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
            // disabled={formik.isSubmitting}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Form Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="flex flex-col md:flex-row items-center mb-4">
              <Autocomplete
                label="Products"
                id="products"
                name="products"
                value=""
                fetchSuggestions={fetchSuggestions}
                onSelect={handleSelect}
                minLength={1}
                debounceTime={300}
                suggestionsClassName="bg-gray-100"
                placeholder="Search products"
                prefix={<SearchIcon fill="#969696" />}
              />
              <Button className="md:ml-2 p-2 bg-gray-200 rounded-lg">
                Browse
              </Button>
            </div>
            <table className="min-w-full">
              <thead>
                <tr className=" text-left border-b border-gray-300">
                  <th className="p-2">Product Name</th>
                  <th className="">Quantity</th>
                  <th className="">Total</th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="flex items-center justify-between p-2">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152"
                      alt="Product image"
                      className="w-10 h-10 border rounded-lg"
                      width={30}
                      height={30}
                    />
                    <div className="flex-1 ml-4">
                      <p className="text-sm md:text-base">Product 1</p>
                      <p className="text-sm md:text-base text-blue-500">$2.6</p>
                    </div>
                  </td>
                  <td>
                    <div className="w-20 p-2">
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={1}
                        className="!px-2"
                      />
                    </div>
                  </td>
                  <td>$50.47</td>
                  <td>
                    <CrossIcon width={10} height={10} />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="flex items-center justify-between p-2">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152"
                      alt="Product image"
                      className="w-10 h-10 border rounded-lg"
                      width={30}
                      height={30}
                    />
                    <div className="flex-1 ml-4">
                      <p className="text-sm md:text-base">Product 1</p>
                      <p className="text-sm md:text-base text-blue-500">$2.6</p>
                    </div>
                  </td>
                  <td>
                    <div className="w-20 p-2">
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={1}
                        className="!px-2"
                      />
                    </div>
                  </td>
                  <td>$50.47</td>
                  <td>
                    <CrossIcon width={10} height={10} />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="flex items-center justify-between p-2">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0599/0580/2372/files/screenshot-dribbble_com-2024_10_27-15_56_54_40x40@3x.png?v=1730027152"
                      alt="Product image"
                      className="w-10 h-10 border rounded-lg"
                      width={30}
                      height={30}
                    />
                    <div className="flex-1 ml-4">
                      <p className="text-sm md:text-base">Product 1</p>
                      <p className="text-sm md:text-base text-blue-500">$2.6</p>
                    </div>
                  </td>
                  <td>
                    <div className="w-20 p-2">
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={1}
                        className="!px-2"
                      />
                    </div>
                  </td>
                  <td>$50.47</td>
                  <td>
                    <CrossIcon width={10} height={10} />
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
          <Card className="">
            <h2 className="text-md md:text-lg font-semibold mb-4">Payment</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-xs md:text-sm text-gray-500">Subtotal:</p>
                <p className="font-semibold text-sm md:text-base">$70.13</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs md:text-sm text-gray-500">Shipping:</p>
                <p className="font-semibold text-sm md:text-base">$10.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs md:text-sm text-gray-500">Tax (GST):</p>
                <p className="font-semibold text-sm md:text-base">$5.00</p>
              </div>
              <div className="flex justify-between border-t py-1">
                <p className="text-xs md:text-sm text-gray-500 font-semibold">
                  Total price:
                </p>
                <p className="font-semibold text-sm md:text-base text-red-500">
                  $90.58
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <Textarea
              label="Notes"
              name="notes"
              id="notes"
              placeholder="Notes"
              // value={formik.values.tags}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={formik.touched.tags ? formik.errors.tags : undefined}
            />
          </Card>
          <Card>
            <Autocomplete
              label="Customer"
              id="customer"
              name="customer"
              value=""
              fetchSuggestions={fetchSuggestions}
              onSelect={handleSelect}
              minLength={1}
              debounceTime={300}
              suggestionsClassName="bg-gray-100"
              placeholder="Search customer"
              className="flex-grow p-2 border rounded-lg mb-2 md:mb-0"
              prefix={<SearchIcon fill="#969696" />}
            />
          </Card>
          <Card>
            <Input
              id="tags"
              name="tags"
              type="text"
              value={inputValue}
              tags={tags}
              removeTag={removeTag}
              onTagChange={handleTagChange}
              onChange={handleInputChange}
              placeholder="Add tags separated by commas"
            />
          </Card>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;