import { useState } from "react";

function Reviews() {
  // Simulating reviews data
  const reviews = [
    { id: 1, author: 'Sarah K.', rating: 5, text: 'Absolutely love this! Great quality.' },
    { id: 2, author: 'Mike T.', rating: 4, text: 'Good product, fast shipping.' },
    { id: 3, author: 'Amy L.', rating: 5, text: 'Exceeded my expectations!' },
  ];
  const [shouldCrash, setShouldCrash] = useState(false)
if (shouldCrash) throw new Error('I Crashed ')
  return (
    <div>
      <h4>Customer Reviews ({reviews.length})</h4>
      <button className='mt-2 px-4 py-2 bg-red-500 text-white rounded cursor-pointer' onClick={()=> setShouldCrash(!shouldCrash)}>Break/Crash Review</button>
      {reviews.map(review => (
        <div key={review.id} style={{
          padding: '16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{review.author}</strong>
            <span>{'⭐'.repeat(review.rating)}</span>
          </div>
          <p style={{ margin: '8px 0 0', color: '#4b5563' }}>{review.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;