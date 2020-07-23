import React from 'react';

export default function Spinner({ children }) {
  return (
    <div style={styles.flexRow}>
      <div className='preloader-wrapper small active'>
        <div className='spinner-layer spinner-blue-only'>
          <div className='circle-clipper left'>
            <div className='circle'></div>
          </div>
          <div className='gap-patch'>
            <div className='circle'></div>
          </div>
          <div className='circle-clipper right'>
            <div className='circle'></div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '10px' }}>
        {children ? (
          children
        ) : (
          <span style={{ fontWeight: 'bold' }}>Aguarde...</span>
        )}
      </div>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
