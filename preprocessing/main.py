# /preprocessing/main.py
import pandas as pd
import re

games = pd.read_csv('../data/raw/steam.csv')
desc = pd.read_csv('../data/raw/steam_description_data.csv')
tags = pd.read_csv('../data/raw/steamspy_tag_data.csv')

games = games[['appid', 'name']]
desc = desc[['steam_appid', 'short_description']]

df = games.merge(desc, left_on='appid', right_on='steam_appid')
df = df.merge(tags, on='appid')
df = df.copy()

tag_columns = tags.columns[1:]

tags_text_df = df[tag_columns].apply(
    lambda x: x.index[x > 0].tolist(),
    axis=1
)

df['tags_text'] = tags_text_df.apply(lambda x: " ".join(x))

df['content'] = (
    df['name'] + " " +
    df['tags_text'] + " " + df['tags_text'] + " " +
    df['short_description']
)

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

df['content'] = df['content'].apply(clean_text)
df = df[['appid', 'name', 'content']]
df.to_csv('../data/processed/games_content.csv', index=False)

print("\n=== SAMPLE CONTENT ===")
print(df[['name', 'content']].head(3))

print("\n=== FULL DATA ===")
print(df.head())

print("\nShape:", df.shape)