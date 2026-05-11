export default function GameCard({ game, score, onSave }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "10px",
      }}
    >
      <h3>{game}</h3>

      {score && <p>Similarity Score: {score.toFixed(4)}</p>}

      <button onClick={onSave}>Save Preference</button>
    </div>
  );
}
