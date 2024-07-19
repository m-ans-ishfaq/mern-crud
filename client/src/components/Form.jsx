import React, { useEffect, useState } from 'react';
import { call } from '../utils/api';

function BookForm({ title, setTitle, author, setAuthor, btn, onSubmit }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(title, author);
        setTitle('');
        setAuthor('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Title:
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </label>
            </div>
            <div>
                <label>
                    Author:
                    <input 
                        type="text" 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                        required 
                    />
                </label>
            </div>
            <button type="submit">
                {btn}
            </button>
        </form>
    )
}


export function AddBookForm({ mutate }) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const onSubmit = async (title, author) => {
        try {
            const res = await fetch(call('book'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, author })
            });

            if (!res.ok) {
                throw new Error('Failed to add book');
            }

            mutate();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <BookForm {...{ title, setTitle, author, setAuthor, btn: "Add", onSubmit }} />
    );
}

export function UpdateBookForm({ book, setBook, mutate }) {

    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);

    const onSubmit = async (title, author) => {
        try {
            const res = await fetch(call('book/' + book._id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, author })
            });

            if (!res.ok) {
                throw new Error('Failed to update book');
            }

            mutate();
            setBook(false);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <BookForm {...{ title, setTitle, author, setAuthor, btn: "Update", onSubmit }} />
    );
}