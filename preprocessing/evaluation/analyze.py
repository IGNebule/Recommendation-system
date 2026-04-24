import pandas as pd
import matplotlib.pyplot as plt
import json

# =========================
# LOAD JSON PROPERLY
# =========================

with open("logs.json", "r") as f:
    data = json.load(f)

# 🔥 extract only recommendations
recs = data["recommendations"]

df = pd.DataFrame(recs)

# =========================
# BASIC STATISTICS
# =========================

print("\n=== SCORE STATISTICS ===")
print(df["score"].describe())

print("\nMean Score:", df["score"].mean())
print("Max Score:", df["score"].max())
print("Min Score:", df["score"].min())

# =========================
# SCORE DISTRIBUTION PLOT
# =========================

plt.figure(figsize=(8,5))
plt.hist(df["score"], bins=10, edgecolor="black")
plt.title("Distribution of Recommendation Scores")
plt.xlabel("Similarity Score")
plt.ylabel("Frequency")
plt.grid(True, alpha=0.3)

plt.show()

# =========================
# TOP SCORE INSIGHT
# =========================

top = df.sort_values("score", ascending=False).head(10)

print("\n=== TOP SCORED ENTRIES ===")
print(top)