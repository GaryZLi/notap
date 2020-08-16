import React from 'react';

const styles = {
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#202020',
    },
};

const Container = ({ children }) => {
    return (
        <div style={styles.root}>
            {children}
        </div>
    )
};

export default Container;
