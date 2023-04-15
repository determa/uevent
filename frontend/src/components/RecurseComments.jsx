import React, { useState } from "react";
import CreateComment from "./CreateComment";
import CommentComponent from "./CommentComponent";

const RecurseComments = ({ eventId, comments }) => {
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [showNewCommentForm, setShowNewCommentForm] = useState(false);
    const handleReplyClick = (commentId) => {
        setReplyToCommentId(commentId);
        setShowNewCommentForm(true);
    };

    const handleCloseForm = () => {
        console.log("close");
        setReplyToCommentId(null);
        setShowNewCommentForm(false);
    };

    return (
        <RecurseCommentsComponent
            eventId={eventId}
            comments={comments}
            handleCloseForm={handleCloseForm}
            handleReplyClick={handleReplyClick}
            showNewCommentForm={showNewCommentForm}
            replyToCommentId={replyToCommentId}
        />
    );
};

const RecurseCommentsComponent = ({
    eventId,
    comments,
    handleReplyClick,
    showNewCommentForm,
    replyToCommentId,
    handleCloseForm,
}) => {
    return (
        <>
            {comments.map((data) => (
                <div className="flex flex-col gap-2" key={data.id}>
                    <CommentComponent
                        data={data}
                        onReplyClick={handleReplyClick}
                    />
                    {replyToCommentId === data.id && showNewCommentForm && (
                        <CreateComment
                            eventId={eventId}
                            parentId={data.id}
                            onClose={handleCloseForm}
                        />
                    )}
                    {data.children && (
                        <div className="ml-12 flex flex-col gap-2">
                            <RecurseCommentsComponent
                                eventId={eventId}
                                comments={data.children}
                                handleCloseForm={handleCloseForm}
                                handleReplyClick={handleReplyClick}
                                showNewCommentForm={showNewCommentForm}
                                replyToCommentId={replyToCommentId}
                            />
                        </div>
                    )}
                </div>
            ))}
            {replyToCommentId === null && showNewCommentForm && (
                <CreateComment
                    eventId={eventId}
                    parentId={null}
                    onClose={handleCloseForm}
                />
            )}
        </>
    );
};

export default RecurseComments;