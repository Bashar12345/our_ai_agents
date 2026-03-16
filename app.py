import os
import re

from flask import Flask, Response, abort, jsonify, render_template

from repositories import REPOSITORIES


app = Flask(__name__)


CATEGORY_RULES = [
    ("architect", "Architecture"),
    ("rag", "RAG"),
    ("mcp", "Multi-Agent"),
    ("data", "Analytics"),
    ("consult", "Strategy"),
    ("diligence", "Finance"),
    ("finance", "Finance"),
    ("launch", "Marketing"),
    ("sales", "Sales"),
    ("competitor", "Strategy"),
    ("recruit", "HR"),
    ("gmail", "Productivity"),
    ("github", "Developer Tools"),
    ("travel", "Lifestyle"),
]


CATEGORY_GRADIENTS = {
    "Architecture": "from-violet-600 to-purple-600",
    "RAG": "from-emerald-500 to-teal-600",
    "Multi-Agent": "from-orange-500 to-red-600",
    "Analytics": "from-cyan-500 to-blue-600",
    "Strategy": "from-pink-500 to-rose-600",
    "Finance": "from-amber-500 to-yellow-600",
    "Marketing": "from-indigo-500 to-purple-600",
    "Sales": "from-red-500 to-orange-600",
    "HR": "from-teal-500 to-cyan-600",
    "Productivity": "from-blue-500 to-indigo-600",
    "Developer Tools": "from-gray-600 to-slate-700",
    "Lifestyle": "from-sky-500 to-blue-600",
}


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "demo"


def infer_category(name: str) -> str:
    lowered = name.lower()
    for key, category in CATEGORY_RULES:
        if key in lowered:
            return category
    return "General"


def normalize_tech(tech_string: str) -> list[str]:
    return [item.strip() for item in tech_string.split(",") if item.strip()]


def build_agents() -> list[dict]:
    seen_slugs = set()
    agents = []

    for index, repo in enumerate(REPOSITORIES, start=1):
        category = infer_category(repo["name"])
        base_slug = slugify(repo["name"])
        slug = base_slug
        counter = 2

        while slug in seen_slugs:
            slug = f"{base_slug}-{counter}"
            counter += 1

        seen_slugs.add(slug)

        agent = {
            **repo,
            "id": index,
            "slug": slug,
            "category": category,
            "tech_list": normalize_tech(repo["tech"]),
            "gradient": CATEGORY_GRADIENTS.get(category, "from-slate-600 to-slate-700"),
        }
        agents.append(agent)

    return agents


AGENTS = build_agents()
CATEGORIES = list(dict.fromkeys(agent["category"] for agent in AGENTS))
AGENT_BY_SLUG = {agent["slug"]: agent for agent in AGENTS}
AGENT_INDEX_BY_SLUG = {agent["slug"]: i for i, agent in enumerate(AGENTS)}


@app.get("/")
def index():
    return render_template(
        "index.html",
        agents=AGENTS,
        categories=CATEGORIES,
    )


@app.get("/demos/<slug>")
def demo_detail(slug: str):
    agent = AGENT_BY_SLUG.get(slug)
    if agent is None:
        abort(404)

    index = AGENT_INDEX_BY_SLUG[slug]
    prev_agent = AGENTS[index - 1] if index > 0 else None
    next_agent = AGENTS[index + 1] if index < len(AGENTS) - 1 else None

    return render_template(
        "demo_detail.html",
        agent=agent,
        prev_agent=prev_agent,
        next_agent=next_agent,
        total_agents=len(AGENTS),
    )


@app.get("/health")
def healthcheck():
    return jsonify({"status": "ok"})


@app.after_request
def add_no_cache_headers(response: Response) -> Response:
    # Keep browser views in sync with frequent template edits.
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8001"))
    app.run(host="0.0.0.0", port=port, debug=False)