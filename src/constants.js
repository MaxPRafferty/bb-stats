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

export const STAT_THRESHOLDS = {
    [TRACKED_STATS.PTS]: {10:10, 15:15, 20:20, 25:25},
    [TRACKED_STATS.AST]: {2:2, 4:4},
    [TRACKED_STATS.REB]: {4:4, 6:6, 8:8},
    [TRACKED_STATS["3PM"]]: {1:1, 2:2},
}
