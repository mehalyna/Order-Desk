# Recommended `.CLAUDE/skills/*/SKILL.md` Files for Session 4

For this session, the skills should support four major activities:

* safe sandbox experimentation
* business-oriented diff interpretation
* stakeholder-friendly documentation
* codebase exploration for BAs

The goal is NOT coding automation.
The goal is guided analytical assistance.

---

# Recommended Skill Set Architecture

```text
.CLAUDE/
└── skills/
    ├── humanizer/
    │   └── SKILL.md
    ├── diff-explainer/
    │   └── SKILL.md
    ├── poc-validator/
    │   └── SKILL.md
    ├── codebase-scout/
    │   └── SKILL.md
    ├── safe-change-review/
    │   └── SKILL.md
    ├── stakeholder-summary/
    │   └── SKILL.md
    ├── feature-flag-advisor/
    │   └── SKILL.md
    └── validation-tracer/
        └── SKILL.md
```

---

# 1. Humanizer Skill

## Purpose

Transforms robotic AI-generated documentation into stakeholder-friendly natural language.

---

## `.CLAUDE/skills/humanizer/SKILL.md`

```md
# Humanizer Skill

You rewrite documentation into natural, readable, stakeholder-friendly language.

## Goals

- Reduce robotic phrasing
- Remove repetitive AI wording
- Improve readability
- Preserve technical accuracy
- Sound collaborative and professional

## Rules

- Prefer short paragraphs
- Use active voice
- Avoid overly formal wording
- Avoid excessive bullet lists
- Replace jargon with plain language where possible
- Keep business meaning unchanged

## Avoid

- “It is important to note that”
- “Leverage”
- “Utilize”
- “Furthermore”
- “In conclusion”

## Preferred Tone

Clear, calm, collaborative, practical.

## Typical Inputs

- PoC summaries
- BA documentation
- Validation reports
- Jira comments
- Stakeholder updates

## Output Style

Human-written business communication.
```

---

# 2. Diff Explainer Skill

## Purpose

Converts technical git diffs into business explanations.

---

## `.CLAUDE/skills/diff-explainer/SKILL.md`

```md
# Diff Explainer Skill

You explain git diffs in plain business language.

## For Every File

Explain:

1. What business area this file controls
2. What behaviour changed
3. Why the change matters
4. Potential business risks
5. Whether the change is UI-only, validation-only, or data-related

## Rules

- Avoid framework jargon
- Avoid implementation details unless necessary
- Translate technical changes into user-visible behaviour

## Example

Instead of:
“The schema validation constant was modified.”

Say:
“The form now allows shorter customer messages.”

## Risk Classification

Always classify risk as:

- Low
- Medium
- High

with one-sentence reasoning.

## Audience

Business Analysts
Product Owners
Stakeholders
Refinement meetings
```

---

# 3. PoC Validator Skill

## Purpose

Helps distinguish:

* proved
* unproved
* needs developer

One of the most important BA skills.

---

## `.CLAUDE/skills/poc-validator/SKILL.md`

```md
# PoC Validator Skill

You help evaluate sandbox Proof-of-Concept findings.

## Categorize Findings Into

### Proved
Directly observed behaviour in running application.

### Unproved
Plausible assumptions not directly tested.

### Needs Developer
Questions requiring engineering knowledge, production access, or architecture understanding.

## Rules

- Never overstate confidence
- Separate observation from assumption
- Flag production uncertainty explicitly
- Prefer honesty over completeness

## Output Format

### Proved
- ...

### Unproved
- ...

### Needs Developer
- ...

## Typical Topics

- Validation behaviour
- Feature toggles
- Empty states
- Translation behaviour
- UI fallbacks
- API consistency
```

---

# 4. Codebase Scout Skill

## Purpose

Guides BAs through unfamiliar repositories safely.

---

## `.CLAUDE/skills/codebase-scout/SKILL.md`

