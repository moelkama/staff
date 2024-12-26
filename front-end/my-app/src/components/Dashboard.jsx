
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const [name, setName] = useState('Name 1');
    const [price, setPrice] = useState(38);
    const [type, setType] = useState('TYPE 1');
    const [category, setCategory] = useState('CATEGORY 1');
    const [height, setHeight] = useState(1);
    const [width, setWidth] = useState(0.6);
    const [how_many_available, setHowManyAvailable] = useState(50);
    const [image, setImage] = useState(null);
    // const [imagePreview, setImagePreview] = useState(null);

    const change_name = (e) => {
        setName(e.target.value);
    }

    const change_price = (e) => {
        setPrice(Number(e.target.value));
    }

    const change_type = (e) => {
        setType(e.target.value);
    }

    const change_category = (e) => {
        setCategory(e.target.value);
    }

    const change_height = (e) => {
        setHeight(Number(e.target.value));
    }

    const change_width = (e) => {
        setWidth(Number(e.target.value));
    }

    const change_how_many_available = (e) => {
        setHowManyAvailable(Number(e.target.value));
    }

    const change_image = (e) => {
        setImage(e.target.files[0]);
    }

    const Submit = (e) => {
        e.preventDefault();
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken"))
            ?.split("=")[1];
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('type', type);
        formData.append('category', category);
        formData.append('height', height);
        formData.append('width', width);
        formData.append('how_many_available', how_many_available);
        formData.append('image', image);

        console.log('image:::::::::::::::', image);

        console.log('formData:::::::::::::::', formData);
        fetch('/api/create_article', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('sumbit success:::::::::::', data);
        })
        .catch((error) => {
            console.log('errorrrrrrrrr');
        }
        );
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <form className="flex flex-col gap-4" enctype="multipart/form-data">
                <div className="flex gap-4 justify-center items-center">
                    <div className="flex flex-col gap-4">
                        <input required onChange={change_name} value={name} type="text" className="h-10 rounded-xl border border-gray-300" name="article_name" placeholder="Name" />
                        <input required onChange={change_price} value={price} type="number" className="h-10 rounded-xl border border-gray-300" name="price" placeholder="Price" />
                        <select onChange={change_type} value={type} className="h-10 rounded-xl border border-gray-300">
                            <option value="TYPE 1">TYPE 1</option>
                            <option value="TYPE 2">TYPE 2</option>
                            <option value="TYPE 3">TYPE 3</option>
                            <option value="TYPE 4">TYPE 4</option>
                        </select>
                        <select onChange={change_category} value={category} className="h-10 rounded-xl border border-gray-300">
                            <option value="CATEGORY 1">CATEGORY 1</option>
                            <option value="CATEGORY 2">CATEGORY 2</option>
                            <option value="CATEGORY 3">CATEGORY 3</option>
                            <option value="CATEGORY 4">CATEGORY 4</option>
                        </select>
                        <div className="flex gap-4">
                            <input required onChange={change_height} value={height} type="number" className="w-28 h-10 rounded-xl border border-gray-300" name="height" placeholder="height" />
                            <input required onChange={change_width} value={width} type="number" className="w-28 h-10 rounded-xl border border-gray-300" name="width" placeholder="width" />
                        </div>
                        <input required onChange={change_how_many_available} value={how_many_available} type="number" className="h-10 rounded-xl border border-gray-300" name="how_many_available" placeholder="Quantity" />
                    </div>
                    <div>
                        <input onChange={change_image} accept="image/*" type="file" name="image" className="block w-28 h-12 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none hover:bg-gray-100"/>
                        <img className="hidden h-80 object-cover rounded-xl" src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg" alt="hhh 1"/>
                    </div>
                </div>
                <button onClick={Submit} className="bg-green-500 border hover:border-gray-400 hover:bg-transparent text-xl hover:text-black text-white font-bold py-2 px-4 rounded">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            </form>
        </div>
    );
}