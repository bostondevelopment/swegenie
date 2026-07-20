# Role Archetype Brief: ML Engineer

## Posting corpus scale (follow-up sourcing pass, 2026-07-11)

Beyond the hand-curated postings cited throughout this brief, a large-scale automated sourcing pass classified **724 real, currently-live job postings across 234 companies** into this archetype — harvested directly from public Greenhouse/Lever/Ashby/Workday job-board APIs (not scraped HTML, not estimated) and classified by a keyword/regex rubric with company-context overrides for known naming collisions, precision-checked by hand-sampling each archetype's matches. This comfortably clears the ≥15-posting v1 sourcing target and the ≥200-posting stretch goal set for this pass.

Representative sample of companies with live postings matched to this archetype (of 234 total):

- **Bubble** — "Senior Applied AI Engineer"
- **Oura** — "Senior AI Engineer – Health Intelligence"
- **Deliveroo** — "Machine Learning Engineer"
- **HPE** — "AI and Machine Learning Engineer"
- **Motional** — "Senior Machine Learning Engineer - Prediction"
- **Fireblocks** — "Data Analytics AI Engineer"
- **Path Robotics** — "Senior Machine Learning Engineer, Neural Simulators"
- **CoreWeave** — "Senior Software and AI Engineer"

Full methodology, the complete verified company registry, and the raw/classified posting corpus are in `docs/research/job-postings-corpus/` (see `COUNTS.md` for the full per-archetype breakdown and `title-classification-rubric.json` for the exact classification logic — every number here is independently reproducible from that dataset).

**Cluster:** Data & ML Engineering
**Status:** Draft v1 (Phase 1 research)
**Author note:** Multi-agent parallel research pass (job postings, comp/ladder, and
day-to-day/misconceptions/entry-exit paths researched concurrently, then synthesized). Split-vs-merge
decision documented in "Notes / open questions" below.

---

## Scope and definition

A **Machine Learning Engineer (MLE)** builds and ships production ML systems: training pipelines,
feature engineering, model integration into products, deployment, and monitoring. The center of
gravity is **making ML work reliably in production**, not inventing new algorithms. Chip Huyen's
framing, drawn from years of ML hiring research, is blunt about this: "ML engineering is
considered a subfield of software engineering," and companies increasingly "would rather hire
people who are great engineers but don't know much ML because it's easier for great engineers to
pick up ML than for ML experts to pick up good engineering practices" [Huyen, "Machine Learning
Engineer vs. Software
Engineer"](https://huyenchip.com/ml-interviews-book/contents/1.1.3.2-machine-learning-engineer-vs.-software-engineer.html).

This brief treats **ML Platform / Infrastructure Engineer as a flavor within the ML engineer
archetype** (see subsection below and the "Notes / open questions" section for full reasoning),
rather than splitting it into a separate file. It explicitly excludes:

- **Applied / Research Scientist** — a PhD-gated, publication-oriented role that "investigate[s]
  problems that are more fundamental (e.g., model compression, image segmentation,
  speech-to-text) with a longer time horizon" [Eugene Yan, "Applied / Research Scientist, ML
  Engineer: What's the Difference?"](https://eugeneyan.com/writing/data-science-roles/). This
  population is out of scope for a software-engineer-facing taxonomy — see boundary note below.
- **Data Scientist / Data Analyst** — covered in a separate brief; MLEs "need to know ML
  algorithms, whereas many data scientists can do their jobs without ever touching ML" [Huyen,
  "Machine Learning Engineer vs. Data
  Scientist"](https://huyenchip.com/ml-interviews-book/contents/1.1.3.3-machine-learning-engineer-vs.-data-scientist.html).
- **Data Engineer** — covered in a separate brief; overlaps at the feature-pipeline boundary but
  differs in end consumer (models vs. dashboards/apps).

### Out-of-scope boundary note: Applied / Research Scientist

