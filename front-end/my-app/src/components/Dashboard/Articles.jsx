
import { Link, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateArticle from "./CreateArticle";

export default function Articles() {
    const [articles, set_articles] = useState([]);
    const [loading, set_loading] = useState(true);

    const fetchArticles = () => {
        fetch("/api/get_articles")
            .then((response) => response.json())
            .then((data) => {
                set_articles(data.articles);
                set_loading(false);
            });
    }
    useEffect(() => {
        fetchArticles();
        }, []);

    const deleteArticle = (id) => {
        const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken"))
            ?.split("=")[1]
        fetch(`/api/delete_article/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken
            }
        })
        .then(response => response.json())
        .then(data => {
            fetchArticles();
            console.log(data)
        })
        .catch(error => console.error('Error:', error))
    }
    if (loading) return <h1>Loading...</h1>;
    return (
        <>
            <Routes >
                <Route path="/" element={
                    <div className="grid grid-cols-3 gap-8">
                        <Link to="create" className="border text-6xl hover:text-8xl hover:bg-green-300 transition duration-700 ease-in-out border-gray-400 rounded-lg flex justify-center items-center p-4">
                            <FontAwesomeIcon icon={faPlus} />
                        </Link>
                        {articles.map((article, index) => {
                            return (
                                <div key={index} className="flex flex-col gap-2 items-center p-4 rounded-lg border border-gray-400 ">
                                    <h1 className="font-black text-xl">{article.name}</h1>
                                    <img className="w-full h-60 object-cover rounded-xl" src={article.src} alt={article.name}></img>
                                    <div className="flex gap-4">
                                        <button onClick={ () => {deleteArticle(article.id)}} className="mt-4 w-20 h-10 bg-green-400 rounded-xl hover:border hover:border-slate-800 hover:bg-transparent">
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
                } />
                <Route path="create" element={<CreateArticle />} />
            </Routes>
        </>
    );
}