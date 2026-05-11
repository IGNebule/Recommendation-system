const PreferenceList = ({ preferences, onDelete }) => {
  return (
    <section>
      <h2>Your Preferences</h2>

      {preferences.length === 0 ? (
        <p>No preferences yet.</p>
      ) : (
        preferences.map((g, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              marginRight: "10px",
              marginBottom: "10px",
              padding: "5px 10px",
              background: "#ddd",
              borderRadius: "5px",
            }}
          >
            <span>{g}</span>

            <button
              onClick={() => onDelete(g)}
              style={{
                border: "none",
                background: "red",
                color: "white",
                cursor: "pointer",
                borderRadius: "3px",
                padding: "2px 6px",
              }}
            >
              X
            </button>
          </div>
        ))
      )}
    </section>
  );
};

export default PreferenceList;