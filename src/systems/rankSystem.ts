export interface RankInfo {
  roleName: string;
  roleId: string;
  division: string;
  nextMilestoneXP: number | null;
}

export const RANKS = [
  { name: "Lenda do Clube", id: "1494818810212122624", minXp: 100000, hasDivisions: false },
  { name: "Elite do Clube", id: "1494818811684061405", minXp: 64000, hasDivisions: true },
  { name: "Destaque do Clube", id: "1494818385299509328", minXp: 37000, hasDivisions: true },
  { name: "Clube", id: "1494818384695525386", minXp: 10000, hasDivisions: true },
  { name: "Diamante", id: "1494818375497420873", minXp: 8000, hasDivisions: false },
  { name: "Platina", id: "1494818386000220302", minXp: 4800, hasDivisions: false },
  { name: "Ouro", id: "1494818271499653312", minXp: 2400, hasDivisions: false },
  { name: "Prata", id: "1494818161185390592", minXp: 1200, hasDivisions: false },
  { name: "Bronze", id: "1494812105973563492", minXp: 0, hasDivisions: false }
];

export class RankSystem {
  static getRankInfo(xp: number): RankInfo {
    const currentRank = RANKS.find(r => xp >= r.minXp) || RANKS[RANKS.length - 1];
    const currentRankIndex = RANKS.findIndex(r => r.name === currentRank.name);
    const nextRank = RANKS[currentRankIndex - 1] || null;

    let division = "";
    let nextMilestoneXP = nextRank ? nextRank.minXp : null;

    if (currentRank.hasDivisions && xp < 100000) {
      const rankProgress = xp - currentRank.minXp;
      const divisionIndex = Math.floor(rankProgress / 9000);
      const divisions = ["III", "II", "I"];
      division = divisions[Math.min(divisionIndex, 2)];
      if (divisionIndex < 2) nextMilestoneXP = currentRank.minXp + ((divisionIndex + 1) * 9000);
    }

    return { roleName: currentRank.name, roleId: currentRank.id, division, nextMilestoneXP };
  }
}