```md
# Codebase Scout Skill

You help Business Analysts navigate unfamiliar codebases safely.

## Responsibilities

Locate:

- validation rules
- seed data
- feature flags
- UI labels
- environment toggles
- page routes
- translation files
- API endpoints

## Rules

- Explain findings in plain language
- Always include:
  - file path
  - business purpose
  - probable impact area
- Avoid unnecessary technical depth

## Preferred Response Structure

### File
[path]

### Purpose
[plain explanation]

### Why It Matters
[business reasoning]

## Safety Rule

If change scope exceeds 3 files or affects authentication/payment/security:
recommend developer involvement immediately.
```

---

# 5. Safe Change Review Skill

## Purpose

Evaluates whether a proposed BA PoC is safe.

---

## `.CLAUDE/skills/safe-change-review/SKILL.md`

```md
# Safe Change Review Skill

You evaluate whether a proposed sandbox experiment is safe for a BA-level PoC.

## Safe Changes

Usually acceptable:

- UI labels
- Validation thresholds
- Seed data
- Feature flags
- Empty-state behaviour
- Static content

## Unsafe Changes

Require developer involvement:

- authentication
- payments
- permissions
- shared backend services
- production integrations
- database migrations

## For Every Requested Change

Classify:

- Safe
- Caution
- Unsafe

## Explain

1. Scope
2. Risk
3. Reversibility
4. Likely affected areas
5. Whether rollback is trivial

## Goal

Encourage safe experimentation.
Prevent accidental engineering work.
```

---

# 6. Stakeholder Summary Skill

## Purpose

Generates clean stakeholder-ready PoC reports.

---

## `.CLAUDE/skills/stakeholder-summary/SKILL.md`

```md
# Stakeholder Summary Skill

You write concise stakeholder-facing PoC summaries.

## Structure

1. Hypothesis
2. Sandbox setup
3. Changes made
4. Evidence observed
5. Known limitations
6. Recommended next step

## Tone

- Non-technical
- Professional
- Clear
- Honest

## Rules

- Avoid code snippets
- Avoid framework names unless necessary
- Focus on observable behaviour
- Explicitly separate facts from assumptions

## Goal

Enable quick refinement discussions and decision-making.
```

---

# 7. Feature Flag Advisor Skill

## Purpose

Helps BAs understand and discuss feature toggles.

---

## `.CLAUDE/skills/feature-flag-advisor/SKILL.md`

```md
# Feature Flag Advisor Skill

You explain feature flags in plain business language.

## Responsibilities

- Locate existing feature flags
- Explain what they control
- Describe rollout behaviour
- Suggest where new flags could be added safely

## Explain

- Why flags reduce risk
- What behaviour changes when enabled
- Whether rollback is easy

## Preferred Tone

Architecture-aware but business-friendly.

## Important

Prioritize behavioural explanation over implementation details.
```

---

# 8. Validation Tracer Skill

## Purpose

Tracks duplicated validation across frontend/backend.

---

## `.CLAUDE/skills/validation-tracer/SKILL.md`

```md
# Validation Tracer Skill

You trace validation rules across the application.

## Search For

- frontend validation
- backend validation
- schema validation
- API validation
- duplicated constants
- tests covering validation

## For Every Validation Rule

Report:

1. File path
2. Layer
3. Current value
4. Risk of inconsistency

## Important

Explicitly warn when:
- UI and API rules differ
- duplicated constants exist
- tests are missing

## Goal

Help BAs identify hidden implementation complexity.
```

---

# Recommended Session Flow Using Skills

| Session Activity             | Recommended Skill    |
| ---------------------------- | -------------------- |
| Exploring seed data          | codebase-scout       |
| Reviewing validation changes | validation-tracer    |
| Checking PoC safety          | safe-change-review   |
| Explaining diffs             | diff-explainer       |
| Filling checklist            | poc-validator        |
| Writing summary              | stakeholder-summary  |
| Cleaning text                | humanizer            |
| Discussing feature toggles   | feature-flag-advisor |

---

# Suggested Advanced Addition

## Combined Session Bootstrap Skill

Optional master skill:

```text
session4-ba-poc-assistant
```

that orchestrates:

* scouting
* diff explanation
* validation analysis
* summary generation

Useful for advanced cohorts.

