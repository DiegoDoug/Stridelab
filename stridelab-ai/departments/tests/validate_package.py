#!/usr/bin/env python3
"""Validate StrideLab Department skill structure and static invariants."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

EXPECTED = json.loads(r'''[
  {
    "slug": "01-product-experience",
    "skills": [
      "product-strategy",
      "domain-modeling",
      "workflow-architecture",
      "information-architecture",
      "user-research-usability",
      "interaction-design",
      "visual-ui-design",
      "accessibility-design"
    ]
  },
  {
    "slug": "02-client-feature-engineering",
    "skills": [
      "ios-ipados-engineering",
      "web-engineering",
      "media-engineering",
      "video-analysis-engineering",
      "training-planning-engineering",
      "workout-performance-engineering"
    ]
  },
  {
    "slug": "03-platform-data-engineering",
    "skills": [
      "backend-api-engineering",
      "database-engineering",
      "offline-local-first-engineering",
      "realtime-messaging-notifications",
      "search-retrieval-engineering",
      "reporting-analytics-engineering"
    ]
  },
  {
    "slug": "04-security-identity-compliance",
    "skills": [
      "authorization-tenancy",
      "identity-account-lifecycle",
      "security-engineering",
      "privacy-data-governance",
      "youth-safeguarding-trust-safety",
      "legal-regulatory-compliance",
      "app-store-platform-compliance"
    ]
  },
  {
    "slug": "05-quality-infrastructure-release",
    "skills": [
      "quality-engineering",
      "performance-engineering",
      "infrastructure-devops",
      "reliability-disaster-recovery",
      "observability-incident-response",
      "release-engineering"
    ]
  },
  {
    "slug": "06-business-operations-governance",
    "skills": [
      "billing-entitlements",
      "cost-engineering",
      "internal-admin-support",
      "documentation-knowledge-management",
      "ai-engineering-governance"
    ]
  }
]''')
REQUIRED_HEADINGS = [
    "## Purpose and boundary",
    "## Inputs and authoritative evidence",
    "## Operating procedure",
    "## Decision rules and StrideLab invariants",
    "## Output contract",
    "## Validate and review",
    "## Handoffs and dependencies",
    "## Escalation conditions",
    "## Failure modes and anti-patterns",
]
SIMULATION_CATEGORIES = {
    "correct_activation",
    "incorrect_activation_non_trigger",
    "input_sufficiency",
    "workflow_adherence",
    "artifact_contract",
    "evidence_behavior",
    "boundary_enforcement",
    "handoff_behavior",
    "failure_escalation",
}
AVAILABLE_COMPLEMENTS = {
    "backend-data-engineering", "client-engineering", "deep-research-work:deep-research",
    "evidence-based-ui-ux", "notion:notion-knowledge-capture",
    "notion:notion-research-documentation", "notion:notion-spec-to-implementation",
    "platform-release", "production-operations", "security-identity", "software-architecture",
    "vercel:agent-browser-verify", "vercel:deployments-cicd", "vercel:env-vars",
    "vercel:geistdocs", "vercel:investigation-mode", "vercel:marketplace", "vercel:nextjs",
    "vercel:observability", "vercel:payments", "vercel:react-best-practices", "vercel:shadcn",
    "vercel:turborepo", "vercel:vercel-api", "vercel:vercel-cli", "vercel:vercel-firewall",
    "vercel:vercel-flags", "vercel:vercel-functions", "vercel:vercel-queues",
    "vercel:vercel-services", "vercel:vercel-storage", "vercel:verification", "vercel:workflow",
}
FORBIDDEN_PLACEHOLDERS = ["TODO", "TBD", "FIXME", "YOUR_SKILL", "placeholder"]


def parse_frontmatter(text: str, file: Path) -> dict[str, str]:
    if not text.startswith("---\n"):
        raise ValueError(f"{file}: missing opening frontmatter")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise ValueError(f"{file}: missing closing frontmatter")
    values: dict[str, str] = {}
    for line in text[4:end].splitlines():
        if ":" not in line:
            raise ValueError(f"{file}: invalid frontmatter line {line!r}")
        key, value = line.split(":", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def manifest_core_dependencies(text: str) -> list[str]:
    match = re.search(r"^core_dependencies:\n(?P<body>.*?)(?=^\S|\Z)", text, re.M | re.S)
    if not match:
        return []
    return re.findall(r'^\s*-\s+"?([^"\n]+)"?$', match.group("body"), re.M)


def manifest_optional_dependencies(text: str) -> list[str]:
    match = re.search(
        r"^complementary_skills:\n\s+required:\s*\[\]\n\s+optional:\n(?P<body>.*?)(?=^\S|\Z)",
        text,
        re.M | re.S,
    )
    if not match:
        return []
    return re.findall(r'^\s*-\s+"?([^"\n]+)"?$', match.group("body"), re.M)


def validate(department_filter: str | None = None) -> list[str]:
    root = Path(__file__).resolve().parents[1]
    failures: list[str] = []
    expected_names = {skill for department in EXPECTED for skill in department["skills"]}
    descriptions: dict[str, str] = {}
    core_graph: dict[str, list[str]] = {}
    checked = 0

    for department in EXPECTED:
        if department_filter and department["slug"][:2] != department_filter:
            continue
        core = root / department["slug"] / "skills" / "core"
        if not core.is_dir():
            failures.append(f"missing core directory: {core.relative_to(root)}")
            continue
        actual = sorted(p.name for p in core.iterdir() if p.is_dir())
        if actual != sorted(department["skills"]):
            failures.append(f"{department['slug']}: expected {sorted(department['skills'])}, found {actual}")
        for name in department["skills"]:
            checked += 1
            skill_root = core / name
            skill_file = skill_root / "SKILL.md"
            manifest_file = skill_root / "dependency-manifest.yaml"
            simulation_file = skill_root / "tests" / "simulations.yaml"
            for file in [skill_file, manifest_file, simulation_file]:
                if not file.is_file():
                    failures.append(f"missing file: {file.relative_to(root)}")
            if not skill_file.is_file():
                continue
            text = skill_file.read_text(encoding="utf-8")
            try:
                metadata = parse_frontmatter(text, skill_file)
            except ValueError as exc:
                failures.append(str(exc))
                continue
            if metadata.get("name") != name:
                failures.append(f"{skill_file.relative_to(root)}: name must match folder")
            description = metadata.get("description", "")
            if len(description) < 90 or len(description) > 420:
                failures.append(f"{skill_file.relative_to(root)}: description must be discriminating (90..420 chars)")
            if description in descriptions:
                failures.append(f"duplicate descriptions: {name} and {descriptions[description]}")
            descriptions[description] = name
            if not re.fullmatch(r"[a-z0-9-]{1,64}", name):
                failures.append(f"invalid portable skill name: {name}")
            for heading in REQUIRED_HEADINGS:
                if heading not in text:
                    failures.append(f"{skill_file.relative_to(root)}: missing heading {heading}")
            if len(text.split()) < 650:
                failures.append(f"{skill_file.relative_to(root)}: instructions are too thin for production use")
            for placeholder in FORBIDDEN_PLACEHOLDERS:
                if re.search(rf"\b{re.escape(placeholder)}\b", text, re.I):
                    failures.append(f"{skill_file.relative_to(root)}: unfinished placeholder {placeholder}")
            if "current official" not in text.lower() and "current statutory" not in text.lower():
                failures.append(f"{skill_file.relative_to(root)}: missing volatile-source rule")

            if manifest_file.is_file():
                manifest = manifest_file.read_text(encoding="utf-8")
                for field in ["skill:", "department:", "domain:", "core_dependencies:", "complementary_skills:", "consumes_artifacts:", "produces_artifacts:", "upstream_departments:", "downstream_departments:"]:
                    if field not in manifest:
                        failures.append(f"{manifest_file.relative_to(root)}: missing {field}")
                if not manifest.startswith(f"skill: {name}\n"):
                    failures.append(f"{manifest_file.relative_to(root)}: skill identity mismatch")
                dependencies = manifest_core_dependencies(manifest)
                core_graph[name] = dependencies
                for dependency in dependencies:
                    if dependency == name:
                        failures.append(f"{manifest_file.relative_to(root)}: self core dependency")
                    if dependency not in expected_names:
                        failures.append(f"{manifest_file.relative_to(root)}: unknown core dependency {dependency}")
                optional_dependencies = manifest_optional_dependencies(manifest)
                for dependency in optional_dependencies:
                    if dependency == name or dependency in dependencies:
                        failures.append(f"{manifest_file.relative_to(root)}: duplicate/self optional dependency {dependency}")
                    if dependency not in AVAILABLE_COMPLEMENTS:
                        failures.append(f"{manifest_file.relative_to(root)}: unobserved optional dependency {dependency}")

            if simulation_file.is_file():
                simulations = simulation_file.read_text(encoding="utf-8")
                categories = set(re.findall(r"^\s*- category:\s+([a-z0-9_-]+)\s*$", simulations, re.M))
                if categories != SIMULATION_CATEGORIES:
                    failures.append(f"{simulation_file.relative_to(root)}: simulation categories differ: {sorted(categories)}")
                if simulations.count("expected_activation:") != 9:
                    failures.append(f"{simulation_file.relative_to(root)}: expected nine activation assessments")
                if "simulation_status: PASS" not in simulations or "correction_applied:" not in simulations:
                    failures.append(f"{simulation_file.relative_to(root)}: missing simulation status/correction")

    if not department_filter:
        actual_skills = {
            p.parent.name for p in root.glob("*-*/skills/core/*/SKILL.md")
        }
        if actual_skills != expected_names:
            failures.append(f"package skill set differs: expected {sorted(expected_names)}, found {sorted(actual_skills)}")
        if checked != 38:
            failures.append(f"validator expected to check 38 skills, checked {checked}")
        visiting: set[str] = set()
        visited: set[str] = set()

        def visit(node: str, trail: list[str]) -> None:
            if node in visiting:
                failures.append(f"core dependency cycle: {' -> '.join(trail + [node])}")
                return
            if node in visited:
                return
            visiting.add(node)
            for dependency in core_graph.get(node, []):
                visit(dependency, trail + [node])
            visiting.remove(node)
            visited.add(node)

        for skill_name in sorted(expected_names):
            visit(skill_name, [])
        for file in [
            "PACKAGE-MANIFEST.yaml",
            "DEPENDENCY-REUSE-MATRIX.md",
            "CROSS-SKILL-BOUNDARIES.md",
            "MISSING-OPTIONAL-DEPENDENCIES.md",
            "AUTHORITATIVE-SOURCE-REGISTER.md",
            "VALIDATION-REPORT.md",
            "tests/package-simulations.md",
        ]:
            if not (root / file).is_file():
                failures.append(f"missing package-level file: {file}")
    return failures


if __name__ == "__main__":
    department_filter = None
    if len(sys.argv) == 3 and sys.argv[1] == "--department":
        department_filter = sys.argv[2].zfill(2)
    errors = validate(department_filter)
    if errors:
        print("FAIL")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)
    label = f"Department {department_filter}" if department_filter else "38-skill package"
    print(f"PASS: {label} structure, manifests, instruction contracts, and simulations validated")
