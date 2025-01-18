
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function CreateArticle() {
    const [name, setName] = useState('Name 1');
    const [price, setPrice] = useState(38);
    const [type, setType] = useState('TYPE 1');
    const [category, setCategory] = useState('CATEGORY 1');
    const [height, setHeight] = useState(1);
    const [width, setWidth] = useState(0.6);
    const [how_many_available, setHowManyAvailable] = useState(50);
    const [image, setImage] = useState(null);
    const [name_input_error, setNameInputError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    // const [sumbited, setSumbited] = useState(false);

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

    const changeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setImagePreview(event.target.result); // Set the image as a base64 string
          };
          reader.readAsDataURL(file);
        }
        setImage(e.target.files[0]);
      };
    
      const alert = () => {
        MySwal.fire({
            title: 'Article Created Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: "border border-green-500 bg-green-500  hover:bg-transparent text-white font-bold py-2 px-4 rounded",
              },
        })
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
        .then((response) =>
            {
                if (!response.ok)
                {
                    switch (response.status)
                    {
                        case 400:
                            throw new Error('Article name already exists');
                        case 500:
                            throw new Error('Internal Server Error');
                        default:
                            throw new Error('Unknown Error');
                    }
                }
                // setSumbited(true);
                // setSumbited(false)
                setName('');
                setPrice(0);
                setType('');
                setCategory('');
                setHeight(0);
                setWidth(0);
                setHowManyAvailable(0);
                setImage(null);
                setImagePreview(null);
            })
        .then((data) => {
            alert();
        })
        .catch((error) => {
            setNameInputError(error.message);
        }
        );
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            {/* {sumbited ?
                <div className="flex flex-col gap-4 items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-7xl text-green-500" />
                    <h1 className="text-3xl font-bold text-green-500">Article Created Successfully</h1>
                    <button onClick={() => {
                        setSumbited(false)
                        setName('');
                        setPrice(0);
                        setType('');
                        setCategory('');
                        setHeight(0);
                        setWidth(0);
                        setHowManyAvailable(0);
                        setImage(null);
                        setImagePreview(null);
                    }} className="transition duration-700 ease-in-out bg-green-500 border hover:border-gray-400 hover:bg-transparent text-xl hover:text-black text-white font-bold py-2 px-4 rounded">Create another article</button>
                    <Link to="/dashboard/Articles/" className="text-xl font-bold text-blue-500">Go back to dashboard</Link>
                </div>
                : */}
                <form className="flex flex-col gap-4" enctype="multipart/form-data">
                    <div className="flex gap-4 justify-center items-center">
                        <div className="flex flex-col gap-4">
                            <div className="border-l-2 pl-2 flex gap-4 items-center justify-between">
                                <label className="text-lg font-bold">Name</label>
                                {name_input_error ?
                                    <input required onChange={change_name} value={name} type="text" className="px-4 h-10 rounded-xl border border-red-500" placeholder="Name" />
                                    :
                                    <input required onChange={change_name} value={name} type="text" className="px-4 h-10 rounded-xl border border-gray-300" placeholder="Name" />
                                }
                            </div>
                            <div className="border-l-2 pl-2 flex gap-4 items-center justify-between">
                                <label className="text-lg font-bold">Price</label>
                                <input required onChange={change_price} value={price} type="number" className="px-4 h-10 rounded-xl border border-gray-300" name="price" placeholder="Price" />
                            </div>
                            <div className="border-l-2 pl-2 flex gap-4 items-center justify-between">
                                <label className="text-lg font-bold">Type</label>
                                <select onChange={change_type} value={type} className="h-10 w-1/2 rounded-xl border border-gray-300">
                                    <option value="TYPE 1">TYPE 1</option>
                                    <option value="TYPE 2">TYPE 2</option>
                                    <option value="TYPE 3">TYPE 3</option>
                                    <option value="TYPE 4">TYPE 4</option>
                                </select>
                            </div>
                            <div className="border-l-2 pl-2 flex gap-4 items-center justify-between">
                                <label className="text-lg font-bold">Category</label>
                                <select onChange={change_category} value={category} className="h-10 w-1/2 rounded-xl border border-gray-300">
                                    <option value="CATEGORY 1">CATEGORY 1</option>
                                    <option value="CATEGORY 2">CATEGORY 2</option>
                                    <option value="CATEGORY 3">CATEGORY 3</option>
                                    <option value="CATEGORY 4">CATEGORY 4</option>
                                </select>
                            </div>
                            <div className="border-l-2 pl-2 flex items-center justify-between gap-4">
                                <div className="flex gap-2 items-center">
                                    <label className="text-lg font-bold">height</label>
                                    <input required onChange={change_height} value={height} type="number" className="px-3 w-12 h-10 rounded-xl border border-gray-300" name="height" placeholder="height" />
                                </div>
                                <div className="flex gap-1 items-center">
                                    <label className="text-lg font-bold">width</label>
                                    <input required onChange={change_width} value={width} type="number" className="px-3 w-12 h-10 rounded-xl border border-gray-300" name="width" placeholder="width" />
                                </div>
                            </div>
                            <div className="border-l-2 pl-2 flex gap-4 items-center justify-between">
                                <label className="text-lg font-bold">Stock</label>
                                <input required onChange={change_how_many_available} value={how_many_available} type="number" className="h-10 rounded-xl border border-gray-300" name="how_many_available" placeholder="Quantity" />
                            </div>
                        </div>
                        <div className="inline-block text-center">
                            <label htmlFor="fileInput" className="cursor-pointer block">
                                {image ? (
                                <img src={imagePreview} alt="Selected" className=" h-80 object-cover rounded-lg" />
                                ) : (
                                <i className="fas fa-plus text-7xl text-slate-600 border-2 border-dashed border-gray-300 rounded-lg w-80 h-80 flex justify-center items-center">
                                    <FontAwesomeIcon icon={faImage} />
                                </i>
                                )}
                            </label>
                            <input id="fileInput" type="file" accept="image/*" onChange={changeImage} className="hidden" />
                        </div>
                    </div>
                    {name_input_error && <p className="text-red-500 text-center text-md font-bold">{name_input_error}</p>}
                    <button onClick={Submit} className="transition duration-700 ease-in-out bg-green-500 border hover:border-gray-400 hover:bg-transparent text-xl hover:text-black text-white font-bold py-2 px-4 rounded">
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </form>
            {/* } */}
        </div>
    );
}