import { describe, it, expect } from "vitest";
import { startCase, tapEvidence, useHint, chooseOption, getDebrief } from "../engine";
import { loadCases } from "../../content/loader";

const K1 = "k1";
const K2 = "k2";

describe("BE-3.3 Case Engine", () => {
  it("1. startCase valid → currentNodeId = startNodeId", () => {
    const def = loadCases().find((c) => c.id === K1)!;
    const session = startCase(K1);
    expect(session.currentNodeId).toBe(def.startNodeId);
    expect(session.caseId).toBe(K1);
    expect(session.score).toBe(0);
    expect(session.finished).toBe(false);
    expect(session.history).toEqual([def.startNodeId]);
  });

  it("2. startCase caseId tidak ada → throw Error", () => {
    expect(() => startCase("k-tidak-ada")).toThrow();
  });

  it("3. tapEvidence menambah evidenceFound", () => {
    const s0 = startCase(K1);
    const s1 = tapEvidence(s0, "k1-ev1");
    expect(s1.evidenceFound).toContain("k1-ev1");
    expect(s1.evidenceFound).toHaveLength(1);
  });

  it("4. tapEvidence tidak duplikat jika dipanggil dua kali dengan id sama", () => {
    const s0 = startCase(K1);
    const s1 = tapEvidence(s0, "k1-ev1");
    const s2 = tapEvidence(s1, "k1-ev1");
    expect(s2.evidenceFound).toHaveLength(1);
    expect(s2.score).toBe(s1.score);
  });

  it("5. tapEvidence skor investigasi tidak melebihi 40", () => {
    let session = startCase(K1);
    const evidenceIds = ["k1-ev1", "k1-ev2", "k1-ev3", "k1-ev4", "k1-ev5", "extra-1", "extra-2"];
    for (const id of evidenceIds) {
      session = tapEvidence(session, id);
    }
    // investigasi component capped at 40
    expect(session.score).toBeLessThanOrEqual(40);
  });

  it("6. useHint menambah hintsUsed", () => {
    const s0 = startCase(K1);
    const s1 = useHint(s0);
    expect(s1.hintsUsed).toBe(1);
    const s2 = useHint(s1);
    expect(s2.hintsUsed).toBe(2);
  });

  it("7. useHint tidak menurunkan score di bawah 0", () => {
    const s0 = startCase(K1); // score = 0
    const s1 = useHint(s0);
    expect(s1.score).toBe(0);
  });

  it("8. chooseOption berpindah ke nextNodeId", () => {
    const def = loadCases().find((c) => c.id === K1)!;
    let session = startCase(K1);
    // maju ke investigation
    const missionNode = def.nodes.find((n) => n.id === session.currentNodeId)!;
    // mission punya nextNodeId, tapi chooseOption butuh options di node
    // gunakan k1-decision-1 langsung
    session = { ...session, currentNodeId: "k1-decision-1" };
    const s1 = chooseOption(session, "k1-opt1b");
    expect(s1.currentNodeId).toBe("k1-decision-2");
    expect(s1.history).toContain("k1-decision-2");
  });

  it("9. chooseOption menambah score dari option.score", () => {
    let session = startCase(K1);
    session = { ...session, currentNodeId: "k1-decision-1" };
    const scoreBefore = session.score;
    const s1 = chooseOption(session, "k1-opt1b"); // score: 25
    expect(s1.score).toBe(scoreBefore + 25);
  });

  it("10. chooseOption finished=true jika next node bertipe debrief", () => {
    let session = startCase(K1);
    session = { ...session, currentNodeId: "k1-decision-2" };
    const s1 = chooseOption(session, "k1-opt2a"); // → k1-debrief-baik (debrief)
    expect(s1.finished).toBe(true);
  });

  it("11. getDebrief rank Guardian (score >= 80)", () => {
    // Simulasi skenario Guardian: semua evidence + semua decision terbaik + tanpa hint
    let session = startCase(K1);
    // Temukan semua evidence dari k1
    const def = loadCases().find((c) => c.id === K1)!;
    const allEvidence = def.nodes.flatMap((n) => n.evidence ?? []);
    for (const e of allEvidence) {
      session = tapEvidence(session, e.id);
    }
    // investigasi = min(5*8, 40) = 40
    // decision: pilih jalur terbaik (opt1b = 25, opt2a = 25) = 50
    // hint = 0 → +10 bonus
    // total = 40 + 50 + 10 = 100
    session = { ...session, currentNodeId: "k1-decision-1" };
    session = chooseOption(session, "k1-opt1b"); // +25
    session = chooseOption(session, "k1-opt2a"); // +25, → debrief-baik
    const debrief = getDebrief(session);
    expect(debrief.rank).toBe("Guardian");
    expect(debrief.score).toBeGreaterThanOrEqual(80);
  });

  it("12. getDebrief flagCode format TRUST{...}", () => {
    let session = startCase(K2);
    session = { ...session, currentNodeId: "k2-decision-1", finished: false };
    session = chooseOption(session, "k2-opt1b"); // → k2-decision-2, +25
    session = chooseOption(session, "k2-opt2a"); // → k2-debrief-baik, +25
    const debrief = getDebrief(session);
    expect(debrief.flagCode).toMatch(/^TRUST\{.+\}$/);
    expect(debrief.flagCode).toContain(K2);
  });

  it("13. getDebrief missedFlags akurat (evidence isRedFlag:true yang tidak ditemukan)", () => {
    // Mulai tanpa menemukan bukti apapun, langsung ke debrief
    let session = startCase(K1);
    session = { ...session, currentNodeId: "k1-decision-1" };
    session = chooseOption(session, "k1-opt1b");
    session = chooseOption(session, "k1-opt2a"); // → debrief
    const debrief = getDebrief(session);
    // Semua evidence red flag harus muncul di missedFlags karena tidak ada yang ditemukan
    const def = loadCases().find((c) => c.id === K1)!;
    const totalRedFlags = def.nodes.flatMap((n) => n.evidence ?? []).filter((e) => e.isRedFlag).length;
    expect(debrief.missedFlags).toHaveLength(totalRedFlags);
    expect(debrief.missedFlags[0]).toHaveProperty("evidenceId");
    expect(debrief.missedFlags[0]).toHaveProperty("label");
    expect(debrief.missedFlags[0]).toHaveProperty("why");
  });

  it("14. getDebrief tanpa hint mendapat bonus +10", () => {
    // Skenario identik tapi satu dengan hint, satu tanpa
    const makeSession = (withHint: boolean) => {
      let s = startCase(K1);
      s = { ...s, currentNodeId: "k1-decision-1" };
      if (withHint) s = useHint(s);
      s = chooseOption(s, "k1-opt1b");
      s = chooseOption(s, "k1-opt2a");
      return s;
    };
    const debriefNoHint = getDebrief(makeSession(false));
    const debriefWithHint = getDebrief(makeSession(true));
    expect(debriefNoHint.score).toBe(debriefWithHint.score + 10);
  });
});