Research/Applied Scientist roles are real and distinct in big tech and AI labs, but Eugene Yan's
analysis (an ex-Amazon Senior Applied Scientist, now at Anthropic) is explicit that this
specialization "are mostly seen in relatively larger tech organizations (i.e., data science teams
of >50)" and that smaller companies "might not have the need (or luxury)... for research-focused
roles" [Eugene Yan, data-science-roles](https://eugeneyan.com/writing/data-science-roles/). Since
this taxonomy targets software engineers deciding on a career direction — not PhD holders deciding
between academia and industry research — Research/Applied Scientist is intentionally excluded as a
separate archetype. It is mentioned here only as a boundary marker. A 2017 Kaggle survey of 16,000
ML practitioners found only 15.6% held a PhD (41.8% master's, 32% bachelor's only), reinforcing
that PhD-gated research roles are a minority slice of the broader ML labor market [Chip Huyen, "Do
I need a Ph.D. to work in machine
learning?"](https://huyenchip.com/ml-interviews-book/contents/2.1.1.5-do-i-need-a-ph.d.-to-work-in-machine-learning.html).

---

## Day-to-day activities

Core production-ML work, consistent across company sizes:

- **Feature engineering and data pipeline work** feeding training and inference — e.g., Affirm's
  MLE I role "implements/scales data pipelines and features for production models" for credit
  underwriting [Affirm, Machine Learning Engineer I (Underwriting), 2026](https://jobs.khoslaventures.com/companies/affirm/jobs/51013104-machine-learning-engineer-i).
- **Training, evaluating, and deploying models against a specific business metric** — fraud/risk
  scoring at Stripe [Stripe, Machine Learning Engineer, Payment Intelligence, 2026](https://stripe.com/jobs/listing/machine-learning-engineer-payment-intelligence/7983456);
  default-likelihood prediction at Affirm; personalization/recsys at Instacart and DoorDash
  [Instacart, Senior Machine Learning Engineer II, AI Special Projects, 2026](https://careers.base10.vc/companies/instacart/jobs/61157179-senior-machine-learning-engineer-applied-ai);
  [DoorDash, Senior Staff Machine Learning Engineer, Consumer, 2026](https://job-boards.greenhouse.io/doordashusa/jobs/7967848).
- **Building/maintaining production systems around the model** — API integration, monitoring,
  CI/CD, and increasingly LLM fine-tuning/prompting/agentic-workflow integration even at
  non-LLM-native companies (DoorDash, Instacart, and Affirm postings all now mention this)
  [DoorDash](https://job-boards.greenhouse.io/doordashusa/jobs/7967848); [Instacart](https://careers.base10.vc/companies/instacart/jobs/61157179-senior-machine-learning-engineer-applied-ai).
- **Cross-functional collaboration** with product, data science, and (at trust/safety-focused
  orgs) policy teams — e.g., Anthropic's Safeguards MLE role builds "synthetic data pipelines for
  training classifiers" and does red-teaming/adversarial robustness work alongside a research team
  [Anthropic, ML/Research Engineer, Safeguards, 2026](https://job-boards.greenhouse.io/anthropic/jobs/4949336008).
- **A minority share of the codebase is actually "ML."** Practitioner Tomasz Dudek, in a widely
  cited breakdown of the role: "The majority of your code is not tied to machine learning. In
  fact, the code regarding it usually takes just a few percents of your entire codebase!" The rest
  is data pipelines, scheduling, API development, database management, monitoring/logging, timeout
  handling, and edge-case handling — he calls the role "a full stack developer of the data
  science" [Tomasz Dudek, "But what is this 'machine learning engineer' actually
  doing?"](https://medium.com/@tomaszdudek/but-what-is-this-machine-learning-engineer-actually-doing-18464d5c699).
  A separate practitioner account converges on the same point: real ML engineering is "less about
  sophisticated transformer architectures and more about building resilient systems that can
  survive contact with reality," with most time spent extracting a training set that faithfully
  represents the real-world distribution — once that's solved, a well-understood classical model
  is often good enough [Rahul Agarwal (mlwhiz.com), "A Day in the Life of an ML
  Engineer"](https://www.mlwhiz.com/p/a-day-in-the-life-of-an-ml-engineer).
- **Startups compress the role further.** "Founding" MLE postings at seed-stage companies span
  model architecture through deployment in one job — e.g., a Y Combinator-backed forecasting
  startup's Founding MLE "architects and trains time-series foundation models" AND "deploys models
  to production APIs (ONNX exports)" [The Forecasting Company, Founding Machine Learning Engineer,
  2026](https://www.ycombinator.com/companies/the-forecasting-company/jobs/cXJzAhA-founding-machine-learning-engineer).

### Variant: ML Platform / Infrastructure Engineer

A meaningful subset of ML engineering work is building the tooling *other* ML engineers and data
scientists use, rather than shipping models directly: feature stores, training/serving
infrastructure, orchestration, and experiment platforms.

- Netflix's Feature Infrastructure team builds a "near-real-time feature computation engine" and
  operates "feature computation pipelines and feature serving infrastructure for various ML models
  across multiple ML domains" [Netflix, Software Engineer L4/L5, Data and Feature Infrastructure,
  AI Platform, 2026](https://explore.jobs.netflix.net/careers/job/790300763299-software-engineer-l4-l5-data-and-feature-infrastructure-machine-learning-platform-usa-remote).
- Stripe's Staff ML Platform role "translate[s] ML engineers' and data scientists' needs into
  scalable technical solutions," owning ML orchestration, compute infra, training, and inference
  systems architecture [Stripe, Staff Software Engineer, Machine Learning Platform,
  2026](https://stripe.com/jobs/listing/staff-software-engineer-machine-learning-platform/7939868).
- Uber's Michelangelo platform team builds "elastic, scalable, and fault-tolerant distributed
  machine learning libraries and systems used to power machine learning development productivity
  across Uber" — at scale, supporting ~400 active ML projects and 5,000+ models in production
  [Uber, Michelangelo Machine Learning Platform blog](https://www.uber.com/us/en/blog/michelangelo-machine-learning-platform/).
- This flavor requires **distributed-systems depth over ML theory depth**: Spark/Flink/Kafka,
  Kubernetes-adjacent infra, and cloud ML platforms (SageMaker, Databricks) are the load-bearing
  requirements, vs. PyTorch/TensorFlow modeling skill for generalist MLE postings.
- **This split is not exclusively big-tech.** It shows up at mid-size companies (Stripe runs both
  a generalist "Payment Intelligence" MLE track and a distinct ML Platform track through Staff
  level) and even at seed-stage startups — one YC-backed company's "Founding ML Research Engineer,
  Training Infrastructure" role is a pure-platform role at a company with only a handful of
  employees [Kalpa Labs, Founding ML Research Engineer, Training Infrastructure, 2026](https://www.ycombinator.com/companies/kalpa-labs/jobs/h8hYrkm-founding-ml-research-engineer-training-infrastructure).
  At the smallest startups, a single "founding MLE" typically blends both flavors due to headcount
  constraints (see the Forecasting Company example above).
- Per Mikiko Bazeley's practitioner breakdown of the closely related MLOps engineer role, time
  splits roughly "Dev work (30-60%)" — building/maintaining infra, evaluating tools — versus "Ops
  work (40-70%)" — embedded consulting to data science/ML teams, on-call support, unblocking
  projects [Mikiko Bazeley, "What an MLOps Engineer
  Does"](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b).
  ML platform roles reportedly also command a modest comp premium over adjacent MLOps titles,
  reflecting proximity to core infrastructure engineering [KORE1, "Hire ML Platform Engineers
  2026"](https://www.kore1.com/hire-ml-platform-engineers-2026/) (staffing-firm source — directional,
  not a rigorous survey).

---

## Success criteria / how performance is actually measured

- **Shipped, reliable, business-impacting systems — not model sophistication or research
  novelty.** Every credible practitioner source converges on this point [Huyen](https://huyenchip.com/ml-interviews-book/contents/1.1.3.2-machine-learning-engineer-vs.-software-engineer.html);
  [Eugene Yan](https://eugeneyan.com/writing/data-science-roles/); [Bazeley](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b).
  As Netflix engineers are evaluated (per a secondary interview-prep source, moderate confidence):
  seniority is inferred less from model/data scale and more from "the ability to translate vague
  business problems into measurable ML objectives and select metrics that align with long-term
  member value," under a "results-driven," A/B-test-centric culture [Exponent, Netflix ML Engineer
  interview guide](https://www.tryexponent.com/guides/netflix-machine-learning-engineer-interview).
- **A/B test outcomes and business KPIs moved**, not offline model metrics (accuracy/AUC) in
  isolation — a model "isn't successful because it achieves high AUC, but because it survives the
  real world" [Huyen, MLOps guide](https://huyenchip.com/mlops/).
- **For the ML Platform variant:** success is judged on internal-customer outcomes — "effective
  tooling adoption by data science teams," "reduction of manual operational work," and
  "maintaining reliability of production ML systems" — evaluated more like embedded consulting
  than against a hard metrics rubric [Bazeley](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b).
- **At staff+ levels**, evaluation shifts to influence: GitLab's public ML engineering ladder
  defines Staff MLE as someone who "drives innovation," "actively retires technical debt," and
  "acts as external spokesperson for the org's ML work" [GitLab Handbook, Machine Learning job
  family](https://handbook.gitlab.com/job-description-library/engineering/development/data-science/machine-learning/).
- **Reliability signals matter as much as model quality**: uptime, graceful degradation under
  load, monitored drift, and safe retraining/rollback processes are explicit success criteria at
  senior levels, alongside time-to-production for new models — how fast a validated idea becomes a
  shipped, monitored system.

---

## Comp structure (base vs. variable/equity)

**Structure mirrors general software engineering at the same company** — MLE is typically a
title/focus-tag on the generalist SWE ladder (confirmed for Meta, Google, and Amazon), not a
separately-compensated track, so equity weighting increases with seniority the same way it does
for SWE.

**Levels.fyi total comp by company/level** (pulled July 2026; treat as directional, not precise to
the dollar — levels.fyi's own summarized medians were inconsistent across repeated queries to the
same pages):

| Company | Entry level | Entry TC | Senior/Staff level | Senior/Staff TC | Median |
|---|---|---|---|---|---|
| Meta | E3 | $187K | E6 | $678K | ~$430–520K |
| Google | L3 | $199K | L6 | $607–628K (L7 up to $743K) | ~$280–300K |
| Amazon | L4 | $176K | L6 | $409K | $265K |
| Uber | L3 | $157K | L5b | $617K | $333K |
| Stripe | L2 | $351K | L4 | $761K | $369K |
| Apple | ICT2 | $191K | ICT6 | $528K | ~$399K |
| Netflix | — (flat/no banded levels) | — | — | $520–650K blended range | ~$550–585K |
| Bloomberg | — | $223K | — | $373K | $320K |

Sources: [Levels.fyi Meta MLE](https://www.levels.fyi/companies/meta/salaries/software-engineer/title/machine-learning-engineer);
[Levels.fyi Google MLE](https://www.levels.fyi/companies/google/salaries/software-engineer/title/machine-learning-engineer);
[Levels.fyi Amazon MLE](https://www.levels.fyi/companies/amazon/salaries/software-engineer/title/machine-learning-engineer);
[Levels.fyi Uber MLE](https://www.levels.fyi/companies/uber/salaries/software-engineer/title/machine-learning-engineer);
[Levels.fyi Stripe MLE](https://www.levels.fyi/companies/stripe/salaries/software-engineer/title/machine-learning-engineer);
[Levels.fyi Apple MLE](https://www.levels.fyi/companies/apple/salaries/software-engineer/title/machine-learning-engineer);
[Levels.fyi Netflix MLE](https://www.levels.fyi/companies/netflix/salaries/software-engineer/title/machine-learning-engineer);
[Levels.fyi Bloomberg MLE](https://www.levels.fyi/companies/bloomberg/salaries/software-engineer/title/machine-learning-engineer).
Cross-company aggregate median across all reporting companies: **$272,500** [Levels.fyi MLE
rollup](https://www.levels.fyi/t/software-engineer/title/machine-learning-engineer). These bands
run meaningfully above data-engineer bands at the same companies (e.g., Meta data engineer median
$182K vs. Meta ML engineer median $430K — see the companion `data-engineer.md` brief), reflecting
a current market premium on ML talent, particularly at senior/staff levels.

**Entry-level (junior) real posting example:** Affirm's Machine Learning Engineer I posts
**$130,000–$170,000** (CA/WA/NY/NJ/CT) or **$115,000–$155,000** (other US states) plus equity
[Affirm, MLE I posting, 2026](https://jobs.khoslaventures.com/companies/affirm/jobs/51013104-machine-learning-engineer-i)
— notably lower than Big Tech totals above because it's base-only without the large RSU component
that drives Meta/Google totals up.

**Equity weighting grows sharply with level:** at Meta, stock grows from ~17% of total comp at E3
to ~55% at E6; at Google, from ~15% at L3 to ~50% at L6 — the same equity curve as generalist SWE
at these companies, meaning **base salary is tightly banded per level, while equity grant size is
where real negotiation leverage and comp variance live** [Huyen, ML Interviews Book, career
progression](https://huyenchip.com/ml-interviews-book/contents/3.3-career-progression.html).

**Frontier AI labs (OpenAI, Anthropic) skew even more equity/PPU-heavy**, and available evidence
suggests at least Anthropic pays little to no cash bonus for most engineering roles, relying on
base salary plus multi-year-vesting equity — but levels.fyi does not have a populated
MLE-specific page for either lab (only generalist "Software Engineer" data exists), and that
generalist SWE data itself showed high variance across queries — treat frontier-lab figures as
lower-confidence than the Big Tech table above. One directly-posted example: Anthropic's
Safeguards ML/Research Engineer role lists **$350,000–$500,000/year base** [Anthropic, ML/Research
Engineer, Safeguards, 2026](https://job-boards.greenhouse.io/anthropic/jobs/4949336008).

**Glassdoor vs. levels.fyi — a real methodology gap, not noise.** Glassdoor's headline "salary"
figures run roughly **3x lower** than levels.fyi totals for the same companies (e.g., Meta MLE
Glassdoor average **$161,162/yr** vs. levels.fyi total comp median $430–520K) [Glassdoor, Meta
Machine Learning Engineer Salaries](https://www.glassdoor.com/Salary/Meta-Machine-Learning-Engineer-Salaries-E40772_D_KO5,30.htm).
This is almost certainly because Glassdoor's figures are base-pay-only (or lightly
bonus-blended) and exclude RSU/equity grants. **For equity-heavy companies, levels.fyi is the more
reliable source for total-comp comparisons**; Glassdoor undercounts materially.

**ML Platform / Infrastructure Engineer has no dedicated comp tracking on levels.fyi anywhere** —
this is a confirmed negative finding, not sparse data. The site organizes all ML-related comp
under Role: Software Engineer → Focus Area "ML/AI" → Title "Machine Learning Engineer"; searches
across Google, Meta, and Netflix turned up no dedicated "ML Platform Engineer" title page. Anyone
researching platform-specific comp must proxy off generalist MLE numbers (job-posting evidence
suggests rough parity, sometimes with a modest premium at Staff+ given higher years-of-experience
gates — e.g., Stripe's Staff ML Platform posting wants 10+ years vs. 3-7+ for generalist Stripe
MLE roles) [Stripe ML Platform](https://stripe.com/jobs/listing/staff-software-engineer-machine-learning-platform/7939868).

---

## Career ladder (junior -> staff/principal progression)

**Entry-level ML engineer roles are uncommon; this is largely not a fresh-grad first job.** Typical
feeder roles are software engineer, data analyst, data scientist, or data engineer, with
progression into ML engineer, senior ML engineer, and then staff/principal, branching into MLOps,
ML platform engineering, applied science, or technical leadership [ProjectPro, "The Ultimate
Machine Learning Engineer Career Path for
2025"](https://www.projectpro.io/article/machine-learning-engineer-career-path/537).

Standard dual-track IC/management ladder, same leveling convention as general software
engineering — MLE does not have its own distinct ladder structure at most companies; it is a title
tag on the generalist SWE ladder (explicitly the case at Google, where ML work sits under the SWE
or Data Scientist ladders rather than a distinct MLE ladder).

The most detailed **public, primary-source** ML engineering ladder found is GitLab's published
handbook, which defines five levels:

- **Associate MLE** (1+ yr experience, or MS/PhD): ships small features/improvements "with
  guidance and support"; modest scope.
- **Intermediate MLE** (2+ yrs): handles "moderate scope and complexity" independently with
  minimal guidance; joins code review/on-call rotation.
- **Senior MLE** (3+ yrs): "high scope and complexity"; *designs and develops* models (not just
  improves them); exerts influence over team objectives; mentors via code review.
- **Staff MLE** (5+ yrs, or PhD): "highest scope and complexity"; drives innovation; actively
  retires technical debt; mentors broadly; acts as external spokesperson for the org's ML work.
- Engineering Manager, ML is a separate people-management branch, not an IC staff/principal rung.

[GitLab Handbook, Machine Learning job family](https://handbook.gitlab.com/job-description-library/engineering/development/data-science/machine-learning/).
Dropbox's public career framework confirms the same general shape (IC1 → IC2 → IC3 → IC4 → IC5
"Staff Machine Learning Engineer") without a separate platform/infra sub-ladder [Dropbox
Engineering Career Framework](https://dropbox.github.io/dbx-career-framework/).

**A distinctive feature vs. generalist SWE hiring: education level shifts the starting rung.** New
grads start at the lowest rung; Master's-degree holders typically start one level up; PhD holders
further up still — credentials matter more for initial leveling in ML hiring than in generalist
SWE hiring [Huyen, career progression](https://huyenchip.com/ml-interviews-book/contents/3.3-career-progression.html).

**Caveat directly from this source:** this ladder framework "applies to large orgs only — at
startups, hierarchies are flat and levels are not well-defined," so leveling comparisons break
down for smaller companies [Huyen, career
progression](https://huyenchip.com/ml-interviews-book/contents/3.3-career-progression.html).

**ML Platform/Infra ladder differentiation** runs structurally parallel to the generalist ladder
but applied to systems rather than models: junior/mid platform engineers build and maintain
tooling under direction; senior+ engineers make architecture calls (compute provisioning, feature
store design); staff+ engineers set ML infrastructure strategy and influence cross-team decisions
— the same "expanding scope of influence" pattern as the generalist ladder, just pointed at
internal-platform customers instead of external model consumers. This characterization draws on
job-posting-level evidence (Netflix, Stripe, Uber postings above) rather than a single published
platform-specific ladder document — no company was found publishing a distinct "ML Platform
Engineer" ladder separately from its general MLE/SWE ladder.

---

## Common entry paths

- **Software engineer → MLE.** Practitioner consensus favors this direction over the reverse:
  Huyen's explicit advice to undecided candidates is "If you're a candidate trying to decide
  between software engineering and ML, choose engineering" — because strong engineers pick up ML
  faster than ML specialists pick up production engineering discipline [Huyen, MLE vs.
  SWE](https://huyenchip.com/ml-interviews-book/contents/1.1.3.2-machine-learning-engineer-vs.-software-engineer.html).
  This is the most common and lowest-friction path, since SWEs already have production deployment
  and system-design experience; the delta to close is ML-specific (model training, evaluation, the
  ML lifecycle) [Towards Data Science, "Make the Switch from Software Engineer to ML
  Engineer"](https://towardsdatascience.com/make-the-switch-from-software-engineer-to-ml-engineer-7a4948730c97/).
- **Data scientist → MLE**, especially as a company matures and a team's ML work formalizes from
  ad hoc analysis into a dedicated engineering function — Eugene Yan describes this pattern
  explicitly in the context of demand-forecasting teams eventually splitting off dedicated
  MLE/platform roles [Eugene Yan, data-science-roles](https://eugeneyan.com/writing/data-science-roles/).
  This is a common bottom-up path through the modeling side rather than the systems side, and
  requires building production/deployment skill to close the gap.
- **Data engineer → MLE.** A lateral move via the infra/pipeline side.
- **Self-taught / project-based entry**, particularly viable pre-experience: Emil Wallner, a
  self-taught practitioner who became a researcher at Google Arts & Culture, recommends "1-2
  months completing Fast.ai course V3, and spend another 4-5 months completing personal projects
  or participating in machine learning competitions" as an on-ramp [Huyen, "How Other People Did
  It"](https://huyenchip.com/ml-interviews-book/contents/4.2-how-other-people-did-it.html).
- **Non-linear, rejection-heavy paths are the norm, not the exception.** Huyen's collection of
  real named career narratives includes a candidate rejected by Google and NVIDIA and given a
  rescinded Tesla offer before landing a Senior Computer Vision Engineer role at Lyft, and another
  who spent 8 months in full-time self-study targeting Google, was rejected, and instead landed at
  Amazon [Huyen, "How Other People Did
  It"](https://huyenchip.com/ml-interviews-book/contents/4.2-how-other-people-did-it.html). Her
  synthesis: "there's no one path to any job."
- **PhD is not required and is the exception, not the norm** for MLE roles specifically —
  PhD-required listings cluster in research scientist roles (see the out-of-scope boundary note
  above). Most MLE postings do, however, expect several years of prior software/data experience;
  "junior ML engineer" postings are comparatively rare [ProjectPro career path
  guide](https://www.projectpro.io/article/machine-learning-engineer-career-path/537).

## Common exit paths

- **MLE → ML Platform Engineer / continued Staff IC track.** Bazeley's MLOps-engineer framing
  explicitly places platform/infra engineers on standard "Staff archetype" IC ladders rather than
  necessarily branching toward research or management [Bazeley](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b).
  This is often not a title change so much as a shift in day-to-day mix within the same broad
  archetype — a natural move for engineers who find they prefer the "resilient systems" side of
  the job over continued model iteration.
- **MLE → Research/Applied Scientist**, though this requires bridging a real skills gap: the
  differentiator is research scientists work on "publicly available datasets and benchmarks,"
  need literature research and reproducible-experiment skills, and their deliverables are papers
  and replication code — reported to take "6 months to several years" to bridge (single
  practitioner account, lower confidence, but consistent with the generalist/research skill-split
  described elsewhere in this brief) [David Fan, "Breaking into Industry ML/AI Research Without a
  PhD"](https://medium.com/@davidfan/entering-industry-ml-ai-research-without-a-phd-e56761979c8f).
  A minority path overall, given the field's small size relative to applied ML engineering.
- **MLE → ML/AI engineering leadership:** ML Engineering Manager → Director of ML/AI, especially
  at AI-native or AI-heavy product companies.
- **MLE → founder/independent AI product builder.** The current AI/ML talent premium (see comp
  section) has made this an unusually visible exit path relative to other engineering archetypes,
  particularly post-2023. General career-guide synthesis (lower confidence, aggregated rather than
  single-practitioner sourced) indicates MLE founders typically end up doing far more than ML —
  product, fundraising, and general engineering — and that narrow ML skill can atrophy without
  deliberate maintenance, traded for broader business exposure. Directly consistent with the
  "Founding MLE" job postings cited above, which already blend modeling and full-stack production
  ownership even as an individual contributor.
- **Lateral fluidity with DevOps/data engineering.** Bazeley notes ongoing real organizational
  debate over "whether DevOps engineers, data scientists, or specialized MLOps engineers should
  fill operational functions" — implying meaningful lateral/exit fluidity across these adjacent
  titles rather than a single clean exit path [Bazeley](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b).
- **Gap flagged honestly:** this research pass could not find strong practitioner-level sourcing
  specifically for "MLE → data science" as a formal exit trajectory (as opposed to entry path, which
  is well-documented in the reverse direction). Generic career-guide pages surfaced this framing
  but without practitioner specificity — treat as plausible but not well-substantiated.

---

## Top misconceptions vs. reality

1. **Misconception: the job is mostly building/tuning sophisticated algorithms and models.**
   Reality: ML-specific code is "just a few percents" of the codebase; the majority is data
   pipelines, APIs, monitoring, and production hardening [Dudek](https://medium.com/@tomaszdudek/but-what-is-this-machine-learning-engineer-actually-doing-18464d5c699).
   "Many Machine Learning enthusiasts think that they will play with fancy Deep Learning models,
   tune Neural Network architectures and hyperparameters... but not many" actually spend most of
   their time that way — most effort goes into infrastructure, data pipelines, and getting a
   training set that faithfully represents the real-world distribution [Rahul Agarwal
   (mlwhiz.com)](https://www.mlwhiz.com/p/a-day-in-the-life-of-an-ml-engineer); [KDnuggets summary
   of ML-engineer-day-in-the-life accounts](https://www.kdnuggets.com/2022/10/day-life-machine-learning-engineer.html).
   This echoes the widely (if imprecisely) cited claim that a large share of ML practitioner time
   goes to data preparation — the original, most-cited figure traces to a 2016 CrowdFlower survey
   of ~80 data scientists reporting ~60% of time on cleaning/organizing data and ~19% on
   collecting it (~80% combined); later surveys (Figure Eight, 2019) found a more modest ~73.5% of
   respondents spending 25%+ of time on data management — the "80%" figure is real but should be
   cited as one survey's finding, not an industry-wide constant [Forbes, "Cleaning Big Data: Most
   Time-Consuming, Least Enjoyable Data Science Task, Survey Says" (2016)](https://www.forbes.com/sites/gilpress/2016/03/23/data-preparation-most-time-consuming-least-enjoyable-data-science-task-survey-says/);
   [Lost Boy blog, critical re-examination of the statistic](https://blog.ldodds.com/2020/01/31/do-data-scientists-spend-80-of-their-time-cleaning-data-turns-out-no/).

2. **Misconception: MLE is basically a researcher who occasionally deploys code.** Reality: MLE is
   fundamentally a software-engineering subfield; companies explicitly prefer strong engineers
   over strong ML theorists because engineering discipline is harder to teach than ML concepts
   [Huyen, MLE vs. SWE](https://huyenchip.com/ml-interviews-book/contents/1.1.3.2-machine-learning-engineer-vs.-software-engineer.html).

3. **Misconception: you need a PhD to get hired as an ML engineer.** Reality: PhD-required
   listings are concentrated in research scientist roles, a small slice of the ML labor market;
   per the Kaggle-survey figures cited above, only 15.6% of practicing ML professionals hold a
   PhD. The gate for MLE roles is engineering competence, not academic credential [Huyen, "Do I
   need a Ph.D."](https://huyenchip.com/ml-interviews-book/contents/2.1.1.5-do-i-need-a-ph.d.-to-work-in-machine-learning.html).

4. **Misconception: ML engineer is an entry-level / early-career job like a junior SWE role.**
   Reality: it's typically a role people move *into* after establishing themselves as a software
   engineer, data analyst, or data scientist — postings routinely expect multiple years of prior
   experience, and "junior ML engineer" postings are comparatively rare [ProjectPro career path
   guide](https://www.projectpro.io/article/machine-learning-engineer-career-path/537).

5. **Misconception: once a model is deployed, it mostly runs itself.** Reality: production ML
   requires continuous monitoring and retraining; Bazeley's time-split estimate puts "Ops work"
   (on-call, unblocking, monitoring, embedded support) at 40-70% of an MLOps/platform engineer's
   time [Bazeley](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b).

6. **Misconception: roles are cleanly separated — someone else handles data/infra, you just model.**
   Reality: at startups the same person often builds the platform *and* uses it simultaneously.
   Bazeley's direct warning: this pattern "is a quick way to burn out an individual or a team" — a
   candid acknowledgment of overload risk, not a rosy "wear many hats" narrative [Bazeley](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b).

7. **Misconception: "ML Engineer," "MLOps Engineer," and "ML Platform Engineer" are the same job
   with different labels, or alternatively, that they're always cleanly distinct.** Reality: usage
   is genuinely inconsistent across companies (part of why this brief merges them into one file —
   see "Notes / open questions" below), but at companies precise enough to distinguish them, real
   differences in center of gravity exist: MLOps is production operation of models others build;
   ML platform engineering builds the shared infra/tooling; classic "ML engineer" spans model
   development through productionization. Titles are, in Bazeley's words, "a finicky thing...
   meant to serve as useful heuristics," not rigid categories [Bazeley](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b).
   This is corroborated structurally by the comp research: MLE isn't even a separately-leveled
   track at several major companies (it's a focus-tag on the general SWE ladder), and ML Platform
   Engineer has zero dedicated comp tracking on levels.fyi at all.

8. **Misconception (AI/LLM era): the AI/ML component is the hard, differentiating part of building
   an AI product.** Reality, per Chip Huyen (paraphrased in an interview with Gergely Orosz): "For
   many AI products, AI is the easy part, product is the hard part... It's easy to build a demo,
   but hard to build a product" [Pragmatic Engineer newsletter, "AI Engineering with Chip
   Huyen"](https://newsletter.pragmaticengineer.com/p/ai-engineering-with-chip-huyen) (secondary
   source relaying her views — moderate-high confidence given it's a direct interview transcript
   with a well-established practitioner).

9. **Misconception: ML engineering comp is a modest step up from general SWE.** Reality: at
   companies reporting to levels.fyi, ML engineer total comp bands run meaningfully above general
   SWE and data-engineer bands at the same level (e.g., Meta ML engineer median $430K vs. Meta
   data engineer median $182K) — the current market prices ML talent at a significant premium,
   particularly at senior/staff levels and at AI-native companies.

---

## Notes / open questions

### Split-vs-merge decision: MERGE (one file), with ML Platform Engineer as a subsection

**Decision: write a single `ml-engineer.md` file**, with ML Platform/Infrastructure Engineer
treated as a variant/flavor within the archetype rather than a separate file. Reasoning, backed by
this research pass:

1. **No separate comp tracking exists.** levels.fyi — the field's most-used comp reference for
   this population — does not have a distinct "ML Platform Engineer" or "ML Infrastructure
   Engineer" title anywhere searched (Google, Meta, Netflix all checked). All ML-related comp
   collapses into "Software Engineer" → focus "ML/AI" → title "Machine Learning Engineer." If the
   market itself doesn't price this as a separate job family, a taxonomy aimed at helping engineers
   pick a lane shouldn't invent a harder separation than the market recognizes.
2. **No separate career ladder exists.** Neither GitLab's nor Dropbox's published ML engineering
   ladders carve out a distinct platform/infra track — the same IC1→Staff progression applies,
   just pointed at systems instead of models at the platform end.
3. **The split is real in day-to-day responsibilities and requirements, but it's a within-role
   specialization, structurally similar to "backend-leaning vs. frontend-leaning" within generalist
   SWE.** Platform-flavored postings (Netflix, Stripe, Uber) consistently emphasize distributed
   systems (Spark/Flink/Kafka), serving/orchestration infra, and treating other ML
   engineers/scientists as the customer; generalist postings (Affirm, Instacart, DoorDash,
   Anthropic Safeguards) emphasize feature engineering and shipping a model against a business
   metric. This is a genuine and citable difference in emphasis — hence the dedicated subsection
   above — but not a different population, comp structure, or career ladder.
4. **The split is not exclusively big-tech, which weakens (but doesn't eliminate) the case for
   full separation.** Stripe runs both tracks explicitly, and even a ~handful-of-employees YC
   startup (Kalpa Labs) has a pure-platform "Founding ML Research Engineer, Training
   Infrastructure" role distinct in principle from a generalist founding MLE role. However, at the
   smallest/earliest startups, a single "Founding MLE" typically blends both flavors (see The
   Forecasting Company posting) — so the split only crystallizes into two distinct *hiring
   categories* once a company has enough ML surface area to need dedicated platform headcount,
   which is itself useful signal for a software engineer to internalize (early-stage → expect to do
   both; later-stage/bigger co → can specialize into either).
5. **Research/Applied Scientist is excluded entirely** (not even as a subsection) because it's
   PhD-gated and out of scope for this taxonomy's software-engineer audience, per Eugene Yan's
   explicit framing that this split "are mostly seen in relatively larger tech organizations" with
   dedicated research budgets [Eugene Yan](https://eugeneyan.com/writing/data-science-roles/).

**Confidence: high** on the merge decision itself (multiple independent lines of evidence:
comp-tracking, published ladders, and startup-scale job-posting patterns all point the same
direction). **Lower confidence** on some specific claims within the ML Platform subsection, since
that variant is documented mainly through job postings and one secondary MLOps-engineer blog
(Bazeley) rather than a dedicated platform-engineer practitioner account — a good area for
cross-review to seek an additional primary source if available.

**Note for Phase 2 (trait dimensions/scoring rubric):** recommend encoding "production/infra-heavy
vs. modeling-heavy" as a scoring sub-dimension or documented variance note on this archetype's
profile, rather than as separate archetype entries, so the assessment can still route a software
engineer toward the platform-flavored end of ML engineering without requiring a whole separate
archetype. Revisit the merge decision for v2 if beta feedback (Phase 6) shows users in ML
platform/MLOps-heavy roles feel this brief doesn't describe their day-to-day.

### Other gaps / low-confidence areas

- **Reddit sourcing failed entirely for this brief.** WebSearch `site:reddit.com` queries returned
  no results across many phrasings (career path, transition, burnout, exit opportunities), and
  direct WebFetch to reddit.com was blocked in this research environment. Entry/exit-path and
  misconception claims above lean instead on named-practitioner blog accounts (Huyen's "How Other
  People Did It" collection provides several real, attributable career narratives as a partial
  substitute) — but a true cross-section of practitioner sentiment via Reddit is missing from this
  pass. If Reddit data is a hard requirement, it needs a different access method (authenticated
  session, Reddit API, or manual input).
- **"MLE → engineering management" and "MLE → data science" as exit paths are asserted only by
  generic career-guide content**, not corroborated by a named practitioner account. Flagged as
  plausible-but-unverified above.
- **Frontier AI lab (OpenAI/Anthropic) comp is thin and noisy.** levels.fyi has no populated
  MLE-specific page for either lab; generalist "Software Engineer" figures pulled for these
  companies showed inconsistent medians across repeated queries to the same page (e.g., Anthropic
  SWE median cited as both $420K and $722K in different fetches). Treat frontier-lab total comp
  claims as directional only.
- **Netflix leveling/comp figures cited in some secondary sources (e.g., L3 ~$220K to L7 ~$1.17M)
  are unverified pass-through from a career-prep site, not a direct levels.fyi or company source**
  — excluded from the comp table above for this reason, but flagged here in case a cross-reviewer
  wants to chase it down.
- **Meta job-posting content in this brief relies partly on WebSearch snippets rather than full
  page fetches**, since metacareers.com blocked direct WebFetch attempts repeatedly (likely a
  JS-rendered SPA). Directionally consistent with other sources but slightly lower-confidence than
  the fully-fetched postings (Affirm, Instacart, DoorDash, Stripe, Netflix, Anthropic, YC
  startups).
- **"ML platform premium" figure (15-25% over MLOps titles)** traces to a single staffing-firm
  blog (KORE1), not a rigorous compensation survey — treat as directional market color, not a
  precise figure.

---

## Sources

1. [Chip Huyen — Machine Learning Engineer vs. Software Engineer (ML Interviews Book)](https://huyenchip.com/ml-interviews-book/contents/1.1.3.2-machine-learning-engineer-vs.-software-engineer.html)
2. [Chip Huyen — Machine Learning Engineer vs. Data Scientist (ML Interviews Book)](https://huyenchip.com/ml-interviews-book/contents/1.1.3.3-machine-learning-engineer-vs.-data-scientist.html)
3. [Chip Huyen — Career Progression (ML Interviews Book)](https://huyenchip.com/ml-interviews-book/contents/3.3-career-progression.html)
4. [Chip Huyen — How Other People Did It (ML Interviews Book)](https://huyenchip.com/ml-interviews-book/contents/4.2-how-other-people-did-it.html)
5. [Chip Huyen — Do I need a Ph.D. to work in machine learning? (ML Interviews Book)](https://huyenchip.com/ml-interviews-book/contents/2.1.1.5-do-i-need-a-ph.d.-to-work-in-machine-learning.html)
6. [Chip Huyen — MLOps Guide (huyenchip.com)](https://huyenchip.com/mlops/)
7. [Eugene Yan — Applied / Research Scientist, ML Engineer: What's the Difference?](https://eugeneyan.com/writing/data-science-roles/)
8. [Tomasz Dudek (Medium) — But what is this "machine learning engineer" actually doing?](https://medium.com/@tomaszdudek/but-what-is-this-machine-learning-engineer-actually-doing-18464d5c699)
9. [Rahul Agarwal (mlwhiz.com) — A Day in the Life of an ML Engineer: The Good, the Bad, and the GPU Out of Memory Errors](https://www.mlwhiz.com/p/a-day-in-the-life-of-an-ml-engineer)
10. [KDnuggets — A Day in the Life of a Machine Learning Engineer](https://www.kdnuggets.com/2022/10/day-life-machine-learning-engineer.html)
11. [Mikiko Bazeley (Medium) — What an MLOps Engineer Does](https://medium.com/kitchen-sink-data-science/what-an-mlops-engineer-does-565d4d0adb2b)
12. [Pragmatic Engineer newsletter — AI Engineering with Chip Huyen (Gergely Orosz interview)](https://newsletter.pragmaticengineer.com/p/ai-engineering-with-chip-huyen)
13. [Exponent — Netflix Machine Learning Engineer Interview Guide](https://www.tryexponent.com/guides/netflix-machine-learning-engineer-interview)
14. [Uber Engineering Blog — Michelangelo Machine Learning Platform](https://www.uber.com/us/en/blog/michelangelo-machine-learning-platform/)
15. [GitLab Handbook — Machine Learning job family](https://handbook.gitlab.com/job-description-library/engineering/development/data-science/machine-learning/)
16. [Dropbox Engineering Career Framework](https://dropbox.github.io/dbx-career-framework/)
17. [David Fan (Medium) — Breaking into Industry ML/AI Research Without a PhD](https://medium.com/@davidfan/entering-industry-ml-ai-research-without-a-phd-e56761979c8f)
18. [ProjectPro — The Ultimate Machine Learning Engineer Career Path for 2025](https://www.projectpro.io/article/machine-learning-engineer-career-path/537)
19. [Towards Data Science — Make the Switch from Software Engineer to ML Engineer](https://towardsdatascience.com/make-the-switch-from-software-engineer-to-ml-engineer-7a4948730c97/)
20. [KORE1 — Hire ML Platform Engineers 2026: Comp, Skills, Process](https://www.kore1.com/hire-ml-platform-engineers-2026/)
21. [Anthropic — ML/Research Engineer, Safeguards (job posting, 2026)](https://job-boards.greenhouse.io/anthropic/jobs/4949336008)
22. [DoorDash — Senior Staff Machine Learning Engineer, Consumer (job posting, 2026)](https://job-boards.greenhouse.io/doordashusa/jobs/7967848)
23. [Affirm — Machine Learning Engineer I, Underwriting (job posting, 2026)](https://jobs.khoslaventures.com/companies/affirm/jobs/51013104-machine-learning-engineer-i)
24. [Instacart — Senior Machine Learning Engineer II, AI Special Projects (job posting, 2026)](https://careers.base10.vc/companies/instacart/jobs/61157179-senior-machine-learning-engineer-applied-ai)
25. [Stripe — Machine Learning Engineer, Payment Intelligence (job posting, 2026)](https://stripe.com/jobs/listing/machine-learning-engineer-payment-intelligence/7983456)
26. [Stripe — Staff Software Engineer, Machine Learning Platform (job posting, 2026)](https://stripe.com/jobs/listing/staff-software-engineer-machine-learning-platform/7939868)
27. [Netflix — Software Engineer L4/L5, Data and Feature Infrastructure, AI Platform (job posting, 2026)](https://explore.jobs.netflix.net/careers/job/790300763299-software-engineer-l4-l5-data-and-feature-infrastructure-machine-learning-platform-usa-remote)
28. [Shaped (YC) — Machine Learning Engineer (job posting, 2026)](https://www.ycombinator.com/companies/shaped/jobs/y3Uk5nI-machine-learning-engineer)
29. [The Forecasting Company (YC) — Founding Machine Learning Engineer (job posting, 2026)](https://www.ycombinator.com/companies/the-forecasting-company/jobs/cXJzAhA-founding-machine-learning-engineer)
30. [Kalpa Labs (YC) — Founding ML Research Engineer, Training Infrastructure (job posting, 2026)](https://www.ycombinator.com/companies/kalpa-labs/jobs/h8hYrkm-founding-ml-research-engineer-training-infrastructure)
31. [Levels.fyi — Machine Learning Engineer Salary (aggregate)](https://www.levels.fyi/t/software-engineer/title/machine-learning-engineer)
32. [Levels.fyi — Meta Machine Learning Engineer Salary](https://www.levels.fyi/companies/meta/salaries/software-engineer/title/machine-learning-engineer)
33. [Levels.fyi — Google Machine Learning Engineer Salary](https://www.levels.fyi/companies/google/salaries/software-engineer/title/machine-learning-engineer)
34. [Levels.fyi — Amazon Machine Learning Engineer Salary](https://www.levels.fyi/companies/amazon/salaries/software-engineer/title/machine-learning-engineer)
35. [Levels.fyi — Uber Machine Learning Engineer Salary](https://www.levels.fyi/companies/uber/salaries/software-engineer/title/machine-learning-engineer)
36. [Levels.fyi — Stripe Machine Learning Engineer Salary](https://www.levels.fyi/companies/stripe/salaries/software-engineer/title/machine-learning-engineer)
37. [Levels.fyi — Apple Machine Learning Engineer Salary](https://www.levels.fyi/companies/apple/salaries/software-engineer/title/machine-learning-engineer)
38. [Levels.fyi — Netflix Machine Learning Engineer Salary](https://www.levels.fyi/companies/netflix/salaries/software-engineer/title/machine-learning-engineer)
39. [Levels.fyi — Bloomberg Machine Learning Engineer Salary](https://www.levels.fyi/companies/bloomberg/salaries/software-engineer/title/machine-learning-engineer)
40. [Glassdoor — Meta Machine Learning Engineer Salaries](https://www.glassdoor.com/Salary/Meta-Machine-Learning-Engineer-Salaries-E40772_D_KO5,30.htm)
41. [Forbes — Cleaning Big Data: Most Time-Consuming, Least Enjoyable Data Science Task, Survey Says (2016)](https://www.forbes.com/sites/gilpress/2016/03/23/data-preparation-most-time-consuming-least-enjoyable-data-science-task-survey-says/)
42. [Lost Boy blog — Do data scientists spend 80% of their time cleaning data? Turns out, no?](https://blog.ldodds.com/2020/01/31/do-data-scientists-spend-80-of-their-time-cleaning-data-turns-out-no/)
