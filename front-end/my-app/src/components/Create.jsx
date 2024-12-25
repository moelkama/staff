
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Create() {
    const [categories, set_categories] = useState([]);
    const [loading, set_loading] = useState(true);
    const [order_items, set_order_items] = useState([
        // {
        //     'count': 29,
        //     'price': 39,
        //     'name': 'Pizza',
        //     'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'
        // },
        // {
        //     'count': 10,
        //     'price': 13,
        //     'name': 'coffee',
        //     'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'
        // }
    ]); 

    useEffect(() => {
        fetch("/api/get_categories")
        .then(response => response.json())
        .then(data => {
            console.log(data.categories);
            set_loading(false);
            set_categories(data.categories);
        })
    }, []);

    const addItem = () => {
        console.log("Adding item to order");
        set_order_items([...order_items,
            {
                'count': 29,
                'price': 39,
                'name': 'Pizza',
                'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'
            }]);
        // const category = categories[index];
        // const order_item = {
        //     "category": category.name,
        //     "quantity": element.parentElement.children[0].value,
        //     "price": element.parentElement.children[1].value
        // }
        // set_order_items([...order_items, order_item]);
        // console.log(order_items);
        // const order_items_div = document.getElementById("order-items-id");
        // order_items_div.classList.remove("hidden");
        // order_items_div.innerHTML += `
        //     <div className="flex justify-between border border-gray-400 p-4 rounded-lg">
        //         <h1>${order_item.category}</h1>
        //         <h1>${order_item.quantity}</h1>
        //         <h1>${order_item.price}</h1>
        //     </div>
        // `;
    }
    if (loading) return <h1>Loading...</h1>;
    return (
        <div className="flex justify-evenly">
            <div id="categories" className="grid grid-cols-3 gap-8">
                {categories.map((category, index) => {
                    return (
                        <div className="flex flex-col gap-2 items-center p-4 rounded-lg border border-gray-400 ">
                            <h1 className="font-black text-xl">{category.name}</h1>
                            <img className="w-full h-60 object-cover rounded-xl" src={category.src} alt={category.name}></img>
                            <div className="flex gap-4">
                                <input value="15" type="number" className="mt-4 w-20 h-10 border border-gray-300 rounded-xl" placeholder="Q"></input>
                                <input value="15" type="number" className="mt-4 w-20 h-10 border border-gray-300 rounded-xl" placeholder="P"></input>
                                <button onClick={addItem} className="mt-4 w-20 h-10 bg-green-400 rounded-xl hover:border hover:border-slate-800 hover:bg-transparent">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {order_items.length > 0 && (
                <div className="flex flex-col sticky top-28 gap-4 border border-gray-400 p-4">
                    {order_items.map((item) => (
                    <div key={item.name} className="flex flex-row gap-4 items-center p-4 rounded-lg border bg-gray-200">
                        <img className="w-20 h-20 object-cover rounded-xl" src={item.src} alt={item.name} ></img> <h1 className="font-black text-xl">{item.name}</h1> <input name="item_count" type="number" className="w-20 h-11 border border-gray-300 rounded-xl" placeholder="Q" ></input>
                        <input name="item_price" type="number" className="w-20 h-11 border border-gray-300 rounded-xl" placeholder="P" ></input>
                        <button className="w-10 h-10 bg-red-400 rounded-md hover:border hover:border-slate-800 hover:bg-transparent">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
}