
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [how_many_available, setHowManyAvailable] = useState('');
    const [image, setImage] = useState('');
    // const [imagePreview, setImagePreview] = useState(null);

    const change_name = (e) => {
        setName(e.target.value);
    }

    const change_price = (e) => {
        setPrice(e.target.value);
    }

    const change_type = (e) => {
        setType(e.target.value);
    }

    const change_category = (e) => {
        setCategory(e.target.value);
    }

    const change_height = (e) => {
        setHeight(e.target.value);
    }

    const change_width = (e) => {
        setWidth(e.target.value);
    }

    const change_how_many_available = (e) => {
        setHowManyAvailable(e.target.value);
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

        fetch('/api/create_article', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
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
                        <input required onChange={change_name} value="elkamal" type="text" className="h-10 rounded-xl border border-gray-300" name="article_name" placeholder="Name" />
                        <input required onChange={change_price} value="15" type="number" className="h-10 rounded-xl border border-gray-300" name="price" placeholder="Price" />
                        <select onChange={change_type} className="h-10 rounded-xl border border-gray-300">
                            <option value="TYPE 1">TYPE 1</option>
                            <option value="TYPE 2">TYPE 2</option>
                            <option value="TYPE 3">TYPE 3</option>
                            <option value="TYPE 4">TYPE 4</option>
                        </select>
                        <select onChange={change_category} className="h-10 rounded-xl border border-gray-300">
                            <option value="CATEGORY 1">CATEGORY 1</option>
                            <option value="CATEGORY 2">CATEGORY 2</option>
                            <option value="CATEGORY 3">CATEGORY 3</option>
                            <option value="CATEGORY 4">CATEGORY 4</option>
                        </select>
                        <div className="flex gap-4">
                            <input required onChange={change_height} value="1" type="number" className="w-28 h-10 rounded-xl border border-gray-300" name="height" placeholder="height" />
                            <input required onChange={change_width} value="0.6" type="number" className="w-28 h-10 rounded-xl border border-gray-300" name="width" placeholder="width" />
                        </div>
                        <input required onChange={change_how_many_available} value="15" type="number" className="h-10 rounded-xl border border-gray-300" name="how_many_available" placeholder="Quantity" />
                    </div>
                    <div>
                        <input onchange={change_image} accept="image/*" type="file" name="image" className="block w-28 h-12 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none hover:bg-gray-100"/>
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