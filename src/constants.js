export const TRACKED_STATS = {
    PTS: "PTS",
    AST: "AST",
    REB: "REB",
    "3PM": "3PM/A",
};

export const FORMAT_THRESHOLDS = {
    [TRACKED_STATS.PTS]: [15],
    [TRACKED_STATS.AST]: [2],
    [TRACKED_STATS.REB]: [4],
    [TRACKED_STATS["3PM"]]: [1],
};
