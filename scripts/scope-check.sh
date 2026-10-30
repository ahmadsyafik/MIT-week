#!/usr/bin/env bash
# scope-check.sh: memastikan sebuah branch peran HANYA mengubah folder miliknya.
#
# Pemakaian:
#   bash scripts/scope-check.sh <nama-branch> [base-ref] [head-ref]
# Contoh:
#   bash scripts/scope-check.sh backend origin/development HEAD
#
# Exit 0 = lolos, exit 1 = ada file di luar wewenang.
set -euo pipefail

ROLE="${1:?Isi nama branch. Contoh: backend}"
BASE="${2:-origin/development}"
HEAD_REF="${3:-HEAD}"

case "$ROLE" in
  backend|backend/*)
    ALLOWED=("packages/core/" "docs/backend/" "package-lock.json")
    OWNER="Backend" ;;
  frontend|frontend/*)
    ALLOWED=("apps/web/" "docs/frontend/" "package-lock.json")
    OWNER="Frontend" ;;
  development|main|infra/*|release/*|hotfix/*)
    echo "Branch '$ROLE' tidak dibatasi scope-guard. Lewati."
    exit 0 ;;
  *)
    echo "Nama branch '$ROLE' tidak dikenali."
    echo "Gunakan: backend, frontend (atau backend/<topik>, frontend/<topik>)."
    exit 1 ;;
esac

# Tiga titik: hanya perubahan di branch ini sejak berpisah dari base.
CHANGED="$(git diff --name-only "$BASE...$HEAD_REF")"

if [ -z "$CHANGED" ]; then
  echo "Tidak ada perubahan file. Lolos."
  exit 0
fi

VIOLATIONS=()
while IFS= read -r f; do
  ok=0
  for prefix in "${ALLOWED[@]}"; do
    if [[ "$f" == "$prefix"* ]]; then ok=1; break; fi
  done
  if [ "$ok" -eq 0 ]; then VIOLATIONS+=("$f"); fi
done <<< "$CHANGED"

if [ "${#VIOLATIONS[@]}" -eq 0 ]; then
  echo "OK: semua perubahan ($(echo "$CHANGED" | wc -l | tr -d ' ') file) berada di wewenang $OWNER."
  exit 0
fi

echo "GAGAL: branch '$ROLE' ($OWNER) mengubah file di luar wewenangnya:"
for v in "${VIOLATIONS[@]}"; do echo "  - $v"; done
echo
echo "Wewenang $OWNER: ${ALLOWED[*]}"
echo
echo "Cara memperbaiki (kembalikan file ke versi development):"
for v in "${VIOLATIONS[@]}"; do echo "  git checkout $BASE -- \"$v\""; done
echo "Lalu: git commit -m \"chore: kembalikan file di luar wewenang\""
echo "Perlu mengubah file itu? Minta pemilik foldernya atau ajukan RFC (docs/universal/BOUNDARIES_AND_CONTRACTS.md)."
exit 1
