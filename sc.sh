#!/usr/bin/env bash
set -euo pipefail

# CONFIG
BRANCH="fix/remove-viem-html-ext"
COMMIT_MSG="chore(docs): remove .html extension from viem links"
EXCLUDE_DIRS=(.git node_modules dist build)
GREP_EXCLUDES=""
for d in "${EXCLUDE_DIRS[@]}"; do
  GREP_EXCLUDES+=" --exclude-dir=${d}"
done

# Make sure branch is checked out (you should have run the fetch/checkout step already)
# git fetch origin
# git checkout -b "${BRANCH}" origin/"${BRANCH}"

echo "Finding files with 'viem' and ending in '.html'..."
FILES=$(grep -RIn ${GREP_EXCLUDES} -E "viem[^[:space:]\)'\"]*\.html" --binary-files=without-match . | cut -d: -f1 | sort -u)

if [ -z "$FILES" ]; then
  echo "No matches found. Exiting."
  exit 0
fi

echo "Files to update:"
echo "$FILES"

# Create a temporary Python script to avoid heredoc quoting issues
PY=/tmp/remove_viem_html_$$.py
cat > "$PY" <<'PYCODE'
#!/usr/bin/env python3
import re,sys,io
pattern = re.compile(r"""(?P<prefix>(?:https?://|/)?[^\)\s"'`]*?viem[^\)\s"'`]*?)\.html\b""", re.IGNORECASE)
updated = []
for fn in sys.argv[1:]:
    try:
        with open(fn, 'r', encoding='utf-8') as f:
            s = f.read()
    except Exception as e:
        print(f"Skipping {fn}: {e}", file=sys.stderr)
        continue
    ns = pattern.sub(r'\g<prefix>', s)
    if ns != s:
        with open(fn, 'w', encoding='utf-8') as f:
            f.write(ns)
        updated.append(fn)
for u in updated:
    print("UPDATED:", u)
PYCODE
chmod +x "$PY"

# Load file list into array safely (handles newlines in filenames)
mapfile -t FILE_ARR <<<"$FILES"

# Run the Python script on all files
python3 "$PY" "${FILE_ARR[@]}"

# cleanup
rm -f "$PY"

echo "Staging changes..."
git add -A

if git diff --staged --quiet; then
  echo "No staged changes to commit."
else
  git commit -m "$COMMIT_MSG"
  git push -u origin "${BRANCH}"
  echo "Pushed changes to origin/${BRANCH}."
fi