import { useState } from "react";

function CommentsPage() {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const fetchComments = async () => {
        const response = await fetch("/api/comments");
        const data = await response.json();
        setComments(data);
    }

    const submitComment = async () => {
        const response = await fetch("/api/comments", {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = response.json();
        console.log(data);
    }

    const deleteComment = async (commentId) => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        fetchComments();
    }

    return (
        <div>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} /><br />
            <button onClick={submitComment}>Create Comment</button><br/>
            <button onClick={fetchComments}>Load Comments</button>
            {
                comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            {comment.id} {comment.text}
                            <button onClick={() => deleteComment(comment.id)}>Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CommentsPage;