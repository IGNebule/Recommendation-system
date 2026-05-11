import GameCard from "./GameCard";

const RecommendationList = ({ recs, onSave }) => {
  return (
    <section style={{ marginTop: "30px" }}>
      <h2>Recommended Games</h2>

      {recs.length === 0 ? (
        <p>No recommendations yet.</p>
      ) : (
        recs.map((r, i) => (
          <GameCard
            key={i}
            game={r.game}
            score={r.score}
            onSave={() => onSave(r.game)}
          />
        ))
      )}
    </section>
  );
};

export default RecommendationList;
