const Header = ({ onLogout }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>🎮 Game Recommendation System</h1>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Header;
