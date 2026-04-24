import matplotlib.pyplot as plt
import json

with open('logs.json', 'r') as f:
    data = json.load(f)

recommendations = data["recommendations"]

games = [r["game"] for r in recommendations]
scores = [r["score"] for r in recommendations]

# =========================
# BAR CHART VISUALIZATION
# =========================

plt.figure(figsize=(10,5))
plt.bar(games, scores)
plt.title("Top Recommended Games (Content-Based TF-IDF)")
plt.xlabel("Games")
plt.ylabel("Similarity Score")
plt.xticks(rotation=30, ha="right")
plt.grid(axis="y", alpha=0.3)

plt.tight_layout()
plt.show()

# =========================
# PRINT TABLE (THESIS SUPPORT)
# =========================

print("\n=== TOP-N RECOMMENDATIONS ===")
for r in recommendations:
    print(f"{r['game']} → {r['score']:.4f}")