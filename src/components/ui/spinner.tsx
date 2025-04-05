import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4"
        style={{
          borderTopColor: '#00FFFF',
          borderBottomColor: '#00FFFF',
        }}
      ></div>
    </div>
  );
};

export default Spinner;