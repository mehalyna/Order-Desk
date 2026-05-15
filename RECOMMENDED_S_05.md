# Recommended Skills for Session 5
# Figma to Prototype and Dev-Ready Handoff

This session focuses on connecting:
- requirements
- mockups
- implementation
- refinement communication

The following skills are recommended for reusable AI-assisted workflows during the session.

---

# Recommended Structure

```text
.CLAUDE/
└── skills/
    ├── figma-flow-analysis/
    │   └── SKILL.md
    ├── ui-consistency-review/
    │   └── SKILL.md
    ├── refinement-validator/
    │   └── SKILL.md
    ├── design-to-code-scout/
    │   └── SKILL.md
    ├── prototype-humanizer/
    │   └── SKILL.md
    ├── handoff-pack-writer/
    │   └── SKILL.md
    ├── accessibility-review/
    │   └── SKILL.md
    └── component-mapping/
        │   └── SKILL.md
```

---

# 1. figma-flow-analysis

## Purpose

Analyze mockups and flows from a Business Analyst perspective.

## Responsibilities

- Identify states
- Identify variants
- Detect missing states
- Detect hidden assumptions
- Identify dependencies
- Generate clarification questions

## Focus Areas

- loading states
- empty states
- validation
- permissions
- transitions
- edge cases

## Rules

- Explain findings in business language
- Focus on behaviour, not visuals
- Explicitly mention undocumented assumptions

---

# 2. ui-consistency-review

## Purpose

Compare proposed flows against existing application patterns.

## Responsibilities

- Detect inconsistencies
- Compare terminology
- Compare validation behaviour
- Compare interaction patterns
- Compare component reuse

## Rules

- Prefer reuse over reinvention
- Explain inconsistencies clearly
- Highlight accessibility concerns

## Typical Inputs

- Figma flows
- generated UI
- existing app pages

---

# 3. refinement-validator

## Purpose

Evaluate whether a mockup or prototype is refinement-ready.

## Responsibilities

Check for:
- missing states
- hidden dependencies
- incomplete flows
- undocumented assumptions
- unclear validations
- unresolved permissions

## Output

### Ready for refinement
### Needs clarification
### Requires developer input

## Rules

Never assume visual completeness means implementation completeness.

---

# 4. design-to-code-scout

## Purpose

Connect Figma structures to repository implementation.

## Responsibilities

- Map design elements to code components
- Find reusable implementation patterns
- Detect duplicated UI logic
- Identify implementation impact

## Rules

- Explain mapping in plain language
- Avoid excessive framework jargon
- Focus on traceability

---

# 5. prototype-humanizer

## Purpose

Rewrite prototype and handoff explanations into stakeholder-friendly language.

## Responsibilities

- Reduce robotic AI wording
- Improve readability
- Preserve implementation meaning
- Make refinement notes natural

## Preferred Tone

Collaborative, practical, concise.

---

# 6. handoff-pack-writer

## Purpose

Generate refinement-ready handoff documentation.

## Required Sections

1. Feature summary
2. Affected areas
3. Dependencies
4. Clarification questions
5. Risks
6. Demo evidence
7. Suggested acceptance criteria

## Rules

- Write for mixed audience:
  - developers
  - QA
  - stakeholders
- Avoid unnecessary technical depth
- Keep assumptions explicit

---

# 7. accessibility-review

## Purpose

Detect UX and accessibility risks early.

## Responsibilities

Review:
- button hierarchy
- contrast assumptions
- keyboard accessibility
- form clarity
- disabled states
- validation visibility

## Rules

- Focus on business impact
- Explain accessibility as usability risk
- Keep recommendations practical

---

# 8. component-mapping

## Purpose

Explain relationships between:
- design components
- implementation components
- reusable UI patterns

## Responsibilities

- Detect reusable structures
- Identify component duplication
- Explain implementation boundaries
- Clarify state ownership

## Important Rule

A Figma component does NOT automatically equal one code component.

---

# Suggested Workflow

| Activity | Recommended Skill |
|---|---|
| Flow inspection | figma-flow-analysis |
| Pattern comparison | ui-consistency-review |
| Refinement readiness | refinement-validator |
| Design-to-code tracing | design-to-code-scout |
| Stakeholder communication | prototype-humanizer |
| Handoff generation | handoff-pack-writer |
| Accessibility analysis | accessibility-review |
| Component tracing | component-mapping |

---

# BA Note

Skills are reusable behavioural instructions.

They help stabilize:
- prompting
- refinement workflows
- documentation quality
- cross-team communication

The goal is not automation.
The goal is repeatable analytical quality.