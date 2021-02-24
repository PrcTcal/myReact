import React from 'react';
import queryString from 'query-string';

// 라우트 parameter
// location : 현재 경로에 대한 정보를 지닌다. URL 쿼리 형식 정보도 보유.
// match : 어떤 라우트에 매칭이 되었는지에 대한 정보와 params 정보를 보유.
const About = ({location, match}) => {
    const query = queryString.parse(location.search);
    const detail = query.detail === 'true';
    return (
        <div>
            <h2>About {match.params.name}</h2>
            {detail && 'detail: true'}
        </div>
    );
};

export default About;