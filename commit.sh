#!/bin/bash

if [ -z "$1" ]; then
  echo "❌ אנא הזן הודעת קומיט. שימוש: ./commit.sh \"הודעה\""
  exit 1
fi

echo "📦 מוסיף שינויים..."
git add .

echo "📝 מבצע קומיט עם ההודעה: $1"
git commit -m "$1"

echo "🚀 דוחף לענף main..."
git push origin main

echo "✅ סיימתי בהצלחה!"
