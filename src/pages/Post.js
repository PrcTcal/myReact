import React from 'react';

const Post = ({location, match}) => {
    return(
        <div>
            포스트 {match.params.id}
            <div>
                <h1>Post</h1>
                lication.pathname : {location.pathname}<br/>
                match.path: {match.path}<br/>
                match.url: {match.url}<br/>
            </div>
        </div>
    );
};

export default Post;