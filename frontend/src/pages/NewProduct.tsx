import React, { useState, ChangeEvent } from "react";
import { BsCloudUploadFill } from "react-icons/bs";
import { ImageBase64 } from "../utils/ImageBase64";
import { toast } from "react-hot-toast";

interface FormData {
  name: string;
  category: string;
  image: string;
  price: string;
  description: string;
}

const NewProduct: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const REACT_SERVER = import.meta.env.VITE_REACT_SERVER

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const data: string | ArrayBuffer | null = await ImageBase64(file);
      if (data) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          image: data as string,
        }));
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(formData)

    const {name, category, image, price, description} = formData
    if (name && category && image && price && description) {
      const fetchData = await fetch(`${REACT_SERVER}/uploadProduct`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    const fetchRes = await fetchData.json()
    console.log(fetchRes)
    toast("Product uploaded")
    setFormData({
      name: "",
      category: "",
      image: "",
      price: "",
      description: "",
    })
    } else {
      toast("Please fill all required fieds")
    }
  }

return (
  <div className="flex justify-center px-4">
    <div className="bg-white w-[500px] flex flex-col py-8 px-4 rounded-md mt-16 shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-gray-200 rounded-sm pl-2 py-1 outline-blue-400"
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          onChange={handleChange}
          value={formData.category}
          className="bg-gray-200 rounded-sm pl-2 py-1 outline-blue-400"
        >
          <option value={"other"}>Select a category</option>
          <option value={"real"}>Real flowers</option>
          <option value={"artificial"}>Artificial flowers</option>
          <option value={"preserved"}>Preserved flowers</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="flex justify-center items-center bg-gray-200 h-36">
            <span className="cursor-pointer">
              {
                formData.image ? <img src={formData.image} className="w-32 h-full" /> : <BsCloudUploadFill size={40} />
              }
            </span>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={uploadFile}
            />
          </div>
        </label>

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          required
          onChange={handleChange}
          className="bg-gray-200 rounded-sm pl-2 py-1 outline-blue-400"
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          id="description"
          name="description"
          value={formData.description}
          required
          onChange={handleChange}
          className="bg-gray-200 rounded-sm pl-2 py-1 outline-blue-400"
        ></textarea>

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 font-bold text-white mt-8 py-2 rounded-full"
        >
          Save
        </button>
      </form>
    </div>
  </div>
);
};

export default NewProduct;
