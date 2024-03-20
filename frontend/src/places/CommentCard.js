import { useContext }from "react-router"



function CommentCard({ comment, onDelete,CurrentUser}) {
    const { currentUser } = useContext(CurrentUser)

    let deleteButton = null;

    if (currentUser?.userId){
        deleteButton = (
            <button  className="btn btn-danger"onClick={onDelete}>
                Delete Comment
            </button>
        )
    }
    return (
        <div className="border col-sm-4">
            <h2 className="rant">{comment.rant ? 'Rant! 😡' : 'Rave! 😻'}</h2>
            <h4>{comment.content}</h4>
            <h3>
                <strong>- {comment.author.firstName} {comment.author.lastName}</strong>
            </h3>
            <h4>Rating: {comment.stars}</h4>
      {deleteButton}
        </div>
    )
}

export default CommentCard;