import useSWR from 'swr'
import { call, fetcher } from "../utils/api";
import { AddBookForm, UpdateBookForm } from './Form';
import { useState } from 'react';

export default function App() {

    const { data, error, isLoading, mutate } = useSWR(call("book"), fetcher);
    const [bookToEdit, setBookToEdit] = useState(null);

    const removeBook = async (book) => {
        try {
            const res = await fetch(call('book/' + book._id), {
                method: 'DELETE'
            });

            if (!res.ok) {
                throw new Error('Failed to remove book');
            }

            mutate();
        } catch (error) {
            console.error(error);
        }
    }

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <main>
            <AddBookForm {...{ mutate }} />
            <table className='stripped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((book) => (
                        <tr key={book._id} style={{ padding: '1rem' }}>
                            <td>{book._id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td style={{ display: 'flex', gap: '1rem' }}>
                                <a onClick={() => setBookToEdit(book)}>
                                    Edit
                                </a>
                                <a onClick={() => removeBook(book)}>
                                    Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {bookToEdit && <UpdateBookForm {...{ mutate, book: bookToEdit, setBook: setBookToEdit }} />}
        </main>
    );
}