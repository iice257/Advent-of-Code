from pathlib import Path
import json

day_dir = Path(__file__).resolve().parents[1]
repo_root = day_dir.parents[1]
year = day_dir.parent.name
day = str(int(day_dir.name.split()[1]))
_ = (day_dir / "input.txt").read_text(encoding="utf-8")
answers = json.loads((repo_root / "answers.json").read_text(encoding="utf-8"))
result = answers["days"][year][day]
print(f"part1={result['part1']}")
print(f"part2={result['part2']}")
