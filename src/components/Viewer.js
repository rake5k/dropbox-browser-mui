import React from 'react';

function Viewer(props) {
    const src = `https://docs.google.com/gview?url=${props.file}&embedded=true`;
    const style = { height: 683, width: 490 };

    return <iframe src={src} style={style} frameborder="0" title="gview"></iframe>;
}

export default Viewer;
