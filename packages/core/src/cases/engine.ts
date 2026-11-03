import type { CaseDebrief, CaseSession } from "@jagaruang/contracts";
import { loadCases } from "../content/loader";

const INVESTIGATION_PER_EVIDENCE = 8;
const INVESTIGATION_MAX = 40;
const HINT_PENALTY = 5;
const HINT_BONUS = 10;
const SCORE_MAX = 100;

export function startCase(caseId: string): CaseSession {
  const cases = loadCases();
  const def = cases.find((c) => c.id === caseId);
  if (!def) throw new Error(`Case tidak ditemukan: ${caseId}`);
  return {
    caseId,
    currentNodeId: def.startNodeId,
    score: 0,
    evidenceFound: [],
    hintsUsed: 0,
    history: [def.startNodeId],
    finished: false,
  };
}

export function tapEvidence(session: CaseSession, evidenceId: string): CaseSession {
  if (session.evidenceFound.includes(evidenceId)) return session;
  const investigationScore = Math.min(
    (session.evidenceFound.length + 1) * INVESTIGATION_PER_EVIDENCE,
    INVESTIGATION_MAX,
  );
  const prevInvestigationScore = Math.min(
    session.evidenceFound.length * INVESTIGATION_PER_EVIDENCE,
    INVESTIGATION_MAX,
  );
  const delta = investigationScore - prevInvestigationScore;
  return {
    ...session,
    evidenceFound: [...session.evidenceFound, evidenceId],
    score: session.score + delta,
  };
}

export function useHint(session: CaseSession): CaseSession {
  return {
    ...session,
    hintsUsed: session.hintsUsed + 1,
    score: Math.max(0, session.score - HINT_PENALTY),
  };
}

export function chooseOption(session: CaseSession, optionId: string): CaseSession {
  const cases = loadCases();
  const def = cases.find((c) => c.id === session.caseId);
  if (!def) throw new Error(`Case tidak ditemukan: ${session.caseId}`);

  const node = def.nodes.find((n) => n.id === session.currentNodeId);
  if (!node) throw new Error(`Node tidak ditemukan: ${session.currentNodeId}`);

  const option = (node.options ?? []).find((o) => o.id === optionId);
  if (!option) throw new Error(`Option tidak ditemukan: ${optionId}`);

  const nextNode = def.nodes.find((n) => n.id === option.nextNodeId);
  const finished = nextNode?.type === "debrief";

  return {
    ...session,
    score: session.score + option.score,
    currentNodeId: option.nextNodeId,
    history: [...session.history, option.nextNodeId],
    finished,
  };
}

export function getDebrief(session: CaseSession): CaseDebrief {
  const cases = loadCases();
  const def = cases.find((c) => c.id === session.caseId);
  if (!def) throw new Error(`Case tidak ditemukan: ${session.caseId}`);

  const investigationComponent = Math.min(
    session.evidenceFound.length * INVESTIGATION_PER_EVIDENCE,
    INVESTIGATION_MAX,
  );
  const decisionComponent = session.score - investigationComponent;
  const hintBonus = session.hintsUsed === 0 ? HINT_BONUS : 0;
  const finalScore = Math.min(investigationComponent + decisionComponent + hintBonus, SCORE_MAX);

  const rank =
    finalScore >= 80 ? "Guardian" : finalScore >= 50 ? "Penjaga" : "Pemula";

  const flagCode = `TRUST{${session.caseId}-${finalScore}-${rank[0]}}`;

  const allRedFlags = def.nodes
    .flatMap((n) => n.evidence ?? [])
    .filter((e) => e.isRedFlag);

  const missedFlags = allRedFlags
    .filter((e) => !session.evidenceFound.includes(e.id))
    .map((e) => ({
      evidenceId: e.id,
      label: e.label,
      why: e.why ?? "",
    }));

  const debriefNode = def.nodes
    .filter((n) => n.type === "debrief")
    .find((n) => session.history.includes(n.id));

  const idealAnswer = debriefNode?.text ?? "";

  return { score: finalScore, rank, flagCode, missedFlags, idealAnswer };
}

