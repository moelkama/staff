
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faCheck, faPrint, faEye, faPen } from "@fortawesome/free-solid-svg-icons";

function Articles({articles, AddItem, change}) {
    return (
        <div className="grid grid-cols-3 gap-8">
            {articles.map((category, index) => {
                return (
                    <div key={index} className="flex flex-col gap-2 items-center p-4 rounded-lg border border-gray-400 ">
                        <h1 className="font-black text-xl">{category.name}</h1>
                        <img className="w-full h-60 object-cover rounded-xl" src={category.src} alt={category.name}></img>
                        <div className="flex gap-4">
                            <input onChange={(e) => change(e, index, 'count')} defaultValue={category.count} type="number" className="mt-4 w-20 h-10 border border-gray-300 rounded-xl" placeholder="Q"></input>
                            <input onChange={(e) => change(e, index, 'price')} defaultValue={category.price} type="number" className="mt-4 w-20 h-10 border border-gray-300 rounded-xl" placeholder="P"></input>
                            <button onClick={() => AddItem(index)} className="mt-4 w-20 h-10 bg-green-400 rounded-xl hover:border hover:border-slate-800 hover:bg-transparent">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function    Cart({order_items, RemoveItem, change})
{
    return (
        <>
            {order_items.map((item, index) => (
                <div key={index} className="flex flex-row gap-4 items-center p-4 rounded-lg border bg-gray-200">
                    <img className="w-20 h-20 object-cover rounded-xl" src={item.src} alt={item.name} ></img>
                    <h1 className="font-black text-xl">{item.name}</h1>
                    <input defaultValue={item.count} onChange={(e) => change(e, index, 'count')} type="number" className="w-20 h-11 border border-gray-300 rounded-xl" placeholder="Q" ></input>
                    <input defaultValue={item.price} onChange={(e) => change(e, index, 'price')} type="number" className="w-20 h-11 border border-gray-300 rounded-xl" placeholder="P" ></input>
                    <button onClick={() => RemoveItem(index)} className="w-10 h-10 bg-red-400 rounded-md hover:border hover:border-slate-800 hover:bg-transparent">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ))}
        </>
    );
}

export default function Create() {
    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);
    const [order_items, set_order_items] = useState([
        {  
            'count': 29,
            'price': 39,
            'name': 'Pizza',
            'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'
        },
        // {
        //     'count': 10,
        //     'price': 13,
        //     'name': 'coffee',
        //     'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'
        // }
    ]);
    const [order_id, set_order_id] = useState(null);

    useEffect(() => {
        fetch("/api/get_articles")
        .then(response => response.json())
        .then(data => {
            const articles = data.articles.map(category => {
                return {
                    ...category,
                    count: 0
                }
            });
            set_loading(false);
            set_articles(articles);
            // set_order_items([articles[0]]);
        })
    }, []);

    const AddItem = (index) => {
        set_order_items([...order_items, articles[index]]);
    }

    const change_category = (event, index, key) => {
        articles[index][key] = Number(event.target.value);
    }

    const change_CartItem = (event, index, key) => {
        order_items[index][key] = Number(event.target.value);
    }

    const RemoveItem = (index) => {
        const new_order_items = order_items.filter((_, i) => i !== index)
        set_order_items(new_order_items);
        // console.log('new_order_items:::::::::::::::::::', new_order_items);
    }

    const SubmitOrder = () => {
        console.log('-------------------submitting order-------------------');
        // console.log('order_items::::::::::::::::::;', order_items);
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken"))
            ?.split("=")[1];
        const url = order_id ? `/api/update_order/${order_id}` : '/api/create_order';
        const method = order_id ? 'PUT' : 'POST';
        console.log('csrfToken:::::::::::::::::', csrfToken);
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(
                order_items.map(item => ({
                    name: item.name,
                    count: item.count,
                    price: item.price,
                }))
            )
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            return response.json();
        })
        .then(data => {
            console.log('------------------submit success------------------');
            console.log('data:', data);
            set_order_id(data.id);
        })
        .catch(error => {
            console.error('Errrrrrrrrrrrror:');
        });
    }

    const delete_order = () => {
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken"))
            ?.split("=")[1];
        fetch(`/api/delete_order/${order_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            return response.json();
        }).then(data => {
            console.log('DELETED SUCCESSFULLY', data);
            set_order_id(null);
            set_order_items([]);
        }).catch(error => {
            console.log('Errorrrrrrrrrrrrrrrrrrrrrrrrr');
            console.error('Error:', error);
        });
    }
    if (loading) return <h1>Loading...</h1>;
    return (
        <div className="flex justify-evenly">
            <Articles articles={articles} AddItem={AddItem} change={change_category} />
            {/* {order_items.length > 0 && ( <Cart order_items={order_items} RemoveItem={RemoveItem}/> )} */}
            {order_items.length > 0 && ( 
                <div className="flex flex-col sticky top-28 gap-4 border border-gray-400 p-4">
                    <Cart order_items={order_items} RemoveItem={RemoveItem} change={change_CartItem} />
                    <button onClick={SubmitOrder} className="w-full h-12 bg-green-400 text-2xl rounded-xl hover:border hover:border-slate-800 hover:bg-transparent">
                        {order_id ? <FontAwesomeIcon icon={faPen} /> : <FontAwesomeIcon icon={faCheck} />}
                    </button>
                    { order_id && (
                        <div id="order-infos-id" className="w-full flex gap-2">
                            <button onClick={delete_order} className="bg-green-400 w-40 h-10 rounded-xl flex justify-center items-center font-bold text-lg border hover:border-slate-800 hover:bg-transparent">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button  className="bg-green-400 w-40 h-10 rounded-xl flex justify-center items-center font-bold text-lg border hover:border-slate-800 hover:bg-transparent" href="">
                                <FontAwesomeIcon icon={faPrint} />
                            </button>
                            <a className="bg-green-400 w-40 h-10 rounded-xl flex justify-center items-center font-bold text-lg border hover:border-slate-800 hover:bg-transparent" target="_blank" rel="noreferrer" href={`/generate_pdf/${order_id}`}>
                                <FontAwesomeIcon icon={faEye} />
                            </a>
                        </div>
                    )}
                </div>
             )}
        </div>
    );
}