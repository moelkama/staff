
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

export default function Articles() {
    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);

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

    if (loading) return <h1>Loading...</h1>;
    return (
        <div className="grid grid-cols-3 gap-8">
            {articles.map((category, index) => {
                return (
                    <div key={index} className="flex flex-col gap-2 items-center p-4 rounded-lg border border-gray-400 ">
                        <h1 className="font-black text-xl">{category.name}</h1>
                        <img className="w-full h-60 object-cover rounded-xl" src={category.src} alt={category.name}></img>
                        <div className="flex gap-4">
                            <button className="mt-4 w-20 h-10 bg-green-400 rounded-xl hover:border hover:border-slate-800 hover:bg-transparent">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button className="mt-4 w-20 h-10 bg-green-400 rounded-xl hover:border hover:border-slate-800 hover:bg-transparent">
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}