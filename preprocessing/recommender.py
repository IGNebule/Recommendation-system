import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('../data/processed/games_content.csv')

tfidf = TfidfVectorizer(
    stop_words='english',
    max_features=5000
)

tfidf_matrix = tfidf.fit_transform(df['content'])

print("TF-IDF Shape:", tfidf_matrix.shape)

indices = pd.Series(df.index, index=df['name'].str.lower()).drop_duplicates()

def recommend(game_name, top_n=5):
    game_name = game_name.lower()

    if game_name not in indices:
        return "Game not found"

    idx = indices[game_name]

    # 🔥 compute ONLY for 1 game
    sim_scores = cosine_similarity(
        tfidf_matrix[idx],
        tfidf_matrix
    ).flatten()

    # sort scores
    sim_indices = sim_scores.argsort()[::-1][1:top_n+1]

    return df[['name']].iloc[sim_indices]

print("\n=== RECOMMENDATION ===")
print(recommend("Counter-Strike", 5))