# /preprocessing/recommender.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('../data/processed/games_content.csv')

tfidf = TfidfVectorizer(
    stop_words='english',
    max_features=5000,
    ngram_range=(1,2)
)

tfidf_matrix = tfidf.fit_transform(df['content'])

print("TF-IDF Shape:", tfidf_matrix.shape)

def clean_text(text):
    return re.sub(r'[^a-z0-9]', ' ', text.lower()).strip()

indices = pd.Series(df.index, index=df['name'].apply(clean_text)).drop_duplicates()

def recommend(game_name, top_n=5):
    game_name = clean_text(game_name)

    if game_name not in indices:
        return []

    idx = indices[game_name]

    # 🔥 compute ONLY for 1 game
    sim_scores = cosine_similarity(
        tfidf_matrix[idx],
        tfidf_matrix
    ).flatten()

    # sort scores
    sim_indices = sim_scores.argsort()[::-1][1:top_n+1]

    results = []

    for i in sim_indices:
        results.append({
            "game": df['name'].iloc[i],
            "score": float(sim_scores[i])
        })

    return results

print("\n=== RECOMMENDATION ===")
print(recommend("Counter-Strike", 5))