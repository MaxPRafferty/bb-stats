export const TRACKED_STATS = {
    points: "PTS",
    assists: "AST",
    rebounds: "REB",
    "three-point-makes": "3PM/A",
};

export const FORMAT_THRESHOLDS = {
    [TRACKED_STATS.points]: [15],
    [TRACKED_STATS.assists]: [2],
    [TRACKED_STATS.rebounds]: [4],
    [TRACKED_STATS["three-point-makes"]]: [1],
};
