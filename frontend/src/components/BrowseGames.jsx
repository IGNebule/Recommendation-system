import GameCard from "./GameCard";

const BrowseGames = ({ games, onSave }) => {
  return (
    <section style={{ marginTop: "40px" }}>
      <h2>Browse Games</h2>

      {games.map((g, i) => (
        <GameCard key={i} game={g.name} onSave={() => onSave(g.name)} />
      ))}
    </section>
  );
};

export default BrowseGames;
