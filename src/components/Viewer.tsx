import React from 'react';

interface ViewerProps {
    file: string;
}

export default function Viewer(props: ViewerProps) {
    const src = `https://docs.google.com/gview?url=${props.file}&embedded=true`;
    const style = { border: 0, height: '100%', width: '100%' };

    return <iframe src={src} style={style} title="gview" />;
}
