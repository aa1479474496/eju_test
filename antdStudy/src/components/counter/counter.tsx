import * as React from 'react';

type Props = {
  label: string;
  count: number;
  onIncrement: () => void;
}

export const FCCounter: React.FC<Props> = props => {
  const { label, count, onIncrement } = props;
  const handleIncrement = () => {
    onIncrement();
  };

  return (
    <div>
      {label}: {count}
      <div>
        <button onClick={handleIncrement}>increment</button>
      </div>
    </div>
  )
}